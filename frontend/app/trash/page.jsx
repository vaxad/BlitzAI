"use client"
import React, {useEffect, useState} from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import store from "@/lib/zustand";
import {MdRecycling} from "react-icons/md";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link"
import {Button} from "@/components/ui/button";

const PROJECT_TYPE_MAPPING = [
	{
		type: "script-to-title",
		text: "Script to Title",
	},
	{
		type: "script-to-description",
		text: "Script to Description",
	},
	{
		type: "script-to-thumbnail",
		text: "Script to Thumbnail",
	},
	{
		type: "script-validation",
		text: "Script Validation",
	},
	{
		type: "FaHashtag-to-hashtags",
		text: "Script to Hashtags",
	},
	{
		type: "title-to-thumbnail",
		text: "Title to Thumbnail",
	},
	{
		type: "title-to-description",
		text: "Title to Description",
	},
	{
		type: "video-to-hashtags",
		text: "Video to Hashtags",
	},
	{
		type: "video-to-description",
		text: "Video to Description",
	},
	{
		type: "video-to-title",
		text: "Video to Title",
	},
	{
		type: "text-to-image",
		text: "Text to Image",
	},
	{
		type: "text-to-speech",
		text: "Text to Speech",
	}
]

function ProjectCard(data) {
	const projectTypeName = PROJECT_TYPE_MAPPING.find((typeObj) => {
		return typeObj.type === data.type
	})

	const restoreProject = async () => {
		await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${data._id}/restore`,
			{
				method: "POST",
				headers: {
					"auth-token": localStorage.getItem("auth-token") || ""
				}
			}
		)

		data.onDelete()
	}

	return (
		<Card className={"hover:scale-105 transition-all"}>
			<CardHeader>
				<CardTitle>
					<div className='flex flex-row justify-between items-center'>
						{data.name}
						<Button onClick={restoreProject} variant={"secondary"}>
							<MdRecycling color='green'/>
						</Button>
					</div>
				</CardTitle>
				<hr/>
			</CardHeader>
			<CardContent className={"flex flex-col justify-between gap-4 items-center"}>
				{projectTypeName ? (
					<span className={"text-bold text-primary"}>
						{projectTypeName.text}
					</span>
				) : (null)}
				<span
					className={"text-slate-500 text-sm"}>Updated {new Date(data.lastUpdatedTimestamp).toLocaleDateString()}</span>
				<Link href={`/${data.type}?projectId=${data._id}`}>
					<Button variant={"secondary"} className={"flex-grow w-full"}>
						Visit Project
					</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

export default function Home() {
	const {auth} = store()
	const [userProjects, setUserProjects] = useState([])

	const [sortBy, setSortBy] = useState("name")

	const [searchTerm, setSearchTerm] = useState("")

	const fetchProjects = async () => {
		const fetchResp = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/trash`,
			{
				headers: {
					"auth-token": window.localStorage.getItem("auth-token") || ""
				}
			}
		)

		if (fetchResp.ok) {
			const {projects} = await fetchResp.json()
			setUserProjects(projects)
		}
	}

	useEffect(() => {
		if (!auth) return

		fetchProjects()
	}, [auth])

	const sortAlgs = {
		date: (prevProj, newProj) => {
			return (
				new Date(prevProj.lastUpdatedTimestamp) <= new Date(newProj.lastUpdatedTimestamp)
			)
		},
		name: (prevProj, newProj) => {
			return prevProj.name >= newProj.name
		}
	}

	return (

		<div className='flex flex-col gap-4'>
			<div className='flex flex-col py-10 px-10 min-h-[200vh] gap-4'>
				<div className='flex  flex-row gap-5'>
					<Input type="text" placeholder="Search" value={searchTerm}
						   onChange={(e) => setSearchTerm(e.target.value)} className="w-full"/>
					<Select value={sortBy} onValueChange={(e) => setSortBy(e)}>
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
				</div>
				<div className={"grid grid-cols-3 gap-4"}>
					{
						userProjects.filter((projObj) => {
							return searchTerm === "" || projObj.name.includes(searchTerm)
						}).sort(sortAlgs[sortBy]).map((userProj, projIndex) => {
							return (
								<ProjectCard {...userProj} key={userProj._id} onDelete={fetchProjects}/>
							)
						})
					}
				</div>
			</div>
		</div>)
}
