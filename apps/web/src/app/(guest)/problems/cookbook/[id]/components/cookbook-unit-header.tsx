import { ClipboardCheck, Goal, Lightbulb, ListTodo } from 'lucide-react'

import ReactMarkdown from 'react-markdown'

import { Badge } from '@/components/ui/badge'
import { ProblemDescDetail } from '@/types/problem.type'

interface CookbookUnitProblemHeaderProps {
  unitDescDetail: ProblemDescDetail
  units: { id: string; title: string }[]
  currUnitId: string
}

export function CookbookUnitProblemHeader({
  unitDescDetail,
  units,
  currUnitId,
}: CookbookUnitProblemHeaderProps) {
  const currUnitIndex = units.findIndex((unit) => unit.id === currUnitId)
  const currUnit = units[currUnitIndex]

  return (
    <div className="bg-card space-y-6 rounded-xl border p-6 shadow-sm">
      <div className="space-y-4">
        <div className="bg-muted/30 -mx-6 flex flex-col gap-4 rounded-b-xl px-6 py-2">
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
            <div className="markdown-content text-muted-foreground">
              <ReactMarkdown>{unitDescDetail.overview}</ReactMarkdown>
            </div>

            {/* 요구사항 */}
            {unitDescDetail.requirements && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold">
                  <ListTodo className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
                  요구사항
                </h3>
                <div className="markdown-content text-muted-foreground">
                  <ReactMarkdown>{unitDescDetail.requirements}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 전제 조건 */}
            {unitDescDetail.prerequisites && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold">
                  <ClipboardCheck className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
                  전제 조건
                </h3>
                <div className="markdown-content text-muted-foreground">
                  <ReactMarkdown>{unitDescDetail.prerequisites}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* 학습 목표 */}
            {unitDescDetail.learningObjectives && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Goal className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
                  학습 목표
                </h3>
                <div className="markdown-content text-muted-foreground">
                  <ReactMarkdown>
                    {unitDescDetail.learningObjectives}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* 힌트 */}
            {unitDescDetail.hint && (
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Lightbulb className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
                  힌트
                </h3>
                <div className="markdown-content text-muted-foreground">
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
