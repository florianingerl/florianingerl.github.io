<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('physics', locale.value));
</script>

<template>
	<MSectionTextImage
		id="physikuni"
		:title="t('sections.physikuni.title')"
		:body-html="t('sections.physikuni.body')"
	>
		<!-- Das Quiz ersetzt das Bild der Sektion. -->
		<template #image>
			<VueQuiz quiz="physics" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
