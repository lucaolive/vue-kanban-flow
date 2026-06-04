import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column, Task } from '../types/kanban'
import { api } from '../services/api'
import { useToast } from '../composables/useToast'

export const useKanbanStore = defineStore('kanban', () => {
  const { showToast } = useToast()

  const columns = ref<Column[]>([])
  const tasks = ref<Task[]>([])

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getTasksByColumn = computed(() => {
    return (columnId: string) =>
      tasks.value.filter((task) => task.columnId === columnId).sort((a, b) => a.order - b.order)
  })

  async function editTaskDetails(taskId: string, updates: Partial<Task>) {
    try {
      await api.updateTask(taskId, updates)
      const task = tasks.value.find((t) => t.id === taskId)
      if (task) {
        Object.assign(task, updates)
        showToast('Task updated successfully!', 'success')
      }
    } catch (e) {
      showToast('Failed to update task.', e instanceof Error ? 'error' : 'success')
    }
  }

  async function loadBoard() {
    isLoading.value = true
    error.value = null
    try {
      const [colsData, tasksData] = await Promise.all([api.getColumns(), api.getTasks()])
      columns.value = colsData
      tasks.value = tasksData
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error loading board'
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(columnId: string, title: string) {
    try {
      const newTask = await api.addTask({
        columnId,
        title,
        description: '',
        order: getTasksByColumn.value(columnId).length,
      })
      tasks.value.push(newTask)
      showToast('Task added successfully!', 'success')
    } catch (e) {
      showToast('Failed to add task.', e instanceof Error ? 'error' : 'success')
    }
  }

  async function deleteTask(taskId: string) {
    try {
      await api.deleteTask(taskId)
      tasks.value = tasks.value.filter((t) => t.id !== taskId)
      showToast('Task deleted successfully!', 'success')
    } catch (e) {
      showToast('Failed to delete task.', e instanceof Error ? 'error' : 'success')
    }
  }

  async function moveTask(taskId: string, targetColumnId: string) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task || task.columnId === targetColumnId) return

    const oldColumnId = task.columnId

    task.columnId = targetColumnId

    try {
      await api.updateTask(taskId, { columnId: targetColumnId })
      showToast('Task moved successfully!', 'success')
    } catch (e) {
      task.columnId = oldColumnId
      showToast('Failed to move task.', e instanceof Error ? 'error' : 'success')
    }
  }

  return {
    columns,
    tasks,
    isLoading,
    error,
    getTasksByColumn,
    loadBoard,
    addTask,
    deleteTask,
    moveTask,
    editTaskDetails,
  }
})
