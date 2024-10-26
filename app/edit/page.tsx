'use client'
import React from 'react'
import { editText } from '@/lib/action'
const Edit = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const { id, text } = React.use(searchParams)
  const ref = React.useRef<HTMLFormElement>(null)
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await editText(formData)
        ref.current?.reset()
      }}
      className='flex gap-2 justify-center'
    >
      <input
        type='hidden'
        name='id'
        value={id}
      />
      <input
        type='text'
        className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
        defaultValue={text}
        name='text'
        aria-label='update  task'
      />
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
        type='submit'
        aria-label='update task'
      >
        Update Task
      </button>
    </form>
  )
}
export default Edit
