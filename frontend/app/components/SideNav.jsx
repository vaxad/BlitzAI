"use client"
import Link from 'next/link'
import Image from "next/image"
import {usePathname} from 'next/navigation'
import React from 'react'
import {MdDeleteOutline, MdDescription, MdOutlineDescription} from "react-icons/md";
import store from '@/lib/zustand';
import {FaCubes, FaHashtag, FaLock} from "react-icons/fa";
import {useTheme} from "next-themes";

import LogoBlack from "@/public/assets/logo_black.png"
import LogoWhite from "@/public/assets/logo_white.png"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {LuLayoutDashboard} from "react-icons/lu";
import {FaT} from "react-icons/fa6";
import {BiCaptions} from "react-icons/bi";

const themeMap = {
	light: LogoBlack, dark: LogoWhite
}

function ActiveLink({href, icon, children}) {
	const path = usePathname()

	const Icon = icon

	return (
		<Link href={"href"}>
			<div
				className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes("href") ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}
			>
				<Icon/>
				{children}
			</div>
		</Link>
	)
}

const SIDE_NAV_LINKS = [
	{
		sectionName: "Home",
		sectionLinks: [
			{
				href: "/dashboard",
				icon: LuLayoutDashboard,
				text: "Dashboard"
			},
			{
				href: "/projects",
				icon: FaCubes,
				text: "My Projects"
			},
			{
				href: "/trash",
				icon: MdDeleteOutline,
				text: "Trash"
			}
		]
	},
	{
		sectionName: "Script",
		sectionLinks: [
			{
				href: "/script-to-title",
				icon: FaT,
				text: "Script to Title"
			},
			{
				href: "/script-to-description",
				icon: MdDescription,
				text: "Script to Description"
			},
			{
				href: "/script-to-thumbnail",
				icon: MdDescription,
				text: "Script to Thumbnail"
			},
			{
				href: "/script-validation",
				icon: MdDescription,
				text: "Script to Validate"
			},
		]
	},
	{
		sectionName: "Title",
		sectionLinks: [
			{
				href: "/title-to-thumbnail",
				icon: BiCaptions,
				text: "Title to Thumbnail"
			},
			{
				href: "/title-to-description",
				icon: MdOutlineDescription,
				text: "Title to Description"
			}
		]
	},
	{
		sectionName: "Video",
		sectionLinks: [
			{
				href: "/videos-to-hashtags",
				icon: FaHashtag,
				text: "Video to Hashtags"
			},
		]
	},
	{
		sectionName: "Text",
		sectionLinks: [
			{
				href: "/text-to-image",
				icon: FaHashtag,
				text: "Text to Image"
			},
		]
	}
]

export default function SideNav() {
	const path = usePathname()
	const {theme, systemTheme} = useTheme()

	const {auth} = store()
	return (
		<aside
			id="sidebar"
			className={`-z-10 customnav absolute left-0 top-0 bg-black h-screen w-64 transition-transform`}
			aria-label="Sidebar"
		>
			{auth ? (
				<div
					className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent">
					<div className='flex flex-col w-full py-2'>
						<Image
							quality={100}
							className='w-44'
							src={themeMap[theme === "system" ? systemTheme : theme]}
							alt="logo"
						/>
					</div>
					{
						SIDE_NAV_LINKS.map((navSection, sectionIdx) => {
							const {sectionLinks, sectionName} = navSection
							return (
								<Accordion key={sectionName} type={"single"} defaultValue={`accordion-${sectionIdx}`}
										   collapsible className={"w-full"}>
									<AccordionItem value={`accordion-${sectionIdx}`} isActive={true}>
										<AccordionTrigger
											className="font-bold text-[2.5vh]">{sectionName}</AccordionTrigger>
										{
											sectionLinks.map((linkObj) => {
												const {href, icon, text} = linkObj
												return (
													<AccordionContent key={href}>
														<ActiveLink icon={icon} href={href}>
															{text}
														</ActiveLink>
													</AccordionContent>
												)
											})
										}
									</AccordionItem>
								</Accordion>
							)
						})
					}
				</div>
			) : (
				<div
					className='flex h-full flex-col gap-8 justify-center items-center overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent'>
					<h3 className='text-center'>
						<FaLock className={"h-8 w-8"}/>
					</h3>
					<h3 className=' text-center'>
						Authenticate to Continue
					</h3>
				</div>
			)}
		</aside>
	)
}
