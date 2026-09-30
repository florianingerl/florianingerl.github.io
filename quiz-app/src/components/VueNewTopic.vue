<template>
  <div>
    
    <Editor
      v-model="editorContent"
      api-key="zd8r2y1yfgup9e90sv8vooff97xxmjb4wlzp3i4umvcmp3je"
      :init="{
        toolbar_mode: 'sliding',
        plugins: [
          // Core editing features
          'anchor',
          'autolink',
          'charmap',
          'codesample',
          'emoticons',
          'link',
          'lists',
          'media',
          'searchreplace',
          'table',
          'visualblocks',
          'wordcount',
          // Premium features
          'checklist',
          'mediaembed',
          'casechange',
          'formatpainter',
          'pageembed',
          'a11ychecker',
          'tinymcespellchecker',
          'permanentpen',
          'powerpaste',
          'advtable',
          'advcode',
          'advtemplate',
          'tinymceai',
          'uploadcare',
          'mentions',
          'tinycomments',
          'tableofcontents',
          'footnotes',
          'mergetags',
          'autocorrect',
          'typography',
          'inlinecss',
          'markdown',
          'importword',
          'exportword',
          'exportpdf',
        ],
        toolbar: 'undo redo | tinymceai-chat tinymceai-quickactions tinymceai-review | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' }
        ],
        tinymceai_token_provider: provideToken,
        uploadcare_public_key: 'ec734fc053cde965d0d0',
      }"
      initial-value="Welcome to TinyMCE!"
    />
    <div class="row">
      <div class="col">
        <button @click="saveTutorialClicked">Save</button>
      </div>
      <div class="col">
        <button @click="emit('cancel-clicked')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Editor from "@tinymce/tinymce-vue";
import { getTopic, updateTopic } from "../api.ts";
import type { Exercise, Topic } from "../types.ts";

const props = defineProps<{
  questionOfQuiz?: Exercise
}>()

const emit = defineEmits<{
  (e: 'cancel-clicked'): void
  (e: 'tutorial-saved', topic: Topic): void
}>()

const editorContent = ref<string>('')

async function saveTutorialClicked(): Promise<void> {
  const ex = props.questionOfQuiz

  if (!ex?.topic) {
    alert("The current exercise hasn't got a topic!")
    emit('cancel-clicked')
    return
  }

  try {
    const geladen =
      typeof ex.topic === 'string' ? await getTopic(ex.topic) : ex.topic
    const topic: Topic = { ...geladen, tutorial: editorContent.value }
    const gespeichert = await updateTopic(topic)
    alert("The tutorial was inserted into the database!")
    emit('tutorial-saved', gespeichert)
  } catch (e) {
    alert(`Speichern fehlgeschlagen: ${(e as Error).message}`)
  }
}

async function provideToken() {
  console.log("The token provider was called!")
  await fetch(
    `https://demo.api.tiny.cloud/1/zd8r2y1yfgup9e90sv8vooff97xxmjb4wlzp3i4umvcmp3je/auth/random`,
    { method: 'POST', credentials: 'include' }
  )
  return {
    token: await fetch(
      `https://demo.api.tiny.cloud/1/zd8r2y1yfgup9e90sv8vooff97xxmjb4wlzp3i4umvcmp3je/jwt/tinymceai`,
      { credentials: 'include' }
    ).then((r) => r.text()),
  }
}
</script>
