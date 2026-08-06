import { BlogHeader } from '@/components/blog-header'
import { BlogHome } from '@/components/blog-home'
import { BlogFooter } from '@/components/blog-footer'
import { getPosts, getRecentPosts } from '@/lib/wordpress'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page || 1) || 1)
  const [{ posts, totalPages }, recent] = await Promise.all([getPosts(page), getRecentPosts()])
  return <><BlogHeader /><BlogHome posts={posts} recent={recent} page={page} totalPages={totalPages} /><BlogFooter /></>
}
