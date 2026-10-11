<script setup lang="ts">
import { computed, ref } from "vue";

// Dummy-Komponente: dient nur dazu, das Testen mit Vue Test Utils (Unit) und
// Playwright (E2E) zu demonstrieren. Sie hat bewusst einfache, gut prüfbare
// Funktionalität (Zähler + Begrüßung).
const count = ref(0);
const name = ref("");

const parity = computed(() => (count.value % 2 === 0 ? "even" : "odd"));

function increment(): void {
	count.value += 1;
}
</script>

<template>
	<div class="dummy-counter">
		<button data-testid="increment" type="button" @click="increment">
			count is {{ count }}
		</button>
		<p data-testid="parity">{{ parity }}</p>

		<label for="dummy-name">Name</label>
		<input id="dummy-name" v-model="name" data-testid="name" />
		<p data-testid="greeting">Hello {{ name || "world" }}</p>
	</div>
</template>

<style scoped>
.dummy-counter {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	max-width: 20rem;
}
</style>
