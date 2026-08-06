import Link from 'next/link'

export function BlogFooter() {
  return <footer className="border-t border-border bg-foreground py-10 text-background"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between lg:px-8"><Link href="/" className="font-serif text-2xl font-bold">imeetify<span className="text-primary">.</span></Link><p className="text-sm opacity-60">Practical ideas for better work, together.</p><p className="text-xs uppercase tracking-[0.15em] opacity-50">© {new Date().getFullYear()} imeetify</p></div></footer>
}
