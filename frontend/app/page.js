import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IoArrowRedo} from "react-icons/io5";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

export default function Home() {
	return (
		<main
			className=" flex absolute top-[80px] left-0 min-h-screen w-full flex-col items-center justify-center px-24 bg-slate-100 dark:bg-black  selection:bg-violet-300 text-slate-950 dark:text-slate-100">
			<div className="flex flex-row gap-10">
				<div className={`flex flex-col mt-[8vh]  h-full justify-center items-center z-0`}>
					<div className={`h-fit flex flex-col justify-center gap-4 items-start`}>
						<div className={`flex flex-row justify-start items-center gap-4 `}>
							<h1 className={`md:text-6xl text-3xl font-semibold w-4/5`}>
								<span className="text-primary font-extrabold">Blitz AI</span> - Automate your content
								creation.</h1>

						</div>
						<p className={" md:text-lg w-full text-sm font-bold break-words text-start"}>
							{"Welcome to BlitzAi, your all-in-one content creation hub! Seamlessly transform your ideas into captivating visuals with our intuitive features. Explore the endless possibilities of content ideation and bring your projects to life effortlessly. Join now and unleash your creativity!"}</p>
						<div className=" flex md:flex-row w-full  flex-col justify-start items-center">
							<Link href="/dashboard">
								<Button>
									<div className="flex w-full flex-row gap-2 font-semibold px-24 items-start">
										Get Started
										<IoArrowRedo/>
									</div>

								</Button>
							</Link>
							{/*
							<Button variant="tertiary">
								<div className="flex flex-row w-full gap-2 font-semibold px-24 items-start">
									Sign In
									<IoArrowRedo />
								</div>

							</Button> */}

						</div>
					</div>
				</div>
				<div className="flex flex-col h-full w-full  pr-14 pt-14 items-center justify-center">
					<img src="/assets/home.png" class="skew-y-12"/>
				</div>
			</div>
			<div className="grid grid-cols-4 w-full px-20 py-10  gap-7">
				<Card className=" hover:scale-105 transition-all col-span-1">
					<CardHeader>
						<CardTitle>Effortless Hashtag Generation</CardTitle>
						<hr></hr>
						<CardDescription>Instantly enhance your video&apos;s discoverability with our advanced AI-driven
							algorithm. Effortlessly generate search-friendly hashtags that boost your content&apos;s
							reach and engagement.</CardDescription>
					</CardHeader>
				</Card>
				<Card className=" hover:scale-105 transition-all col-span-1">
					<CardHeader>
						<CardTitle>Dynamic Video Descriptions</CardTitle>
						<hr></hr>
						<CardDescription>Unleash the power of automation to craft compelling video descriptions. Our
							platform analyzes your content, extracts key insights, and generates captivating
							descriptions that grab your audience&apos;s attention.</CardDescription>
					</CardHeader>
				</Card>
				<Card className=" hover:scale-105 transition-all col-span-1">
					<CardHeader>
						<CardTitle>Engaging Caption Creation</CardTitle>
						<hr></hr>
						<CardDescription>Elevate your video storytelling with our AI-powered caption generator. Craft
							engaging and search-friendly captions that captivate your audience, making your content more
							shareable and memorable.</CardDescription>
					</CardHeader>
				</Card>
				<Card className=" hover:scale-105 transition-all col-span-1">
					<CardHeader>
						<CardTitle>Intuitive Thumbnail Design</CardTitle>
						<hr></hr>
						<CardDescription>Say goodbye to generic thumbnails! Transform your video titles into
							eye-catching visuals effortlessly. Our platform creates intuitive thumbnails that entice
							viewers and increase click-through rates for your content.</CardDescription>
					</CardHeader>
				</Card>
			</div>


		</main>
	);
}
