import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ui/theme-provider"
import Navbar from "./components/Navbar";
import {Toaster} from "@/components/ui/sonner"
import AuthChecker from "./components/AuthChecker";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
	title: "Blitz AI",
	description: "Automate your content creation.",
};

export default function RootLayout({children}) {
	return (
		<html lang="en">
		<body id="style-2" className={inter.className}>
		<AuthChecker/>
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		><Navbar>
		</Navbar>
			<div className=" ml-64 mt-20">
				{children}
				<Toaster/>
			</div>
		</ThemeProvider></body>
		</html>
	);
}
