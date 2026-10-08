<script setup lang="ts">
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ASectionImage from "@/components/atoms/ASectionImage.vue";
import ARichText from "@/components/atoms/ARichText.vue";

withDefaults(
	defineProps<{
		id: string;
		title?: string;
		subtitle?: string;
		imageSrc?: string;
		imageAlt?: string;
		bodyHtml?: string;
		imageClass?: string;
		contentClass?: string;
	}>(),
	{
		imageClass: "col-lg-6 order-1 order-lg-2",
		contentClass: "col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content",
	}
);
</script>

<template>
	<section :id="id" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="title">
				<p v-if="subtitle" style="font-size: 15px;">{{ subtitle }}</p>
			</ASectionTitle>

			<div class="row">
				<div :class="imageClass" data-aos="fade-left" data-aos-delay="100">
					<ASectionImage v-if="imageSrc" :src="imageSrc" :alt="imageAlt ?? ''" />
					<slot name="image" />
				</div>

				<div :class="contentClass">
					<ARichText v-if="bodyHtml" :html="bodyHtml" />
					<slot />
				</div>
			</div>

			<slot name="after" />
		</div>
	</section>
</template>
