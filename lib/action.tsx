'use client'
import { redirect } from 'next/navigation'
import { fetchStorage, saveStorageSingle } from '@/lib/useLocalStorage'
import type { Task } from '@/types/taskType'

export const editText = (formData: FormData) => {
  const tasksAll = (fetchStorage('tasks') as Task[]) || []

  try {
    const task = tasksAll.find(
      (tk: Task) => tk.id === Number(formData.get('id'))
    ) as Task
    if (task) {
      task.text = String(formData.get('text'))
      saveStorageSingle([...tasksAll], 'tasks')
    }
  } catch (error) {
    console.log('error' + error)
  } finally {
    redirect('/')
  }
}
