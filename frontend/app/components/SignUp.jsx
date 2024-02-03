import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export default function SignUp() {
  return (
    <div className="flex items-center justify-center w-fit">
      <Card>
        <CardContent>
          <div className="space-y-4 w-[60vh]">
            <div className="space-y-1">
              <h2 className="text-3xl y-2 pt-5 font-bold">Sign Up</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
               Enter your details to Sign in.
              </p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Full name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
              
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Password</Label>
                <Input id="password" placeholder="Enter your password" type="password" />
              </div>
              <Button>Sign Up</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

