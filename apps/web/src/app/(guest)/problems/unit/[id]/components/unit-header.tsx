import { ProblemTagBadge } from '../../../(list)/components/problem-tag-badge'
import {
  ClipboardCheck,
  Goal,
  LayersIcon,
  Lightbulb,
  ListTodo,
} from 'lucide-react'

import ReactMarkdown from 'react-markdown'

import { ProblemDescDetail } from '@/types/problem.type'

interface UnitProblemHeaderProps {
  title: string
  descDetail: ProblemDescDetail
  tags: string[]
}

export function UnitProblemHeader({
  title,
  descDetail,
  tags,
}: UnitProblemHeaderProps) {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex flex-col gap-3 pl-1">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <LayersIcon className="bg-primary text-primary-foreground h-7 w-7 rounded-full p-1.5" />
          {title}
        </h1>

        {/* 개요 */}
        <div className="markdown-content text-muted-foreground">
          <ReactMarkdown>{descDetail.overview}</ReactMarkdown>
        </div>

        {/* 요구사항 */}
        {descDetail.requirements && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <ListTodo className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
              요구사항
            </h3>
            <div className="markdown-content text-muted-foreground">
              <ReactMarkdown>{descDetail.requirements}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* 전제 조건 */}
        {descDetail.prerequisites && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <ClipboardCheck className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
              전제 조건
            </h3>
            <div className="markdown-content text-muted-foreground">
              <ReactMarkdown>{descDetail.prerequisites}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* 학습 목표 */}
        {descDetail.learningObjectives && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Goal className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
              학습 목표
            </h3>
            <div className="markdown-content text-muted-foreground">
              <ReactMarkdown>{descDetail.learningObjectives}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* 힌트 */}
        {descDetail.hint && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Lightbulb className="bg-primary/20 text-primary/70 h-5 w-5 rounded-full p-1" />
              힌트
            </h3>
            <div className="markdown-content text-muted-foreground">
              <ReactMarkdown>{descDetail.hint}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <ProblemTagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  )
}
