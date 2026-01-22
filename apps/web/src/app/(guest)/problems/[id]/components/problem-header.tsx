import { Badge } from '@/components/ui/badge'
import type { ProblemDetail } from '@/types/problem.type'

interface ProblemHeaderProps {
  problem: ProblemDetail
}

export function ProblemHeader({ problem }: ProblemHeaderProps) {
  return (
    <div className="bg-card space-y-4 rounded-lg border p-6">
      <div className="flex items-center gap-3">
        <span className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-sm font-semibold">
          문제 #{problem.id}
        </span>
        <h1 className="text-2xl font-bold">{problem.title}</h1>
      </div>

      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {problem.description}
      </p>

      {problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
