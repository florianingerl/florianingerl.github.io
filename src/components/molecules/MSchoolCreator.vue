<!-- Anlage einer neuen Schule: Beschriftung "New school", ein Textfeld und ein
     Knopf "Add". Die Schule wird auf dem Server gespeichert (derselbe Name
     legt nicht nochmal an) und per "school-created" gemeldet.
     Wird der umgebende Behälter (OSchoolChooserAndCreator) zu schmal, klappt
     die Anlage per Container-Abfrage zu einem Knopf zusammen; ein Klick darauf
     oeffnet sie als Overlay. Ein Klick ausserhalb, Escape oder das Anlegen
     schliesst das Overlay wieder. -->
<template>
  <div
    ref="wurzel"
    class="school-creator"
    :class="{ 'school-creator--open': offen }"
  >
    <button
      type="button"
      class="school-creator__toggle btn btn-outline-primary"
      aria-controls="newSchoolName"
      :aria-expanded="offen"
      @click="offen = !offen"
    >
      New school
    </button>

    <div class="school-creator__body">
      <label class="form-label mb-0" for="newSchoolName">New school</label>
      <input
        id="newSchoolName"
        v-model="name"
        type="text"
        class="form-control w-auto"
        placeholder="e.g. Hochschule Regensburg"
      />
      <button type="button" class="btn btn-primary" @click="addSchool">
        Add
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { createSchool, fehlerText } from "@/api";
import type { School } from "@/types/quiz";

const emit = defineEmits<{
  (e: "school-created", school: School): void;
}>();

// Der Name der neuen Schule, wie er im Textfeld steht.
const name = ref("");
// Ob das Overlay im schmalen Zustand aufgeklappt ist.
const offen = ref(false);
const wurzel = ref<HTMLElement | null>(null);

async function addSchool(): Promise<void> {
  const nameTrimmed = name.value.trim();
  if (!nameTrimmed) {
    alert("Please enter a name for the new school.");
    return;
  }
  try {
    const school = await createSchool(nameTrimmed);
    name.value = "";
    offen.value = false;
    emit("school-created", school);
  } catch (e) {
    alert(`The school could not be saved: ${fehlerText(e, "unknown error")}`);
  }
}

// Klick ausserhalb der Komponente schliesst das Overlay.
function onClickAusserhalb(event: MouseEvent): void {
  if (wurzel.value && !wurzel.value.contains(event.target as Node)) {
    offen.value = false;
  }
}

// Escape schliesst das Overlay.
function onEscape(event: KeyboardEvent): void {
  if (event.key === "Escape") offen.value = false;
}

watch(offen, (istOffen) => {
  if (istOffen) {
    document.addEventListener("mousedown", onClickAusserhalb);
    document.addEventListener("keydown", onEscape);
  } else {
    document.removeEventListener("mousedown", onClickAusserhalb);
    document.removeEventListener("keydown", onEscape);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickAusserhalb);
  document.removeEventListener("keydown", onEscape);
});
</script>

<style scoped>
.school-creator {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 1;
  align-items: center;
}

/* Im breiten Zustand ist nur das Formular sichtbar. */
.school-creator__toggle {
  display: none;
}

.school-creator__body {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2px;
  align-items: center;
}

/* Ist der umgebende Behälter zu schmal, wird das Formular zum Knopf und klappt
   bei Klick als Overlay ueber den uebrigen Elementen auf. */
@container (max-width: 560px) {
  .school-creator__toggle {
    display: inline-flex;
  }

  .school-creator:not(.school-creator--open) .school-creator__body {
    display: none;
  }

  .school-creator--open .school-creator__body {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    padding: 0.375rem 0.5rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
}
</style>
