<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('mathematics', locale.value));
</script>

<template>
	<MSectionTextImage
		id="matheuni"
		:title="t('sections.matheuni.title')"
		:body-html="t('sections.matheuni.body')"
	>
		<template #image>
			<VueQuiz quiz="mathematics" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
