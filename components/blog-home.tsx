import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import { NewsletterCta } from '@/components/newsletter-cta'
import type { WpPost } from '@/lib/wordpress'

export function BlogHome({ posts, recent, page, totalPages }: { posts: WpPost[]; recent: WpPost[]; page: number; totalPages: number }) {
  const [featured, ...rest] = posts
  return <>
    <section className="mx-auto max-w-[1260px] px-5 pb-10 pt-12 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20"><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#54bd70]"><Sparkles className="size-4" /> The imeetify journal</div><h1 className="mt-5 max-w-3xl text-balance text-[42px] font-bold leading-[1.08] tracking-[-0.05em] text-[#17253d] sm:text-[56px]">Ideas for better meetings, better work, and better days.</h1><p className="mt-6 max-w-2xl text-[16px] leading-7 text-[#647087]">Practical insights, product thinking, and thoughtful ways to help modern teams do their best work together.</p></section>
    <main className="mx-auto grid max-w-[1260px] gap-12 px-5 pb-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-8 lg:pb-24"><div className="flex min-w-0 flex-col gap-8">{featured && <BlogCard post={featured} featured />}<div className="grid gap-7 md:grid-cols-2">{rest.map((post) => <BlogCard key={post.id} post={post} />)}</div><NewsletterCta />{totalPages > 1 && <nav className="flex items-center justify-between border-t border-[#e3e7ed] pt-6" aria-label="Pagination"><span className="text-sm text-[#647087]">Page {page} of {totalPages}</span><div className="flex gap-2">{page > 1 && <Link className="inline-flex items-center gap-2 rounded-lg border border-[#dce2e9] px-4 py-2 text-sm font-bold text-[#17253d] hover:border-[#54bd70] hover:text-[#54bd70]" href={`/?page=${page - 1}`}><ArrowLeft aria-hidden="true" className="size-4" /> Previous</Link>}{page < totalPages && <Link className="inline-flex items-center gap-2 rounded-lg border border-[#dce2e9] px-4 py-2 text-sm font-bold text-[#17253d] hover:border-[#54bd70] hover:text-[#54bd70]" href={`/?page=${page + 1}`}>Next <ArrowRight aria-hidden="true" className="size-4" /></Link>}</div></nav>}</div><BlogSidebar recent={recent} /></main>
  </>
}
