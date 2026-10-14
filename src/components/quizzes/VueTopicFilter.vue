<!-- Themen-Auswahl als Baum. Ist kein Thema gewaehlt, wird der Baum gezeigt;
     ist eines gewaehlt, steht dort nur "Schule - Pfad->zum->Thema" und ein
     Klick darauf klappt wieder den Baum auf. Wird an filter.topicId gebunden. -->
<template>
  <div>
    <div v-if="modelValue && !treeOffen" class="d-flex align-items-center">
      <button
        type="button"
        class="btn btn-link p-0 text-decoration-none text-start flex-grow-1"
        @click="treeOffen = true"
      >
        {{ selectedLabel }}
      </button>
      <button
        type="button"
        class="btn-close ms-2"
        aria-label="Clear topic filter"
        @click="clearTopic"
      ></button>
    </div>

    <Tree
      v-else
      v-model:selectionKeys="selectionKeys"
      v-model:expandedKeys="expandedKeys"
      :value="treeNodes"
      selectionMode="single"
      @nodeSelect="onNodeSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Tree from "primevue/tree";
import type { Topic } from "@/types/quiz";
import {
  buildTopicTree,
  findTopicPath,
  oldestAncestorSchool,
  topicPathString,
} from "@/utils/topicTree";

const props = defineProps<{
  // _id des gewaehlten Themas oder "".
  modelValue: string;
  topics: Topic[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const treeOffen = ref(false);
const selectionKeys = ref<Record<string, boolean>>({});
const expandedKeys = ref<Record<string, boolean>>({});

const treeNodes = computed(() => buildTopicTree(props.topics));

// "Schule - Wurzel->...->Thema", z.B. "Uni Aachen - Elektrotechnik->Dioden->Zehnerdiode".
const selectedLabel = computed(() => {
  if (!props.modelValue) return "";
  const schule = oldestAncestorSchool(props.topics, props.modelValue);
  const pfad = topicPathString(props.topics, props.modelValue);
  return schule ? `${schule} - ${pfad}` : pfad;
});

function onNodeSelect(node: { key?: string }): void {
  if (node.key) {
    emit("update:modelValue", node.key);
    treeOffen.value = false;
  }
}

function clearTopic(): void {
  emit("update:modelValue", "");
  selectionKeys.value = {};
}

// Bei Auswahl von aussen nur den Pfad zum Thema aufklappen, alles andere zu.
watch(
  () => props.modelValue,
  (id) => {
    if (!id) {
      selectionKeys.value = {};
      expandedKeys.value = {};
      return;
    }
    selectionKeys.value = { [id]: true };
    const keys: Record<string, boolean> = {};
    const pfad = findTopicPath(props.topics, id);
    pfad.forEach((t, i) => {
      if (i < pfad.length - 1 && t._id) keys[t._id] = true;
    });
    expandedKeys.value = keys;
  },
  { immediate: true },
);
</script>
