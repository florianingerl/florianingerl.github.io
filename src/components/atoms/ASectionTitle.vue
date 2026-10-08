<script setup lang="ts">
defineProps<{ title?: string }>();
</script>

<template>
	<div class="section-title">
		<p v-if="title">{{ title }}</p>
		<slot />
	</div>
</template>
