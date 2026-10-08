<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionBlock
		id="nachhilfeangebot"
		:title="t('sections.nachhilfeangebot.title')"
		:body-html="t('sections.nachhilfeangebot.body')"
	/>
</template>
