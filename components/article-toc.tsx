"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ArticleToc({ items }: { items: string[] }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const headings = items.map((_, index) => document.getElementById(`section-${index + 1}`)).filter(Boolean) as HTMLElement[]
    if (!headings.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActive(headings.indexOf(visible.target as HTMLElement))
    }, { rootMargin: '-96px 0px -65% 0px', threshold: 0 })
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])
  if (!items.length) return null
  return <nav className="rounded-xl border border-[#e3e7ed] bg-white p-5" aria-label="Table of contents"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#54bd70]">In this article</p><ol className="mt-4 flex flex-col gap-3">{items.slice(0, 8).map((item, index) => <li key={`${item}-${index}`}><Link href={`#section-${index + 1}`} aria-current={active === index ? 'location' : undefined} className={`flex gap-3 border-l-2 pl-3 text-sm leading-5 transition ${active === index ? 'border-[#54bd70] font-semibold text-[#17253d]' : 'border-transparent text-[#647087] hover:text-[#54bd70]'}`}><span className="font-bold text-[#54bd70]">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></Link></li>)}</ol></nav>
}
