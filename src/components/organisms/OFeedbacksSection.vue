<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ASectionImage from "@/components/atoms/ASectionImage.vue";
import ARichText from "@/components/atoms/ARichText.vue";

const { t, tm } = useI18n();

const imageAlts = computed(() => tm("sections.feedbacks.images") as string[]);

const imageSources = [
	"assets/img/feedbacks/dominika.jpg",
	"assets/img/feedbacks/jeanetteviola.jpg",
	"assets/img/feedbacks/studenten.jpg",
	"assets/img/feedbacks/francais.jpg",
	"assets/img/feedbacks/eyana.jpg",
];
</script>

<template>
	<section id="feedbacks" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="t('sections.feedbacks.title')" />

			<div class="row">
				<div class="col-lg-4 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage
						src="assets/img/feedbacks/markushewel.jpg"
						:alt="t('sections.feedbacks.imageAlt')"
						style="height: 200px;"
					/>
				</div>
				<div class="col-lg-8 pt-4 pt-lg-0 order-2 order-lg-1 content">
					<ARichText :html="t('sections.feedbacks.markus')" />
				</div>
			</div>

			<div v-for="(src, index) in imageSources" :key="src" class="row">
				<div class="col-lg-12 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage :src="src" :alt="imageAlts[index] ?? ''" />
				</div>
			</div>
		</div>
	</section>
</template>
