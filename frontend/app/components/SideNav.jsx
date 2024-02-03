"use client"
import Link from 'next/link'
import Image from "next/image"
import {usePathname} from 'next/navigation'
import React from 'react'
import {MdDeleteOutline, MdDescription, MdOutlineKeyboardVoice} from "react-icons/md";
import {LuGalleryThumbnails, LuLayoutDashboard} from "react-icons/lu";
import store from '@/lib/zustand';
import {FaHashtag, FaLock} from "react-icons/fa";
import {BiCaptions} from "react-icons/bi";
import {IoMdImages} from "react-icons/io";
import {FaCubes} from "react-icons/fa6";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {useTheme} from "next-themes";

import LogoBlack from "@/public/assets/logo_black.png"
import LogoWhite from "@/public/assets/logo_white.png"

const themeMap = {
	light: LogoBlack,
	dark: LogoWhite
}

export default function SideNav() {
	const path = usePathname()
	const {theme, systemTheme} = useTheme()

	const {auth} = store()
	return (
		<aside id="sidebar"
			   className={` -z-10 customnav absolute left-0 top-0 bg-black h-screen w-64 transition-transform`}
			   aria-label="Sidebar">
			{auth ?
				<div
					className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent">
					<div className='flex flex-col w-full py-2'>
						<Image quality={100} className='w-44' src={themeMap[theme === "system" ? systemTheme : theme]}
							   alt="logo"/>
					</div>
					<Accordion type="single" defaultValue='item-4' collapsible className="w-full">
						<AccordionItem value="item-4" isActive={true}>
							<AccordionTrigger className="font-bold text-[2.5vh]">Home</AccordionTrigger>
							<AccordionContent>

								<Link href="/dashboard">
									<div
										className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("dashboard") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
										<LuLayoutDashboard className='h-5 w-5'/>
										Dashboard
									</div>
								</Link>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("my-projects") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<FaCubes className='h-5 w-5'/>
									My Projects
								</div>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("trash") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<MdDeleteOutline className='h-6 w-6'/>
									Trash
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" defaultValue='item-1' collapsible className="w-full">
						<AccordionItem value="item-1" isActive={true}>
							<AccordionTrigger className="font-bold text-[2.5vh]">Create</AccordionTrigger>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("video-to-hashtags") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<FaHashtag className='h-5 w-5'/>
									Video to Hashtags
								</div>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("video-to-title-description") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<MdDescription className='h-5 w-5'/>
									Video to Title Description
								</div>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("video-to-captions") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<BiCaptions className='h-5 w-5'/>
									Video to Captions
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Accordion type="single" defaultValue='item-2' collapsible className="w-full">
						<AccordionItem value="item-2" isActive={true}>
							<AccordionTrigger className="font-bold text-[2.5vh]">Ideate</AccordionTrigger>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("title-to-thumbnail") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>

									<LuGalleryThumbnails className='h-5 w-5'/>
									Title to Thumbnail
								</div>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("title-to-voice") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<MdOutlineKeyboardVoice className='h-5 w-5'/>
									Title to Voice
								</div>
							</AccordionContent>
							<AccordionContent>
								<div
									className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("title-to-images") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
									<IoMdImages className='h-5 w-5'/>
									Title to Images
								</div>
							</AccordionContent>
						</AccordionItem> </Accordion>
					{/* <Accordion type="single" defaultValue='item-3' collapsible className="w-full">
      <AccordionItem value="item-3" isActive={true}>
        <AccordionTrigger>Title to Thumbnail</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion> */}

					{/* <ul className="space-y-2 text-sm font-medium pt-4">
						<li>
							<Link href="/dashboard"
								  className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("dashboard") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
								<LuLayoutDashboard className='h-5 w-5'/>
								<span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/projects"
								  className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("products") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24"
									 aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
									 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M16.5 9.4 7.55 4.24"/>
									<path
										d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
									<polyline points="3.29 7 12 12 20.71 7"/>
									<line x1="12" x2="12" y1="22" y2="12"/>
								</svg>
								<span className="ml-3 flex-1 whitespace-nowrap">My Projects</span>
							</Link>
						</li>
						<li>
							<Link href="/trash"
								  className={`flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("settings") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}>
								

								<span className="ml-3 flex-1 whitespace-nowrap">Trash</span>
							</Link>
						</li>
					</ul> */}
					<div className="mt-auto flex">
						<div className="flex w-full justify-between">
						</div>
					</div>
				</div> :
				<div
					className='flex h-full flex-col gap-8 justify-center items-center overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent'>
					<h3 className='text-center'>
						<FaLock className={"h-8 w-8"}/>
					</h3>
					<h3 className=' text-center'>
						Authenticate to Continue
					</h3>
				</div>}
		</aside>
	)
}
