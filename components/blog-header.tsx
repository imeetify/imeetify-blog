'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function BlogHeader() {
  const [open, setOpen] = useState(false)
  return <header className="border-b border-border/70 bg-background"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8"><Link href="/" className="font-serif text-2xl font-bold tracking-tight text-foreground" onClick={() => setOpen(false)}>imeetify<span className="text-primary">.</span></Link><nav className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:flex" aria-label="Main navigation"><Link className="hover:text-primary" href="/">Home</Link><Link className="hover:text-primary" href="/?page=2">Blog</Link><a className="hover:text-primary" href="https://imeetify.com" target="_blank" rel="noreferrer">imeetify.com</a></nav><button type="button" className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>{open && <nav className="flex flex-col gap-5 border-t border-border px-5 py-5 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground md:hidden" aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/?page=2" onClick={() => setOpen(false)}>Blog</Link><a href="https://imeetify.com" target="_blank" rel="noreferrer">imeetify.com</a></nav>}</header>
}
