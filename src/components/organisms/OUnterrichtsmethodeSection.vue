<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="unterrichtsmethode"
		:title="t('sections.unterrichtsmethode.title')"
		image-src="assets/img/owllehrer.png"
		:image-alt="t('sections.unterrichtsmethode.imageAlt')"
		:body-html="t('sections.unterrichtsmethode.body')"
	/>
</template>
