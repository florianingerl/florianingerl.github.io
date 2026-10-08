<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { supportedLocales, localeNames, localeFlags, setLocale } from "@/i18n";
import type { AppLocale } from "@/i18n";

const { t, locale } = useI18n();

function choose(code: AppLocale): void {
	setLocale(code);
}
</script>

<template>
	<div
		class="language-bar d-flex justify-content-center align-items-center gap-3 py-1"
		role="navigation"
		:aria-label="t('languageBar.label')"
	>
		<a
			v-for="code in supportedLocales"
			:key="code"
			href="#"
			class="language-bar__link d-inline-flex align-items-center"
			:class="{ 'language-bar__link--active': locale === code }"
			:title="localeNames[code]"
			@click.prevent="choose(code)"
		>
			<img :src="localeFlags[code]" :alt="localeNames[code]" style="height: 14px;" />
		</a>
	</div>
</template>

<style scoped>
.language-bar {
	background: #fff;
	border-bottom: 1px solid rgba(55, 66, 59, 0.08);
}

.language-bar__link {
	opacity: 0.55;
	line-height: 0;
}

.language-bar__link:hover,
.language-bar__link--active {
	opacity: 1;
}

.language-bar__link--active {
	outline: 2px solid #5fcf80;
	outline-offset: 2px;
	border-radius: 2px;
}
</style>
