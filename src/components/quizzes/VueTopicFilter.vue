<!-- Themen-Auswahl als Baum. Ist kein Thema gewaehlt, steht dort ein Knopf
     "Choose a topic..."; ist eines gewaehlt, der Pfad "Wurzel->...->Thema" und
     ein Klick darauf klappt den Baum auf. Der Baum liegt dabei ueber den
     uebrigen Elementen (wie ein Menue), statt sie wegzuschieben. Wird an
     filter.topicId gebunden. -->
<template>
  <div ref="wurzel" class="topic-filter position-relative">
    <div class="d-flex align-items-center">
      <button
        type="button"
        class="btn btn-link p-0 text-decoration-none text-start flex-grow-1"
        @click="treeOffen = !treeOffen"
      >
        {{ modelValue ? selectedLabel : "Choose a topic..." }}
      </button>
      <button
        v-if="modelValue"
        type="button"
        class="btn-close ms-2"
        aria-label="Clear topic filter"
        @click="clearTopic"
      ></button>
    </div>

    <div
      v-show="treeOffen"
      class="topic-tree-overlay border rounded bg-white shadow p-2"
    >
      <Tree
        v-model:selectionKeys="selectionKeys"
        v-model:expandedKeys="expandedKeys"
        :value="treeNodes"
        selectionMode="single"
        @nodeSelect="onNodeSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import Tree from "primevue/tree";
import type { Topic } from "@/types/quiz";
import {
  buildTopicTree,
  findTopicPath,
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
const wurzel = ref<HTMLElement | null>(null);
const selectionKeys = ref<Record<string, boolean>>({});
const expandedKeys = ref<Record<string, boolean>>({});

const treeNodes = computed(() => buildTopicTree(props.topics));

// "Wurzel->...->Thema", z.B. "Elektrotechnik->Dioden->Zehnerdiode".
const selectedLabel = computed(() => {
  if (!props.modelValue) return "";
  return topicPathString(props.topics, props.modelValue);
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

// Klick ausserhalb der Komponente schliesst das aufgeklappte Menue.
function onClickAusserhalb(event: MouseEvent): void {
  if (wurzel.value && !wurzel.value.contains(event.target as Node)) {
    treeOffen.value = false;
  }
}

watch(treeOffen, (offen) => {
  if (offen) {
    document.addEventListener("mousedown", onClickAusserhalb);
  } else {
    document.removeEventListener("mousedown", onClickAusserhalb);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickAusserhalb);
});

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

<style scoped>
.topic-tree-overlay {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 16rem;
  max-height: 20rem;
  overflow-y: auto;
}
</style>
