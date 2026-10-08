<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="reiki"
		:title="t('sections.reiki.title')"
		image-src="assets/img/rawfood/ReikiBlumenkohl.png"
		:image-alt="t('sections.reiki.imageAlt')"
		:body-html="t('sections.reiki.body')"
		image-class="col-lg-6 order-2 order-lg-2"
		content-class="col-lg-3 pt-4 pt-lg-0 order-1 order-lg-1 content"
	/>
</template>
