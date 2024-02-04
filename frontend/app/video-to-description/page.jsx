"use client"
import {useEffect, useState} from "react"
import Head from "next/head"
import ProjectModal from "@/app/components/ProjectModal";
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {getProjectById, getReadonlyURL, manageMedia, updateProject} from "@/lib/utils";
import {toast} from "sonner"
import store from "@/lib/zustand";
import { Textarea } from "@/components/ui/textarea"

import {Button} from "@/components/ui/button";

export default function VideoToDescriptions() {
	const [projectId, setProjectId] = useState("")
	const [projectName, setProjectName] = useState("")
	const [projectCreated, setProjectCreated] = useState(false)
	const [inputFile, setInputFile] = useState(null)
	const [videoURL, setVideoURL] = useState("")
	const [projectOutput, setProjectOutput] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useRouter()

	const {auth, user, demoEnv, demoDelayMs} = store()

	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.get("projectId")) {
			setProjectCreated(true);
			const projectId = searchParams.get("projectId")

			getProjectById(projectId).then((responseData) => {
				if (responseData == null) {
					toast("Failed to load project!")
					setTimeout(
						() => {
							navigate.push("/dashboard")
						},
						5000
					)
				} else {
					const {_id, name, type, input, inputType, output, outputType} = responseData
					setProjectName(name)
					setProjectId(_id)
					setVideoURL(input || "")
					setProjectOutput(output || "")
				}
			})
		}
	}, [navigate, searchParams]);


	const generateVideoDescription = async () => {
		setIsLoading(true)

		if (demoEnv) {
			setTimeout(() => {
				setIsLoading(false)
				setProjectOutput("Hold up, is this monitor cheating? This monitor is telling you when there's an enemy just off of screen. How? Well, it's using AI to take a look at your mini-map and putting a marker on the edge of your screen where that person's located. So technically, it's not taking any information that isn't already available for you on screen. The AI chip is going to allow us to process information that's on our screen and make cool little macros like this. The LED bar at the bottom can even represent your health meter. What do you think? Is it cheating?")
			}, demoDelayMs)
			return
		}

		if (inputFile) {
			const formData = new FormData()
			formData.append("audio", inputFile)

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_FLASK_URL}/getTranscipt`,
				{
					method: "POST",
					redirect: "follow",
					body: formData
				}
			)

			if (res.ok) {
				const output = await res.json()
				const result = output.transcript

				setIsLoading(false)
				setProjectOutput(result)
				await updateProject({
					id: projectId,
					input: videoURL,
					inputType: "video",
					output: result,
					outputType: "text"
				})
			}
		}
	}
	const handleDiscard = () => {
		setProjectOutput ("")
	}

	const onProjectCreate = ({projectName, projectType, id}) => {
		setProjectCreated(true)
		setProjectName(projectName)
		setProjectId(id)
		updateProject({
			id,
			inputType: "video",
			input: "",
			outputType: "text",
			output: ""
		})
	}

	const onFileChange = async (e) => {
		e.preventDefault()
		if (!auth || !user) {
			return
		}
		const newInputFile = e.target.files[0] || null
		setInputFile(newInputFile)
		if (newInputFile === null) return

		const [isSuccess] = await manageMedia(
			[newInputFile],
			{
				requestMethods: ["PUT"],
				keygenFn: (fileObj, fileIdx) => {
					return `users/${user._id}/projects/${projectId}`
				}
			}
		)

		if (isSuccess) {
			const vidUrl = await getReadonlyURL(`users/${user._id}/projects/${projectId}`)
			await updateProject({
				id: projectId,
				input: vidUrl,
				inputType: "video",
				output: "",
				outputType: 'text'
			})
			setVideoURL(vidUrl)
		}
	}

	return (
		<>
			<Head>
				<title>
					Video to Description
				</title>
			</Head>
			{
				!projectCreated ? (
					<ProjectModal
						projectType={"video-to-description"}
						onProjectCreate={onProjectCreate}
					/>
				) : (
					<div className={"flex flex-grow min-h-[90vh] flex-col justify-center p-4 items-center"}>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								generateVideoDescription()
							}}
							className={"p-8 w-full flex flex-col flex-grow gap-8"}
						>
							<h3 className={"font-bold text-3xl"}>{projectName}</h3>
							<hr/>
							<div className={"flex flex-col flex-grow gap-4"}>
								<label htmlFor={"video-picker"}>
									Select Video<span className={"text-red-400"}>*</span>
								</label>
								<Input
									id={"video-picker"}
									type={"file"}
									accept={"video/*"}
									onChange={onFileChange}
								/>
								{
									videoURL ? (
										<video controls className={"max-h-[30vh]"}>
											<source src={videoURL}/>
											Your browser does not support HTML5 Video
										</video>
									) : (
										null
									)
								}
								<Button type={"submit"}>Generate Description</Button>
								
							</div>
						</form>
						<hr/>
						{projectOutput.length ? (
							<div className={"w-full flex flex-col px-7 gap-4"}>
								<Textarea value={projectOutput} rows={8} />
								<hr className="col-span-4"/>
						<div className=" col-span-4 flex flex-row justify-between w-full items-center">
							<Button onClick={() => { handleDiscard() }} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={(e) => {navigator.clipboard.writeText(projectOutput);toast("Description copied successfully")}}>Copy to
									Clipboard</Button>
						</div>
							</div>
						) : (
							null
						)}
					</div>
				)
			}
		</>
	)
}