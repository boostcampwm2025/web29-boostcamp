'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Step, Steps } from '@/components/ui/steps'

interface StepConfig extends Step {
  component: React.ReactNode
}

interface StepsNavigatorProps {
  steps: StepConfig[]
  defaultStep?: number
  queryParamName?: string
  className?: string
}

interface StepsContextValue {
  currentStep: number
  totalSteps: number
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

const StepsContext = React.createContext<StepsContextValue | null>(null)

export function useSteps() {
  const context = React.useContext(StepsContext)
  if (!context) {
    throw new Error('useSteps must be used within StepsNavigator')
  }
  return context
}

export function StepsNavigator({
  steps,
  defaultStep = 1,
  queryParamName = 'step',
  className,
}: StepsNavigatorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 쿼리 파라미터에서 현재 단계 읽기
  const stepParam = searchParams.get(queryParamName)
  const currentStep = stepParam ? parseInt(stepParam, 10) : defaultStep

  // 유효하지 않은 단계 처리
  const validCurrentStep =
    currentStep >= 1 && currentStep <= steps.length ? currentStep : defaultStep

  // 단계 변경 핸들러
  const goToStep = React.useCallback(
    (step: number) => {
      if (step >= 1 && step <= steps.length) {
        const params = new URLSearchParams(searchParams.toString())
        params.set(queryParamName, step.toString())
        router.push(`?${params.toString()}`)
      }
    },
    [router, searchParams, queryParamName, steps.length],
  )

  const nextStep = React.useCallback(() => {
    goToStep(validCurrentStep + 1)
  }, [goToStep, validCurrentStep])

  const prevStep = React.useCallback(() => {
    goToStep(validCurrentStep - 1)
  }, [goToStep, validCurrentStep])

  const contextValue: StepsContextValue = React.useMemo(
    () => ({
      currentStep: validCurrentStep,
      totalSteps: steps.length,
      goToStep,
      nextStep,
      prevStep,
      canGoNext: validCurrentStep < steps.length,
      canGoPrev: validCurrentStep > 1,
    }),
    [validCurrentStep, steps.length, goToStep, nextStep, prevStep],
  )

  // 현재 단계의 컴포넌트
  const currentStepConfig = steps[validCurrentStep - 1]

  return (
    <StepsContext.Provider value={contextValue}>
      <div className={className}>
        {/* Steps Navigation */}
        <div className="mb-8">
          <Steps
            steps={steps}
            currentStep={validCurrentStep}
            onStepClick={goToStep}
          />
        </div>

        {/* Current Step Content */}
        <div>{currentStepConfig?.component}</div>
      </div>
    </StepsContext.Provider>
  )
}
