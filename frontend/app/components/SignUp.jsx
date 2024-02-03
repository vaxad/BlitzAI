"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"
import store from "@/lib/zustand"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setAuth} = store()
  const handleSignup = async(e) => {
    e.preventDefault()
    if(password.length<6){
      toast("Password should be atleast 6 characters long")
      return
    }
    if(name.length<3){
      toast("Name should be atleast 3 characters long")
      return
    }
    if(email.length<3){
      toast("Enter a valid email address")
      return
    }
    console.log(email, password, name)
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const res = await fetch(`${url}/auth/signup`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({name, email, password})
    })
    const data = await res.json()
    if(data.error||data.errors){
      console.log(data.error)
      toast(data.error.length>0?data.error:"An error occured")
    }else{
      setAuth(true)
      localStorage.setItem("auth-token",data.authToken)
      toast("Account created successfully")
    }
  }
  return (
    <div className="flex items-center justify-center w-fit">
      <Card>
        <CardContent>
          <div className="space-y-4 w-[60vh]">
            <div className="space-y-1">
              <h2 className="text-3xl y-2 pt-5 font-bold">Sign Up</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
               Enter your name, email and password to create an account.
              </p>
            </div>
            <form onSubmit={(e)=>{handleSignup(e)}} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Full name</Label>
                  <Input value={name} onChange={(e)=>{setName(e.target.value)}} id="first-name" placeholder="Enter your first name" />
              
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" placeholder="Enter your email" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Password</Label>
                <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" placeholder="Enter your password" type="password" />
              </div>
              <Button className=" w-full" type="submit">Sign Up</Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

