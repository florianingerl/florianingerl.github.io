<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import OQuiz from "@/components/quizzes/OQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('webprogramming', locale.value));
</script>

<template>
	<MSectionTextImage
		id="websitenundflyer"
		:title="t('sections.websitenundflyer.title')"
		:body-html="t('sections.websitenundflyer.body')"
	>
		<template #image>
			<OQuiz quiz="webprogramming" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
