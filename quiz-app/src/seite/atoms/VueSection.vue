<template>
  <section :id="id" class="about">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <p>{{ titel }}</p>
        <slot name="untertitel"></slot>
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
// Rahmen für jeden Abschnitt der Seite: Anker-Id, Titel und darunter der Inhalt.
defineProps<{ id: string; titel: string }>();
</script>
