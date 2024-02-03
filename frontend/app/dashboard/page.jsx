"use client"
import React, { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { CiBoxList } from "react-icons/ci";
import { CiGrid42 } from "react-icons/ci";
import { IoMdImages } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { LuGalleryThumbnails } from "react-icons/lu";
import { BiCaptions } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
  } from "@/components/ui/tabs"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

export default function Home() {
	const [tab, setTab] = useState("grid")
	return (
		
<div className='flex flex-col gap-4'>
<div className='flex flex-col py-10 px-10 min-h-[200vh] '>

		
			<div className='flex  flex-row gap-5'>

				<Input type="text" placeholder="Search" className="w-full"/>
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Sort By"/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Sort By</SelectLabel>
							<SelectItem value="apple">Activity</SelectItem>
							<SelectItem value="banana">Name</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button>Add New</Button>
				<Tabs defaultValue="grid" className="w-fit">
					<TabsList className="grid w-24 grid-cols-2">
						<TabsTrigger value="grid" onClick={() => {
							setTab("grid")
						}}> <CiGrid42/></TabsTrigger>
						<TabsTrigger value="list" onClick={() => {
							setTab("list")
						}}><CiBoxList/></TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<Tabs>
				{tab === "grid" ?
					<div className='flex flex-row gap-10 py-4 w-full'>
		<div>
							
		<div className='flex flex-row gap-4 '>
			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/title-to-hashtags.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4 ">Video To Hashtag</CardTitle>
				<CardDescription className="flex ">Create search friendly hashtags from the video.</CardDescription>
				</CardHeader>
			</Card>

			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/video-to-description.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4">Video To Description</CardTitle>
				<CardDescription className="flex ">Create search friendly description from the video.</CardDescription>
				</CardHeader>
			</Card>

			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/video-to-caption.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4">Video To Caption</CardTitle>
				<CardDescription className="flex ">Create search friendly captions from the video.</CardDescription>
				</CardHeader>
			</Card>
			</div>
			<div className='flex flex-row gap-4 py-5'>
			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/title-to-thumbmail.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4 ">Title To Thumbnail</CardTitle>
				<CardDescription className="flex ">Create intuitive thumbnails from the video titles.</CardDescription>
				</CardHeader>
			</Card>

			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/title-to-voice.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4">Text To Voice</CardTitle>
				<CardDescription className="flex ">Create voice for videos from the video scripts.</CardDescription>
				</CardHeader>
			</Card>

			<Card className="w-[350px]">
				<CardHeader>
					<CardDescription className=" flex justify-center">
						<img src='/assets/title-to-images.png' className='h-36'/>
					</CardDescription>
					<hr></hr>
					<CardTitle className="flex text-primary pt-4">Description To Video</CardTitle>
				<CardDescription className="flex ">Create videos from video description.</CardDescription>
				</CardHeader>
			</Card>
			</div>
		</div>
					</div> : <div className='flex flex-col gap-4'>
					<div className='flex flex-col py-4 gap-4 '>
			<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<FaHashtag className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-2 px-4">Video To Hashtag</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Hashtags from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
			</Card>

			
			<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<MdDescription className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-4 px-4">Video To Description</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Description from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
				</Card>

				<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<BiCaptions className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-4 px-4">Video To Caption</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Capt from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
				</Card>

				<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<LuGalleryThumbnails className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-2 px-4">Title To Thumbnail</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Hashtags from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
			</Card>

			
			<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<MdOutlineKeyboardVoice className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-4 px-4">Title To Voice</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Description from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
				</Card>

				<Card className="w-full">
				<CardHeader>
					<div className='flex flex-row items-center '>
					<IoMdImages className='h-8 w-8 text-white items-center' />
						<div className='flex flex-col'>

					<CardTitle className="flex text-primary pt-4 px-4">Time To Images</CardTitle>
				<CardDescription className="flex px-4">Create Search Friendly Capt from the Video.</CardDescription>
						</div>
						</div>
				</CardHeader>
				</Card>
		</div>
					</div>}
			</Tabs>
		</div>
</div>
	)
}
