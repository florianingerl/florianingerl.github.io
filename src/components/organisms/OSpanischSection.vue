<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLang } from "@/i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";
import VuePaypal from "@/components/quizzes/vue-paypal.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLang(locale.value));
</script>

<template>
	<MSectionTextImage
		id="spanisch"
		:title="t('sections.spanisch.title')"
		:body-html="t('sections.spanisch.body')"
		content-class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<VueQuiz quiz="espagnol" :lg="lg" />
		</template>
		<VuePaypal sprache="espagnol" />
	</MSectionTextImage>
</template>
