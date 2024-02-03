import React from 'react'
import ImageEditor from '../components/ImageCanvas'

export default function page() {
  return (
    <div className=' flex min-h-[90vh] flex-col justify-center items-center'>
        <ImageEditor/>
    </div>
  )
}
