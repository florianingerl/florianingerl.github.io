<script setup lang="ts">
import { computed, ref } from "vue";
import type { Color, GameState, Piece } from "../types";
import { FILES, fileOf, isLegalDrop, rankOf } from "../gameLogic";

const props = defineProps<{
  state: GameState;
  myColor: Color | null;
}>();

const emit = defineEmits<{
  move: [from: number, to: number];
  illegal: [];
}>();

const boardEl = ref<HTMLElement | null>(null);

const cells = computed(() => {
  const list: { idx: number; light: boolean; file: number; rank: number }[] = [];
  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      list.push({ idx: rank * 8 + file, light: (file + rank) % 2 === 1, file, rank });
    }
  }
  return list;
});

const pieces = computed(() => {
  const list: { key: string; piece: Piece; idx: number }[] = [];
  props.state.board.forEach((p, i) => {
    if (p) list.push({ key: p.c + p.t, piece: p, idx: i });
  });
  return list;
});

const solo = computed(() => props.state.players.length < 2);

const showArrow = computed(() => {
  const lm = props.state.lastMove;
  if (!lm) return false;
  if (solo.value) return true;
  return props.myColor !== null && lm.color !== props.myColor;
});

const arrow = computed(() => {
  const lm = props.state.lastMove;
  if (!lm) return null;
  const c1 = { x: fileOf(lm.from) * 100 + 50, y: (7 - rankOf(lm.from)) * 100 + 50 };
  const c2 = { x: fileOf(lm.to) * 100 + 50, y: (7 - rankOf(lm.to)) * 100 + 50 };
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: c1.x + ux * 34,
    y1: c1.y + uy * 34,
    x2: c2.x - ux * 42,
    y2: c2.y - uy * 42,
  };
});

function glyph(t: string): string {
  return t === "N" ? "\u265E" : t === "B" ? "\u265D" : "\u265C";
}

function pieceStyle(idx: number) {
  return { left: fileOf(idx) * 12.5 + "%", top: (7 - rankOf(idx)) * 12.5 + "%" };
}

function canDrag(piece: Piece): boolean {
  if (props.state.result) return false;
  if (props.state.turn !== piece.c) return false;
  if (!solo.value && (!props.myColor || props.myColor !== piece.c)) return false;
  return true;
}

// ---------------------------------------------------------------- dragging

interface DragInfo {
  el: HTMLElement;
  from: number;
  grabX: number;
  grabY: number;
  rect: DOMRect;
  pointerId: number;
}

let drag: DragInfo | null = null;

function onPointerDown(e: PointerEvent, piece: Piece, idx: number) {
  if (!canDrag(piece) || !boardEl.value || (e.button !== undefined && e.button !== 0)) return;
  const el = e.currentTarget as HTMLElement;
  const rect = boardEl.value.getBoundingClientRect();
  const cell = rect.width / 8;
  e.preventDefault();
  el.classList.add("t3-dragging");
  el.setPointerCapture(e.pointerId);
  drag = {
    el,
    from: idx,
    pointerId: e.pointerId,
    rect,
    grabX: e.clientX - rect.left - fileOf(idx) * cell,
    grabY: e.clientY - rect.top - (7 - rankOf(idx)) * cell,
  };
  position(e.clientX, e.clientY);
}

function position(cx: number, cy: number) {
  if (!drag) return;
  const r = drag.rect;
  const cell = r.width / 8;
  const x = Math.max(-cell * 0.6, Math.min(r.width - cell * 0.4, cx - r.left - drag.grabX));
  const y = Math.max(-cell * 0.6, Math.min(r.height - cell * 0.4, cy - r.top - drag.grabY));
  drag.el.style.left = x + "px";
  drag.el.style.top = y + "px";
}

function onPointerMove(e: PointerEvent) {
  if (drag && e.pointerId === drag.pointerId) position(e.clientX, e.clientY);
}

function restore(el: HTMLElement, idx: number) {
  el.style.left = fileOf(idx) * 12.5 + "%";
  el.style.top = (7 - rankOf(idx)) * 12.5 + "%";
}

function onPointerUp(e: PointerEvent) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const d = drag;
  drag = null;
  d.el.classList.remove("t3-dragging");
  try {
    d.el.releasePointerCapture(e.pointerId);
  } catch {
    /* ignore */
  }
  const r = d.rect;
  const fx = e.clientX - r.left;
  const fy = e.clientY - r.top;
  let to = -1;
  if (fx >= 0 && fy >= 0 && fx < r.width && fy < r.height) {
    const file = Math.floor(fx / (r.width / 8));
    const row = Math.floor(fy / (r.height / 8));
    to = (7 - row) * 8 + file;
  }
  const piece = props.state.board[d.from];
  restore(d.el, d.from);
  if (to >= 0 && piece && isLegalDrop(props.state.board, d.from, to, piece.c, props.state.turn)) {
    emit("move", d.from, to);
  } else {
    emit("illegal");
  }
}
</script>

<template>
  <div ref="boardEl" class="t3-board" :class="{ 't3-board-over': !!state.result }">
    <div
      v-for="c in cells"
      :key="c.idx"
      class="t3-sq"
      :class="c.light ? 't3-sq-l' : 't3-sq-d'"
    >
      <span v-if="c.rank === 0" class="t3-coord t3-coord-file">{{ FILES[c.file] }}</span>
      <span v-if="c.file === 0" class="t3-coord t3-coord-rank">{{ c.rank + 1 }}</span>
    </div>

    <div
      v-for="p in pieces"
      :key="p.key"
      class="t3-piece"
      :class="['t3-piece-' + p.piece.c, { 't3-piece-drag': canDrag(p.piece) }]"
      :style="pieceStyle(p.idx)"
      @pointerdown="onPointerDown($event, p.piece, p.idx)"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      {{ glyph(p.piece.t) }}
    </div>

    <svg v-if="showArrow && arrow" class="t3-arrow" viewBox="0 0 800 800" aria-hidden="true">
      <defs>
        <marker
          id="t3-arrowhead"
          markerWidth="3"
          markerHeight="3"
          refX="1.5"
          refY="1.5"
          orient="auto"
        >
          <path d="M0,0 L3,1.5 L0,3 z" class="t3-arrow-head" />
        </marker>
      </defs>
      <line
        :x1="arrow.x1"
        :y1="arrow.y1"
        :x2="arrow.x2"
        :y2="arrow.y2"
        class="t3-arrow-line"
        marker-end="url(#t3-arrowhead)"
      />
    </svg>
  </div>
</template>
