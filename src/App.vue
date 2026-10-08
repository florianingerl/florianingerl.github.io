<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import AOS from "aos";
import ONavBar from "@/components/organisms/ONavBar.vue";
import OFooter from "@/components/organisms/OFooter.vue";

const behindHeader = ref<HTMLElement | null>(null);
const backToTopActive = ref(false);

function updateOffset(): void {
	const height = document.querySelector<HTMLElement>(".site-top")?.offsetHeight ?? 0;
	if (behindHeader.value) {
		behindHeader.value.style.height = `${height}px`;
	}
	document.documentElement.style.scrollPaddingTop = `${height}px`;
}

function toggleBackToTop(): void {
	backToTopActive.value = window.scrollY > 100;
}

function backToTop(): void {
	window.scrollTo({ top: 0 });
}

onMounted(() => {
	updateOffset();
	toggleBackToTop();
	window.addEventListener("resize", updateOffset);
	window.addEventListener("scroll", toggleBackToTop);
	AOS.init({ duration: 1000, easing: "ease-in-out", once: true, mirror: false });
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", updateOffset);
	window.removeEventListener("scroll", toggleBackToTop);
});
</script>

<template>
	<div id="behindheader" ref="behindHeader" style="visibility: hidden;"></div>

	<ONavBar />

	<RouterView />

	<OFooter />

	<a
		href="#"
		class="back-to-top d-flex align-items-center justify-content-center"
		:class="{ active: backToTopActive }"
		aria-label="Back to top"
		@click.prevent="backToTop"
	>
		<i class="bi bi-arrow-up-short"></i>
	</a>
</template>
