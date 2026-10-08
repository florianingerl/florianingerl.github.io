<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="online"
		:title="t('sections.online.title')"
		image-src="assets/img/miroapp.png"
		:image-alt="t('sections.online.imageAlt')"
		:body-html="t('sections.online.body')"
	/>
</template>
