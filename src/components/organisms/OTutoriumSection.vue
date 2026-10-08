<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="tutorium"
		:title="t('sections.tutorium.title')"
		image-src="assets/img/owllehrer.png"
		:image-alt="t('sections.tutorium.imageAlt')"
		:body-html="t('sections.tutorium.body')"
	/>
</template>
