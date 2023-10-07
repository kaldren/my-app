import React from 'react'

export default function H2({text, size = 'text-2xl', styles = 'font-bold text-center my-10'}: {text: string, size?: string, styles?: string}) {
  return (
    <h2 className={`${size} ${styles}`}>{text}</h2>
  );
}
