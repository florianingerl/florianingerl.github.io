<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import MSectionTextImage from "@/components/molecules/MSectionTextImage.vue";

const { t } = useI18n();

function loadStyle(href: string): void {
	if (document.querySelector(`link[href="${href}"]`)) return;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = href;
	document.head.appendChild(link);
}

function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Kann ${src} nicht laden`));
		document.head.appendChild(script);
	});
}

onMounted(async () => {
	loadStyle("chessboardjs-1.0.0/css/chessboard-1.0.0.css");
	try {
		await loadScript("chessboardjs-1.0.0/jquery-3.6.3/jquery-3.6.3.js");
		await loadScript("chessboardjs-1.0.0/js/chessboard-1.0.0.js");
		await loadScript("chessboardjs-1.0.0/js/devinetteechec.js");
	} catch (error) {
		console.error(error);
	}
});
</script>

<template>
	<MSectionTextImage
		id="schach"
		:title="t('sections.schach.title')"
		:body-html="t('sections.schach.body')"
		image-class="col-lg-8 order-2 order-lg-2"
		content-class="col-lg-4 pt-4 pt-lg-0 order-1 order-lg-1 content"
	>
		<template #image>
			<div id="devinetteEchec"></div>
		</template>
	</MSectionTextImage>
</template>
