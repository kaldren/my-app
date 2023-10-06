import React from 'react'

interface ButtonProps {
  text: string;
  bgColor?: string;
  hoverBg?: string;
  onClick?: () => void;  // Define the onClick prop as an optional function
}

export default function Button({text, bgColor = 'bg-blue-500', hoverBg = 'bg-blue-700', onClick}: ButtonProps) {
  return (
    <button 
        className={`${bgColor} ${hoverBg} text-white font-bold py-2 px-4 rounded block mx-auto my-4`} 
        onClick={onClick}
    >
      {text}
    </button>
  )
}
