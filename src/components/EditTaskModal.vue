<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '../types/kanban'

const props = defineProps<{
  isOpen: boolean
  task: Task | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', taskId: string, updates: Partial<Task>): void
  (e: 'delete', taskId: string): void
}>()

const title = ref('')
const description = ref('')

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title
      description.value = newTask.description || ''
    }
  },
  { immediate: true },
)

function handleSave() {
  if (props.task) {
    emit('save', props.task.id, { title: title.value, description: description.value })
    emit('close')
  }
}

function deleteTask() {
  if (props.task) {
    emit('delete', props.task.id)
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <h2>Edit Task</h2>

        <label>Title</label>
        <input v-model="title" type="text" />

        <label>Description</label>
        <textarea v-model="description" rows="4"></textarea>

        <div class="actions">
          <button class="delete-btn" @click="deleteTask">Delete</button>
          <button @click="emit('close')">Cancel</button>
          <button class="save-btn" @click="handleSave">Save</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
.delete-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: auto;
}
.save-btn {
  background: #0052cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
