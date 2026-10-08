<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="matheschule"
		:title="t('sections.matheschule.title')"
		image-src="assets/img/matheschule.png"
		:image-alt="t('sections.matheschule.imageAlt')"
		:body-html="t('sections.matheschule.body')"
	/>
</template>
