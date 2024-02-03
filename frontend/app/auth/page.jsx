import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function auth() {
  return (
    <div className='flex flex-row min-h-[70vh] justify-center py-24 items-center gap-12'>
        <div className='flex flex-row justify-center items-start gap-12'> 
        <Login/>
        <div className='h-[70vh] border-r flex border-slate-700'></div>
        <SignUp/>
        </div>
    </div>
  )
}
