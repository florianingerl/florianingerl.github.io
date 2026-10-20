<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";
import ARichText from "@/components/atoms/ARichText.vue";
import VueContractDialog from "@/components/quizzes/VueContractDialog.vue";
import { renderRichText } from "@/utils/richText";

const { t } = useI18n();
const showContractDialog = ref(false);

const html = (key: string): string => renderRichText(t(key));
</script>

<template>
	<MSectionBlock id="preise" :title="t('sections.preise.title')">
		<ARichText :html="html('sections.preise.body')" />
		<ARichText :html="html('sections.preise.lernpaket')" />
		<ARichText :html="html('sections.preise.allesOderNichts')" />
		<p>
			<button type="button" class="btn btn-primary" @click="showContractDialog = true">
				{{ t('contract.openButton') }}
			</button>
		</p>
		<ARichText :html="html('sections.preise.termin')" />
	</MSectionBlock>

	<VueContractDialog v-if="showContractDialog" @close="showContractDialog = false" />
</template>
