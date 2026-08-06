import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import type { WpPost } from '@/lib/wordpress'

export function BlogHome({ posts, recent, page, totalPages }: { posts: WpPost[]; recent: WpPost[]; page: number; totalPages: number }) {
  const [featured, ...rest] = posts
  return <>
    <section className="border-b border-border bg-primary py-12 text-primary-foreground md:py-16"><div className="mx-auto max-w-6xl px-5 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] opacity-75">The imeetify journal</p><h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">Make every meeting matter.</h1><p className="mt-5 max-w-xl text-base leading-7 opacity-85">Ideas, tools, and practical thinking for teams that want to do their best work together.</p></div></section>
    <main className="mx-auto grid max-w-6xl gap-14 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-10">{featured && <BlogCard post={featured} featured />}<div className="grid gap-x-7 gap-y-12 md:grid-cols-2">{rest.map((post) => <BlogCard key={post.id} post={post} />)}</div>{totalPages > 1 && <nav className="flex items-center justify-between border-t border-border pt-6" aria-label="Pagination"><span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span><div className="flex gap-2">{page > 1 && <Link className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary" href={`/?page=${page - 1}`}><ArrowLeft aria-hidden="true" className="size-4" /> Previous</Link>}{page < totalPages && <Link className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary" href={`/?page=${page + 1}`}>Next <ArrowRight aria-hidden="true" className="size-4" /></Link>}</div></nav>}</div>
      <BlogSidebar recent={recent} />
    </main>
  </>
}
