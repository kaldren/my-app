import React from 'react'

export default function H2({text, size = 'text-2xl'}: {text:string, size?:string}) {
  return (
    <h2 className={`${size} font-bold text-center my-10`}>{text}</h2>
  )
}
