<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ARichText from "@/components/atoms/ARichText.vue";

const { t } = useI18n();

const mapSrc =
	"https://www.google.com/maps?q=Rainerstra%C3%9Fe%206a%2C%2082178%20Puchheim%2C%20Deutschland&output=embed";
</script>

<template>
	<section id="contact" class="contact">
		<div data-aos="fade-up">
			<iframe
				:src="mapSrc"
				:title="t('contact.mapTitle')"
				style="border: 0; width: 100%; height: 200px;"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>

		<div id="schreibmirnachricht" class="container" data-aos="fade-up">
			<div class="row mt-5">
				<div class="col-lg-4">
					<div class="info">
						<div class="address">
							<i class="bi bi-geo-alt"></i>
							<h4>{{ t("contact.addressTitle") }}</h4>
							<p>{{ t("contact.addressLine1") }}</p>
							<p>{{ t("contact.addressLine2") }}</p>
						</div>

						<div class="email">
							<i class="bi bi-envelope"></i>
							<h4>{{ t("contact.emailTitle") }}</h4>
							<p>
								<a href="mailto:imelflorianingerl@gmail.com">imelflorianingerl@gmail.com</a>
							</p>
						</div>
					</div>
				</div>

				<div class="col-lg-8 mt-5 mt-lg-0">
					<ARichText :html="t('contact.intro')" />

					<form
						name="myForm"
						action="https://api.web3forms.com/submit"
						method="post"
						role="form"
						class="php-email-form"
					>
						<input type="hidden" name="access_key" value="aaa027db-e72d-41d2-9b3b-7603e4908475" />

						<div class="row">
							<div class="col-md-6 form-group">
								<input
									type="text"
									name="name"
									class="form-control"
									id="name"
									:placeholder="t('contact.form.name')"
									required
								/>
							</div>
							<div class="col-md-6 form-group mt-3 mt-md-0">
								<input
									type="email"
									class="form-control"
									name="email"
									id="email"
									:placeholder="t('contact.form.email')"
									required
								/>
							</div>
						</div>

						<div class="form-group mt-3">
							<input
								type="text"
								class="form-control"
								name="subject"
								id="subject"
								:placeholder="t('contact.form.subject')"
								required
							/>
						</div>

						<div class="form-group mt-3">
							<textarea
								class="form-control"
								name="message"
								rows="5"
								:placeholder="t('contact.form.message')"
								required
							></textarea>
						</div>

						<input
							type="hidden"
							name="redirect"
							value="https://florianingerl.github.io/formsubmissionconfirmation.html"
						/>

						<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

						<div class="text-center">
							<button type="submit">{{ t("contact.form.submit") }}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>
