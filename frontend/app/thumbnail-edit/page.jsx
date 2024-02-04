"use client"
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FaArrowLeft} from "react-icons/fa";
import {useRouter} from "next/navigation"
import { toast } from "sonner";
import Loader from "../components/Loader";
import { useDropzone } from "react-dropzone";

export default function NewProject() {
	const [projectTitle, setProjectTitle] = useState("")
	const [img, setImg] = useState("")
	const [ogimg, setOgImg] = useState("")
	const [loading,setLoading] = useState(false)
	const navRouter = useRouter()
    const [image, setImage] = useState(null);
    const [brushColor, setBrushColor] = useState('#ffffff');
    const [drawing, setDrawing] = useState(false);
    const [eraserMode, setEraserMode] = useState(false);
    const canvasRef = useRef(null);
    function base64toBlob(base64String, mimeType = 'application/octet-stream') {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
      
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
      
        const byteArray = new Uint8Array(byteNumbers);
      
        return new Blob([byteArray], { type: mimeType });
      }
	const handleSubmit = async(e) => {
		setLoading(true)
		e.preventDefault()
		if(projectTitle.length<3){
			toast("Enter a valid title")
			return
		}
		const formData = new FormData()
        const canvas = canvasRef.current
        const mask = await fetch(canvas.toDataURL('image/png'))
        const m = await mask.blob()
        console.log(projectTitle,ogimg,mask)
        const oimg = await fetch(ogimg)
        const i =await oimg.blob()
		formData.append("prompt", projectTitle)
        formData.append("image",i,"image.png")
        formData.append("mask",m,"mask.png")
		console.log(formData)
		const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_URL}/editImagewithPrompt`, {
			method: "POST",
			redirect: 'follow',
			body: formData
		})
		const data = await res.json()
		console.log(data)

		if(data.result_url){
			setImg(data.result_url)
		}else{

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
  
    const onDrop = (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        console.log(reader.result)
        setImage(reader.result);
        setOgImg(reader.result)
      };
  
      reader.readAsDataURL(file);
    };
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    const handleMouseDown = () => {
      setDrawing(true);
    };
  
    const handleMouseUp = () => {
      setDrawing(false);
    };
  
    
    const handleMouseMove = (e) => {
      if (drawing && image) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
  
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = brushColor;
        context.beginPath();
        context.arc(x, y, 10, 0, 2 * Math.PI);
        context.fill();
      }
    };
    const handleDownload = () => {
      const canvas = canvasRef.current;
    //   const downloadLink = document.createElement('a');
    //   downloadLink.href = canvas.toDataURL('image/png');
      canvas.toBlob( async(blob)=>{
        return blob
      })
    //   downloadLink.download = 'edited_image.png';
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    };

    useEffect(() => {
      if (image) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
      
        const img = new Image();
        img.src = image;
  
        img.onload = () => {
          canvas.width = 500;
          canvas.height = img.height*(500/img.width);
  
          context.drawImage(img, 0, 0, 500, img.height*(500/img.width));
        };
      }
    }, [image]);
  
    const handleEraserToggle = () => {
      if (image) {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
        
          const img = new Image();
          img.src = image;
    
          img.onload = () => {
            canvas.width = 500;
            canvas.height = img.height*(500/img.width);
    
            context.drawImage(img, 0, 0, 500, img.height*(500/img.width));
          };
      }
    }
  
    const dropzoneStyle = {
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop: '20px',
      };
	return (
		<div className={"flex flex-grow h-[90vh] flex-col justify-start  items-center"}>
			<form onSubmit={(e)=>{handleSubmit(e)}} className={"flex-grow flex flex-col gap-3 w-10/12 p-4"}>
				<div className={"flex flex-col gap-4"}>
					<div className={"flex flex-col gap-4 items-start pt-10"}>
						
						<h2 className={"text-3xl font-bold"}>
									{`Enhance your Thumbnail`}
								</h2>
					</div>
					<hr/>
					<div className={"flex flex-col gap-2 flex-grow"}>
						<label htmlFor={"project-title"}>
									<span>Prompt
										<span className={"text-red-400"}>*</span>
									</span>
						</label>
                    <Input
								id={"project-title"}
								value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
								placeholder={"Your Prompt"}
							/>
						<div className={"flex flex-row gap-4 items-center flex-grow"}>
                        <div className=" w-full flex flex-col gap-6">
      {!image?<div {...getRootProps()} style={dropzoneStyle} className=' w-full h-[40vh] flex flex-col justify-start items-center'>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the image here...</p> : <p>Drag and drop an image here, or click to select an image</p>}
      </div>:
      <>
    </>}
      {image && (
        <div className="flex flex-row w-full ">
            <div className=" w-full flex flex-col justify-start items-center gap-4">
        {/* <label>
          Brush Color:
          <input type="color" value={brushColor} onChange={handleBrushColorChange} />
        </label> */}
        <h3 className=" w-full text-center font-semibold text-xl">Original Image</h3>
        <img
          src={ogimg}
          className=" w-fit h-full max-h-[30vh] max-w-[30vw]"
          
          style={{ border: '1px solid #000', marginTop: '10px' }}
        />
      </div>
        <div className=" w-full flex flex-col justify-start items-center gap-4">
          {/* <label>
            Brush Color:
            <input type="color" value={brushColor} onChange={handleBrushColorChange} />
          </label> */}
        <h3 className=" w-full text-center font-semibold text-xl">Mask the unwanted part</h3>
          <canvas
            ref={canvasRef}
            className=" w-fit h-full max-h-[30vh] max-w-[30vw]"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ border: '1px solid #000', marginTop: '10px' }}
          />
        </div>
        </div>
      )}
      <div className=" w-full flex flex-row items-center justify-between gap-4">
      <Button type="button" onClick={()=>{handleEraserToggle()}} variant="secondary" className=" w-full">
                      {"Discard changes"}
                  </Button>
      <Button type="submit" className=" w-full">
                      {img?"Regenerate Image":"Generate Image"}
                  </Button>
      </div>
      
    </div>

						</div>
						
					</div>
					
				</div>
			</form>
					{!loading?
					img?
					<div className={"flex flex-col gap-4 items-center justify-center w-10/12 px-4 py-8 flex-grow"}>
							<img className="w-full aspect-video rounded-lg " src={img} alt="" />
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