<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
	<footer id="footer">
		<div class="footer-top">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-md-6 footer-contact">
						<strong>{{ t("footer.email") }}:</strong>
						<a href="mailto:imelflorianingerl@gmail.com">imelflorianingerl@gmail.com</a><br />
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
