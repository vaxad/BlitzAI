import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function profile() {
    return (
        <div className='flex flex-col py-10 px-10 '>

            <div className='text-3xl font-bold'>Personal Information</div>
            <div className='py-4 border-b w-full flex border-slate-700'></div>
            <div className="space-y-4 py-3">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">Full name</Label>
                        <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Email</Label>
                        <Input id="last-name"  />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">Instagram</Label>
                        <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Twitter</Label>
                        <Input id="last-name"  />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">Facebook</Label>
                        <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Youtube</Label>
                        <Input id="last-name"  />
                    </div>
                </div>
                <Button className="w-fit" type="submit">
            Save Changes
          </Button>
            </div>
        </div>
    )
}
