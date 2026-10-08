<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="chemieschule"
		:title="t('sections.chemieschule.title')"
		image-src="assets/img/chemie/Thermochemie.png"
		:image-alt="t('sections.chemieschule.imageAlt')"
		:body-html="t('sections.chemieschule.body')"
	/>
</template>
