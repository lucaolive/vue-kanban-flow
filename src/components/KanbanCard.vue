<script setup lang="ts">
import type { Task } from '../types/kanban';

defineProps<{
  task: Task
}>();
defineEmits<{
  (e: 'edit', task: Task): void;
}>();

function onDragStart(event: DragEvent, taskId: string) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskId', taskId);
  }
}
</script>

<template>
  <div
    class="card"
    draggable="true"
    @dragstart="onDragStart($event, task.id)"
    @click="$emit('edit', task)"
  >
    <h4>{{ task.title }}</h4>
    <p v-if="task.description">{{ task.description }}</p>
  </div>
</template>

<style scoped>
.card {
  background-color: rgb(143, 126, 97);
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 0.5rem;
  cursor: grab;
}
.card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}
.card p {
  margin: 0;
  font-size: 0.8rem;
  color: black;
}
</style>
