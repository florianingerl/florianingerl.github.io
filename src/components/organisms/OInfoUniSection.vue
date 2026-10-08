<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ASectionImage from "@/components/atoms/ASectionImage.vue";
import ARichText from "@/components/atoms/ARichText.vue";

const { t } = useI18n();
</script>

<template>
	<section id="infouni" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="t('sections.infouni.title')" />

			<div class="row">
				<div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage src="assets/img/infouni2.PNG" :alt="t('sections.infouni.imageAlt')" />
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
