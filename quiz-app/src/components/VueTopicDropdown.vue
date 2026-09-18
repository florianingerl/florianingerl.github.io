<script setup lang="ts">
import { ref } from 'vue';
import { QuizName, Topic} from "../types.ts";

const props = withDefaults(
  defineProps<{
    topics: Topic[];
    modelValue: Topic | null;
    defaultQuiz: QuizName;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: 'Select a topic',
    disabled: false,
  }
);

const emit = defineEmits<{
  (event: 'update:modelValue', topic: Topic | null): void;
  (event: 'topic-added', topic: Topic): void;
}>();

const isOpen = ref(false);
const isAddingTopic = ref(false);
const newTopicTitle = ref('');
const errorMessage = ref('');

function selectTopic(topic: Topic) {
  emit('update:modelValue', topic);
  isOpen.value = false;
}

function clearSelection() {
  emit('update:modelValue', null);
}

function startAddingTopic() {
  isAddingTopic.value = true;
  newTopicTitle.value = '';
  errorMessage.value = '';
}

function cancelAddingTopic() {
  isAddingTopic.value = false;
  newTopicTitle.value = '';
  errorMessage.value = '';
}

function addTopic() {
  const title = newTopicTitle.value.trim();

  if (!title) {
    errorMessage.value = 'Please enter a topic title.';
    return;
  }

  const alreadyExists = props.topics.some(
    topic =>
      topic.title.toLowerCase() === title.toLowerCase()
  );

  if (alreadyExists) {
    errorMessage.value = 'This topic already exists.';
    return;
  }

  const newTopic: Topic = {
    title,
    quiz: props.defaultQuiz,
    tutorial: '',
    _id: null
  };

  emit('topic-added', newTopic);
  emit('update:modelValue', newTopic);

  cancelAddingTopic();
  isOpen.value = false;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false;
    cancelAddingTopic();
  }

  if (event.key === 'Enter' && isAddingTopic.value) {
    addTopic();
  }
}
</script>

<template>
  <div
    class="topic-dropdown"
    :class="{ disabled }"
    @keydown="handleKeydown"
  >
    <button
      type="button"
      class="dropdown-trigger"
      :disabled="disabled"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span
        class="selected-text"
        :class="{ placeholder: !modelValue }"
      >
        {{ modelValue?.title || placeholder }}
      </span>

      <span class="trigger-actions">
        <button
          v-if="modelValue"
          type="button"
          class="clear-button"
          aria-label="Clear selected topic"
          @click.stop="clearSelection"
        >
          ×
        </button>

        <span
          class="chevron"
          :class="{ open: isOpen }"
        >
          ▾
        </span>
      </span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <template v-if="!isAddingTopic">
          <button
            v-for="topic in topics"
            :key="topic._id ?? `topic-${topic.title}`"
            type="button"
            class="topic-option"
            :class="{ selected: modelValue === topic }"
            @click="selectTopic(topic)"
          >
            <span>{{ topic.title }}</span>

            <span
              v-if="modelValue === topic"
              class="checkmark"
            >
              ✓
            </span>
          </button>

          <div
            v-if="topics.length === 0"
            class="empty-state"
          >
            No topics available.
          </div>

          <div class="divider" />

          <button
            type="button"
            class="add-topic-button"
            @click="startAddingTopic"
          >
            <span class="plus-icon">+</span>
            Add new topic
          </button>
        </template>

        <div v-else class="add-topic-form">
          <label
            for="new-topic-title"
            class="form-label"
          >
            Topic title
          </label>

          <input
            id="new-topic-title"
            v-model="newTopicTitle"
            type="text"
            class="topic-input"
            placeholder="Enter a topic title"
            autofocus
          />

          <p
            v-if="errorMessage"
            class="error-message"
          >
            {{ errorMessage }}
          </p>

          <div class="form-actions">
            <button
              type="button"
              class="cancel-button"
              @click="cancelAddingTopic"
            >
              Cancel
            </button>

            <button
              type="button"
              class="save-button"
              @click="addTopic"
            >
              Add topic
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.topic-dropdown {
  position: relative;
  width: 100%;
  max-width: 380px;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid #d7dce5;
  border-radius: 10px;
  background: #fff;
  color: #1f2937;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.dropdown-trigger:hover,
.dropdown-trigger:focus-visible {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.selected-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.placeholder {
  color: #9ca3af;
}

.trigger-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}

.clear-button {
  width: 21px;
  height: 21px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #f0f1f5;
  color: #6b7280;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.clear-button:hover {
  background: #e5e7eb;
  color: #111827;
}

.chevron {
  color: #6366f1;
  font-size: 18px;
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 10;
  top: calc(100% + 7px);
  right: 0;
  left: 0;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.12),
    0 3px 8px rgba(15, 23, 42, 0.06);
}

.topic-option,
.add-topic-button {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 43px;
  padding: 0 15px;
  border: 0;
  background: transparent;
  color: #374151;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.topic-option {
  justify-content: space-between;
}

.topic-option:hover,
.topic-option.selected {
  background: #eef2ff;
  color: #4f46e5;
}

.checkmark {
  color: #6366f1;
  font-weight: 700;
}

.divider {
  height: 1px;
  margin: 5px 0;
  background: #eef0f3;
}

.add-topic-button {
  gap: 9px;
  color: #4f46e5;
  font-weight: 600;
}

.add-topic-button:hover {
  background: #f5f7ff;
}

.plus-icon {
  display: grid;
  place-items: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: #e0e7ff;
  font-size: 17px;
}

.empty-state {
  padding: 14px 15px;
  color: #9ca3af;
  font-size: 14px;
}

.add-topic-form {
  padding: 15px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
}

.topic-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 0 11px;
  border: 1px solid #d7dce5;
  border-radius: 8px;
  outline: none;
  color: #1f2937;
  font: inherit;
}

.topic-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.error-message {
  margin: 7px 0 0;
  color: #dc2626;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 13px;
}

.cancel-button,
.save-button {
  min-height: 35px;
  padding: 0 13px;
  border-radius: 7px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid #d7dce5;
  background: #fff;
  color: #4b5563;
}

.cancel-button:hover {
  background: #f9fafb;
}

.save-button {
  border: 1px solid #6366f1;
  background: #6366f1;
  color: #fff;
}

.save-button:hover {
  background: #4f46e5;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
