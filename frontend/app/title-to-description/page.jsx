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
	const [num, setNum] = useState("100")
	const [img, setImg] = useState(null)
	const [loading, setLoading] = useState(false)
	const navRouter = useRouter()

	const {demoEnv, demoDelayMs} = store()

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (projectTitle.length < 3) {
			toast("Enter a valid title")
			return
		}


		if (demoEnv) {
			setTimeout(() => {
				setLoading(false)
				setImg("Join us on an epic voyage as we travel \"Through the Solar System: From the Sun to Dwarf Planets.\" In this video, we guide explorers towards an exciting interstellar journey, starting from the blazing sun and ending at the mysterious dwarf planets. Offering enlightening facts about each celestial body we pass by, we demystify space and its intricacies. We'll unlock the secrets of our solar system, drenched in awe-inspiring visuals and simplified scientific explanations. A captivating educational experience awaits you. This visual treat is perfect for every space enthusiast. Be prepared to dive into the enchanting universe!")
			}, demoDelayMs)
			return
		}

		const formData = new FormData()
		formData.append("text", projectTitle)
		formData.append("no_words", num)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/createDescriptionfromTitle`, {
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
			toast("Description copied successfully")
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
							{`Generate Video Description from Video Title`}
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
							<Select value={num} onValueChange={setNum}>
								<SelectTrigger className="w-fit">
									<SelectValue className=" w-fit" placeholder="Number of words"/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={"100"}>100 words</SelectItem>
									<SelectItem value={"200"}>200 words</SelectItem>
									<SelectItem value={"300"}>300 words</SelectItem>
									<SelectItem value={"400"}>400 words</SelectItem>

								</SelectContent>
							</Select>
						</div>

					</div>
					<Button type="submit">
						{img ? "Regenerate Description" : "Generate Description"}
					</Button>
				</div>
			</form>
			{!loading ?
				img ?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						<Textarea rows={15} className="w-full rounded-lg " value={img} onChange={(e) => {
							setImg(e.target.value)
						}}></Textarea>
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