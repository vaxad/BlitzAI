"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import store from '@/lib/zustand';
export default function SideNav() {
  const path = usePathname()
  const {auth} = store()
  return (
  <aside id="sidebar" className={` -z-10 absolute left-0 -bottom-0 translate-y-full h-screen w-64 transition-transform`} aria-label="Sidebar">
    {auth?
    <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent">
      <ul className="space-y-2 text-sm font-medium">
        <li>
          <Link href="/dashboard" className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("dashboard")?" bg-primary hover:bg-orange-600":"hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
          <LuLayoutDashboard className='h-5 w-5'   />
            <span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/projects" className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("products")?" bg-primary hover:bg-orange-600":"hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <path d="M16.5 9.4 7.55 4.24" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            <span className="ml-3 flex-1 whitespace-nowrap">My Projects</span>
          </Link>
        </li>
        <li>
          <Link href="/trash" className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("settings")?" bg-primary hover:bg-orange-600":"hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
        <MdDeleteOutline className='h-6 w-6'/>
            
            <span className="ml-3 flex-1 whitespace-nowrap">Trash</span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto flex">
        <div className="flex w-full justify-between">
        </div>
      </div>
    </div>:
    <div className='flex h-full flex-col justify-center items-center overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent'>
      <h3 className=' text-center'>Please login/signup to continue</h3>
      </div>}
  </aside>
  )
}
