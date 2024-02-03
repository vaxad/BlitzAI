"use client"
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarTrigger,
} from "@/components/ui/menubar"
import {CgProfile} from "react-icons/cg"
import {IoIosArrowDown} from "react-icons/io"
import React from 'react'
import SideNav from './SideNav'
import {ModeToggle} from "@/components/ui/theme-toggle"
import Link from "next/link"
import store from "@/lib/zustand"
import {usePathname} from "next/navigation"


export default function Navbar() {
	const {auth, user, Logout} = store()
	const path = usePathname()
	return (
		<div
			className=' fixed top-0 flex flex-row w-full px-4 py-4 gap-8 border-b  items-center justify-between dark:bg-transparent bg-slate-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  '>
			<SideNav/>
			<Link href="/" className=" flex items-center rounded-lg px-3 py-1 text-slate-900 dark:text-white">
				<img className={` w-32 ${path === "/" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
					 src="/assets/logo_white.png" alt="logo"/>

			</Link>

			<div className=" flex flex-row gap-4 justify-center items-center w-fit">
				{auth ?
					<></> :
					<Menubar>
						<MenubarMenu>
							<Link
								className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent "
								href={"/auth"}>
								Sign in
							</Link>
						</MenubarMenu>
					</Menubar>}

				{auth ? <Menubar nostyle>
					<MenubarMenu>
						<MenubarTrigger>
							<div className="flex flex-row gap-2 items-center">
								<CgProfile className='h-7 w-7'/>
								<IoIosArrowDown className='h-5 w-5'/>
							</div>
						</MenubarTrigger>
						<MenubarContent>	
							<MenubarItem className=" bg-transparent hover:!bg-transparent text-primary font-bold text-md">
								Hi, {(auth && user) ? user.name : "User"}
							</MenubarItem>
							<MenubarSeparator/>
							<MenubarSub>
								<Link href={"/profile"}>
									<MenubarItem>Profile</MenubarItem>
								</Link>
								<Link href={"/dashboard"}>
									<MenubarItem>Dashboard</MenubarItem>
								</Link>
								<Link href={"/projects"}>
									<MenubarItem>My Projects</MenubarItem>
								</Link>
								<MenubarItem>FAQs</MenubarItem>
							</MenubarSub>
							<MenubarSeparator/>
							<MenubarItem onClick={() => {
								localStorage.removeItem("auth-token")
								Logout()
							}} className="dark:bg-red-600 bg-red-500 hover:!bg-red-600 dark:hover:!bg-red-800">Log
								out</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar> : <></>}
				<ModeToggle/>
			</div>
		</div>
	)
}
