import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function auth() {
  return (
    <div className='flex flex-row min-h-[70vh] justify-center py-24 items-center gap-12'>
        <div className='flex flex-row justify-center items-start gap-12'> 
        <Login/>
        <div className=' flex flex-col h-[70vh] gap-2 justify-center items-center'>
        <div className='h-full border-r flex border-slate-700'></div>
        <h1>OR</h1>
        <div className='h-full border-r flex border-slate-700'></div>

        </div>
        <SignUp/>
        </div>
    </div>
  )
}
