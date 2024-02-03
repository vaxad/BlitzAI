"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowLeft, FaCheck, FaCross } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineCheck } from "react-icons/md";
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import Loader from "../components/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [num, setNum] = useState("10")
	const [img, setImg] = useState(null)
	const [loading, setLoading] = useState(false)
	const navRouter = useRouter()
	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (projectTitle.length < 3) {
			toast("Enter a valid script")
			return
		}

		const formData = new FormData()
		formData.append("text", projectTitle)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/validateMadeforKidsfromSummary`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
		const data = await res.json()
		console.log(data)

		if (data.result) {
			setImg(JSON.parse(data.result))
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
			<form onSubmit={(e) => { handleSubmit(e) }} className={"flex-grow w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						
						<span className={"text-3xl font-bold"}>
							{`Validate Video Script for Age Restriction`}
						</span>
					</div>
					<hr />
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-title"}>
							<span>Script
								<span className={"text-red-400"}>*</span>
							</span>
						</label>
						<div className={"flex flex-row gap-4 items-start flex-grow"}>
							<Textarea
								id={"project-title"} rows={15} value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder={"Your Script"} className="w-full rounded-lg "></Textarea>
						</div>

					</div>
					<Button type="submit">
						{img ? "Revalidate Script" : "Validate Script"}
					</Button>
				</div>
			</form>
			{!loading ?
				img ?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						{img.isKidsSafe ?
							<div className=" flex gap-3 p-3 w-full rounded-lg dark:bg-green-700 bg-green-200 flex-row">
								<div className="flex flex-col justify-center items-center">
									<div className="  h-8 w-8  rounded-full">
										<MdOutlineCheck className="h-full w-full text-green-500 " />
									</div>
								</div>
								<div className=" flex flex-col justify-center items-start">
									<h2 className=" font-semibold text-xl">{"Yes! This video is safe for kids."}</h2>
									<p>{`Values learnt: ${img.valuesLearntfromvideo.join(", ")}.`}</p>
								</div>
							</div> : 
							<div className=" flex w-full gap-3 p-3 rounded-lg dark:bg-red-700 bg-red-200 flex-row">
							<div className="flex flex-col justify-center items-center">
								<div className="  h-8 w-8 rounded-full">
									<MdOutlineCancel className="h-full text-red-500 w-full " />
								</div>
							</div>
							<div className=" flex flex-col justify-center items-start">
								<h2 className=" font-semibold text-xl">{"Unfortunately, This video is not safe for kids!"}</h2>
								<p>{`Make sure you dont use cuss words in your videos.`}</p>
							</div>
						</div> }
						<div className=" flex flex-row justify-between w-full items-center">
							{/* <Button onClick={() => { handleDiscard() }} variant="secondary" className=" w-fit">Discard</Button>
							<Button onClick={() => { downloadImage() }}>Copy</Button> */}
						</div>
					</div> :
					<></> :
				<Loader />}
		</div>
	)
}