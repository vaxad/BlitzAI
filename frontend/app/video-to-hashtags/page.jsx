"use client"
import {useEffect, useState} from "react"
import Head from "next/head"
import ProjectModal from "@/app/components/ProjectModal";
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {getProjectById, getReadonlyURL, manageMedia, updateProject} from "@/lib/utils";
import {toast} from "sonner"
import store from "@/lib/zustand";
import {Button} from "@/components/ui/button";

export default function VideoToHashtags() {
	const [projectId, setProjectId] = useState("")
	const [projectName, setProjectName] = useState("")
	const [projectCreated, setProjectCreated] = useState(false)
	const [inputFile, setInputFile] = useState(null)
	const [videoURL, setVideoURL] = useState("")
	const [projectOutput, setProjectOutput] = useState("")


	const navigate = useRouter()

	const {auth, user} = store()

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


	const generateVideoHashtags = async () => {
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
				if (output.transcript) {
					const transcriptData = new FormData()
					transcriptData.append("text", output.transcript)
					transcriptData.append("no_words", 10)

					const transcriptToHashtagRes = await fetch(
						`${process.env.NEXT_PUBLIC_FLASK_URL}/createHashTagsfromDescription`,
						{
							method: "POST",
							redirect: "follow",
							body: transcriptData
						}
					)

					if (transcriptToHashtagRes.ok) {
						const {result} = await transcriptToHashtagRes.json()

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
		}
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
			const vidUrl = await getReadonlyURL(`/users/${user._id}/projects/${projectId}`)
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
					Video to Hashtags
				</title>
			</Head>
			{
				!projectCreated ? (
					<ProjectModal
						projectType={"video-to-hashtags"}
						onProjectCreate={onProjectCreate}
					/>
				) : (
					<div className={"flex flex-grow h-[90vh] flex-col justify-center gap-8 p-4 items-center"}>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								generateVideoHashtags()
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
								<Button type={"submit"}>Generate Hashtags</Button>
								<hr/>
								{
									projectOutput.length > 0 ? (
										<>
											<h3 className={"font-bold text-3xl"}>
												Generated Hashtags -
											</h3>
											{
												projectOutput.split(" ").map((hashTag) => {
													return (
														<Button variant={"secondary"} key={hashTag}>{hashTag}</Button>
													)
												})
											}
										</>
									) : (
										null
									)
								}
							</div>
						</form>
					</div>
				)
			}
		</>
	)
}