import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock3, CalendarDays, UserRound } from 'lucide-react'
import { ArticleToc } from '@/components/article-toc'
import { ArticleTools, BackToTop } from '@/components/article-tools'
import { BlogCard } from '@/components/blog-card'
import { BlogSidebar } from '@/components/blog-sidebar'
import { NewsletterCta } from '@/components/newsletter-cta'
import { formatDate, getAuthor, getFeaturedImage, getPostCategories, getReadingTime, stripHtml, type WpPost } from '@/lib/wordpress'

function slugify(value: string) {
  return stripHtml(value).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-') || 'section'
}

function withHeadingIds(html: string) {
  const used = new Map<string, number>()
  return html.replace(/<h([2-6])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, content) => {
    const base = slugify(content)
    const count = used.get(base) || 0
    used.set(base, count + 1)
    const id = count ? `${base}-${count + 1}` : base
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`
  })
}

function getTocItems(html: string) {
  return [...html.matchAll(/<h[2-3][^>]*id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/gi)].map((match) => ({ id: match[1], label: stripHtml(match[2]) }))
}

function AuthorProfile({ post }: { post: WpPost }) {
  const author = getAuthor(post)
  const avatar = 'avatar_urls' in author ? author.avatar_urls?.['96'] || author.avatar_urls?.['48'] : undefined
  return <div className="flex items-center gap-3">
    {avatar ? <Image src={avatar} alt="" width={42} height={42} className="size-10 rounded-full object-cover" unoptimized /> : <div className="flex size-10 items-center justify-center rounded-full bg-[#dff6e5] text-sm font-bold text-[#238a48]">{(author.name || 'I').slice(0, 1).toUpperCase()}</div>}
    <div><p className="text-sm font-bold text-[#17253d] dark:text-white">{author.name || 'imeetify team'}</p><p className="text-xs text-[#8994a6]">The imeetify team</p></div>
  </div>
}

export function BlogPost({ post, recent }: { post: WpPost; recent: WpPost[] }) {
  const image = getFeaturedImage(post)
  const title = stripHtml(post.title.rendered)
  const content = withHeadingIds(post.content.rendered)
  const toc = getTocItems(content)
  const category = stripHtml(getPostCategories(post)[0]?.name || 'Insights')
  const previous = recent[0]
  const next = recent[1]
  return <>
    <main className="mx-auto grid max-w-[1280px] items-start gap-10 px-5 pb-16 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:px-8 lg:pb-24">
      <article className="min-w-0">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#647087] hover:text-[#54bd70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54bd70] focus-visible:ring-offset-4"><ArrowLeft aria-hidden="true" className="size-4" /> Back to all stories</Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#54bd70]"><span>{category}</span><span className="text-[#a8b1be]">/</span><span>Journal</span></div>
        <h1 className="mt-5 max-w-4xl text-balance text-[38px] font-bold leading-[1.1] tracking-[-0.045em] text-[#17253d] sm:text-[50px] lg:text-[60px] dark:text-white">{title}</h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#647087] dark:text-[#b6c1d0]">{stripHtml(post.excerpt.rendered)}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-[#e7ebf0] py-5 dark:border-white/10"><AuthorProfile post={post} /><div className="hidden h-8 w-px bg-[#e7ebf0] sm:block dark:bg-white/10" /><span className="inline-flex items-center gap-2 text-xs font-medium text-[#8994a6]"><CalendarDays className="size-4 text-[#54bd70]" /> Published {formatDate(post.date)}</span><span className="inline-flex items-center gap-2 text-xs font-medium text-[#8994a6]"><Clock3 className="size-4 text-[#54bd70]" /> {getReadingTime(post.content.rendered)} min read</span></div>
        {image && <figure className="relative mt-9 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eef1f5] shadow-[0_18px_50px_rgba(23,37,61,0.12)] dark:bg-white/10"><Image src={image} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || title} fill sizes="(max-width: 1024px) 100vw, 860px" className="object-cover" priority unoptimized /></figure>}
        <div className="mt-8 flex items-center justify-between gap-4 border-y border-[#e7ebf0] py-4 dark:border-white/10"><span className="inline-flex items-center gap-2 text-xs text-[#8994a6]"><UserRound className="size-4 text-[#54bd70]" /> A practical read from imeetify</span><ArticleTools url={post.link} title={title} /></div>
        <div className="mt-8 lg:hidden"><ArticleToc items={toc} /></div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[170px_minmax(0,1fr)]"><div className="hidden lg:sticky lg:top-[100px] lg:block lg:self-start"><ArticleToc items={toc} /></div><div className="prose min-w-0 text-[15px] text-[#4d5b70] dark:text-[#c4ccda]" dangerouslySetInnerHTML={{ __html: content }} /></div>
        <div className="mt-12"><NewsletterCta /></div>
        {(previous || next) && <nav className="mt-12 grid gap-4 border-y border-[#e3e7ed] py-6 sm:grid-cols-2 dark:border-white/10" aria-label="Article navigation">{previous ? <Link href={`/${previous.slug}`} className="group rounded-xl p-3 transition-colors hover:bg-[#f6f8fb] dark:hover:bg-white/5"><span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8994a6]"><ArrowLeft className="size-3.5" /> Previous article</span><span className="mt-2 block line-clamp-2 text-sm font-bold leading-5 text-[#17253d] group-hover:text-[#54bd70] dark:text-white">{stripHtml(previous.title.rendered)}</span></Link> : <span />}{next && <Link href={`/${next.slug}`} className="group rounded-xl p-3 text-left sm:text-right"><span className="flex items-center justify-start gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8994a6] sm:justify-end">Next article <ArrowRight className="size-3.5" /></span><span className="mt-2 block line-clamp-2 text-sm font-bold leading-5 text-[#17253d] group-hover:text-[#54bd70] dark:text-white">{stripHtml(next.title.rendered)}</span></Link>}</nav>}
        {recent.length > 0 && <section className="mt-14 border-t border-[#e3e7ed] pt-10 dark:border-white/10"><div className="flex items-end justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#54bd70]">Keep reading</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#17253d] dark:text-white">More from imeetify</h2></div><Link href="/" className="hidden items-center gap-2 text-sm font-bold text-[#17253d] hover:text-[#54bd70] sm:flex dark:text-white">View all <ArrowRight className="size-4" /></Link></div><div className="mt-6 grid gap-6 md:grid-cols-2">{recent.slice(0, 2).map((item) => <BlogCard key={item.id} post={item} />)}</div></section>}
      </article>
      <aside className="min-w-0 lg:sticky lg:top-[100px] lg:max-h-[calc(100vh-120px)] lg:self-start lg:overflow-y-auto lg:pr-1"><BlogSidebar recent={recent} current={post} /></aside>
    </main>
    <BackToTop />
  </>
}
