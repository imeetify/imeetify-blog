import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogHeader } from '@/components/blog-header'
import { BlogPost } from '@/components/blog-post'
import { BlogFooter } from '@/components/blog-footer'
import { getPostBySlug, getRecentPosts, stripHtml, type WpPost } from '@/lib/wordpress'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug.at(-1) || '')
  if (!post) return { title: 'Story not found | imeetify' }
  const title = stripHtml(post.title.rendered)
  const description = stripHtml(post.excerpt.rendered).slice(0, 160)
  return { title: `${title} | imeetify`, description, alternates: { canonical: `https://imeetify.blog/${slug.join('/')}` }, openGraph: { title, description, type: 'article', url: `https://imeetify.blog/${slug.join('/')}` } }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug.at(-1) || '')
  if (!post) notFound()
  let recent: WpPost[] = []
  try { recent = await getRecentPosts(post.id) } catch { recent = [] }
  return <><BlogHeader /><BlogPost post={post} recent={recent} /><BlogFooter /></>
}
