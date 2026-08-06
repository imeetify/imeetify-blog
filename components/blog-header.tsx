'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const logo = 'https://imeetify.blog/wp-content/uploads/2025/08/app-logo@2x.png'
const banner = 'https://imeetify.blog/wp-content/uploads/elementor/thumbs/blog-banner-2-qtjijut2amp4hjbgkr8kks9pgumwjyhxlzpyalnqxg.png'

export function BlogHeader() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="h-[44px] bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} aria-hidden="true" />
      <header className="border-b border-[#e8ebf0] bg-white">
        <div className="mx-auto flex max-w-[1260px] items-center justify-between px-5 py-5 lg:px-8">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="imeetify blog home">
            <Image src={logo} alt="imeetify" width={130} height={29} unoptimized priority />
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-semibold text-[#17253d] md:flex" aria-label="Main navigation">
            <Link className="hover:text-[#63c97d]" href="/">Home</Link>
            <Link className="hover:text-[#63c97d]" href="/?page=2">Product Updates</Link>
            <a className="hover:text-[#63c97d]" href="https://imeetify.com" target="_blank" rel="noreferrer">Meeting Tips</a>
            <a className="rounded-full bg-[#17253d] px-5 py-3 text-white hover:bg-[#243855]" href="https://imeetify.com" target="_blank" rel="noreferrer">Free Account</a>
          </nav>
          <button type="button" className="inline-flex size-10 items-center justify-center rounded-md border border-[#dce2e9] text-[#17253d] md:hidden" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
        {open && <nav className="flex flex-col gap-5 border-t border-[#e8ebf0] px-5 py-5 text-sm font-semibold text-[#17253d] md:hidden" aria-label="Mobile navigation"><Link href="/" onClick={() => setOpen(false)}>Home</Link><Link href="/?page=2" onClick={() => setOpen(false)}>Product Updates</Link><a href="https://imeetify.com" target="_blank" rel="noreferrer">Meeting Tips</a><a className="w-fit rounded-full bg-[#17253d] px-5 py-3 text-white" href="https://imeetify.com" target="_blank" rel="noreferrer">Free Account</a></nav>}
      </header>
    </>
  )
}
