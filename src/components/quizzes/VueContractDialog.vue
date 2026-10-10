<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
	buildContract,
	computePrice,
	contractFilename,
	contractToHtml,
	contractToRtf,
	createContractPdf,
	downloadBlob,
	type ContractFields,
} from "@/utils/contract";
import { localeNames, supportedLocales, type AppLocale } from "@/i18n";

const { t } = useI18n();
const emit = defineEmits<{ (e: "close"): void }>();

const form = reactive({
	date: "",
	institution: "",
	name: "",
	goal: "",
	subject: "",
	contractLang: "de" as AppLocale,
});

const generated = ref(false);
const error = ref("");

const price = computed(() => computePrice(form.subject, form.date));
const canCompute = computed(() => form.date !== "" && form.subject.trim() !== "");

function formatDate(iso: string): string {
	if (!iso) return "";
	const d = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString(form.contractLang);
}

function buildFields(): ContractFields {
	return {
		name: form.name,
		subject: form.subject,
		goal: form.goal,
		institution: form.institution,
		date: formatDate(form.date),
		price: price.value.price,
	};
}

function createFiles(): void {
	error.value = "";
	generated.value = false;
	if (
		!form.date ||
		form.subject.trim() === "" ||
		form.goal.trim() === "" ||
		form.institution.trim() === ""
	) {
		error.value = t("contract.requiredError");
		return;
	}
	generated.value = true;
}

function download(format: "pdf" | "doc" | "rtf"): void {
	const lang = form.contractLang;
	const blocks = buildContract(lang, buildFields());
	const name = contractFilename(lang, form.date, format);
	if (format === "pdf") {
		downloadBlob(createContractPdf(blocks, blocks[0].text), name);
	} else if (format === "doc") {
		const html = contractToHtml(blocks);
		downloadBlob(new Blob(["\ufeff", html], { type: "application/msword" }), name);
	} else {
		downloadBlob(new Blob([contractToRtf(blocks)], { type: "application/rtf" }), name);
	}
}
</script>

<template>
	<Teleport to="body">
		<div class="contract-backdrop" @click.self="emit('close')">
			<div class="contract-dialog" role="dialog" aria-modal="true">
				<div class="contract-header">
					<h5 class="mb-0">{{ t('contract.dialogTitle') }}</h5>
					<button
						type="button"
						class="btn-close"
						:aria-label="t('contract.closeButton')"
						@click="emit('close')"
					></button>
				</div>

				<div class="contract-body">
					<div class="mb-3">
						<label class="form-label" for="contract-date">{{ t('contract.examDate') }}</label>
						<input id="contract-date" v-model="form.date" type="date" class="form-control" />
					</div>

					<div class="mb-3">
						<label class="form-label" for="contract-institution">{{ t('contract.institution') }}</label>
						<input id="contract-institution" v-model="form.institution" type="text" class="form-control" />
						<div class="form-text">{{ t('contract.institutionHint') }}</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="contract-name">{{ t('contract.studentName') }}</label>
						<textarea id="contract-name" v-model="form.name" class="form-control" rows="2"></textarea>
						<div class="form-text">{{ t('contract.studentNameHint') }}</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="contract-goal">{{ t('contract.goal') }}</label>
						<input id="contract-goal" v-model="form.goal" type="text" class="form-control" />
						<div class="form-text">{{ t('contract.goalHint') }}</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="contract-subject">{{ t('contract.subject') }}</label>
						<input id="contract-subject" v-model="form.subject" type="text" class="form-control" />
						<div class="form-text">{{ t('contract.subjectHint') }}</div>
					</div>

					<div class="mb-3">
						<label class="form-label" for="contract-lang">{{ t('contract.contractLanguage') }}</label>
						<select id="contract-lang" v-model="form.contractLang" class="form-select">
							<option v-for="loc in supportedLocales" :key="loc" :value="loc">
								{{ localeNames[loc] }}
							</option>
						</select>
					</div>

					<div class="alert alert-info mb-2">
						<template v-if="canCompute">
							<div>
								<strong>{{ t('contract.weeksLabel') }}:</strong> {{ price.weeks }}
								<span v-if="price.isLanguage" class="text-muted">({{ t('contract.subject') }}: {{ form.subject }})</span>
							</div>
							<div class="fs-5">
								<strong>{{ t('contract.priceLabel') }}:</strong> {{ price.price }} €
							</div>
						</template>
						<div v-else>{{ t('contract.pricePending') }}</div>
					</div>
					<div class="form-text mb-3">{{ t('contract.priceFormula') }}</div>

					<div v-if="error" class="alert alert-danger">{{ error }}</div>

					<div v-if="generated">
						<p class="mb-2">{{ t('contract.filesReady') }}</p>
						<div class="d-flex flex-wrap gap-2">
							<button type="button" class="btn btn-outline-primary" @click="download('pdf')">
								{{ t('contract.downloadPdf') }}
							</button>
							<button type="button" class="btn btn-outline-primary" @click="download('doc')">
								{{ t('contract.downloadWord') }}
							</button>
							<button type="button" class="btn btn-outline-primary" @click="download('rtf')">
								{{ t('contract.downloadRtf') }}
							</button>
						</div>
					</div>
				</div>

				<div class="contract-footer">
					<button type="button" class="btn btn-primary" @click="createFiles">
						{{ t('contract.createButton') }}
					</button>
					<button type="button" class="btn btn-secondary" @click="emit('close')">
						{{ t('contract.closeButton') }}
					</button>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
.contract-backdrop {
	position: fixed;
	inset: 0;
	z-index: 1080;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: flex-start;
	justify-content: center;
	overflow-y: auto;
	padding: 2rem 1rem;
}

.contract-dialog {
	background: #fff;
	color: #212529;
	width: 100%;
	max-width: 640px;
	border-radius: 0.5rem;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 4rem);
}

.contract-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.25rem;
	border-bottom: 1px solid #dee2e6;
}

.contract-body {
	padding: 1.25rem;
	overflow-y: auto;
}

.contract-footer {
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	padding: 1rem 1.25rem;
	border-top: 1px solid #dee2e6;
}
</style>
