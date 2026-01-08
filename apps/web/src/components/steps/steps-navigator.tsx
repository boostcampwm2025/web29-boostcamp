'use client'

import type { StepRenderProps, StepsNavigatorProps } from './types'

import { useCallback, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Steps } from '@/components/ui/steps'

export function StepsNavigator({
  steps,
  defaultStep = 0,
  queryParamName = 'step',
  onComplete,
  className,
}: StepsNavigatorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL에서 현재 단계 읽기
  const urlStep = Number(searchParams.get(queryParamName) ?? defaultStep)
  const [currentStep, setCurrentStep] = useState(urlStep)

  // URL 업데이트
  const updateUrl = useCallback(
    (step: number) => {
      const params = new URLSearchParams(searchParams)
      params.set(queryParamName, step.toString())
      router.push(`?${params.toString()}`)
    },
    [searchParams, queryParamName, router],
  )

  // Navigation handlers
  const onNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      updateUrl(nextStep)
    } else {
      onComplete?.()
    }
  }, [currentStep, steps.length, updateUrl, onComplete])

  const onPrev = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      updateUrl(prevStep)
    }
  }, [currentStep, updateUrl])

  // Render props 전달
  const renderProps: StepRenderProps = {
    onNext,
    onPrev,
    canGoPrev: currentStep > 0,
    canGoNext: currentStep < steps.length - 1,
    currentStep,
    totalSteps: steps.length,
  }

  return (
    <div className={className}>
      <Steps steps={steps} currentStep={currentStep + 1} />

      <div className="grid grid-cols-2 gap-2">
        <div className="mt-6">{steps[currentStep]?.render(renderProps)}</div>

        <div className="mt-6 p-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          laborum praesentium impedit natus possimus similique illo numquam?
          Sapiente, in consequuntur. Iure voluptates ducimus illum nesciunt
          neque minus laboriosam officia repellat.
        </div>
      </div>
    </div>
  )
}
