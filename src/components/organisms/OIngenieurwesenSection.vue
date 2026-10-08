<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="ingenieurwesen"
		:title="t('sections.ingenieurwesen.title')"
		image-src="assets/img/ingenieurwesen.png"
		:image-alt="t('sections.ingenieurwesen.imageAlt')"
		:body-html="t('sections.ingenieurwesen.body')"
	/>
</template>
