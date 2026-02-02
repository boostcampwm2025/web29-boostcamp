'use client'

import { SparklesIcon } from 'lucide-react'

import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FeedbackDetail } from '@/types/feedback.type'

type GroupedFeedback = {
  code: string
  baseMessage: string // 리소스 이름 제외한 메시지
  resources: string[] // 해당 리소스 이름들
}

// 메시지에서 리소스 이름을 제거하여 기본 메시지 추출
function extractBaseMessage(message: string, service?: string): string {
  if (!service) return message
  // "S3 버킷 my-bucket에 ..." → "S3 버킷에 ..."
  return message.replace(` ${service}`, '')
}

function groupFeedbacks(feedbacks: FeedbackDetail[]): GroupedFeedback[] {
  const groups = new Map<string, GroupedFeedback>()

  for (const fb of feedbacks) {
    const key = fb.code

    if (groups.has(key)) {
      const group = groups.get(key)!
      if (fb.service && !group.resources.includes(fb.service)) {
        group.resources.push(fb.service)
      }
    } else {
      groups.set(key, {
        code: fb.code,
        baseMessage: extractBaseMessage(fb.message, fb.service),
        resources: fb.service ? [fb.service] : [],
      })
    }
  }

  return Array.from(groups.values())
}

export const FeedbackDetailCard = ({
  feedback,
}: {
  feedback: FeedbackDetail[]
}) => {
  const [visible, setVisible] = useState(false)

  const groupedFeedbacks = groupFeedbacks(feedback)

  return (
    <Card className="border-primary bg-primary-foreground relative border-2">
      <div className={cn(!visible && 'pointer-events-none blur-md')}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon fill="#3979ef" className="text-primary h-5 w-5" />
            상세 피드백 확인하기
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-2">
          <ul className="list-disc pl-4 text-sm leading-6">
            {groupedFeedbacks.map((group) => (
              <li key={group.code}>
                {group.baseMessage}
                {group.resources.length > 0 && (
                  <span className="text-muted-foreground ml-1">
                    ({group.resources.join(', ')})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      {!visible && (
        <div
          className={cn(
            'absolute inset-0 z-10',
            'flex items-center justify-center gap-2',
            'cursor-pointer',
          )}
          onClick={() => setVisible(true)}
        >
          <SparklesIcon fill="#3979ef" className="text-primary h-8 w-8" />
          <p className="text-xl font-semibold">
            여기를 눌러 상세 피드백을 확인할 수 있어요
          </p>
        </div>
      )}
    </Card>
  )
}
