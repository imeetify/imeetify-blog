import Link from 'next/link'
import { Search } from 'lucide-react'
import { getCategories, getFeaturedImage, stripHtml, type WpCategory, type WpPost } from '@/lib/wordpress'

export async function BlogSidebar({ recent }: { recent: WpPost[] }) {
  let categories: WpCategory[] = []
  try { categories = await getCategories() } catch { categories = [] }
  return (
    <aside className="flex flex-col gap-6 lg:pl-3">
      <section className="rounded-[10px] bg-[#f2f0ff] p-7">
        <h2 className="text-[21px] font-bold text-[#17253d]">Search</h2>
        <form action="/" className="mt-5 flex items-center overflow-hidden rounded-md border border-[#dce0ee] bg-white"><label className="sr-only" htmlFor="blog-search">Search the blog</label><input id="blog-search" name="s" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[#17253d] outline-none" placeholder="Search" /><button type="submit" className="flex size-11 items-center justify-center bg-[#54bd70] text-white" aria-label="Search"><Search className="size-4" /></button></form>
      </section>
      {categories.length > 0 && <section className="rounded-[10px] border border-[#e3e7ed] bg-white p-7"><h2 className="text-[21px] font-bold text-[#17253d]">Categories</h2><div className="mt-5 flex flex-col gap-3">{categories.slice(0, 8).map((category) => <Link key={category.id} href={`/?category=${category.slug}`} className="flex items-center justify-between border-b border-[#edf0f4] pb-3 text-[13px] text-[#647087] hover:text-[#54bd70]"><span>{stripHtml(category.name)}</span><span>→</span></Link>)}</div></section>}
      <section className="rounded-[10px] border border-[#e3e7ed] bg-white p-7"><h2 className="text-[21px] font-bold text-[#17253d]">Popular Posts</h2><div className="mt-5 flex flex-col gap-5">{recent.slice(0, 4).map((post) => <Link key={post.id} href={`/${post.slug}`} className="group flex gap-3"><div className="relative size-[66px] shrink-0 overflow-hidden rounded-md bg-[#eef1f5]">{getFeaturedImage(post) && <img src={getFeaturedImage(post)} alt="" className="size-full object-cover transition-transform group-hover:scale-105" />}</div><p className="text-[13px] font-semibold leading-5 text-[#17253d] group-hover:text-[#54bd70]">{stripHtml(post.title.rendered)}</p></Link>)}</div></section>
    </aside>
  )
}
