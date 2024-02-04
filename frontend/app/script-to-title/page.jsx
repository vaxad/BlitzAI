"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation"
import {toast} from "sonner";
import Loader from "../components/Loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import store from "@/lib/zustand";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [num, setNum] = useState("10")
	const [img, setImg] = useState(null)
	const [loading, setLoading] = useState(false)
	const navRouter = useRouter()

	const {demoEnv, demoDelayMs} = store()

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (projectTitle.length < 3) {
			toast("Enter a valid script")
			return
		}

		if (demoEnv) {
			setTimeout(() => {
				setLoading(false)
				setImg("Journey Through the Solar System: From the Sun to Dwarf Planets")
			}, demoDelayMs)
			return
		}

		const formData = new FormData()
		formData.append("text", projectTitle)
		formData.append("no_words", num)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/createTitlefromDescription`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
		const data = await res.json()
		console.log(data)

		if (data.result) {
			setImg(data.result)
		} else {
			toast("An error occured")
		}
		setLoading(false)
	}

	function downloadImage() {
		try {
			navigator.clipboard.writeText(img);
			toast("Title copied successfully")
		} catch (error) {
			toast("An error occured")
		}
	}

	const handleDiscard = () => {
		setImg(null)
	}
	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-start  items-center"}>
			<form onSubmit={(e) => {
				handleSubmit(e)
			}} className={"flex-grow w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						
						<span className={"text-3xl font-bold"}>
							{`Generate video title from your script`}
						</span>
					</div>
					<hr/>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-title"}>
							<span>Script
								<span className={"text-red-400"}>*</span>
							</span>
						</label>
						<div className={"flex flex-row gap-4 items-start flex-grow"}>
							<Textarea
								id={"project-title"} rows={15} value={projectTitle}
								onChange={(e) => setProjectTitle(e.target.value)} placeholder={"Your Script"}
								className="w-full rounded-lg "></Textarea>

							<Select value={num} onValueChange={setNum}>
								<SelectTrigger className="w-fit">
									<SelectValue className=" w-fit" placeholder="Number of words"/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={"8"}>8 words</SelectItem>
									<SelectItem value={"10"}>10 words</SelectItem>
									<SelectItem value={"15"}>15 words</SelectItem>
								</SelectContent>
							</Select>
						</div>

					</div>
					<Button type="submit">
						{img ? "Regenerate Title" : "Generate Title"}
					</Button>
				</div>
			</form>
			{!loading ?
				img ?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						<Input
							value={img} onChange={(e) => setImg(e.target.value)}
							placeholder={"Your Title"}
						/>
						<div className=" flex flex-row justify-between w-full items-center">
							<Button onClick={() => {
								handleDiscard()
							}} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={() => {
								downloadImage()
							}}>Copy</Button>
						</div>
					</div> :
					<></> :
				<Loader/>}
		</div>
	)
}