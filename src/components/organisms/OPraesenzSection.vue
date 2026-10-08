<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="praesenz"
		:title="t('sections.praesenz.title')"
		image-src="assets/img/PräsenzNachhilfe2.JPG"
		:image-alt="t('sections.praesenz.imageAlt')"
		:body-html="t('sections.praesenz.body')"
		image-class="col-lg-8 order-1 order-lg-2"
		content-class="col-lg-4 pt-4 pt-lg-0 order-2 order-lg-1 content"
	/>
</template>
