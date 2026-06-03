export interface Column {
  id: string
  title: string
  order: number
}

export interface Task {
  id: string
  columnId: string
  title: string
  description: string
  order: number
}
