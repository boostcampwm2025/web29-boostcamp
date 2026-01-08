import React from 'react'

export interface BoxProps {
  title: string
  description: string
  children: React.ReactNode
}

export default function Box({ title, description, children }: BoxProps) {
  return (
    <section className="px-4 py-2">
      <header className="mb-2">
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div>{children}</div>
    </section>
  )
}
