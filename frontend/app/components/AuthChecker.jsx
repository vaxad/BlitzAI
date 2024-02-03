import React, {useEffect} from 'react'
import store from '../lib/zustand'
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthChecker() {
	const {setUser, user, auth, backend_url, setAuth, Logout} = store()
  const navigate = useNavigate()
  const location = useLocation()
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
      if(data.user.prefers.length===0&&data.user.avoids.length===0&&data.user.allergies.length===0){
        navigate("/onboarding")
      }
			setUser(data.user)
		}

	}
	useEffect(() => {
    console.log(location.pathname)
		if (auth) {
			const token = localStorage.getItem('auth-token')
			if (token)
				getMe(token)
			else
				Logout()
		}else{
      console.log(location.pathname!==("/"))
      if(!location.pathname.includes("login")&&!location.pathname.includes("signup")&&location.pathname!=="/"){
        navigate("signup")
      }
    }
	}, [auth, location.pathname])

	return (
		<></>
	)
}
