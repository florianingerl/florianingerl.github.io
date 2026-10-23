// Verbindung zum Whiteboard-Server (Socket.IO).
//
// Der Server haelt die Objekte und verteilt die Aenderungen an alle Teilnehmer
// des Boards. Der Client schickt nur die Aenderung (geaenderte und geloeschte
// Objekte), damit zwei Personen gleichzeitig arbeiten koennen, ohne dass einer
// die Arbeit des anderen ueberschreibt.
//
// Ereignisse:
//   whiteboard:create { title, name, clientId }  -> ack { board, participants }
//   whiteboard:join   { boardId, name, clientId } -> ack { board, participants }
//   whiteboard:update { boardId, clientId, upserts, deletes }
//   whiteboard:cursor { boardId, clientId, x, y }
//   whiteboard:leave  { boardId, clientId }
// Vom Server kommen:
//   whiteboard:changed     { upserts, deletes }
//   whiteboard:participants { participants }
//   whiteboard:cursor      { participant, x, y }

import { onBeforeUnmount, ref, type Ref } from "vue";
import type { Socket } from "socket.io-client";
import { getSocket } from "@/utils/socket";
import { appendPenPoints, newId, splitPatch } from "@/utils/whiteboard";
import type {
	WhiteboardBoard,
	WhiteboardCursor,
	WhiteboardObject,
	WhiteboardParticipant,
	WhiteboardPatch,
	WhiteboardPenEvent,
	WhiteboardPenStroke,
} from "@/types/whiteboard";

export interface WhiteboardSession {
	board: Ref<WhiteboardBoard | null>;
	participants: Ref<WhiteboardParticipant[]>;
	cursors: Ref<Record<string, WhiteboardCursor>>;
	penPreviews: Ref<Record<string, WhiteboardObject>>;
	connected: Ref<boolean>;
	error: Ref<string>;
	createBoard: (title: string, name: string) => Promise<string>;
	joinBoard: (boardId: string, name: string) => Promise<void>;
	sendPatch: (patch: WhiteboardPatch) => void;
	sendCursor: (x: number, y: number) => void;
	sendPenStart: (stroke: WhiteboardPenStroke) => void;
	sendPenPoints: (id: string, points: number[]) => void;
	sendPenCancel: (id: string) => void;
	leave: () => void;
	onChanged: (handler: (patch: WhiteboardPatch) => void) => void;
}

interface CreateAntwort {
	board?: WhiteboardBoard;
	participants?: WhiteboardParticipant[];
	error?: string;
}

export function useWhiteboardSession(): WhiteboardSession {
	const board = ref<WhiteboardBoard | null>(null);
	const participants = ref<WhiteboardParticipant[]>([]);
	const cursors = ref<Record<string, WhiteboardCursor>>({});
	const penPreviews = ref<Record<string, WhiteboardObject>>({});
	const connected = ref(false);
	const error = ref("");

	let socket: Socket | null = null;
	let boardId = "";
	let changedHandler: ((patch: WhiteboardPatch) => void) | null = null;
	// Jede Sitzung bekommt ihre eigene Kennung. Der Server haelt damit auch
	// dann die richtigen Teilnehmer fest, wenn sich mehrere Sitzungen (z.B. die
	// Startseite und das Board) dieselbe Verbindung teilen.
	const clientId = newId("c");

	function onConnect(): void {
		connected.value = true;
	}
	function onDisconnect(): void {
		connected.value = false;
		penPreviews.value = {};
	}
	function onConnectError(): void {
		connected.value = false;
		error.value = "whiteboard.serverUnreachable";
	}
	function handleChanged(patch: WhiteboardPatch): void {
		const rest = { ...penPreviews.value };
		let geaendert = false;
		for (const objekt of patch.upserts) {
			if (objekt.type === "pen" && rest[objekt.id]) {
				delete rest[objekt.id];
				geaendert = true;
			}
		}
		for (const id of patch.deletes) {
			if (rest[id]) {
				delete rest[id];
				geaendert = true;
			}
		}
		if (geaendert) penPreviews.value = rest;
		changedHandler?.(patch);
	}
	function handlePen(event: WhiteboardPenEvent): void {
		if (!event || typeof event !== "object") return;
		if (event.phase === "start" && event.stroke) {
			penPreviews.value = {
				...penPreviews.value,
				[event.stroke.id]: {
					id: event.stroke.id,
					type: "pen",
					x: event.stroke.x,
					y: event.stroke.y,
					w: 0,
					h: 0,
					z: event.stroke.z,
					color: event.stroke.color,
					strokeWidth: event.stroke.strokeWidth,
					author: event.stroke.author,
					points: [],
				},
			};
			return;
		}
		if (event.phase === "points" && event.id && Array.isArray(event.points)) {
			const vorhanden = penPreviews.value[event.id];
			if (!vorhanden) return;
			penPreviews.value = {
				...penPreviews.value,
				[event.id]: appendPenPoints(vorhanden, event.points),
			};
			return;
		}
		if (event.phase === "cancel" && event.id && penPreviews.value[event.id]) {
			const rest = { ...penPreviews.value };
			delete rest[event.id];
			penPreviews.value = rest;
		}
	}
	function onParticipants(list: WhiteboardParticipant[]): void {
		participants.value = Array.isArray(list) ? list : [];
	}
	function onCursor(cursor: WhiteboardCursor): void {
		if (!cursor?.participant) return;
		cursors.value = {
			...cursors.value,
			[cursor.participant.id]: cursor,
		};
	}

	function attach(): Socket {
		socket = getSocket();
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("connect_error", onConnectError);
		socket.on("whiteboard:changed", handleChanged);
		socket.on("whiteboard:participants", onParticipants);
		socket.on("whiteboard:cursor", onCursor);
		socket.on("whiteboard:pen", handlePen);
		if (socket.connected) connected.value = true;
		return socket;
	}

	function detach(): void {
		if (!socket) return;
		socket.off("connect", onConnect);
		socket.off("disconnect", onDisconnect);
		socket.off("connect_error", onConnectError);
		socket.off("whiteboard:changed", handleChanged);
		socket.off("whiteboard:participants", onParticipants);
		socket.off("whiteboard:cursor", onCursor);
		socket.off("whiteboard:pen", handlePen);
		socket = null;
	}

	async function createBoard(
		title: string,
		name: string,
	): Promise<string> {
		error.value = "";
		const s = attach();
		return new Promise<string>((resolve, reject) => {
			s.timeout(10_000).emit(
				"whiteboard:create",
				{ title, name, clientId },
				(
					err: Error | null,
					antwort: CreateAntwort | undefined,
				) => {
					if (err || !antwort?.board) {
						const text =
							antwort?.error ?? "whiteboard.serverUnreachable";
						error.value = text;
						reject(new Error(text));
						return;
					}
					board.value = antwort.board;
					participants.value = antwort.participants ?? [];
					boardId = antwort.board.id;
					resolve(antwort.board.id);
				},
			);
		});
	}

	async function joinBoard(id: string, name: string): Promise<void> {
		error.value = "";
		const s = attach();
		await new Promise<void>((resolve, reject) => {
			s.timeout(10_000).emit(
				"whiteboard:join",
				{ boardId: id, name, clientId },
				(
					err: Error | null,
					antwort: CreateAntwort | undefined,
				) => {
					if (err || !antwort?.board) {
						const text = antwort?.error ?? "whiteboard.notFound";
						error.value = text;
						reject(new Error(text));
						return;
					}
					board.value = antwort.board;
					participants.value = antwort.participants ?? [];
					boardId = antwort.board.id;
					resolve();
				},
			);
		});
	}

	function sendPatch(patch: WhiteboardPatch): void {
		if (!socket || !boardId) return;
		for (const teil of splitPatch(patch)) {
			socket.emit("whiteboard:update", {
				boardId,
				clientId,
				upserts: teil.upserts,
				deletes: teil.deletes,
			});
		}
	}

	function sendCursor(x: number, y: number): void {
		if (!socket || !boardId) return;
		socket.emit("whiteboard:cursor", { boardId, clientId, x, y });
	}

	function sendPenStart(stroke: WhiteboardPenStroke): void {
		if (!socket || !boardId) return;
		socket.emit("whiteboard:pen", { boardId, clientId, phase: "start", stroke });
	}

	function sendPenPoints(id: string, points: number[]): void {
		if (!socket || !boardId || !points.length) return;
		socket.emit("whiteboard:pen", { boardId, clientId, phase: "points", id, points });
	}

	function sendPenCancel(id: string): void {
		if (!socket || !boardId) return;
		socket.emit("whiteboard:pen", { boardId, clientId, phase: "cancel", id });
	}

	function leave(): void {
		if (socket && boardId) {
			socket.emit("whiteboard:leave", { boardId, clientId });
		}
		boardId = "";
		penPreviews.value = {};
		detach();
	}

	function onChanged(handler: (patch: WhiteboardPatch) => void): void {
		changedHandler = handler;
	}

	onBeforeUnmount(() => {
		leave();
	});

	return {
		board,
		participants,
		cursors,
		penPreviews,
		connected,
		error,
		createBoard,
		joinBoard,
		sendPatch,
		sendCursor,
		sendPenStart,
		sendPenPoints,
		sendPenCancel,
		leave,
		onChanged,
	};
}
