import { BlogHeader } from '@/components/blog-header'
import { BlogHome } from '@/components/blog-home'
import { BlogFooter } from '@/components/blog-footer'
import { getPosts, getRecentPosts } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string; s?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page || 1) || 1)
  const query = params.s?.trim() || undefined
  const [{ posts, totalPages }, recent] = await Promise.all([getPosts(page, 6, query), getRecentPosts()])
  return <><BlogHeader /><BlogHome posts={posts} recent={recent} page={page} totalPages={totalPages} query={query} /><BlogFooter /></>
}
