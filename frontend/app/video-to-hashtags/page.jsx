"use client"
import {useEffect, useState} from "react"
import Head from "next/head"
import ProjectModal from "@/app/components/ProjectModal";
import {useRouter, useSearchParams} from "next/navigation";
import {Input} from "@/components/ui/input";
import {getProjectById, updateProject} from "@/lib/utils";
import {toast} from "sonner"

export default function VideoToHashtags() {
	const [projectId, setProjectId] = useState("")
	const [projectName, setProjectName] = useState("")
	const [projectCreated, setProjectCreated] = useState(false)
	const [inputFile, setInputFile] = useState(null)
	const [videoURL, setVideoURL] = useState("")

	const navigate = useRouter()

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
				}
			})
		}
	}, [navigate, searchParams]);


	const generateVideoHashtags = async () => {

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
					<div className={"flex flex-grow h-[90vh] flex-col justify-center gap-4 items-center"}>
						<form
							onSubmit={(e) => e.preventDefault()}
							className={"p-8 w-full flex flex-col flex-grow gap-4"}
						>
							<h3 className={"font-bold text-3xl"}>{projectName}</h3>
							<hr/>
							<div className={"flex flex-col flex-grow gap-2"}>
								<label htmlFor={"video-picker"}>
									Select Video<span className={"text-red-400"}>*</span>
								</label>
								<Input
									id={"video-picker"}
									type={"file"}
									accept={"video/*"}
									onChange={(e) => {
										e.preventDefault()
										setInputFile(e.target.files[0] || null)
									}}
								/>
							</div>
						</form>
					</div>
				)
			}
		</>
	)
}