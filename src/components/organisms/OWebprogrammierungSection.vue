<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLang } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLang(locale.value));
</script>

<template>
	<MSectionTextImage
		id="websitenundflyer"
		:title="t('sections.websitenundflyer.title')"
		:body-html="t('sections.websitenundflyer.body')"
	>
		<template #image>
			<VueQuiz quiz="webprogramming" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
