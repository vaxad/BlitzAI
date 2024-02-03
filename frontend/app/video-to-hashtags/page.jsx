"use client"
import {useState} from "react"
import Head from "next/head"
import ProjectModal from "@/app/components/ProjectModal";

export default function VideoToHashtags() {
	const [projectId, setProjectId] = useState("")
	const [projectName, setProjectName] = useState("")
	const [projectCreated, setProjectCreated] = useState(false)
	const [inputFile, setInputFile] = useState(null)


	return (
		<>
			<Head>
				<title>
					Video to Hashtags
				</title>
			</Head>
			<div className={"flex flex-grow h-[90vh] flex-col justify-center gap-4 items-center"}>
				{
					!projectCreated ? (
						<ProjectModal
							projectType={"video-to-hashtags"}
							onProjectCreate={({projectName, projectType, id}) => {
								setProjectCreated(true)
								setProjectName(projectName)
								setProjectId(id)
							}}
						/>
					) : (
						<>
							<span className={"text-4xl"}>{projectName}</span>
							<hr/>
						</>
					)
				}
			</div>
		</>
	)
}