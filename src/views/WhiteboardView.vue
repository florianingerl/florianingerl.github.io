<script setup lang="ts">
// Eigene Seite fuer das Whiteboard ("/whiteboard"). Sie ist absichtlich
// schlicht: nur ein gruener, zentrierter Knopf zum Erstellen eines neuen
// Whitepapers.
</script>

<template>
	<main class="whiteboard d-flex justify-content-center align-items-center">
		<button type="button" class="whiteboard__create">
			Create new whitepaper
		</button>
	</main>
</template>

<style scoped>
.whiteboard {
	min-height: 60vh;
	padding: 2rem 1rem;
}

.whiteboard__create {
	background: #5fcf80;
	color: #fff;
	border: 2px solid #5fcf80;
	border-radius: 50px;
	padding: 12px 30px;
	font-weight: 600;
	font-size: 16px;
	cursor: pointer;
	transition: background 0.3s, border-color 0.3s;
}

.whiteboard__create:hover {
	background: #3ac162;
	border-color: #3ac162;
}
</style>
