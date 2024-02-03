"use client"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import Link from "next/link"
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {toast} from "sonner"
import store from "@/lib/zustand"

import {useRouter} from "next/navigation"

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const {setAuth} = store()

	const router = useRouter()

	const handleLogin = async (e) => {
		e.preventDefault()
		if (password.length < 6) {
			toast("Password should be atleast 6 characters long")
			return
		}
		if (email.length < 3) {
			toast("Enter a valid email address")
			return
		}
		const url = process.env.NEXT_PUBLIC_BACKEND_URL
		const res = await fetch(`${url}/auth/login`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({email, password})
		})
		const data = await res.json()
		if (data.error || data.errors) {
			console.log(data.error)
			toast(data.error.length > 0 ? data.error : "An error occured")
		} else {
			setAuth(true)
			localStorage.setItem("auth-token", data.authToken)
			toast("Logged in successfully")
			router.push("/dashboard")
		}
	}
	return (
		<Card className="w-fit ">
			<CardHeader className="space-y-1">
				<CardTitle className="text-3xl font-bold">Login</CardTitle>
				<CardDescription>Enter your email and password to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={(e) => {
					handleLogin(e)
				}} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input value={email} onChange={(e) => {
							setEmail(e.target.value)
						}} id="email" placeholder="Enter your email" required type="email"/>
					</div>
					<div className="relative space-y-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link className="ml-auto inline-block text-sm underline" href="#">
								Forgot your password?
							</Link>
						</div>
						<Input value={password} onChange={(e) => {
							setPassword(e.target.value)
						}} id="password" required type="password" placeholder="Enter your password"/>
					</div>
					<div className="flex items-center">
						<Checkbox id="remember-me"/>
						<Label className="ml-2" htmlFor="remember-me">
							Remember me
						</Label>
					</div>
					<Button className="w-fit" type="submit">
						Login
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

