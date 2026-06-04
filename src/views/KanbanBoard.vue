<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useKanbanStore } from '../stores/kanbanStore';
import KanbanColumn from '../components/KanbanColumn.vue';
import EditTaskModal from '../components/EditTaskModal.vue';
import type { Task } from '../types/kanban';

const store = useKanbanStore();

const isModalOpen = ref(false);
const taskToEdit = ref<Task | null>(null);

function openModal(task: Task) {
  taskToEdit.value = task;
  isModalOpen.value = true;
}

function handleSaveTask(taskId: string, updates: Partial<Task>) {
  store.editTaskDetails(taskId, updates);
}

function handleDeleteTask(taskId: string) {
  store.deleteTask(taskId);
}

onMounted(() => {
  store.loadBoard();
});
</script>

<template>
  <div class="board-wrapper">
    <header>
      <h1>O Meu Kanban</h1>
      <span v-if="store.isLoading" class="loader">A carregar...</span>
    </header>

    <div v-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else class="board">
      <KanbanColumn
        v-for="col in store.columns"
        :key="col.id"
        :column="col"
        @edit-task="openModal"
      />
    <EditTaskModal
      :is-open="isModalOpen"
      :task="taskToEdit"
      @close="isModalOpen = false"
      @save="handleSaveTask"
      @delete="handleDeleteTask"
    />
    </div>
  </div>
</template>

<style scoped>
.board-wrapper {
  padding: 2rem;
  font-family: sans-serif;
}
header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.board {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
.error {
  color: red;
  background: #ffe6e6;
  padding: 1rem;
  border-radius: 4px;
}
</style>
