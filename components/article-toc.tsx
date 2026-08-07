"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

type TocItem = { id: string; label: string }

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (!headings.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) setActive((visible.target as HTMLElement).id)
    }, { rootMargin: '-110px 0px -65% 0px', threshold: [0, 1] })
    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])
  if (!items.length) return null
  return <nav className="toc-card" aria-label="Table of contents"><p className="toc-label">In this article</p><ol className="mt-4 flex flex-col gap-1">{items.slice(0, 10).map((item, index) => <li key={item.id}><Link href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} className={`flex gap-3 rounded-lg border-l-2 px-3 py-2 text-sm leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54bd70] ${active === item.id ? 'border-[#54bd70] bg-[#f6f8fb] font-semibold text-[#17253d] dark:bg-white/5 dark:text-white' : 'border-transparent text-[#647087] hover:bg-[#f6f8fb] hover:text-[#54bd70] dark:text-[#b6c1d0] dark:hover:bg-white/5'}`}><span className="font-bold text-[#54bd70]">{String(index + 1).padStart(2, '0')}</span><span>{item.label}</span></Link></li>)}</ol></nav>
}
