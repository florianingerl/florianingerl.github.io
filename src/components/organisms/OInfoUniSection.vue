<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { quizLang } from "@/i18n";
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ASectionImage from "@/components/atoms/ASectionImage.vue";
import ARichText from "@/components/atoms/ARichText.vue";
import VueQuiz from "@/components/quizzes/VueQuiz.vue";

const { t, locale } = useI18n();
const lg = computed(() => quizLang(locale.value));
</script>

<template>
	<section id="infouni" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="t('sections.infouni.title')" />

			<div class="row">
				<!-- Das Quiz ersetzt das obere Bild der Sektion. -->
				<div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<VueQuiz quiz="informatics" :lg="lg" />
				</div>
				<div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
					<ARichText :html="t('sections.infouni.body')" />
				</div>
			</div>

			<div class="row">
				<div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage src="assets/img/programming.png" :alt="t('sections.infouni.imageAlt2')" />
				</div>
				<div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
					<ARichText :html="t('sections.infouni.body2')" />
				</div>
			</div>
		</div>
	</section>
</template>
