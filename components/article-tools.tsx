"use client"

import { useEffect, useState } from 'react'
import { Check, Copy, Mail, Share2 } from 'lucide-react'

export function ArticleTools({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        setShared(true)
        window.setTimeout(() => setShared(false), 1800)
        return
      } catch {
        return
      }
    }
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer')
  }
  return <div className="flex flex-wrap items-center gap-3" aria-label="Share this article"><span className="mr-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Share</span><button type="button" onClick={copy} className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary" aria-label="Copy article link">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</button><button type="button" onClick={share} className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary" aria-label="Share article"> <Share2 className="size-4" /></button><a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`} className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary hover:text-primary" aria-label="Share by email"><Mail className="size-4" /></a><span className="sr-only">{copied ? 'Link copied' : shared ? 'Article shared' : 'Copy, share, or email this article'}</span></div>
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible ? <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#17253d] text-white shadow-lg transition hover:bg-[#54bd70]" aria-label="Back to top"><span aria-hidden="true">↑</span></button> : null
}
