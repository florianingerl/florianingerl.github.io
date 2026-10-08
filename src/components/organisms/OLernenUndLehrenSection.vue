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
		id="lernenundlehren"
		:title="t('sections.lernenundlehren.title')"
		:body-html="t('sections.lernenundlehren.body')"
		image-class="col-lg-8 order-2 order-lg-2"
		content-class="col-lg-3 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<VueQuiz quiz="lernenlehren" :lg="lg" />
		</template>
	</MSectionTextImage>
</template>
