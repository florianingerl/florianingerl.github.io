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
import { newId } from "@/utils/whiteboard";
import type {
	WhiteboardBoard,
	WhiteboardCursor,
	WhiteboardParticipant,
	WhiteboardPatch,
} from "@/types/whiteboard";

export interface WhiteboardSession {
	board: Ref<WhiteboardBoard | null>;
	participants: Ref<WhiteboardParticipant[]>;
	cursors: Ref<Record<string, WhiteboardCursor>>;
	connected: Ref<boolean>;
	error: Ref<string>;
	createBoard: (title: string, name: string) => Promise<string>;
	joinBoard: (boardId: string, name: string) => Promise<void>;
	sendPatch: (patch: WhiteboardPatch) => void;
	sendCursor: (x: number, y: number) => void;
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
	}
	function onConnectError(): void {
		connected.value = false;
		error.value = "whiteboard.serverUnreachable";
	}
	function handleChanged(patch: WhiteboardPatch): void {
		changedHandler?.(patch);
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
		if (!patch.upserts.length && !patch.deletes.length) return;
		socket.emit("whiteboard:update", {
			boardId,
			clientId,
			upserts: patch.upserts,
			deletes: patch.deletes,
		});
	}

	function sendCursor(x: number, y: number): void {
		if (!socket || !boardId) return;
		socket.emit("whiteboard:cursor", { boardId, clientId, x, y });
	}

	function leave(): void {
		if (socket && boardId) {
			socket.emit("whiteboard:leave", { boardId, clientId });
		}
		boardId = "";
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
		connected,
		error,
		createBoard,
		joinBoard,
		sendPatch,
		sendCursor,
		leave,
		onChanged,
	};
}
