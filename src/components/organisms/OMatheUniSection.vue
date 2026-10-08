<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="matheuni"
		:title="t('sections.matheuni.title')"
		image-src="assets/img/Konvex.jpg"
		:image-alt="t('sections.matheuni.imageAlt')"
		:body-html="t('sections.matheuni.body')"
	/>
</template>
