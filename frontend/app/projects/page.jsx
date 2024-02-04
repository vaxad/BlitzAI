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
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link"
import {Button} from "@/components/ui/button";

function ProjectCard(data) {
	return (
		<Link href={`/${data.type}?projectId=${data._id}`}>
			<Card className={"hover:scale-105 transition-all"}>
				<CardHeader>
					<CardTitle>
						{data.name}
					</CardTitle>
					<hr/>
				</CardHeader>
				<CardContent className={"flex flex-col justify-between gap-4 items-center"}>
					Last updated on {new Date(data.lastUpdatedTimestamp).toLocaleDateString()}
					<Button variant={"secondary"} className={"flex-grow w-full"}>
						Visit Project
					</Button>
				</CardContent>
			</Card>
		</Link>
	)
}

export default function Home() {
	const {auth} = store()
	const [userProjects, setUserProjects] = useState([])

	useEffect(() => {
		if (!auth) return

		const fetchProjects = async () => {
			const fetchResp = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`,
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

		fetchProjects()
	}, [auth])

	return (

		<div className='flex flex-col gap-4'>
			<div className='flex flex-col py-10 px-10 min-h-[200vh] gap-4'>
				<div className='flex  flex-row gap-5'>
					<Input type="text" placeholder="Search" className="w-full"/>
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
				</div>
				<div className={"grid grid-cols-3 gap-4"}>
					{
						userProjects.map((userProj, projIndex) => {
							return (
								<ProjectCard {...userProj} key={userProj._id}/>
							)
						})
					}
				</div>
			</div>
		</div>)
}
