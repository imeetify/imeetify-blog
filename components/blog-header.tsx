'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const logo = 'https://imeetify.blog/wp-content/uploads/2025/08/app-logo@2x.png'
const announcement = 'Make every meeting count with imeetify.'

export function BlogHeader() {
  const [open, setOpen] = useState(false)
  const [announcementOpen, setAnnouncementOpen] = useState(true)
  return <>
    {announcementOpen && <div className="announcement-banner border-b">
      <div className="mx-auto flex max-w-[1260px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2.5 text-[12px] font-semibold lg:px-8">
        <p className="flex min-w-0 flex-1 items-center gap-2 leading-5"><span className="announcement-pill rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">New</span><span>{announcement}</span></p>
        <div className="flex shrink-0 items-center gap-3"><a className="announcement-link inline-flex items-center gap-1 transition-opacity hover:opacity-75" href="https://imeetify.com" target="_blank" rel="noreferrer">Explore imeetify <ArrowUpRight aria-hidden="true" className="size-3.5" /></a><button type="button" className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground" aria-label="Dismiss announcement" onClick={() => setAnnouncementOpen(false)}><X aria-hidden="true" className="size-4" /></button></div>
      </div>
    </div>}
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1260px] items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="imeetify blog home"><Image src={logo} alt="imeetify" width={130} height={29} className="dark:brightness-0 dark:invert" unoptimized priority /></Link>
        <nav className="hidden items-center gap-8 text-[13px] font-semibold text-foreground md:flex" aria-label="Main navigation"><Link className="hover:text-primary" href="/">Home</Link><Link className="hover:text-primary" href="/?page=2">Product Updates</Link><a className="hover:text-primary" href="https://imeetify.com" target="_blank" rel="noreferrer">Meeting Tips</a><a className="rounded-full bg-foreground px-5 py-2.5 text-background hover:bg-primary" href="https://imeetify.com" target="_blank" rel="noreferrer">Free Account</a></nav>
        <button type="button" className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {open && <nav className="flex flex-col gap-5 border-t border-border px-5 py-5 text-sm font-semibold text-foreground md:hidden" aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/?page=2" onClick={() => setOpen(false)}>Product Updates</Link><a href="https://imeetify.com" target="_blank" rel="noreferrer">Meeting Tips</a><a className="w-fit rounded-full bg-foreground px-5 py-3 text-background" href="https://imeetify.com" target="_blank" rel="noreferrer">Free Account</a></nav>}
    </header>
  </>
}
