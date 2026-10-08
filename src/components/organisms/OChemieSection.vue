<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="chemie"
		:title="t('sections.chemie.title')"
		image-src="assets/img/chemie/Thermochemie.png"
		:image-alt="t('sections.chemie.imageAlt')"
		:body-html="t('sections.chemie.body')"
	/>
</template>
