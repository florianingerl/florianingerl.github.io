<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionBlock
		id="impressum"
		:title="t('sections.impressum.title')"
		:body-html="t('sections.impressum.body')"
	/>
</template>
