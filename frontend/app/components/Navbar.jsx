"use client"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {CgProfile} from "react-icons/cg"
import {IoIosArrowDown} from "react-icons/io"
import React from 'react'
import SideNav from './SideNav'
import { ModeToggle } from "@/components/ui/theme-toggle"
import Link from "next/link"
import store from "@/lib/zustand"
import logo_white from "../../public/assets/logo_white.png"
import logo_black from "../../public/assets/logo_black.png"

export default function Navbar() {
  const {auth,Logout} = store()
  return (
    <div className=' fixed top-0 flex flex-row w-full px-4 py-4 gap-8 border-b border-slate-200 dark:border-slate-700 items-center justify-between dark:bg-transparent bg-slate-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  '>
      <SideNav />
      <Link href="/" className=" flex items-center rounded-lg px-3 py-1 text-slate-900 dark:text-white">
        <img className=' w-32 opacity-0' src="/assets/logo_white.png" alt="logo" />
        
      </Link>
      
      <div className=" flex flex-row gap-4 justify-center items-center w-fit">
        {auth?
      <></>:
    <Menubar >        
      <MenubarMenu>
      <Link className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent " href={"/auth"}>
        Sign in
      </Link>
      </MenubarMenu>
      </Menubar>}
      
      {auth?<Menubar nostyle>
      <MenubarMenu>
            <MenubarTrigger>
            <div className="flex flex-row gap-2 items-center">
            <CgProfile className='h-7 w-7' />
              <IoIosArrowDown className='h-5 w-5' />
            </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className=" bg-transparent hover:!bg-transparent">
              Hii, Prinkal Doshi 
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarItem>Profile</MenubarItem>
                <MenubarItem>Dashboard</MenubarItem>
                <MenubarItem>My Projects</MenubarItem>
                <MenubarItem>FAQs</MenubarItem>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem onClick={()=>{localStorage.setItem("auth-token",null); Logout()}} className="dark:bg-red-600 bg-red-500 hover:!bg-red-600 dark:hover:!bg-red-800">Log out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          </Menubar>:<></>}
        <ModeToggle />
      </div>
    </div>
  )
}
