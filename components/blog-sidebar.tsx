import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock3, Mail, Rss, Tag, Users } from 'lucide-react'
import { getCategories, getFeaturedImage, getPostCategories, getReadingTime, getTags, stripHtml, type WpCategory, type WpPost, type WpTag } from '@/lib/wordpress'
import { ArticleToc } from '@/components/article-toc'
import { ArticleTools } from '@/components/article-tools'
import { NewsletterCta } from '@/components/newsletter-cta'

function getTocItems(html: string) {
  return [...html.matchAll(/<h[2-6][^>]*>(.*?)<\/h[2-6]>/gi)].map((match) => stripHtml(match[1]))
}

function RelatedArticles({ posts }: { posts: WpPost[] }) {
  return <section className="sidebar-widget"><h2 className="sidebar-title">Related articles</h2><div className="mt-4 flex flex-col gap-2">{posts.slice(0, 3).map((post) => <PostMiniCard key={post.id} post={post} label={new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />)}</div></section>
}

function PostMiniCard({ post, label }: { post: WpPost; label?: string }) {
  const image = getFeaturedImage(post)
  return <Link href={`/${post.slug}`} className="group flex gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-[#f6f8fb] dark:hover:bg-white/5">
    <div className="relative size-[64px] shrink-0 overflow-hidden rounded-lg bg-[#eef1f5] dark:bg-white/10">{image && <Image src={image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />}</div>
    <div className="min-w-0"><p className="line-clamp-2 text-[13px] font-bold leading-5 text-[#17253d] transition-colors group-hover:text-[#54bd70] dark:text-white">{stripHtml(post.title.rendered)}</p><p className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#8a97aa]">{label || <><Clock3 className="size-3" /> {getReadingTime(post.content.rendered)} min read</>}</p></div>
  </Link>
}

export async function BlogSidebar({ recent, current }: { recent: WpPost[]; current?: WpPost }) {
  let categories: WpCategory[] = []
  let tags: WpTag[] = []
  const [categoryResult, tagResult] = await Promise.allSettled([getCategories(), getTags()])
  if (categoryResult.status === 'fulfilled') categories = categoryResult.value
  if (tagResult.status === 'fulfilled') tags = tagResult.value
  const toc = current ? getTocItems(current.content.rendered) : []
  const featured = recent[0]
  if (current) return <aside className="flex flex-col gap-5" aria-label="Article sidebar">
    <section className="sidebar-widget"><ArticleToc items={toc} /></section>
    <section className="sidebar-widget"><h2 className="sidebar-title">Share article</h2><div className="mt-4"><ArticleTools url={current.link} title={stripHtml(current.title.rendered)} /></div></section>
    <RelatedArticles posts={recent} />
  </aside>
  return <aside className="flex flex-col gap-5" aria-label="Blog sidebar">
    {featured && <section className="sidebar-widget"><div className="flex items-center justify-between"><h2 className="sidebar-title">Featured article</h2><Tag className="size-4 text-[#54bd70]" /></div><Link href={`/${featured.slug}`} className="group mt-4 block overflow-hidden rounded-xl bg-[#f3f6f9] dark:bg-white/5"><div className="relative aspect-[1.8] overflow-hidden">{getFeaturedImage(featured) && <Image src={getFeaturedImage(featured)} alt="" fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />}</div><div className="p-4"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#54bd70]">{stripHtml(getPostCategories(featured)[0]?.name || 'Latest')}</p><h3 className="mt-2 line-clamp-3 text-[15px] font-bold leading-5 text-[#17253d] group-hover:text-[#54bd70] dark:text-white">{stripHtml(featured.title.rendered)}</h3></div></Link></section>}
    <section className="sidebar-widget"><h2 className="sidebar-title">Recent posts</h2><div className="mt-4 flex flex-col gap-2">{recent.slice(0, 4).map((post) => <PostMiniCard key={post.id} post={post} />)}</div></section>
    {categories.length > 0 && <section className="sidebar-widget"><h2 className="sidebar-title">Categories</h2><div className="mt-4 flex flex-col gap-2">{categories.slice(0, 7).map((category) => <Link key={category.id} href={`/?category=${category.slug}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-[13px] text-[#647087] transition-colors hover:bg-[#f6f8fb] hover:text-[#54bd70] dark:text-[#b6c1d0] dark:hover:bg-white/5"><span>{stripHtml(category.name)}</span><span className="text-xs">{category.count}</span></Link>)}</div></section>}
    {tags.length > 0 && <section className="sidebar-widget"><h2 className="sidebar-title">Explore tags</h2><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <Link key={tag.id} href={`/?tag=${tag.slug}`} className="rounded-full border border-[#dce2e9] px-3 py-1.5 text-[11px] font-semibold text-[#647087] transition-colors hover:border-[#54bd70] hover:text-[#54bd70] dark:border-white/10 dark:text-[#b6c1d0]">{stripHtml(tag.name)}</Link>)}</div></section>}
    <NewsletterCta />
    <section className="sidebar-widget"><div className="flex items-center gap-2"><Users className="size-4 text-[#54bd70]" /><h2 className="sidebar-title">Follow imeetify</h2></div><div className="mt-4 flex items-center gap-2"><a href="https://imeetify.com" target="_blank" rel="noreferrer" className="rounded-lg border border-[#dce2e9] px-3 py-2 text-xs font-bold text-[#647087] transition-colors hover:border-[#54bd70] hover:text-[#54bd70] dark:border-white/10 dark:text-[#b6c1d0]">Website</a><a href="mailto:hello@imeetify.com" className="inline-flex items-center gap-2 rounded-lg border border-[#dce2e9] px-3 py-2 text-xs font-bold text-[#647087] transition-colors hover:border-[#54bd70] hover:text-[#54bd70] dark:border-white/10 dark:text-[#b6c1d0]"><Mail className="size-3.5" /> Email</a><a href="https://imeetify.blog/feed/" target="_blank" rel="noreferrer" aria-label="RSS feed" className="inline-flex size-9 items-center justify-center rounded-lg border border-[#dce2e9] text-[#647087] transition-colors hover:border-[#54bd70] hover:text-[#54bd70] dark:border-white/10 dark:text-[#b6c1d0]"><Rss className="size-4" /></a></div></section>
    <section className="rounded-2xl bg-[#17253d] p-7 text-white shadow-[0_16px_40px_rgba(23,37,61,0.16)]"><Tag className="size-5 text-[#76d58c]" /><h2 className="mt-4 text-xl font-bold">Make meetings matter.</h2><p className="mt-2 text-sm leading-6 text-[#c4ccda]">Bring thoughtful collaboration into every conversation with imeetify.</p><Link href="https://imeetify.com" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#8fe3a0] hover:text-white">Explore imeetify <ArrowUpRight className="size-4" /></Link></section>
  </aside>
}
