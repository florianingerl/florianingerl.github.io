<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionBlock
		id="preise"
		:title="t('sections.preise.title')"
		:body-html="t('sections.preise.body')"
	/>
</template>
