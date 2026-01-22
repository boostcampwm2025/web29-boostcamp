'use client'

import { FeedbackDetailCard } from '../components/feedback-detail-card'
import {
  DiagramPanel,
  ProblemHeader,
  ServiceRenderer,
  SubmitButton,
  UnitFormProvider,
} from './components'

import { useState } from 'react'

import type { ProblemDetail } from '@/types/problem.type'

interface ProblemDetailClientProps {
  problemData: ProblemDetail
}

// Mock 피드백 (나중에 실제 API 응답으로 대체)
const mockFeedbackMessages = [
  {
    service: 'S3',
    field: '',
    message:
      '버킷 이름은 전역적으로 고유해야 합니다. 다른 이름을 시도해 주세요.',
  },
  {
    service: 'S3',
    field: 'blockPublicAccess',
    message:
      '퍼블릭 액세스 차단 설정이 권장됩니다. 보안 위험을 줄이기 위해 모든 퍼블릭 액세스를 차단하는 것이 좋습니다.',
  },
]

export default function ProblemDetailClient({
  problemData,
}: ProblemDetailClientProps) {
  const [feedback, setFeedback] = useState(mockFeedbackMessages)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmitSuccess = (result: unknown) => {
    console.log('제출 결과:', result)
    setIsSubmitted(true)
    // 실제 피드백으로 대체
    // setFeedback(result.feedback)
  }

  return (
    <UnitFormProvider problemData={problemData}>
      {/* 왼쪽: 스크롤 가능한 폼 영역 */}
      <div className="space-y-6 overflow-y-auto">
        <ProblemHeader problem={problemData} />
        <ServiceRenderer requiredFields={problemData.required_fields} />
      </div>

      {/* 오른쪽: 스티키 영역 */}
      <div className="relative h-full">
        <div className="sticky top-24 space-y-4">
          <SubmitButton onSubmitSuccess={handleSubmitSuccess} />
          <DiagramPanel />
          {isSubmitted && <FeedbackDetailCard feedback={feedback} />}
        </div>
      </div>
    </UnitFormProvider>
  )
}
