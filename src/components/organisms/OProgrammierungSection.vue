<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import OQuiz from "@/components/quizzes/OQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('programming', locale.value));
</script>

<template>
	<MSectionTextImage
		id="programmierung"
		:title="t('sections.programmierung.title')"
		:body-html="t('sections.programmierung.body')"
	>
		<template #image>
			<OQuiz quiz="programming" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
