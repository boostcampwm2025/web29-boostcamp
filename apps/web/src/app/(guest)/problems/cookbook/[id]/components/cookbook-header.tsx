import { ProblemTagBadge } from '../../../(list)/components/problem-tag-badge'

import ReactMarkdown from 'react-markdown'

import { Progress } from '@/components/ui/progress'

interface CookbookProblemHeaderProps {
  title: string
  descDetail: string
  tags: string[]
  units: { id: string; title: string }[]
  currUnitId: string
}

export function CookbookProblemHeader({
  title,
  descDetail,
  tags,
  units,
  currUnitId,
}: CookbookProblemHeaderProps) {
  const currUnitIndex = units.findIndex((unit) => unit.id === currUnitId)
  const progress = ((currUnitIndex + 1) / units.length) * 100

  return (
    <div className="bg-card space-y-6 rounded-xl border p-6 shadow-sm">
      {/* 진행도 섹션 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold tracking-tight">
          <div className="text-primary flex items-center gap-2">
            <span className="bg-primary/10 rounded-md px-1.5 py-0.5 uppercase">
              Cookbook Progress
            </span>
            <span className="text-muted-foreground/60">
              Step {currUnitIndex + 1} of {units.length}
            </span>
          </div>
          <span className="text-primary font-mono">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="space-y-4">
        <div className="text-card-foreground flex flex-col gap-2 pl-1">
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            {title}
          </h1>
          <div className="text-muted-foreground leading-relaxed">
            <ReactMarkdown>{descDetail}</ReactMarkdown>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <ProblemTagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
