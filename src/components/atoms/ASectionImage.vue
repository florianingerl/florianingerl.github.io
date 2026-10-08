<script setup lang="ts">
defineProps<{ src: string; alt: string }>();
</script>

<template>
	<img :src="src" :alt="alt" class="img-fluid" />
</template>
