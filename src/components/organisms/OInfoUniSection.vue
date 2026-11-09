<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import OQuiz from "@/components/quizzes/OQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('informatics', locale.value));
</script>

<template>
	<MSectionTextImage
		id="infouni"
		:title="t('sections.infouni.title')"
		:body-html="t('sections.infouni.body')"
	>
		<template #image>
			<OQuiz quiz="informatics" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
