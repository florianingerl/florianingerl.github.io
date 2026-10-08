<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="websitenundflyer"
		:title="t('sections.websitenundflyer.title')"
		image-src="assets/img/WebsiteProgrammierungFlyer3.png"
		:image-alt="t('sections.websitenundflyer.imageAlt')"
		:body-html="t('sections.websitenundflyer.body')"
	/>
</template>
