<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLanguage } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import OQuiz from "@/components/quizzes/OQuiz.vue";
import VuePaypal from "@/components/quizzes/vue-paypal.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLanguage('english', locale.value));
</script>

<template>
	<MSectionTextImage
		id="englisch"
		:title="t('sections.englisch.title')"
		:body-html="t('sections.englisch.body')"
		content-class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<OQuiz quiz="english" :lg="lg" />
		</template>
		<VuePaypal sprache="english" />
	</MSectionTextImage>
</template>
