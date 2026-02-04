import { AppSquareIcon } from '../icons/app-square.icon'
import { Button } from '../ui/button'

import Link from 'next/link'

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 h-18 w-full border-b bg-slate-50/70 backdrop-blur-xl supports-backdrop-filter:bg-slate-50/70">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[200px_1fr] items-center justify-between px-4">
        <Link href="/" className="">
          <span className="sr-only">클라우드 크래프트</span>
          <AppSquareIcon width={64} height={64} />
        </Link>
        <div className="flex gap-4 justify-self-end">
          <Button asChild variant="outline">
            <Link href="/problems?type=unit">문제 목록</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
