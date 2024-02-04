"use client"
import Link from 'next/link'
import {GrValidate} from "react-icons/gr";
import {LuGalleryThumbnails, LuLayoutDashboard} from "react-icons/lu";
import {usePathname} from 'next/navigation'
import React from 'react'
import {MdDeleteOutline, MdDescription, MdOutlineDescription, MdTitle, MdVideoFile} from "react-icons/md";
import store from '@/lib/zustand';
import {FaCubes, FaHashtag, FaLock, FaRegFileAudio, FaVideo} from "react-icons/fa";
import {useTheme} from "next-themes";
import {IoMdImages} from "react-icons/io";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FaT} from "react-icons/fa6";

const themeMap = {
	light: "/assets/logo_black.png",
	dark: "/assets/logo_white.png"
}

function ActiveLink({href, icon, children}) {
	const path = usePathname()

	const Icon = icon

	return (
		<Link href={href}>
			<div
				className={`flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 dark:text-white ${path.includes(href) ? " bg-primary hover:bg-orange-600" : "hover:bg-slate-100  dark:hover:bg-slate-700"} `}
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
				icon: LuGalleryThumbnails,
				text: "Script to Thumbnail"
			},
			{
				href: "/script-validation",
				icon: GrValidate,
				text: "Script Validation"
			},
			{
				href: "/script-to-hashtags",
				icon: FaHashtag,
				text: "Script to Hashtags"
			},
		]
	},
	{
		sectionName: "Title",
		sectionLinks: [
			{
				href: "/title-to-thumbnail",
				icon: LuGalleryThumbnails,
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
		sectionName: "Premium",
		sectionLinks: [
			{
				href: "/title-to-video",
				icon: FaVideo,
				text: "Title to Video"
			},
			{
				href: "/description-to-video",
				icon: FaVideo,
				text: "Description to Video"
			}
		]
	},
	{
		sectionName: "Video",
		sectionLinks: [
			{
				href: "/video-to-hashtags",
				icon: FaHashtag,
				text: "Video to Hashtags"
			},
			{
				href: "/video-to-description",
				icon: MdDescription,
				text: "Video to Description"
			},
			{
				href: "/video-to-title",
				icon: MdTitle,
				text: "Video to Title"
			},
		]
	},
	{
		sectionName: "Text",
		sectionLinks: [
			{
				href: "/text-to-image",
				icon: IoMdImages,
				text: "Text to Image"
			},
			{
				href: "/text-to-speech",
				icon: FaRegFileAudio,
				text: "Text to Speech"
			},
			{
				href: "/text-to-video",
				icon: MdVideoFile,
				text: "Text to Video"
			},
		]
	},
	{
		sectionName: "Image",
		sectionLinks: [
			{
				href: "/thumbnail-edit",
				icon: IoMdImages,
				text: "Edit Thumbnail"
			},
			{
				href: "/animate-image",
				icon: MdVideoFile,
				text: "Animate Image"
			}
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
			className={`-z-10 customnav  absolute left-0 top-0 bg-black h-screen ${path === "/" ? "hidden" : ""} w-64 transition-transform`}
			aria-label="Sidebar"
		>

			<div
				className="flex h-full flex-col overflow-y-auto border-r bg-white px-3 py-4 dark:bg-transparent">
				<div className='flex flex-col w-full py-2'>
					<img
						className='w-44'
						src={'/assets/logo_white.png'}
						alt="logo"
					/>
				</div>
				{
					auth ? SIDE_NAV_LINKS.map((navSection, sectionIdx) => {
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
					}) : (
						<div
							className='flex h-full flex-col gap-8 justify-center items-center overflow-y-auto border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-transparent'>
							<h3 className='text-center'>
								<FaLock className={"h-8 w-8"}/>
							</h3>
							<h3 className=' text-center'>
								Authenticate to Continue
							</h3>
						</div>
					)
				}
			</div>
		</aside>
	)
}
