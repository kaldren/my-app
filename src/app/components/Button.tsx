import React from 'react'

export default function Button({text, bgColor = 'bg-blue-500', hoverBg = 'bg-blue-700'}: {text:string, bgColor?:string, hoverBg?:string}) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto my-4">
    {text}
  </button>
  )
}
