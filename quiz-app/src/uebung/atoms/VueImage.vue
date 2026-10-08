<template>
<div class="d-flex flex-row">
<img v-if="imageUrl != undefined" :src="imageUrl" class="h-[200px]" @click="imageClicked"/>
<slot></slot>
</div>
</template>

<script setup lang="ts">
import { grossesBild } from "../bild";

// Ein kleines Bild neben dem Text, das beim Klick groß gezeigt wird
const props = defineProps<{ imageUrl?: string }>();

function imageClicked(): void {
  grossesBild.value = props.imageUrl ?? null;
}
</script>
