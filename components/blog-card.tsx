import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { formatDate, getAuthor, getPostCategories, getFeaturedImage, getReadingTime, stripHtml, type WpPost } from '@/lib/wordpress'

export function BlogCard({ post, featured = false }: { post: WpPost; featured?: boolean }) {
  const image = getFeaturedImage(post)
  const category = stripHtml(getPostCategories(post)[0]?.name || 'Insights')
  const title = stripHtml(post.title.rendered)
  const excerpt = stripHtml(post.excerpt.rendered)
  const author = getAuthor(post)
  return <article className="group overflow-hidden rounded-2xl border border-[#e3e7ed] bg-white shadow-[0_3px_15px_rgba(24,38,61,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(24,38,61,0.12)]"><Link href={`/${post.slug}`} className="relative block aspect-[423/280] overflow-hidden bg-[#eef1f5]">{image ? <Image src={image} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || title} fill sizes={featured ? '(max-width: 1024px) 100vw, 860px' : '(max-width: 768px) 100vw, 394px'} className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" unoptimized priority={featured} /> : <div className="absolute inset-0 bg-[#eef1f5]" />}</Link><div className="flex flex-col gap-3 p-6 lg:p-7"><div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#54bd70]"><span className="rounded-full bg-[#edf9ef] px-2.5 py-1">{category}</span><time dateTime={post.date}>{formatDate(post.date)}</time></div><Link href={`/${post.slug}`} className="flex items-start justify-between gap-3"><h2 className={featured ? 'text-balance text-[27px] font-bold leading-[1.2] tracking-[-0.03em] text-[#17253d] md:text-[33px]' : 'text-balance text-[21px] font-bold leading-[1.28] tracking-[-0.02em] text-[#17253d]'}>{title}</h2><ArrowUpRight aria-hidden="true" className="mt-1 size-5 shrink-0 text-[#54bd70] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link><p className="text-[13px] leading-6 text-[#647087]">{excerpt.slice(0, featured ? 230 : 150)}{excerpt.length > (featured ? 230 : 150) ? '…' : ''}</p><div className="flex items-center justify-between gap-3 border-t border-[#edf0f4] pt-3 text-[11px] font-medium text-[#8994a6]"><span>By {author.name || 'imeetify team'}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> {getReadingTime(post.content.rendered)} min</span></div></div></article>
}
