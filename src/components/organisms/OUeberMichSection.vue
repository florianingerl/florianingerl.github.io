<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ASectionImage from "@/components/atoms/ASectionImage.vue";
import ARichText from "@/components/atoms/ARichText.vue";

const { t } = useI18n();
</script>

<template>
	<section id="uebermich" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="t('sections.uebermich.title')" />

			<div class="row">
				<div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage src="assets/img/pictureofmeoct2024.jpg" :alt="t('sections.uebermich.imageAlt')" />
				</div>
				<div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
					<ARichText :html="t('sections.uebermich.list')" />
				</div>
			</div>

			<div class="row" style="margin-top: 10px;">
				<div class="col-lg-2 order-1 order-lg-1" data-aos="fade-right" data-aos-delay="100">
					<ASectionImage src="assets/img/yoga/kopfstand2.jpg" :alt="t('sections.uebermich.imageAlt2')" />
				</div>
				<div class="col-lg-10 pt-4 pt-lg-0 order-2 order-lg-2 content">
					<ARichText :html="t('sections.uebermich.body2')" />
				</div>
			</div>
		</div>
	</section>
</template>
