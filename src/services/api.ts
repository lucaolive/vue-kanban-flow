import type { Column, Task } from '../types/kanban'

const API_URL = 'http://localhost:3000'

export const api = {
  async getColumns(): Promise<Column[]> {
    const response = await fetch(`${API_URL}/columns`)
    if (!response.ok) throw new Error('Failed to fetch columns')
    return response.json()
  },

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`)
    if (!response.ok) throw new Error('Failed to fetch tasks')
    return response.json()
  },

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    return response.json()
  },

  async deleteTask(taskId: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete task')
  },

  async updateTask(taskId: string, payload: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to update task')
    return response.json()
  },
}
