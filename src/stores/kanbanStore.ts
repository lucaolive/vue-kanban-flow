import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column, Task } from '../types/kanban'

export const useKanbanStore = defineStore('kanban', () => {
  const columns = ref<Column[]>([
    { id: 'todo', title: 'To Do', order: 0 },
    { id: 'doing', title: 'In Progress', order: 1 },
    { id: 'done', title: 'Done', order: 2 },
  ])

  const tasks = ref<Task[]>([])

  const getTasksByColumn = computed(() => {
    return (columnId: string) =>
      tasks.value.filter((task) => task.columnId === columnId).sort((a, b) => a.order - b.order)
  })

  function addTask(columnId: string, title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      columnId,
      title,
      description: '',
      order: getTasksByColumn.value(columnId).length,
    }
    tasks.value.push(newTask)
  }

  function moveTask(taskId: string, targetColumnId: string, newOrder: number) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return

    task.columnId = targetColumnId
    task.order = newOrder
  }

  return {
    columns,
    tasks,
    getTasksByColumn,
    addTask,
    moveTask,
  }
})
