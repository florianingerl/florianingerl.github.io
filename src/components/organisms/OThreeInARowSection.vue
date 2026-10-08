<script setup lang="ts">
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";
import VueThreeInARow from "@/components/three-in-a-row/VueThreeInARow.vue";

const { t } = useI18n();
</script>

<template>
	<MSectionTextImage
		id="threeinarow"
		:title="t('sections.threeinarow.title')"
		:body-html="t('sections.threeinarow.body')"
		image-class="col-lg-8 order-2 order-lg-2"
		content-class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<VueThreeInARow />
		</template>
	</MSectionTextImage>
</template>
