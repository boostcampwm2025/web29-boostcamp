'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface MenuItem {
  title: string
  href: string
}

const menuItems: MenuItem[] = [
  { title: 'EC2', href: '/learn/ec2' },
  { title: 'S3', href: '/learn/s3' },
  { title: 'CloudFront', href: '/learn/cloudfront' },
  { title: 'VPC', href: '/learn/vpc' },
]

export const LearnSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="sticky top-18 h-[calc(100vh-4.5rem)] w-64 border-r bg-white py-6 pr-6 pl-4">
      <nav className="space-y-1">
        <h2 className="mb-4 px-2 text-lg font-semibold">AWS 서비스</h2>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
