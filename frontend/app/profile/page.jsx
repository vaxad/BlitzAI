"use client";

import React from 'react'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import store from "@/lib/zustand"
import Link from "next/link";

export default function profile() {
	const {user} = store()

	return (
		<div className='flex flex-col gap-4 py-10 px-10 '>

			<div className='text-3xl font-bold'>Personal Information</div>
			<hr/>
			<div className="flex flex-col flex-grow gap-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="first-name">Full name</Label>
						<Input id="first-name" value={user?.name || ""}/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="last-name">Email</Label>
						<Input id="last-name" value={user?.email || ""}/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="first-name">Instagram</Label>
						<Input id="first-name" value={user?.social?.instagram || ""}/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="last-name">Twitter</Label>
						<Input id="last-name" value={user?.social?.twitter || ""}/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="first-name">Facebook</Label>
						<Input id="first-name" value={user?.social?.facebook || ""}/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="last-name">Youtube</Label>
						<Input id="last-name" value={user?.social?.youtube || ""}/>
					</div>
				</div>
				<Link href={"/dashboard"}>
					<Button className="w-fit" type="submit">
						Save Changes
					</Button>
				</Link>
			</div>
		</div>
	)
}
