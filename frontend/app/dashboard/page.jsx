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
import {Button} from "@/components/ui/button"
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Tabs, TabsList, TabsTrigger,} from "@/components/ui/tabs"

import {PiTextAlignRightFill} from "react-icons/pi";
import {FaPlus} from "react-icons/fa6";

export default function home() {
	const [tab, setTab] = useState("grid")
	return (
		<div className='flex flex-col py-10 px-10 '>

			<div className='text-3xl font-bold'>Create your Video</div>
			<div className='py-2 border-b w-full flex border-slate-700'></div>

			<div className='flex py-6 flex-row gap-5'>

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
						<Card>
							<CardHeader>
								<CardTitle>

									<div className='flex flex-row justify-between items-center '>

										<PiTextAlignRightFill className='h-7 w-7'/>
										<FaPlus className='text-gray-500 h-4 w-4'/>
									</div>
								</CardTitle>
								<CardTitle>AI text to Video</CardTitle>
								<CardDescription>
									Generate short video clip from a single line of text.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>

									<div className='flex flex-row justify-between items-center '>

										<PiTextAlignRightFill className='h-7 w-7'/>
										<FaPlus className='text-gray-500 h-4 w-4'/>
									</div>
								</CardTitle>
								<CardTitle>AI text to Video</CardTitle>
								<CardDescription>
									Generate short video clip from a single line of text.
								</CardDescription>
							</CardHeader>
						</Card>
					</div> : <div className='flex flex-col gap-4'>
						<Card>
							<CardHeader>
								<CardTitle>

									<div className='flex flex-row justify-between items-center '>
										<div className='flex flex-row gap-7'>

											<PiTextAlignRightFill className='h-7 w-7'/>
											<div className='flex flex-col'>
												<CardTitle>AI text to Video</CardTitle>
												<CardDescription>
													Generate short video clip from a single line of text.
												</CardDescription>
											</div>
										</div>
										<FaPlus className='text-gray-500 h-4 w-4'/>
									</div>
								</CardTitle>

							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>

									<div className='flex flex-row justify-between items-center '>
										<div className='flex flex-row gap-7'>

											<PiTextAlignRightFill className='h-7 w-7'/>
											<div className='flex flex-col'>
												<CardTitle>AI text to Video</CardTitle>
												<CardDescription>
													Generate short video clip from a single line of text.
												</CardDescription>
											</div>
										</div>
										<FaPlus className='text-gray-500 h-4 w-4'/>
									</div>
								</CardTitle>

							</CardHeader>
						</Card>
					</div>}
			</Tabs>
		</div>

	)
}
