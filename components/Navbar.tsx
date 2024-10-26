import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='text-center my-5 flex flex-col gap-4'>
      <Link
        href='/'
        className='text-2xl font-bold'
        aria-label='Home'
      >
        <h1 className='text-2xl font-bold'>Next.js 15 Todo App</h1>
      </Link>
    </div>
  )
}

export default Navbar
