"use client"

import { useEffect, useState } from 'react'
import { ArrowUp, Check, Copy, Mail, Share2 } from 'lucide-react'

export function ArticleTools({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) } }
  const share = (network: string) => { const encodedUrl = encodeURIComponent(url); const encodedTitle = encodeURIComponent(title); const href = network === 'linkedin' ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` : network === 'facebook' ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : `mailto:?subject=${encodedTitle}&body=${encodedUrl}`; window.open(href, network === 'email' ? '_self' : '_blank', network === 'email' ? undefined : 'noopener,noreferrer') }
  const buttonClass = 'inline-flex size-9 items-center justify-center rounded-full border border-[#dce2e9] text-[#17253d] transition-colors hover:border-[#54bd70] hover:text-[#54bd70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54bd70] dark:border-white/10 dark:text-white'
  return <div className="flex flex-wrap items-center gap-2" aria-label="Share this article"><span className="mr-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a97aa]">Share</span><button type="button" onClick={copy} className={buttonClass} aria-label="Copy article link">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</button><button type="button" onClick={() => share('linkedin')} className={buttonClass} aria-label="Share on LinkedIn"><Share2 className="size-4" /></button><button type="button" onClick={() => share('facebook')} className={buttonClass} aria-label="Share on Facebook"><Share2 className="size-4" /></button><button type="button" onClick={() => share('email')} className={buttonClass} aria-label="Share by email"><Mail className="size-4" /></button><span className="sr-only" role="status">{copied ? 'Link copied' : 'Copy link'}</span></div>
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 600); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  if (!visible) return null
  return <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#17253d] text-white shadow-lg transition-colors hover:bg-[#54bd70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54bd70]" aria-label="Back to top"><ArrowUp className="size-4" /></button>
}
