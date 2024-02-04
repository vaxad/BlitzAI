"use client"
import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation"
import { toast } from "sonner";
import Loader from "../components/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [img, setImg] = useState(null)
    const [tempo,setTempo] = useState("normal")
    const [voice,setVoice] = useState("male")
	const [loading,setLoading] = useState(false)
	const navRouter = useRouter()
    const audioRef = useRef(null);

    const playAudio = (base64Audio) => {
      if (base64Audio) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioData = atob(base64Audio);
        const buffer = new Uint8Array(audioData.length);
  
        for (let i = 0; i < audioData.length; i++) {
          buffer[i] = audioData.charCodeAt(i);
        }
  
        audioContext.decodeAudioData(buffer.buffer, (decodedBuffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = decodedBuffer;
          source.connect(audioContext.destination);
          source.start();
        });
      }
    };
	const handleSubmit = async(e) => {
		setLoading(true)
		e.preventDefault()
		if(projectTitle.length<3){
			toast("Enter a valid title")
			return
		}

		const formData = new FormData()
		formData.append("text", projectTitle)
        formData.append("voice",voice)
        formData.append("tempo",tempo)
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/tts`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
        console.log(res)
		const data = await res.blob()
		console.log(data)
        setImg(window.URL.createObjectURL(data))

		// if(data.){
		// 	setImg(data.result_url)
		// }else{
		// 	toast("An error occured")
		// }
		setLoading(false)
	}
	function downloadImage() {
		try {
			
            const link = document.createElement('a');
            link.href = img
            link.download = 'output.mp3';
            link.click();

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
			<form onSubmit={(e)=>{handleSubmit(e)}} className={"flex-grow w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-row gap-4 items-center pt-10"}>
						
						<span className={"text-3xl font-bold"}>
									{`Convert your Text to Speech`}
								</span>
					</div>
					<hr/>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-title"}>
									<span>Prompt
										<span className={"text-red-400"}>*</span>
									</span>
						</label>
						<div className={"flex flex-row gap-4 items-start flex-grow"}>
							<Textarea rows={15}
								id={"project-title"}
								value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
								placeholder={"Your Text"}
							/>
                            <Select value={voice} onValueChange={setVoice}>
								<SelectTrigger className="w-fit">
									<SelectValue className=" w-fit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={"female"}>Female</SelectItem>
									<SelectItem value={"male"}>Male</SelectItem>
								</SelectContent>
							</Select>
                            <Select value={tempo} onValueChange={setTempo}>
								<SelectTrigger className="w-fit">
									<SelectValue className=" w-fit"/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={"low"}>Low</SelectItem>
									<SelectItem value={"normal"}>Normal</SelectItem>
									<SelectItem value={"high"}>High</SelectItem>
								</SelectContent>
							</Select>
						</div>
						
					</div>
					<Button type="submit">
						{img?"Regenerate Audio":"Generate Audio"}
					</Button>
				</div>
			</form>
					{!loading?
					img?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
							<audio src={img} controls></audio>
							<hr className="col-span-4"></hr>
							<div className=" flex flex-row justify-between w-full items-center">
							<Button onClick={()=>{handleDiscard()}} variant="secondary" className=" w-fit">Discard</Button>
							{/* <a className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90" href={img} download="Varad's Resume">Download</a> */}
							<Button onClick={()=>{downloadImage()}}>Download</Button>
							</div>
						</div>:
						<></>:
						<Loader/>}
		</div>
	)
}