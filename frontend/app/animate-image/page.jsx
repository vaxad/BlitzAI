import React from 'react'

export default function page() {
    return (
        <div className=' flex flex-col justify-start items-center min-h-[90vh] p-8'>
      <div className={"flex flex-col gap-4 w-full"}>
					<div className={"flex flex-row gap-4 items-center w-full"}>
						
						<span className={"text-3xl font-bold"}>
									{`Animate your Images`}
								</span>
					</div>
					<hr/>
      <iframe
        src="https://multimodalart-stable-video-diffusion.hf.space"
        frameborder="0"
        className=' w-full min-h-[70vh]'
      ></iframe>
      </div>
    </div>
    )
}
