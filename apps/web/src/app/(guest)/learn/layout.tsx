import { LearnSidebar } from './components/learn-sidebar'

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl px-4">
      <LearnSidebar />
      <div className="flex-1 px-8">{children}</div>
    </div>
  )
}
