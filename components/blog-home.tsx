import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import type { WpPost } from '@/lib/wordpress'

export function BlogHome({ posts, recent, page, totalPages }: { posts: WpPost[]; recent: WpPost[]; page: number; totalPages: number }) {
  const [featured, ...rest] = posts
  return <>
    <section className="mx-auto max-w-[1260px] px-5 pb-12 pt-12 lg:px-8 lg:pb-14 lg:pt-16"><p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#54bd70]">The imeetify blog</p><h1 className="mt-4 max-w-3xl text-balance text-[38px] font-bold leading-[1.15] text-[#17253d] md:text-[52px]">Ideas to help your team meet better.</h1><p className="mt-5 max-w-xl text-[15px] leading-7 text-[#647087]">Discover practical insights, product updates, and smart ways to make every meeting more productive.</p></section>
    <main className="mx-auto grid max-w-[1260px] gap-10 px-5 pb-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:px-8 lg:pb-20">
      <div className="flex flex-col gap-7">{featured && <BlogCard post={featured} featured />}<div className="grid gap-7 md:grid-cols-2">{rest.map((post) => <BlogCard key={post.id} post={post} />)}</div>{totalPages > 1 && <nav className="flex items-center justify-between border-t border-[#e3e7ed] pt-6" aria-label="Pagination"><span className="text-sm text-[#647087]">Page {page} of {totalPages}</span><div className="flex gap-2">{page > 1 && <Link className="inline-flex items-center gap-2 rounded-md border border-[#dce2e9] px-4 py-2 text-sm font-semibold text-[#17253d] hover:border-[#54bd70] hover:text-[#54bd70]" href={`/?page=${page - 1}`}><ArrowLeft aria-hidden="true" className="size-4" /> Previous</Link>}{page < totalPages && <Link className="inline-flex items-center gap-2 rounded-md border border-[#dce2e9] px-4 py-2 text-sm font-semibold text-[#17253d] hover:border-[#54bd70] hover:text-[#54bd70]" href={`/?page=${page + 1}`}>Next <ArrowRight aria-hidden="true" className="size-4" /></Link>}</div></nav>}</div>
      <BlogSidebar recent={recent} />
    </main>
  </>
}
