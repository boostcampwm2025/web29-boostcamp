'use client'

import { useUnitForm } from './unit-form-provider'

import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  onSubmitSuccess?: (feedback: unknown) => void
}

export function SubmitButton({ onSubmitSuccess }: SubmitButtonProps) {
  const { form, problemData } = useUnitForm()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: Record<string, Record<string, unknown>>) => {
    console.log('📤 통합 제출 데이터:', data)

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000'

      const response = await fetch(`${baseUrl}/api/problems/submit`, {
        // 엔드포인트 이거 아님 !!!!!!! 나중에 수정
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: problemData.id,
          answer: data,
        }),
      })

      if (!response.ok) {
        throw new Error('제출 실패')
      }

      const result = await response.json()
      console.log('✅ 제출 성공:', result)
      onSubmitSuccess?.(result)
    } catch (error) {
      console.error('❌ 제출 에러:', error)
    }
  }

  return (
    <Button
      className="w-full"
      onClick={handleSubmit(onSubmit)}
      disabled={isSubmitting}
    >
      {isSubmitting ? '제출 중...' : '제출하기'}
    </Button>
  )
}
