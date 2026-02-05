import { ExternalLinkIcon } from 'lucide-react'

import Link from 'next/link'

export const AwsQuickLink = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex w-fit items-center gap-1 rounded-full bg-[#252F3E] px-3 py-1"
    >
      <ExternalLinkIcon className="h-4 w-4 text-[#FF9900]" />
      <span className="text-xs font-semibold text-[#FF9900]">
        AWS에서 살펴보기
      </span>
    </Link>
  )
}
