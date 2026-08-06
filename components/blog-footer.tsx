import Image from 'next/image'
import Link from 'next/link'

const logo = 'https://imeetify.blog/wp-content/uploads/2025/08/app-logo@2x.png'

export function BlogFooter() {
  return <footer className="mt-16 border-t border-[#e8ebf0] bg-white py-10"><div className="mx-auto flex max-w-[1260px] flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between lg:px-8"><Link href="/" aria-label="imeetify blog home"><Image src={logo} alt="imeetify" width={130} height={29} unoptimized /></Link><p className="text-sm text-[#647087]">Ideas for better meetings and better work.</p><p className="text-xs text-[#8994a6]">© {new Date().getFullYear()} imeetify</p></div></footer>
}
