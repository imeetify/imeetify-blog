import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, getPostCategories, getFeaturedImage, stripHtml, type WpPost } from '@/lib/wordpress'

export function BlogCard({ post, featured = false }: { post: WpPost; featured?: boolean }) {
  const image = getFeaturedImage(post)
  const category = stripHtml(getPostCategories(post)[0]?.name || 'Insights')
  return (
    <article className={featured ? 'grid gap-6 border-b border-border pb-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10' : 'group flex flex-col gap-5'}>
      <Link href={`/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted">
        {image ? <Image src={image} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || stripHtml(post.title.rendered)} fill sizes={featured ? '(max-width: 1024px) 100vw, 55vw' : '(max-width: 768px) 100vw, 33vw'} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" unoptimized /> : <div className="absolute inset-0 bg-muted" />}
      </Link>
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
          <span>{category}</span><span className="text-border">/</span><time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <Link href={`/${post.slug}`} className="group/title flex items-start gap-3">
          <h2 className={featured ? 'font-serif text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover/title:text-primary md:text-4xl' : 'font-serif text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover/title:text-primary'}>{stripHtml(post.title.rendered)}</h2>
          <ArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-primary transition-transform group-hover/title:-translate-y-1 group-hover/title:translate-x-1" />
        </Link>
        <p className="max-w-xl text-[15px] leading-7 text-muted-foreground">{stripHtml(post.excerpt.rendered).slice(0, 170)}{stripHtml(post.excerpt.rendered).length > 170 ? '…' : ''}</p>
      </div>
    </article>
  )
}
