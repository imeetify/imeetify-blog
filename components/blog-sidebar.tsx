import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategories, getFeaturedImage, stripHtml, type WpCategory, type WpPost } from '@/lib/wordpress'

export async function BlogSidebar({ recent }: { recent: WpPost[] }) {
  let categories: WpCategory[] = []
  try { categories = await getCategories() } catch { categories = [] }
  return (
    <aside className="flex flex-col gap-10 lg:pl-8">
      <div className="border-t-2 border-primary pt-4">
        <h2 className="font-serif text-2xl font-bold">About imeetify</h2>
        <p className="mt-3 text-[15px] leading-7 text-muted-foreground">Simple ideas for better meetings, happier teams, and more productive workdays.</p>
        <a href="https://imeetify.com" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Explore imeetify <ArrowRight aria-hidden="true" className="size-4" /></a>
      </div>
      {categories.length > 0 && <div className="border-t border-border pt-4"><h2 className="font-serif text-2xl font-bold">Categories</h2><div className="mt-4 flex flex-wrap gap-2">{categories.slice(0, 8).map((category) => <Link key={category.id} href={`/?category=${category.slug}`} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary">{stripHtml(category.name)}</Link>)}</div></div>}
      <div className="border-t border-border pt-4"><h2 className="font-serif text-2xl font-bold">Latest stories</h2><div className="mt-5 flex flex-col gap-5">{recent.slice(0, 4).map((post) => <Link key={post.id} href={`/${post.slug}`} className="flex gap-3 group"><div className="relative size-16 shrink-0 overflow-hidden bg-muted">{getFeaturedImage(post) && <img src={getFeaturedImage(post)} alt="" className="size-full object-cover transition-transform group-hover:scale-105" />}</div><p className="font-serif text-base font-bold leading-snug group-hover:text-primary">{stripHtml(post.title.rendered)}</p></Link>)}</div></div>
    </aside>
  )
}
