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
		id="physikuni"
		:title="t('sections.physikuni.title')"
		image-src="assets/img/physikuni.png"
		:image-alt="t('sections.physikuni.imageAlt')"
		:body-html="t('sections.physikuni.body')"
	>
		<template #after>
			<div class="row">
				<div class="col-12">
					<VueQuiz quiz="physics" :lg="lg" />
				</div>
			</div>
		</template>
	</MSectionTextImage>
</template>
