import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHashtag, FaLock } from "react-icons/fa";
import { IoArrowRedo } from "react-icons/io5";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { CardStackIcon, CardStackPlusIcon } from "@radix-ui/react-icons";

export default function Home() {
	const imgs = [
		"https://img.icons8.com/color/128/nextjs.png",
		"https://img.icons8.com/external-soleicons-solid-amoghdesign/128/external-react-native-soleicons-solid-vol-1-soleicons-solid-amoghdesign.png",
		"https://img.icons8.com/color/128/tailwindcss.png",
		"https://img.icons8.com/color/128/vue-js.png",
		"https://img.icons8.com/doodle/128/svetle.png"
	]
	return (
		<main
			className="flex absolute top-[80px] left-0 min-h-screen flex-col items-center justify-center px-12 bg-slate-100 dark:bg-black  selection:bg-violet-300 text-slate-950 dark:text-slate-100">
			{/* <Navbar/> */}
			{/* <div className=" rounded-full w-full h-[100vw] absolute top-0 bottom-0 right-0 m-auto translate-y-1/2 left-0 -z-0 opacity-65" style={{ background: "rgb(102,0,255)", background: "radial-gradient(circle, rgba(102,0,255,1) 0%, rgba(208,75,255,1) 100%)" }}></div> */}
			<div className={`flex flex-col mt-[8vh]  h-full justify-center items-center z-0`}>
				<div className={`h-fit flex flex-col justify-center gap-4 items-center`}>
					<div className={`flex flex-row justify-center items-center gap-4 `}>
						<h1 className={`md:text-6xl text-3xl font-semibold text-white`}>
							<span className="text-primary font-extrabold">Blitz AI</span> - Automate your content creation.</h1>

					</div>
					<p className={" md:w-2/3 w-10/12 md:text-lg text-sm font-bold break-words text-center"}>
						Welcome to Blitz AI, your all-in-one content creation hub! Seamlessly transform your ideas into captivating visuals with our intuitive features. From generating catchy hashtags to creating stunning thumbnails, crafting engaging titles, and even generating video captions – we've got you covered. Explore the endless possibilities of content ideation and bring your projects to life effortlessly. Join now and unleash your creativity!</p>
					<div className=" flex md:flex-row flex-col justify-center items-center">
						<Link href="/dashboard">
							<Button>
								<div className="flex flex-row gap-2 items-center">
									Get Started
									<IoArrowRedo />
								</div>

							</Button>
						</Link>

					</div>
				</div>
			</div>
			<div className="flex w-full px-20 py-10 flex-row gap-7">
				<Card>
					<CardHeader>
						<CardTitle>Effortless Hashtag Generation</CardTitle>
						<hr></hr>
						<CardDescription>Instantly enhance your video's discoverability with our advanced AI-driven algorithm. Effortlessly generate search-friendly hashtags that boost your content's reach and engagement.</CardDescription>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Dynamic Video Descriptions</CardTitle>
						<hr></hr>
						<CardDescription>Unleash the power of automation to craft compelling video descriptions. Our platform analyzes your content, extracts key insights, and generates captivating descriptions that grab your audience's attention.</CardDescription>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Engaging Caption Creation</CardTitle>
						<hr></hr>
						<CardDescription>Elevate your video storytelling with our AI-powered caption generator. Craft engaging and search-friendly captions that captivate your audience, making your content more shareable and memorable.</CardDescription>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Intuitive Thumbnail Design</CardTitle>
						<hr></hr>
						<CardDescription>Say goodbye to generic thumbnails! Transform your video titles into eye-catching visuals effortlessly. Our platform creates intuitive thumbnails that entice viewers and increase click-through rates for your content.</CardDescription>
					</CardHeader>
				</Card>
			</div>
			<div className="flex flex-row gap-10">
				<div className="flex flex-col gap-10">
					Instant Video Production
					<p>Our platform seamlessly transforms this captivating title into a stunning video. Watch as we generate search-friendly descriptions, eye-catching thumbnails, and engaging captions, all with the click of a button. Experience the magic of content creation simplified from title to video, we've got you covered.</p>
				</div>

			</div>

		</main>
	);
}
