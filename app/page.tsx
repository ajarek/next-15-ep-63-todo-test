'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  saveStorage,
  fetchStorage,
  deleteStorageId,
  saveStorageSingle,
} from '@/lib/useLocalStorage'
import type { Task } from '@/types/taskType'

export default function Home() {

  const [text, setText] = useState<string>('')
  const tasksAll = (fetchStorage('tasks') as Task[]) || []
  const router = useRouter()

  const addTask = () => {
    if (text.trim() === '') return
    const newTask: Task = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    saveStorage(newTask, 'tasks')
    setText('')
    router.refresh()
  }

  const toggleTask = (id: number) => {
    const task = tasksAll.find((task: Task) => task.id === id)
    if (task) {
      task.completed = !task.completed
      saveStorageSingle([...tasksAll], 'tasks')
      router.refresh()
    }
  }

  const deleteTask = (id: number) => {
    deleteStorageId(id, 'tasks')
    router.refresh()
  }

  return (
    <main className='max-w-4xl mx-auto mt-4 '>
      <div className='text-center my-5 flex flex-col gap-4'>
        <form className='flex gap-2 justify-center'>
          <input
            type='text'
            className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Add a new task...'
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            required
            autoFocus
            aria-label='task'
          />
          <button
            type='button'
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            onClick={addTask}
            aria-label='add task'
          >
            Add Task
          </button>
        </form>

        <ul className='w-1/2 max-sm:w-full self-center px-2 '>
          {tasksAll.map((task: Task) => (
            <li
              key={task.id}
              className='flex items-center justify-between text-xl p-2 border-b-2'
            >
              <div
                onClick={() => toggleTask(task.id)}
                className='cursor-pointer'
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() =>
                    router.push(`/edit?id=${task.id}&text=${task.text}`)
                  }
                  aria-label='edit task'
                >
                  🖊️
                </button>
                <button onClick={() => deleteTask(task.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
