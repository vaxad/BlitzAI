"use client"
import React, {useState} from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {CiBoxList, CiGrid42} from "react-icons/ci";
import {FaHashtag, FaRegFileAudio} from "react-icons/fa";
import {Tabs, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import Link from "next/link"
import {LuGalleryThumbnails} from "react-icons/lu";
import {MdDescription, MdOutlineDescription, MdTitle} from "react-icons/md";
import {FaT} from "react-icons/fa6";
import {GrValidate} from "react-icons/gr";
import {IoMdImages} from "react-icons/io";

const DASH_ICONS = [
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
	{
		href: "/title-to-thumbnail",
		icon: LuGalleryThumbnails,
		text: "Title to Thumbnail"
	},
	{
		href: "/title-to-description",
		icon: MdOutlineDescription,
		text: "Title to Description"
	},
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
		href: "/thumbnail-edit",
		icon: IoMdImages,
		text: "Edit Thumbnail"
	}
]


const DASH_LINKS = [
	{
		href: "/script-to-title",
		text: "Script to Title",
		desc: "Generate a video script from a title"
	},
	{
		href: "/script-to-description",
		text: "Script to Description",
		desc: "Generate a video script from a descriptive summary"
	},
	{
		href: "/script-to-thumbnail",
		text: "Script to Thumbnail",
		desc: "Generate a video thumbnail from a script"
	},
	{
		href: "/script-validation",
		text: "Script Validation",
		desc: "Ensure your content is safe-for-kids"
	},
	{
		href: "/FaHashtag-to-hashtags",
		text: "Script to Hashtags",
		desc: "Generate SEO-friendly hash-tags"
	},
	{
		href: "/title-to-thumbnail",
		text: "Title to Thumbnail",
		desc: "Generate a video thumbnail from a title"
	},
	{
		href: "/title-to-description",
		text: "Title to Description",
		desc: "Generate a descriptive summary from a title"
	},
	{
		href: "/video-to-hashtags",
		text: "Video to Hashtags",
		desc: "Generate SEO-friendly hash-tags from a video clip"
	},
	{
		href: "/video-to-description",
		text: "Video to Description",
		desc: "Generate a descriptive summary from a video"
	},
	{
		href: "/video-to-title",
		text: "Video to Title",
		desc: "Generate a title from a video"
	},
	{
		href: "/text-to-image",
		text: "Text to Image",
		desc: "Generate an image from a prompt"
	},
	{
		href: "/text-to-speech",
		text: "Text to Speech",
		desc: "Generate AI voice-overs for a paragraph"
	},
	{
		href: "/thumbnail-edit",
		text: "Edit Thumbnail",
		desc: "Generate an enhanced thumbnail"
	}
]

export default function Home() {
	const [tab, setTab] = useState("grid")
	const [searchQuery, setSearchQuery] = useState("")

	return (

		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-8 py-10 px-10 min-h-[200vh] '>
				<div className='flex  flex-row gap-5'>
					<Input value={searchQuery} onChange={(e) => {
						setSearchQuery(e.target.value)
					}} type="text" placeholder="Search" className="w-full"/>
					<Select defaultValue={"date"}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort By"/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort By</SelectLabel>
								<SelectItem value="date">Activity</SelectItem>
								<SelectItem value="name">Name</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<Tabs defaultValue="grid" className="w-fit ">
						<TabsList className="grid w-24 grid-cols-2 bg-primary">
							<TabsTrigger value="grid" onClick={() => {
								setTab("grid")
							}}>
								<CiGrid42/>
							</TabsTrigger>
							<TabsTrigger value="list" onClick={() => {
								setTab("list")
							}}><CiBoxList/>
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div className="flex flex-col justify-center items-center">


					{tab === "grid" ? (
							<div className={"w-fit grid grid-cols-3 gap-8"}>
								{DASH_LINKS.filter((dashObj) => {
									return searchQuery === "" ||
										dashObj.text.includes(searchQuery) ||
										dashObj.desc.includes(searchQuery)
								}).map((dashObj, dashIdx) => {
									return (
										<Card key={dashObj.href} className="w-[300px] h-[300px]">

											<Link href={dashObj.href} key={dashObj.href}>
												<CardHeader>
													<CardDescription className=" flex justify-center">
														<img src={`/assets/dashsrc/${(dashIdx + 1) % 6}.png`}
															 className='h-36'/>
													</CardDescription>
													<hr></hr>
													<CardTitle
														className="flex text-primary pt-4 font-extrabold">{dashObj.text}</CardTitle>
													<CardDescription className="flex ">{dashObj.desc}</CardDescription>
												</CardHeader>
											</Link>
										</Card>
									)
								})}
							</div>
						)
						: (
							<div
								className=' w-full flex flex-col gap-8'
							>
								{DASH_LINKS.filter((dashObj) => {
									return searchQuery === "" ||
										dashObj.text.includes(searchQuery) ||
										dashObj.desc.includes(searchQuery)
								}).map((dashObj, dashIdx) => {
									const dashIcon = DASH_ICONS.find((iconObj) => {
										return iconObj.href === dashObj.href
									})

									const IconComp = dashIcon?.icon

									return (
										<Link href={dashObj.href} key={dashObj.href}>
											<Card className="w-full">
												<CardHeader>
													<div className='flex flex-row items-center '>
														{IconComp ?
															<IconComp className='h-8 w-8 text-white items-center'/> :
															<FaHashtag className='h-8 w-8 text-white items-center'/>}
														<div className='flex flex-col'>
															<CardTitle
																className="flex text-primary pt-2  font-extrabold px-4">{dashObj.text}</CardTitle>
															<CardDescription
																className="flex px-4">{dashObj.desc}</CardDescription>
														</div>
													</div>
												</CardHeader>
											</Card>
										</Link>
									)
								})}
							</div>
						)}
				</div>
			</div>
		</div>
	)
}
