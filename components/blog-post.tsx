import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock3, UserRound } from 'lucide-react'
import { ArticleToc } from '@/components/article-toc'
import { ArticleTools, BackToTop } from '@/components/article-tools'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import { NewsletterCta } from '@/components/newsletter-cta'
import { formatDate, getAuthor, getFeaturedImage, getPostCategories, getReadingTime, stripHtml, type WpPost } from '@/lib/wordpress'

function withHeadingIds(html: string) {
  let index = 0
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, content) => {
    index += 1
    return `<h${level}${attrs} id="section-${index}">${content}</h${level}>`
  })
}

function getTocItems(html: string) {
  return [...html.matchAll(/<h[2-3][^>]*>(.*?)<\/h[2-3]>/gi)].map((match) => stripHtml(match[1]))
}

export function BlogPost({ post, recent }: { post: WpPost; recent: WpPost[] }) {
  const image = getFeaturedImage(post)
  const title = stripHtml(post.title.rendered)
  const author = getAuthor(post)
  const content = withHeadingIds(post.content.rendered)
  const toc = getTocItems(content)
  const category = stripHtml(getPostCategories(post)[0]?.name || 'Insights')
  return <>
    <main className="mx-auto grid max-w-[1260px] gap-10 px-5 pb-16 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,860px)_300px] lg:gap-16 lg:px-8 lg:pb-24">
      <article className="min-w-0">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#647087] hover:text-[#54bd70]"><ArrowLeft aria-hidden="true" className="size-4" /> Back to all stories</Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#54bd70]"><span>{category}</span><span className="text-[#a8b1be]">•</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
        <h1 className="mt-5 max-w-4xl text-balance text-[38px] font-bold leading-[1.12] tracking-[-0.04em] text-[#17253d] sm:text-[48px] lg:text-[58px]">{title}</h1>
        <p className="mt-5 max-w-3xl text-[16px] leading-7 text-[#647087]">{stripHtml(post.excerpt.rendered)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-medium text-[#8994a6]"><span className="inline-flex items-center gap-2"><UserRound className="size-4 text-[#54bd70]" /> {author.name || 'imeetify team'}</span><span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-[#54bd70]" /> {getReadingTime(post.content.rendered)} min read</span></div>
        {image && <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eef1f5] shadow-[0_18px_50px_rgba(23,37,61,0.12)]"><Image src={image} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || title} fill sizes="(max-width: 1024px) 100vw, 860px" className="object-cover" unoptimized priority /></div>}
        <div className="mt-8 border-y border-[#e7ebf0] py-4"><ArticleTools url={post.link} title={title} /></div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[170px_minmax(0,1fr)]"><div className="lg:sticky lg:top-8 lg:self-start"><ArticleToc items={toc} /></div><div className="prose min-w-0 text-[15px] text-[#4d5b70]" dangerouslySetInnerHTML={{ __html: content }} /></div>
        <div className="mt-12"><NewsletterCta /></div>
        {recent.length > 0 && <section className="mt-14 border-t border-[#e3e7ed] pt-10"><div className="flex items-end justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#54bd70]">Keep reading</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#17253d]">More from imeetify</h2></div><Link href="/" className="hidden items-center gap-2 text-sm font-bold text-[#17253d] hover:text-[#54bd70] sm:flex">View all <ArrowRight className="size-4" /></Link></div><div className="mt-6 grid gap-6 md:grid-cols-2">{recent.slice(0, 2).map((item) => <BlogCard key={item.id} post={item} />)}</div></section>}
      </article>
      <aside className="lg:sticky lg:top-8 lg:self-start"><BlogSidebar recent={recent} /></aside>
    </main>
    <BackToTop />
  </>
}
