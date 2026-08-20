import Link from 'next/link'
import { ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import { NewsletterCta } from '@/components/newsletter-cta'
import type { WpPost } from '@/lib/wordpress'

export function BlogHome({ posts, recent, page, totalPages, query }: { posts: WpPost[]; recent: WpPost[]; page: number; totalPages: number; query?: string }) {
  const [featured, ...rest] = posts
  const pagination = (nextPage: number) => `/?page=${nextPage}${query ? `&s=${encodeURIComponent(query)}` : ''}`
  return <>
    <section className="mx-auto max-w-[1260px] px-5 pb-12 pt-16 lg:px-8 lg:pb-16 lg:pt-24">
      <div className="max-w-4xl"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"><Sparkles className="size-4" /> The imeetify journal</div><h1 className="mt-5 text-balance text-[44px] font-bold leading-[1.05] tracking-[-0.055em] text-foreground sm:text-[68px]">Ideas for better meetings, better work, and better days.</h1><p className="mt-7 max-w-2xl text-[16px] leading-7 text-muted-foreground">Practical insights, product thinking, and thoughtful ways to help modern teams do their best work together.</p></div>
      <form action="/" className="mt-9 flex max-w-xl items-center overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-foreground/5"><label className="sr-only" htmlFor="hero-search">Search the blog</label><Search className="ml-4 size-4 shrink-0 text-muted-foreground" /><input id="hero-search" name="s" defaultValue={query} className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground" placeholder="Search the journal" /><button type="submit" className="mr-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-105">Search</button></form>
    </section>
    <main className="mx-auto grid max-w-[1260px] gap-12 px-5 pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:gap-12 xl:gap-16 lg:px-8 lg:pb-24"><div className="flex min-w-0 flex-col gap-8">{query && <p className="text-sm text-muted-foreground">Showing results for <span className="font-bold text-foreground">“{query}”</span></p>}{featured ? <BlogCard post={featured} featured /> : <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">No articles found. Try another search.</div>}<div className="grid gap-7 md:grid-cols-2">{rest.map((post) => <BlogCard key={post.id} post={post} />)}</div><NewsletterCta />{totalPages > 1 && <nav className="flex items-center justify-between border-t border-border pt-6" aria-label="Pagination"><span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span><div className="flex gap-2">{page > 1 && <Link className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary" href={pagination(page - 1)}><ArrowLeft aria-hidden="true" className="size-4" /> Previous</Link>}{page < totalPages && <Link className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary" href={pagination(page + 1)}>Next <ArrowRight aria-hidden="true" className="size-4" /></Link>}</div></nav>}</div><div className="min-w-0 self-start lg:sticky lg:top-[88px]"><BlogSidebar recent={recent} /></div></main>
  </>
}
