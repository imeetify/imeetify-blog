"use client"

import Link from 'next/link'

export function ArticleToc({ items }: { items: string[] }) {
  if (!items.length) return null
  return <nav className="rounded-xl border border-[#e3e7ed] bg-white p-5" aria-label="Table of contents"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#54bd70]">In this article</p><ol className="mt-4 flex flex-col gap-3">{items.slice(0, 6).map((item, index) => <li key={`${item}-${index}`}><Link href={`#section-${index + 1}`} className="flex gap-3 text-sm leading-5 text-[#647087] hover:text-[#54bd70]"><span className="font-bold text-[#54bd70]">0{index + 1}</span><span>{item}</span></Link></li>)}</ol></nav>
}
