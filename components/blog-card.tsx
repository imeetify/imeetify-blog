import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, getPostCategories, getFeaturedImage, stripHtml, type WpPost } from '@/lib/wordpress'

export function BlogCard({ post, featured = false }: { post: WpPost; featured?: boolean }) {
  const image = getFeaturedImage(post)
  const category = stripHtml(getPostCategories(post)[0]?.name || 'Insights')
  const title = stripHtml(post.title.rendered)
  const excerpt = stripHtml(post.excerpt.rendered)
  return (
    <article className="group overflow-hidden rounded-[10px] border border-[#e3e7ed] bg-white shadow-[0_3px_15px_rgba(24,38,61,0.04)] transition-shadow hover:shadow-[0_12px_30px_rgba(24,38,61,0.10)]">
      <Link href={`/${post.slug}`} className="relative block aspect-[423/280] overflow-hidden bg-[#eef1f5]">
        {image ? <Image src={image} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || title} fill sizes={featured ? '(max-width: 1024px) 100vw, 65vw' : '(max-width: 768px) 100vw, 394px'} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" unoptimized /> : <div className="absolute inset-0 bg-[#eef1f5]" />}
      </Link>
      <div className="flex flex-col gap-3 p-6 lg:p-7">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#54bd70]"><span>{category}</span><span className="text-[#9aa5b5]">|</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
        <Link href={`/${post.slug}`} className="flex items-start justify-between gap-3">
          <h2 className={featured ? 'text-balance text-[26px] font-bold leading-[1.25] text-[#17253d] md:text-[31px]' : 'text-balance text-[21px] font-bold leading-[1.3] text-[#17253d]'}>{title}</h2>
          <ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-[#54bd70] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
        <p className="text-[13px] leading-6 text-[#647087]">{excerpt.slice(0, featured ? 220 : 150)}{excerpt.length > (featured ? 220 : 150) ? '…' : ''}</p>
        <p className="text-[12px] font-medium text-[#8994a6]">By imeetify team</p>
      </div>
    </article>
  )
}
