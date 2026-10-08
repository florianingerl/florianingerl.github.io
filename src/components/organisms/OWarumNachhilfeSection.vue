<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionBlock
		id="warumnachhilfebeiflorian"
		:title="t('sections.warumnachhilfe.title')"
		:body-html="t('sections.warumnachhilfe.body')"
	/>
</template>
