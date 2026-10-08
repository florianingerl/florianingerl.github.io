<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="infoschule"
		:title="t('sections.infoschule.title')"
		image-src="assets/img/infoschule.jpg"
		:image-alt="t('sections.infoschule.imageAlt')"
		:body-html="t('sections.infoschule.body')"
	/>
</template>
