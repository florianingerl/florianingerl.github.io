<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="physikuni"
		:title="t('sections.physikuni.title')"
		image-src="assets/img/physikuni.png"
		:image-alt="t('sections.physikuni.imageAlt')"
		:body-html="t('sections.physikuni.body')"
	/>
</template>
