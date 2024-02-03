"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Card className="w-fit ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
        <CardDescription>Enter your username and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" placeholder="Enter your email" required type="email" />
          </div>
          <div className="relative space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} id="password" required type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center">
            <Checkbox id="remember-me" />
            <Label className="ml-2" htmlFor="remember-me">
              Remember me
            </Label>
          </div>
          <Button className="w-fit" type="submit">
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

