import { computed, ref } from "vue";
import type { Socket } from "socket.io-client";
import { getSocket, socketUrl } from "@/utils/socket";
import type { CollaborationUser } from "@/types/book";

// Gemeinsames Schreiben an einem Buch ueber socket.io.
//
// Der erste Schreiber legt eine Sitzung an ("book:createSession"). Der Server
// antwortet mit einer Sitzungs-Id. Daraus wird der Einladungslink gebaut. Wer
// den Link oeffnet, tritt mit "book:join" bei (nach Login/Signup oder als
// Gast). Jede Aenderung wird ueber "book:update" verschickt und vom Server an
// alle anderen Teilnehmer weitergegeben.
//
// Der Zustand liegt ausserhalb der Komponente, damit die Leiste und der Editor
// dieselben Daten sehen.

const sessionId = ref<string | null>(null);
const participants = ref<CollaborationUser[]>([]);
const link = ref("");
const fehler = ref("");
const verbunden = ref(false);

let socket: Socket | null = null;
let angemeldetAls = "";
// Der Editor meldet hier an, wie er Remote-Aenderungen uebernimmt.
let updateHandler: ((payload: unknown) => void) | null = null;

function ensureSocket(): Socket {
  if (socket) return socket;
  socket = getSocket();
  socket.on("connect", () => (verbunden.value = true));
  socket.on("disconnect", () => (verbunden.value = false));
  socket.on("connect_error", () => (verbunden.value = false));
  socket.on(
    "book:state",
    (s: { sessionId: string; participants?: CollaborationUser[] }) => {
      sessionId.value = s.sessionId;
      participants.value = s.participants ?? [];
      link.value = baueLink(s.sessionId);
    },
  );
  socket.on("book:participants", (p: CollaborationUser[]) => {
    participants.value = p;
  });
  socket.on("book:update", (payload: unknown) => updateHandler?.(payload));
  if (socket.connected) verbunden.value = true;
  return socket;
}

function baueLink(id: string): string {
  const basis = `${window.location.origin}${window.location.pathname}`;
  return `${basis}?bookSession=${encodeURIComponent(id)}`;
}

const collaborating = computed(() => sessionId.value !== null);

// Eine neue Sitzung anlegen. Der Name wird fuer die Farb-Legende mitgeschickt.
function startSession(name: string): void {
  fehler.value = "";
  angemeldetAls = name;
  ensureSocket().timeout(8000).emit(
    "book:createSession",
    { name },
    (err: Error | null, res: { sessionId?: string; participants?: CollaborationUser[]; error?: string }) => {
      if (err) {
        fehler.value = `The collaboration server could not be reached (${socketUrl()}).`;
        return;
      }
      if (res?.error) {
        fehler.value = res.error;
        return;
      }
      if (res?.sessionId) {
        sessionId.value = res.sessionId;
        participants.value = res.participants ?? [];
        link.value = baueLink(res.sessionId);
      }
    },
  );
}

// Einer bestehenden Sitzung beitreten.
function joinSession(id: string, name: string): void {
  fehler.value = "";
  angemeldetAls = name;
  ensureSocket().timeout(8000).emit(
    "book:join",
    { sessionId: id, name },
    (err: Error | null, res: { participants?: CollaborationUser[]; error?: string }) => {
      if (err) {
        fehler.value = `The collaboration server could not be reached (${socketUrl()}).`;
        return;
      }
      if (res?.error) {
        fehler.value = res.error;
        return;
      }
      sessionId.value = id;
      participants.value = res?.participants ?? [];
      link.value = baueLink(id);
    },
  );
}

// Eine Aenderung am Buchinhalt an die anderen Teilnehmer schicken.
function sendUpdate(payload: unknown): void {
  if (!socket || !sessionId.value) return;
  socket.emit("book:update", { sessionId: sessionId.value, payload });
}

// Der Editor registriert, was bei einer Remote-Aenderung geschehen soll.
function onUpdate(cb: (payload: unknown) => void): void {
  updateHandler = cb;
}

function beenden(): void {
  socket?.emit("book:leave", { sessionId: sessionId.value });
  sessionId.value = null;
  participants.value = [];
  link.value = "";
  fehler.value = "";
}

export function useBookCollab() {
  return {
    sessionId,
    participants,
    link,
    fehler,
    verbunden,
    collaborating,
    angemeldetAls,
    startSession,
    joinSession,
    sendUpdate,
    onUpdate,
    beenden,
  };
}
