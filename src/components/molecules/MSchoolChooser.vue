<!-- Auswahlliste der Schulen: Beschriftung "School:" und ein Dropdown, aus dem
     eine Schule gewaehlt wird. Der ausgewaehlte Wert ist die _id der Schule;
     "" bedeutet "keine Schule". Bei jeder Auswahl wird "school-selected" mit
     dem Schuldokument (oder null) gemeldet, "update:modelValue" mit der _id. -->
<template>
  <div class="school-chooser">
    <label class="form-label mb-0" :for="selectId">School:</label>
    <select
      :id="selectId"
      class="form-select w-auto"
      v-model="gewaehlteSchule"
      @change="onChange"
    >
      <option value="">{{ emptyLabel }}</option>
      <option v-for="s in schools" :key="s._id" :value="s._id">
        {{ s.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { School } from "@/types/quiz";

const props = defineProps<{
  // Die Schulen, die im Dropdown angeboten werden.
  schools: School[];
  // _id der ausgewaehlten Schule oder "" fuer "keine Schule".
  modelValue?: string;
  // Text der leeren Option, z.B. "No school" oder "All schools".
  emptyLabel?: string;
  // id des select-Elements (fuer Label und Tests).
  selectId?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "school-selected", school: School | null): void;
}>();

// v-model auf dem select sorgt dafuer, dass die Auswahl auch dann gesetzt
// wird, wenn die Optionen erst nach dem ersten Rendern eintreffen.
const gewaehlteSchule = computed<string>({
  get: () => props.modelValue ?? "",
  set: (value) => emit("update:modelValue", value),
});

function onChange(event: Event): void {
  const id = (event.target as HTMLSelectElement).value;
  const school = props.schools.find((s) => s._id === id) ?? null;
  emit("school-selected", school);
}
</script>

<style scoped>
.school-chooser {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 2px;
  align-items: center;
}
</style>
