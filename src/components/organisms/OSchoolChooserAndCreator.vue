<!-- Schulauswahl und Anlage einer neuen Schule nebeneinander: links das
     Dropdown (MSchoolChooser), rechts das Textfeld mit "Add" (MSchoolCreator).
     Beim Anlegen wird die Schulliste vom Server neu geholt und die neue Schule
     ausgewaehlt. Die Auswahl wird ueber v-model nach oben gemeldet, die
     Anlage zusaetzlich ueber "school-created". -->
<template>
  <div class="school-chooser-and-creator">
    <MSchoolChooser
      v-model="gewaehlteSchule"
      :schools="schulen"
      empty-label="No school"
      select-id="exerciseSchool"
      @school-selected="schuleGewaehlt"
    />
    <MSchoolCreator @school-created="schuleAngelegt" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import MSchoolChooser from "@/components/molecules/MSchoolChooser.vue";
import MSchoolCreator from "@/components/molecules/MSchoolCreator.vue";
import { getSchools } from "@/api";
import type { School } from "@/types/quiz";

const props = defineProps<{
  // _id der ausgewaehlten Schule oder "" fuer "keine Schule".
  modelValue?: string;
  // Zusaetzliche Schulen, die immer in der Liste stehen (z.B. Schulen des
  // Quizzes oder die Schule der bearbeiteten Aufgabe).
  schools?: School[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "school-selected", school: School | null): void;
  (e: "school-created", school: School): void;
}>();

// Alle Schulen, die im Dropdown stehen.
const schulen = ref<School[]>([...(props.schools ?? [])]);
// _id der ausgewaehlten Schule oder "" fuer "keine Schule".
const gewaehlteSchule = ref<string>(props.modelValue ?? "");

watch(
  () => props.modelValue,
  (v) => {
    gewaehlteSchule.value = v ?? "";
  },
);

watch(gewaehlteSchule, (v) => {
  emit("update:modelValue", v);
});

// Fuegt Schulen hinzu, die noch nicht in der Liste stehen.
function einreihen(neue: School[]): void {
  const vorhanden = new Set(
    schulen.value.map((s) => s._id).filter((id): id is string => !!id),
  );
  for (const s of neue) {
    if (s._id && !vorhanden.has(s._id)) {
      schulen.value.push(s);
      vorhanden.add(s._id);
    }
  }
}

// Holt die Schulliste vom Server (alle Schulen, nicht nur die mit Aufgaben).
async function ladeSchulen(): Promise<void> {
  try {
    const vomServer = await getSchools();
    einreihen(vomServer);
  } catch (e) {
    console.error("The schools couldn't be loaded:", e);
  }
}

function schuleGewaehlt(school: School | null): void {
  emit("school-selected", school);
}

// Nach dem Anlegen: die Schulliste neu holen und die neue Schule auswaehlen.
async function schuleAngelegt(school: School): Promise<void> {
  await ladeSchulen();
  // Auch ohne Server-Antwort (z.B. im Test) muss die neue Schule sichtbar
  // und ausgewaehlt sein.
  einreihen([school]);
  gewaehlteSchule.value = school._id ?? "";
  emit("school-created", school);
}

onMounted(ladeSchulen);
</script>

<style scoped>
.school-chooser-and-creator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2px;
  overflow: auto;
  align-items: center;
}
</style>
