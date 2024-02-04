"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation"
import {toast} from "sonner";
import Loader from "../components/Loader";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import store from "@/lib/zustand";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [num, setNum] = useState("10")
	const [img, setImg] = useState([])
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
				setImg("#SolarSystem, #SpaceExploration, #Cosmos, #Astronomy, #TerrestrialPlanets, #GasGiants, #AsteroidBelt, #DwarfPlanets, #Universe, #ScienceEducation".split(","))
			}, demoDelayMs)
			return
		}

		const formData = new FormData()
		formData.append("text", projectTitle)
		formData.append("no_words", num)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/createHashTagsfromScript`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
		const data = await res.json()
		console.log(data.result.split(" "))

		if (data.result) {
			setImg(data.result.split(" "))
		} else {
			toast("An error occured")
		}
		setLoading(false)
	}

	function downloadImage() {
		try {
			navigator.clipboard.writeText(img.join(", "));
			toast("Hashtags copied successfully")
		} catch (error) {
			toast("An error occured")
		}
	}

	const handleDiscard = () => {
		setImg([])
	}
	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-start  items-center"}>
			<form onSubmit={(e) => {
				handleSubmit(e)
			}} className={"flex-grow w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						<span className={"text-3xl font-bold"}>
							{`Generate video hashtags from your script`}
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
									<SelectItem value={"5"}>5</SelectItem>
									<SelectItem value={"10"}>10</SelectItem>
									<SelectItem value={"15"}>15</SelectItem>
									<SelectItem value={"20"}>20</SelectItem>
								</SelectContent>
							</Select>
						</div>

					</div>
					<Button type="submit">
						{img ? "Regenerate Hashtags" : "Generate Hashtags"}
					</Button>
				</div>
			</form>
			{!loading ?
				img.length > 0 ?
					<div
						className={"grid grid-cols-4 cursor-pointer gap-5 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						{img.map((val, ind) => {
							return (
								val.length !== 0 ?
									<div onClick={() => {
										navigator.clipboard.writeText(val);
										toast("Hashtag copied successfully")
									}} key={ind}
										 className=" bg-secondary hover:bg-secondary/85 rounded-lg hover:scale-95 transition-all px-3 py-2">
										{val}
									</div> : <></>
							)
						})}
						<div className=" col-span-4 flex flex-row justify-between w-full items-center">
							<Button onClick={() => {
								handleDiscard()
							}} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={() => { downloadImage() }}>Copy all</Button>
						</div>
					</div>
					:
					<></> :
				<Loader/>}
		</div>
	)
}