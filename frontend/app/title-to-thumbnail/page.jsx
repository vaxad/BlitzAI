"use client"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation"
import {toast} from "sonner";
import Loader from "../components/Loader";
import store from "@/lib/zustand";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [img, setImg] = useState("")
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
				setImg("/assets/presets/t2t.png")
			}, demoDelayMs)
			return
		}

		const formData = new FormData()
		formData.append("title", projectTitle)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/generateThumbnailfromTitle`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
		const data = await res.json()
		console.log(data)

		if (data.result_url) {
			setImg(data.result_url)
		} else {
			toast("An error occured")
		}
		setLoading(false)
	}

	function downloadImage() {
		try {

			var imageUrl = img
			console.log("download started")
			// var xhr = new XMLHttpRequest();
			// xhr.open('GET', imageUrl, true);
			// xhr.responseType = 'blob';

			// xhr.onload = function() {
			// var blob = xhr.response;
			var link = document.createElement('a');
			link.href = imageUrl;
			link.target = "_blank"
			link.download = `${projectTitle}.jpg`;
			link.click();
			// };

			// xhr.send();

		} catch (error) {
			toast("An error occured")
		}
	}

	const handleDiscard = () => {
		setImg("")
	}
	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-start  items-center"}>
			<form onSubmit={(e) => {
				handleSubmit(e)
			}} className={"flex-grow w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						
						<span className={"text-3xl font-bold"}>
									{`Generate Thumbnail from Title`}
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
					<Button type="submit">
						{img ? "Regenerate Thumbnail" : "Generate Thumbnail"}
					</Button>
				</div>
			</form>
			{!loading ?
				img ?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
						<img className="w-full rounded-lg " src={img} alt=""/>
						<div className=" flex flex-row justify-between w-full items-center">
							<Button onClick={() => {
								handleDiscard()
							}} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={() => {
								downloadImage()
							}}>Download</Button>
						</div>
					</div> :
					<></> :
				<Loader/>}
		</div>
	)
}