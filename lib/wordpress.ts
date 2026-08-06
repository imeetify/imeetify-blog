const API_URL = (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://imeetify.blog/wp-json/wp/v2').replace(/\/$/, '')

export type WpRendered = { rendered: string }

export type WpPost = {
  id: number
  date: string
  slug: string
  link: string
  title: WpRendered
  content: WpRendered
  excerpt: WpRendered
  _embedded?: {
    ['wp:featuredmedia']?: Array<{ source_url?: string; alt_text?: string; caption?: WpRendered }>
    author?: Array<{ name?: string; avatar_urls?: Record<string, string> }>
    ['wp:term']?: Array<Array<{ id: number; name: string; slug: string }>>
  }
}

export type WpCategory = { id: number; name: string; slug: string; count: number }

async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
    next: { revalidate: 300, ...init?.next },
  })

  if (!response.ok) throw new Error(`WordPress request failed: ${response.status}`)
  return response.json() as Promise<T>
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/&#038;|&amp;/gi, '&').replace(/&#038;|&amp;/gi, '&').replace(/&#8217;|&rsquo;/gi, '’').replace(/&#8216;|&lsquo;/gi, '‘').replace(/&#8220;|&ldquo;/gi, '“').replace(/&#8221;|&rdquo;/gi, '”').replace(/&#8211;|&ndash;/gi, '–').replace(/&#8230;|&hellip;/gi, '…').replace(/&#039;|&apos;/gi, "'").replace(/&quot;/gi, '"').trim()
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export function getFeaturedImage(post: WpPost) {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
}

export function getAuthor(post: WpPost) {
  return post._embedded?.author?.[0] || { name: 'imeetify team' }
}

export function getReadingTime(value: string) {
  const words = stripHtml(value).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

export function getPostCategories(post: WpPost) {
  return post._embedded?.['wp:term']?.flat().filter((term) => term.name) || []
}

export async function getPosts(page = 1, perPage = 6) {
  const response = await fetch(`${API_URL}/posts?per_page=${perPage}&page=${page}&_embed=1&orderby=date&order=desc`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  })
  if (!response.ok && response.status !== 400) throw new Error(`WordPress request failed: ${response.status}`)
  const posts = (response.ok ? await response.json() : []) as WpPost[]
  return { posts, totalPages: Number(response.headers.get('X-WP-TotalPages') || 1), total: Number(response.headers.get('X-WP-Total') || posts.length) }
}

export async function getPostBySlug(slug: string) {
  try {
    const posts = await wpFetch<WpPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`)
    return posts[0] || null
  } catch {
    const fallback = await getPosts(1, 100)
    return fallback.posts.find((post) => post.slug === slug) || null
  }
}

export async function getCategories() {
  return wpFetch<WpCategory[]>('/categories?per_page=20&orderby=count&order=desc')
}

export async function getRecentPosts(excludeId?: number) {
  const posts = await wpFetch<WpPost[]>(`/posts?per_page=5&orderby=date&order=desc&_embed=1${excludeId ? `&exclude=${excludeId}` : ''}`)
  return posts
}
