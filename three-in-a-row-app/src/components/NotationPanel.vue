<script setup lang="ts">
import { computed } from "vue";
import type { GameState } from "../types";

const props = defineProps<{
  state: GameState;
}>();

const headerLines = computed(() => {
  const h = props.state.pgnHeaders;
  return ["Event", "Site", "Date", "Round", "White", "Black", "Result", "SetUp", "FEN"]
    .map((k) => `[${k} "${h[k] ?? ""}"]`)
    .join("\n");
});

const rows = computed(() => {
  const list: { no: number; white: string; black: string }[] = [];
  props.state.moves.forEach((m, i) => {
    if (i % 2 === 0) {
      list.push({ no: Math.floor(i / 2) + 1, white: m.san, black: "" });
    } else {
      list[list.length - 1].black = m.san;
    }
  });
  return list;
});
</script>

<template>
  <div class="t3-notes">
    <div class="t3-pgn">
      <div class="t3-pgn-title">PGN</div>
      <pre class="t3-pgn-body">{{ headerLines }}</pre>
    </div>
    <div class="t3-moves">
      <div class="t3-moves-title">Moves</div>
      <div v-if="rows.length === 0" class="t3-muted">No moves yet.</div>
      <table class="t3-movetable">
        <tr v-for="row in rows" :key="row.no">
          <td class="t3-no">{{ row.no }}.</td>
          <td>{{ row.white }}</td>
          <td>{{ row.black }}</td>
        </tr>
      </table>
      <div v-if="state.result" class="t3-result">{{ state.result }}</div>
    </div>
  </div>
</template>
