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
		id="franzoesisch"
		:title="t('sections.franzoesisch.title')"
		:body-html="t('sections.franzoesisch.body')"
		content-class="col-lg-6 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<VueQuiz quiz="french" :lg="lg" />
		</template>
		<VuePaypal sprache="french" />
	</MSectionTextImage>
</template>
