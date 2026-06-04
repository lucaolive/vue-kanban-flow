<script setup lang="ts">
import type { Column, Task } from '../types/kanban';
import { useKanbanStore } from '../stores/kanbanStore';
import KanbanCard from './KanbanCard.vue';

const props = defineProps<{
  column: Column
}>();

defineEmits<{
  (e: 'edit-task', task: Task): void;
}>();

const store = useKanbanStore();

function handleAddTask() {
  const title = prompt('New task name:');
  if (title) {
    store.addTask(props.column.id, title);
  }
}
function onDrop(event: DragEvent) {
  const taskId = event.dataTransfer?.getData('taskId');
  if (taskId) {
    store.moveTask(taskId, props.column.id);
  }
}
</script>

<template>
  <div
      class="column"
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent
  >
    <div class="column-header">
      <h3>{{ column.title }}</h3>
      <span class="count">{{ store.getTasksByColumn(column.id).length }}</span>
    </div>

    <div class="task-list">
      <KanbanCard
        v-for="task in store.getTasksByColumn(column.id)"
        :key="task.id"
        :task="task"
        @edit="$emit('edit-task', task)"
      />
    </div>

    <button class="add-btn" @click="handleAddTask">+ Add Task</button>
  </div>
</template>

<style scoped>
.column {
  background-color: #bfb495;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.column-header h3 {
  margin: 0;
  font-size: 1rem;
  color: black;
}
.count {
  background: black;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}
.task-list {
  flex-grow: 1;
  min-height: 50px;
}
.add-btn {
  margin-top: 1rem;
  padding: 0.5rem;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  color: #5e6c84;
}
.add-btn:hover {
  background: #ebecf0;
  border-radius: 4px;
}
</style>
