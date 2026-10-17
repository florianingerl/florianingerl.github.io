<!-- Anlage einer neuen Schule: Beschriftung "New school", ein Textfeld und ein
     Knopf "Add". Die Schule wird auf dem Server gespeichert (derselbe Name
     legt nicht nochmal an) und per "school-created" gemeldet. -->
<template>
  <div class="school-creator">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createSchool, fehlerText } from "@/api";
import type { School } from "@/types/quiz";

const emit = defineEmits<{
  (e: "school-created", school: School): void;
}>();

// Der Name der neuen Schule, wie er im Textfeld steht.
const name = ref("");

async function addSchool(): Promise<void> {
  const nameTrimmed = name.value.trim();
  if (!nameTrimmed) {
    alert("Please enter a name for the new school.");
    return;
  }
  try {
    const school = await createSchool(nameTrimmed);
    name.value = "";
    emit("school-created", school);
  } catch (e) {
    alert(`The school could not be saved: ${fehlerText(e, "unknown error")}`);
  }
}
</script>

<style scoped>
.school-creator {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-shrink: 1;
  overflow: auto;
  align-items: center;
}
</style>
