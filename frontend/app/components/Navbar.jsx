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

export default function Navbar() {
  const {auth,Logout} = store()
  return (
    <div className=' fixed top-0 flex flex-row w-full px-4 py-4 gap-8 border-b border-slate-200 dark:border-slate-700 items-center justify-between dark:bg-transparent bg-slate-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  '>
      <SideNav />
      <Link href="/" className=" flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
        <img className=' w-8 h-8' src="https://img.icons8.com/ios-filled/50/ffffff/logo.png" alt="logo" />
        <span className="ml-3 text-base font-semibold">Kratos</span>
      </Link>
      <div className=" flex flex-row gap-4 justify-center items-center w-fit">
        {auth?<Menubar>
          <MenubarMenu>
            <MenubarTrigger>New</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab 
              </MenubarItem>
              <MenubarItem>
                New Window 
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            {/* <MenubarContent>
              <MenubarItem>
                Undo 
              </MenubarItem>
              <MenubarItem>
                Redo
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent> */}
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset><a href="https://github.com/MihirRajeshPanchal" target="_blank">Mihir Panchal</a></MenubarItem>
              <MenubarItem inset><a href="https://github.com/arnitdo" target="_blank">Arnav Deo</a></MenubarItem>
              <MenubarItem inset><a href="https://github.com/prinkaldoshi27" target="_blank">Prinkal Doshi</a></MenubarItem>
              <MenubarItem inset><a href="https://github.com/vaxad" target="_blank">Varad Prabhu</a></MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Contact</MenubarTrigger>
          </MenubarMenu>
        </Menubar>:
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
              <MenubarItem onClick={()=>{Logout()}} className="dark:bg-red-600 bg-red-500 hover:!bg-red-600 dark:hover:!bg-red-800">Log out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          </Menubar>:<></>}
        <ModeToggle />
      </div>
    </div>
  )
}
