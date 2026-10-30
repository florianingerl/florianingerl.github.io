<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
	<section id="hero" class="hero" aria-labelledby="hero-title">
		<img
			class="head-image"
			src="/assets/img/justmyhead.png"
			:alt="t('hero.headAlt')"
		>

		<div class="hero-content">
			<h1 id="hero-title">Frag Florian</h1>
			<p>{{ t("hero.subtitle") }}</p>
		</div>

		<svg
			class="snake-text"
			viewBox="0 0 1000 700"
			preserveAspectRatio="none"
			role="img"
			:aria-label="t('hero.specialties')"
		>
			<defs>
				<path
					id="snake-path"
					d="
						M 40,70
						C 180,10 220,180 360,130
						S 500,80 600,220
						S 750,300 800,390
						S 900,500 960,640
					"
				/>
			</defs>

			<text>
				<textPath href="#snake-path">
					{{ t("hero.specialties") }}
				</textPath>
			</text>
		</svg>
	</section>
</template>

<style scoped>
.hero {
	position: relative;
	display: grid;
	place-items: center;
	min-height: 100vh;
	padding: 2rem;
	overflow: hidden;
	color: white;
	text-align: center;
	font-family: Arial, sans-serif;

	background-image:
		linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
		url("/assets/img/hungrybirdexercise.png");
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}

.head-image {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 50%;
	width: min(35vw, 280px);
	height: auto;
	transform: translateX(-50%);
	animation: head-falls 1.2s cubic-bezier(0.2, 0.8, 0.3, 1) both;
}

.hero-content {
	position: relative;
	z-index: 2;
	max-width: 800px;
}

.hero h1 {
	margin: 0 0 1rem;
	color: var(--brand-green);
	font-family: Arial, sans-serif;
	font-size: clamp(2.5rem, 8vw, 6rem);
	opacity: 0;
	animation: text-appears 0.7s ease-out 1s forwards;
}

.hero p {
	margin: 0;
	font-size: clamp(1rem, 2.5vw, 1.4rem);
	opacity: 0;
	animation: text-appears 0.7s ease-out 1.3s forwards;
}

.snake-text {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	overflow: visible;
	pointer-events: none;
}

.snake-text text {
	fill: white;
	font-family: Arial, sans-serif;
	font-size: 30px;
	font-weight: 700;
	opacity: 0;
	filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.8));
	animation: snake-appears 1.5s ease-out 1s forwards;
}

@keyframes head-falls {
	from {
		transform: translate(-50%, -120%);
	}

	to {
		transform: translate(-50%, 25vh);
	}
}

@keyframes text-appears {
	from {
		opacity: 0;
		transform: translateY(12px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes snake-appears {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

@media (prefers-reduced-motion: reduce) {
	.head-image,
	.hero h1,
	.hero p,
	.snake-text text {
		animation: none;
		opacity: 1;
	}

	.head-image {
		transform: translate(-50%, 25vh);
	}
}
</style>
