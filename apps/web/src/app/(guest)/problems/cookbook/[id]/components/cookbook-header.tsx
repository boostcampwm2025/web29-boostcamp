import { ProblemTagBadge } from '../../../(list)/components/problem-tag-badge'

import ReactMarkdown from 'react-markdown'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ProblemDescDetail } from '@/types/problem.type'

interface CookbookProblemHeaderProps {
  title: string
  descDetail: string
  unitDescDetail: ProblemDescDetail
  tags: string[]
  units: { id: string; title: string }[]
  currUnitId: string
}

export function CookbookProblemHeader({
  title,
  descDetail,
  unitDescDetail,
  tags,
  units,
  currUnitId,
}: CookbookProblemHeaderProps) {
  const currUnitIndex = units.findIndex((unit) => unit.id === currUnitId)
  const currUnit = units[currUnitIndex]
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

        <div className="bg-muted/30 -mx-6 -mb-6 flex flex-col gap-4 rounded-b-xl border-t px-6 py-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary hover:bg-primary text-primary-foreground h-6 min-w-6 rounded-full px-2.5 font-mono text-xs tabular-nums shadow-sm">
              Step {currUnitIndex + 1}
            </Badge>
            <span className="text-foreground text-base font-bold">
              {currUnit.title}
            </span>
          </div>

          {/* 유닛 상세 설명 */}
          <div className="flex flex-col gap-3">
            {/* 개요 */}
            {unitDescDetail.overview && (
              <div className="markdown-content text-muted-foreground text-sm">
                <ReactMarkdown>{unitDescDetail.overview}</ReactMarkdown>
              </div>
            )}

            {/* 요구사항 */}
            {unitDescDetail.requirements && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold">요구사항</h4>
                <div className="markdown-content text-muted-foreground text-xs">
                  <ReactMarkdown>{unitDescDetail.requirements}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 전제 조건 */}
            {unitDescDetail.prerequisites && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold">전제 조건</h4>
                <div className="markdown-content text-muted-foreground text-xs">
                  <ReactMarkdown>{unitDescDetail.prerequisites}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 학습 목표 */}
            {unitDescDetail.learningObjectives && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold">학습 목표</h4>
                <div className="markdown-content text-muted-foreground text-xs">
                  <ReactMarkdown>
                    {unitDescDetail.learningObjectives}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* 힌트 */}
            {unitDescDetail.hint && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold">힌트</h4>
                <div className="markdown-content text-muted-foreground text-xs">
                  <ReactMarkdown>{unitDescDetail.hint}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
