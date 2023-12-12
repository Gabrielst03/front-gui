import React from 'react'
import { MdOutlineEmojiEmotions } from "react-icons/md";


function CTA() {
  return (
    <a
      className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
      href="https://github.com/roketid/windmill-dashboard-nextjs-typescript"
    >
      <div className="flex items-center gap-2">
        <MdOutlineEmojiEmotions fontSize={22}/>
        <span>Olá, Seja bem-vindo(a)!</span>
      </div>
    </a>
  )
}

export default CTA
