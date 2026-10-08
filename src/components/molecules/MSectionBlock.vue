<script setup lang="ts">
import ASectionTitle from "@/components/atoms/ASectionTitle.vue";
import ARichText from "@/components/atoms/ARichText.vue";

defineProps<{
	id: string;
	title?: string;
	subtitle?: string;
	bodyHtml?: string;
	contentClass?: string;
}>();
</script>

<template>
	<section :id="id" class="about">
		<div class="container" data-aos="fade-up">
			<ASectionTitle :title="title">
				<p v-if="subtitle" style="font-size: 15px;">{{ subtitle }}</p>
			</ASectionTitle>

			<div class="row">
				<div :class="contentClass ?? 'col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content'">
					<ARichText v-if="bodyHtml" :html="bodyHtml" />
					<slot />
				</div>
			</div>
		</div>
	</section>
</template>
