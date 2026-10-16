<!-- School filter component -->
<template>
  <div class="vue-school-filter">
    <label class="form-label mb-0" :for="schoolFilterId">School:</label>
    <select :id="schoolFilterId" v-model="selectedSchool" class="form-select w-auto" @change="onSchoolChange">
      <option value="">All schools</option>
      <option v-for="s in schools" :key="s._id" :value="s.name">{{ s.name }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { School } from "@/types/quiz";
const props = defineProps<{ schools: School[]; quiz?: string; modelValue?: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void; (e: "school-selected", value: string): void }>();
const schoolFilterId = ref(`schoolFilter-${props.quiz ?? Date.now().toString()}`);
const selectedSchool = ref(props.modelValue ?? "");
watch(() => props.modelValue, (v) => {
  if (v !== undefined) selectedSchool.value = v;
});
function onSchoolChange() {
  emit("update:modelValue", selectedSchool.value);
  emit("school-selected", selectedSchool.value);
}
</script>
<style scoped>
.vue-school-filter {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 3px;
  align-items: center;
}
</style>
