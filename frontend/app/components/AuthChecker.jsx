"use client"
import React, {useEffect} from 'react'
import store from '../../lib/zustand'
import {usePathname, useRouter} from 'next/navigation';

export default function AuthChecker() {
	const {setUser, user, auth, setAuth, Logout} = store()
	const navigate = useRouter()
	const location = usePathname()
	const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
	const getMe = async (token) => {
		const res = await fetch(`${backend_url}/auth/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": token
			}
		})
		const data = await res.json()
		if (data.user) {
			setAuth(true)
			setUser(data.user)
		} else {
			localStorage.removeItem("auth-token")
			setAuth(false)
		}

	}
	useEffect(() => {
		const t=localStorage.getItem("auth-token")
		console.log(t)
		if (t) {
			console.log("hii")
			if(location.includes("auth")){
				navigate.push("/dashboard")
			}
			const token = localStorage.getItem('auth-token')
			if (token)
				getMe(token)
			else{
				localStorage.removeItem("auth-token")
				Logout()
			}
		} else {
			if(auth)
			setAuth(false)
			if (!location.includes("auth") && location !== "/") {
				navigate.push("/auth")
			}
		}
	}, [auth, location])

	return (
		<></>
	)
}
