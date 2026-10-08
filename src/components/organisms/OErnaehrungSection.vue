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
		id="ernaehrung"
		:title="t('sections.ernaehrung.title')"
		:body-html="t('sections.ernaehrung.body')"
		image-class="col-lg-8 order-2 order-lg-2"
		content-class="col-lg-3 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<VueQuiz quiz="nutrition" :lg="lg" />
			<div>
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/NaIzFGJDX5M?si=lsSFKXtUcneJY_EA"
					:title="t('sections.ernaehrung.videoTitle')"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		</template>
	</MSectionTextImage>
</template>
