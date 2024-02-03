"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FaArrowLeft} from "react-icons/fa";
import {Textarea} from "@/components/ui/textarea";
import {useRouter} from "next/navigation"

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [projectScript, setProjectScript] = useState("")

	const navRouter = useRouter()


	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-center items-center"}>

			<form onSubmit={createNewProject} className={"flex-grow w-full p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						<Button
							onClick={(e) => {
								e.preventDefault()
								navRouter.push("/dashboard")
							}}
						>
									<span className={"flex flex-row gap-4 items-center"}>
										<FaArrowLeft/> Back
									</span>
						</Button>
						<span className={"text-3xl font-bold"}>
									{`Let's start with your Title`}
								</span>
					</div>
					<hr/>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-title"}>
									<span>Title
										<span className={"text-red-400"}>*</span>
									</span>
						</label>
						<div className={"flex flex-row gap-4 items-center flex-grow"}>
							<Input
								id={"project-title"}
								value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
								placeholder={"Your Title"}
							/>
						</div>
					</div>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-script"}>
									<span>Your Script
										<span className={"text-red-400"}>*</span>
									</span>
						</label>
						<div className={"flex flex-row gap-4 items-center"}>
							<Textarea
								id={"project-script"}
								value={projectScript} onChange={(e) => setProjectScript(e.target.value)}
								placeholder={"Your Script"}
							/>
							<Button className={"flex-grow"}>
								{projectScript === "" ? "Generate Script" : "Re-Generate Script"}
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}