<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import GameBoard from "./GameBoard.vue";
import NotationPanel from "./NotationPanel.vue";
import type { Color, GameState } from "@/types/game";
import { getSocket, socketUrl } from "@/utils/socket";
import { playWhistle } from "@/utils/whistle";
import "./game.css";

const socket = getSocket();

const state = ref<GameState | null>(null);
const myName = ref<string | null>(null);
const nameInput = ref("");
const error = ref("");
const notice = ref("");
const connected = ref(false);
const menuOpen = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const copied = ref(false);
const joinId = new URLSearchParams(window.location.search).get("join") ?? "";

let noticeTimer: number | undefined;

const myColor = computed<Color | null>(() => {
  if (!state.value || !myName.value) return null;
  return state.value.players.find((p) => p.name === myName.value)?.color ?? null;
});

const waitingLink = computed(() =>
  state.value ? window.location.origin + window.location.pathname + "?join=" + state.value.sessionId : ""
);

const waiting = computed(() => {
  const s = state.value;
  if (!s) return false;
  return s.players.length < 2 || s.players.some((p) => !p.online);
});

function showNotice(msg: string) {
  notice.value = msg;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.value = "";
  }, 4000);
}

function playerName(color: Color): string {
  const s = state.value;
  if (!s) return "";
  const p = s.players.find((pl) => pl.color === color);
  if (p) return p.name + (p.online ? "" : " (offline)");
  return "Waiting for the other player \u2026";
}

function ringActive(color: Color): boolean {
  return !!state.value && !state.value.result && state.value.turn === color;
}

// ------------------------------------------------------------- connection

function onConnect() {
  connected.value = true;
}
function onDisconnect() {
  connected.value = false;
}
function onState(s: GameState) {
  state.value = s;
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);
socket.on("connect_error", () => (connected.value = false));
socket.on("state", onState);
if (socket.connected) connected.value = true;

onBeforeUnmount(() => {
  socket.off("connect", onConnect);
  socket.off("disconnect", onDisconnect);
  socket.off("state", onState);
  document.removeEventListener("click", closeMenu);
  window.clearTimeout(noticeTimer);
});

// --------------------------------------------------------------- sessions

function createSession() {
  error.value = "";
  socket.timeout(5000).emit("createSession", { name: nameInput.value }, (err: Error | null, res: { state?: GameState; error?: string }) => {
    if (err) {
      error.value = "The game server could not be reached (" + socketUrl() + ").";
      return;
    }
    if (res?.error) {
      error.value = res.error;
      return;
    }
    if (res?.state) {
      myName.value = nameInput.value.trim();
      state.value = res.state;
    }
  });
}

function joinSession() {
  error.value = "";
  socket.timeout(5000).emit("joinSession", { sessionId: joinId, name: nameInput.value }, (err: Error | null, res: { state?: GameState; error?: string }) => {
    if (err) {
      error.value = "The game server could not be reached (" + socketUrl() + ").";
      return;
    }
    if (res?.error) {
      error.value = res.error;
      return;
    }
    if (res?.state) {
      myName.value = nameInput.value.trim();
      state.value = res.state;
    }
  });
}

function copyLink() {
  const link = waitingLink.value;
  const done = () => {
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 2000);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(link).then(done, () => fallbackCopy(link, done));
  } else {
    fallbackCopy(link, done);
  }
}

function fallbackCopy(text: string, done: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
  done();
}

// ------------------------------------------------------------------ moves

function onMove(from: number, to: number) {
  socket.emit("move", { from, to }, (res: { ok?: boolean; error?: string }) => {
    if (res?.error) {
      playWhistle();
      showNotice(res.error);
    }
  });
}

function newGame() {
  socket.emit("newGame", {}, (res: { ok?: boolean; error?: string }) => {
    if (res?.error) showNotice(res.error);
  });
}

function switchColors() {
  socket.emit("switchColors", {}, (res: { ok?: boolean; error?: string }) => {
    if (res?.error) showNotice(res.error);
  });
}

// -------------------------------------------------------------- file menu

function closeMenu() {
  menuOpen.value = false;
}

function saveGame() {
  menuOpen.value = false;
  const s = state.value;
  if (!s) return;
  const blob = new Blob([s.pgn], { type: "application/x-chess-pgn" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "three-in-a-row-" + (s.pgnHeaders.Date || "game") + ".pgn";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Nicht synchron widerrufen, sonst kann Chrome den Download verwerfen.
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function loadGame() {
  menuOpen.value = false;
  fileInput.value?.click();
}

function onLoadFile(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result ?? "");
    socket.emit("loadPgn", text, (res: { ok?: boolean; error?: string }) => {
      if (res?.error) showNotice("Could not load the PGN: " + res.error);
    });
  };
  reader.readAsText(file);
}

function selectLinkInput(e: FocusEvent) {
  (e.target as HTMLInputElement).select();
}

onMounted(() => {
  document.addEventListener("click", closeMenu);
});
</script>

<template>
  <div class="t3-root">
    <!-- ================================================== menu bar -->
    <div class="t3-menubar">
      <div v-if="state" class="t3-menu" @click.stop="menuOpen = !menuOpen">
        File<span class="t3-caret">&#9662;</span>
        <div v-if="menuOpen" class="t3-dropdown" @click.stop>
          <button class="t3-dropitem" @click="saveGame">Save</button>
          <button class="t3-dropitem" @click="loadGame">Load</button>
        </div>
      </div>
      <div v-else class="t3-menu t3-menu-plain">File</div>
      <span class="t3-game-title">Three-in-a-row</span>
      <span
        class="t3-conn"
        :class="connected ? 't3-conn-on' : 't3-conn-off'"
        :title="connected ? 'connected to the game server' : 'not connected (' + socketUrl() + ')'"
      ></span>
      <span class="t3-spacer"></span>
      <template v-if="state">
        <button class="t3-btn t3-btn-sm" @click="newGame">New game</button>
        <button class="t3-btn t3-btn-sm" @click="switchColors">Switch colors</button>
      </template>
      <input
        ref="fileInput"
        type="file"
        accept=".pgn,text/plain"
        class="t3-hidden"
        @change="onLoadFile"
      />
    </div>

    <!-- ================================================== session form -->
    <div v-if="!state" class="t3-session">
      <p class="t3-session-text">
        One player creates a session and sends the link to the other player.
        Both play with a knight, a bishop and a rook - capturing is not allowed.
        The first player who puts his three pieces directly next to each other
        in a row or a column wins.
      </p>
      <label class="t3-label" for="t3-name">Your name</label>
      <input
        id="t3-name"
        v-model="nameInput"
        class="t3-input"
        maxlength="40"
        placeholder="e.g. Anna"
        @keyup.enter="joinId ? joinSession() : createSession()"
      />
      <p v-if="joinId" class="t3-session-id">You were invited to session <b>{{ joinId }}</b>.</p>
      <button
        v-if="joinId"
        class="t3-btn t3-btn-primary"
        :disabled="!nameInput.trim() || !connected"
        @click="joinSession"
      >
        Join session
      </button>
      <button
        v-else
        class="t3-btn t3-btn-primary"
        :disabled="!nameInput.trim() || !connected"
        @click="createSession"
      >
        Create new session
      </button>
      <p v-if="error" class="t3-error">{{ error }}</p>
      <p v-if="!connected" class="t3-muted">Connecting to the game server &hellip;</p>
    </div>

    <!-- ================================================== game -->
    <div v-else class="t3-game">
      <div class="t3-boardcol">
        <div class="t3-band t3-band-top">
          <div class="t3-ring" :class="['t3-ring-b', { 't3-ring-active': ringActive('b') }]">
            <span class="t3-circle t3-circle-b"></span>
          </div>
          <span class="t3-name t3-name-b">{{ playerName("b") }}</span>
        </div>

        <GameBoard :state="state" :my-color="myColor" @move="onMove" @illegal="playWhistle" />

        <div class="t3-band t3-band-bottom">
          <div class="t3-ring" :class="['t3-ring-w', { 't3-ring-active': ringActive('w') }]">
            <span class="t3-circle t3-circle-w"></span>
          </div>
          <span class="t3-name t3-name-w">{{ playerName("w") }}</span>
        </div>

        <div v-if="waiting" class="t3-waiting">
          <template v-if="state.players.length < 2">
            <span>Send this link to your opponent:</span>
            <input class="t3-input t3-linkinput" :value="waitingLink" readonly @focus="selectLinkInput" />
            <button class="t3-btn t3-btn-sm" @click="copyLink">{{ copied ? "Copied!" : "Copy" }}</button>
          </template>
          <template v-else>
            <span>The other player is offline &hellip; waiting.</span>
          </template>
        </div>
      </div>

      <div class="t3-sidecol">
        <div v-if="state.result" class="t3-won">
          {{ state.result === "1-0" ? "White wins!" : "Black wins!" }}
          ({{ state.result }})
        </div>
        <div v-if="notice" class="t3-notice">{{ notice }}</div>
        <NotationPanel :state="state" />
      </div>
    </div>
  </div>
</template>
