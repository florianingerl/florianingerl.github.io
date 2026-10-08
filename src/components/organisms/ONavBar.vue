<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import OLanguageBar from "@/components/organisms/OLanguageBar.vue";

const { t } = useI18n();

const mobileOpen = ref(false);

type NavLink = { key: string; href: string };
type NavGroup = { key: string; href: string; items: NavLink[] };

const groups: NavGroup[] = [
	{
		key: "uni",
		href: "#matheuni",
		items: [
			{ key: "uniMath", href: "#matheuni" },
			{ key: "uniInformatics", href: "#infouni" },
			{ key: "uniPhysics", href: "#physikuni" },
			{ key: "uniEngineering", href: "#ingenieurwesen" },
			{ key: "uniChemistry", href: "#chemie" },
		],
	},
	{
		key: "school",
		href: "#matheschule",
		items: [
			{ key: "schoolMath", href: "#matheschule" },
			{ key: "schoolPhysics", href: "#physikschule" },
			{ key: "schoolInformatics", href: "#infoschule" },
			{ key: "schoolChemistry", href: "#chemieschule" },
			{ key: "schoolFrench", href: "#franzoesisch" },
			{ key: "schoolEnglish", href: "#englisch" },
			{ key: "schoolSpanish", href: "#spanisch" },
			{ key: "schoolItalian", href: "#italienisch" },
			{ key: "schoolGerman", href: "#deutsch" },
		],
	},
	{
		key: "life",
		href: "#ernaehrung",
		items: [
			{ key: "lifeSprouts", href: "#ernaehrung" },
			{ key: "lifeReiki", href: "#reiki" },
			{ key: "lifeLearnTeach", href: "#lernenundlehren" },
			{ key: "lifeConsciousness", href: "#bewusstsein" },
			{ key: "lifeChess", href: "#schach" },
			{ key: "lifeWebsites", href: "#websitenundflyer" },
		],
	},
	{
		key: "prices",
		href: "#preise",
		items: [
			{ key: "pricesPayment", href: "#preise" },
			{ key: "pricesLesson", href: "#unterrichtsmethode" },
			{ key: "pricesTutorial", href: "#tutorium" },
			{ key: "pricesOnline", href: "#online" },
			{ key: "pricesPresential", href: "#praesenz" },
			{ key: "pricesFeedbacks", href: "#feedbacks" },
			{ key: "pricesLinks", href: "#links" },
			{ key: "pricesImpressum", href: "#impressum" },
		],
	},
	{
		key: "about",
		href: "#uebermich",
		items: [
			{ key: "aboutMe", href: "#uebermich" },
			{ key: "aboutWhy", href: "#warumnachhilfebeiflorian" },
			{ key: "aboutFeedbacks", href: "#feedbacks" },
			{ key: "aboutLinks", href: "#links" },
		],
	},
];

function toggleMobile(): void {
	mobileOpen.value = !mobileOpen.value;
}

function onGroupClick(event: MouseEvent): void {
	if (!mobileOpen.value) return;
	event.preventDefault();
	const submenu = (event.currentTarget as HTMLElement).nextElementSibling;
	submenu?.classList.toggle("dropdown-active");
}
</script>

<template>
	<div class="site-top fixed-top">
		<OLanguageBar />

		<header id="header">
			<div class="container d-flex align-items-center">
				<h1 class="logo me-auto">
					<a href="index.html">{{ t("nav.logo") }}</a>
				</h1>

				<nav
					id="navbar"
					class="navbar order-last order-lg-0"
					:class="{ 'navbar-mobile': mobileOpen }"
				>
					<ul>
						<li v-for="group in groups" :key="group.key" class="dropdown">
							<a :href="group.href" @click="onGroupClick">
								<span>{{ t("nav." + group.key) }}</span>
								<i class="bi bi-chevron-down"></i>
							</a>
							<ul>
								<li v-for="item in group.items" :key="item.key">
									<a :href="item.href">{{ t("nav.items." + item.key) }}</a>
								</li>
							</ul>
						</li>
					</ul>
					<i
						class="bi mobile-nav-toggle"
						:class="mobileOpen ? 'bi-x' : 'bi-list'"
						@click="toggleMobile"
					></i>
				</nav>

				<a href="#contact" class="get-started-btn">{{ t("nav.contact") }}</a>
			</div>
		</header>
	</div>
</template>

<style scoped>
.site-top {
	z-index: 997;
}
</style>
