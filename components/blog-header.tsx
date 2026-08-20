'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const logo = 'https://imeetify.blog/wp-content/uploads/2025/08/app-logo@2x.png'
const banner = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Aug%2020%2C%202026%2C%2001_24_52%20PM-Fa0WZWAgI73YftDJwPVrm8Tpj6kvIT.png'

export function BlogHeader() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="promo-banner h-[150px] bg-cover bg-center sm:h-[210px] lg:h-[300px]" style={{ backgroundImage: `url(${banner})` }} role="img" aria-label="iMeetify online meetings promotion: just $50 per year" />
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
