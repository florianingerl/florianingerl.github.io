<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import MSectionBlock from "@/components/molecules/MSectionBlock.vue";
import ARichText from "@/components/atoms/ARichText.vue";
import VueContractDialog from "@/components/quizzes/VueContractDialog.vue";

const { t } = useI18n();
const showContractDialog = ref(false);
</script>

<template>
	<MSectionBlock id="preise" :title="t('sections.preise.title')">
		<ARichText :html="t('sections.preise.body')" />
		<ARichText :html="t('sections.preise.allesOderNichts')" />
		<p>
			<button type="button" class="btn btn-primary" @click="showContractDialog = true">
				{{ t('contract.openButton') }}
			</button>
		</p>
		<ARichText :html="t('sections.preise.termin')" />
	</MSectionBlock>

	<VueContractDialog v-if="showContractDialog" @close="showContractDialog = false" />
</template>
