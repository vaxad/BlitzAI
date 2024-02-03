"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useCallback, useState} from "react";
import store from "@/lib/zustand"
import {toast} from "sonner"
import {createProject} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function ProjectModal({projectType, onProjectCreate}) {
	const [projectName, setProjectName] = useState("")
	const {auth} = store()

	const createNewProject = useCallback(async (e) => {
		e.preventDefault()

		if (!auth) {
			toast("You are not authenticated!")
			return null
		}

		const createStatus = await createProject({projectName, projectType})

		if (createStatus) {
			onProjectCreate({projectName, projectType, id: createStatus})
		}

		return createStatus
	}, [auth, onProjectCreate, projectName, projectType])

	return (
		<Card>
			<CardHeader>
				<CardTitle className={"text-4xl font-bold"}>Let&apos;s Get Started</CardTitle>
				<span>Enter a project name, concise and recognisable.</span>
			</CardHeader>
			<hr/>
			<CardContent>
				<form
					onSubmit={createNewProject}
					className={"p-4 flex flex-col gap-4 flex-grow justify-around"}
				>
					<div className={"flex flex-grow flex-col gap-2"}>
						<label htmlFor={"project-name"}>
							<b>Project Name<span className={"text-red-400"}>*</span></b>
						</label>
						<Input
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
						/>
					</div>
					<Button type={"submit"}>Let&apos;s Go!</Button>
				</form>
			</CardContent>
		</Card>
	)
}