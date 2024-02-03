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
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"

import React from 'react'
import SideNav from './SideNav'
import {ModeToggle} from "@/components/ui/theme-toggle"
import Link from "next/link"
import store from "@/lib/zustand"

export default function Navbar() {
  const {auth} = store()
	return (
		<div
			className=' fixed top-0 flex flex-row w-full px-4 py-4 gap-8 border-b border-slate-200 dark:border-slate-700 items-center justify-between dark:bg-transparent bg-slate-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  '>
			<SideNav/>
			<Link href="/" className=" flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
				<img className=' w-8 h-8' src="https://img.icons8.com/ios-filled/50/ffffff/logo.png" alt="logo"/>
				<span className="ml-3 text-base font-semibold">Kratos</span>
			</Link>
			<div className=" flex flex-row gap-4 justify-center items-center w-fit">
				{auth?<Menubar>
					<MenubarMenu>
						<MenubarTrigger>File</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								New Tab <MenubarShortcut>⌘T</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								New Window <MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem disabled>New Incognito Window</MenubarItem>
							<MenubarSeparator/>
							<MenubarSub>
								<MenubarSubTrigger>Share</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Email link</MenubarItem>
									<MenubarItem>Messages</MenubarItem>
									<MenubarItem>Notes</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator/>
							<MenubarItem>
								Print... <MenubarShortcut>⌘P</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Edit</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator/>
							<MenubarSub>
								<MenubarSubTrigger>Find</MenubarSubTrigger>
								<MenubarSubContent>
									<MenubarItem>Search the web</MenubarItem>
									<MenubarSeparator/>
									<MenubarItem>Find...</MenubarItem>
									<MenubarItem>Find Next</MenubarItem>
									<MenubarItem>Find Previous</MenubarItem>
								</MenubarSubContent>
							</MenubarSub>
							<MenubarSeparator/>
							<MenubarItem>Cut</MenubarItem>
							<MenubarItem>Copy</MenubarItem>
							<MenubarItem>Paste</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>View</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
							<MenubarCheckboxItem checked>
								Always Show Full URLs
							</MenubarCheckboxItem>
							<MenubarSeparator/>
							<MenubarItem inset>
								Reload <MenubarShortcut>⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarItem disabled inset>
								Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator/>
							<MenubarItem inset>Toggle Fullscreen</MenubarItem>
							<MenubarSeparator/>
							<MenubarItem inset>Hide Sidebar</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Profiles</MenubarTrigger>
						<MenubarContent>
							<MenubarRadioGroup value="benoit">
								<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
								<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
								<MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
							</MenubarRadioGroup>
							<MenubarSeparator/>
							<MenubarItem inset>Edit...</MenubarItem>
							<MenubarSeparator/>
							<MenubarItem inset>Add Profile...</MenubarItem>


						</MenubarContent>
					</MenubarMenu>
				</Menubar>:
    <Menubar>        
      <MenubarMenu>
      <Link className="flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent " href={"/auth"}>
        Sign in
      </Link>
      </MenubarMenu>
      </Menubar>}
				<HoverCard>
					<HoverCardTrigger>
						<div className="flex flex-row">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24"
								 aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
								<circle cx="9" cy="7" r="4"/>
								<path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
								<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
							</svg>
							▼
						</div>

					</HoverCardTrigger>
					<HoverCardContent nopad>
						<div className="flex flex-col gap-5 py-4">

							<div className="px-4">Hii, Prinkal Doshi</div>
							<div className=' border-b w-full flex border-slate-700'></div>
							<div className="px-4">Profile</div>
							<div className="px-4">Dashboard</div>
							<div className="px-4">My Projects</div>
							<div className="px-4">FAQs</div>
							<div className=' border-b w-full flex border-slate-700'></div>
							<div className="px-4">Log Out</div>
						</div>
					</HoverCardContent>
				</HoverCard>
				<ModeToggle/>
			</div>
		</div>
	)
}
