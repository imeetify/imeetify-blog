"use client"

import { FormEvent, useState } from 'react'

export function NewsletterCta() {
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  return <section className="rounded-2xl bg-[#17253d] px-6 py-8 text-white sm:px-8" aria-labelledby="newsletter-title"><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#76d58c]">The better meeting brief</p><h2 id="newsletter-title" className="mt-3 text-2xl font-bold leading-tight">Practical ideas for teams that want to work better.</h2>{submitted ? <p className="mt-4 text-sm leading-6 text-white/75">You&apos;re on the list. Watch your inbox for the next edition.</p> : <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input required type="email" id="newsletter-email" placeholder="you@company.com" className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#76d58c]" /><button type="submit" className="rounded-lg bg-[#54bd70] px-5 py-3 text-sm font-bold text-[#10213b] transition hover:bg-[#76d58c]">Subscribe</button></form>}</section>
}
