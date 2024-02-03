import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PiTextAlignRightFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

export default function home() {
  return (
    <div className='flex flex-col py-10 px-10 '>

      <div className='text-3xl font-bold'>Create your Video</div>
      <div className='py-2 border-b w-full flex border-slate-700'></div>
      <div className='flex flex-row gap-10 py-10'>
        <Card>
          <CardHeader>
            <CardTitle>

              <div className='flex flex-row justify-between items-center '>

                <PiTextAlignRightFill className='h-7 w-7'/>
                <FaPlus className='text-gray-500 h-4 w-4' />
              </div>
            </CardTitle>
            <CardTitle>AI text to Video</CardTitle>
            <CardDescription>
              Generate short video clip from a single line of text.
            </CardDescription>
          </CardHeader>
        </Card>

      </div>
    </div>
  )
}
