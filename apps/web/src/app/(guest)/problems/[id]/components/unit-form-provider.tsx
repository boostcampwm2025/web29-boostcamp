'use client'

import { type ReactNode, createContext, useContext } from 'react'
import { type UseFormReturn, useForm } from 'react-hook-form'

import { generateDefaultValues } from '@/lib/problem/get-problem-data'
import type { ProblemDetail } from '@/types/problem.type'

// Context 값 타입
interface UnitFormContextValue {
  form: UseFormReturn<Record<string, Record<string, unknown>>>
  problemData: ProblemDetail
}

// Context 생성
const UnitFormContext = createContext<UnitFormContextValue | null>(null)

// Custom hook for consuming context
export function useUnitForm() {
  const context = useContext(UnitFormContext)
  if (!context) {
    throw new Error('useUnitForm은 UnitFormProvider 안에서 사용해야 합니다')
  }
  return context
}

// Provider Props
interface UnitFormProviderProps {
  problemData: ProblemDetail
  children: ReactNode
}

// Provider 컴포넌트
export function UnitFormProvider({
  problemData,
  children,
}: UnitFormProviderProps) {
  // 통합 Form 인스턴스 생성 (한 번만!)
  const form = useForm<Record<string, Record<string, unknown>>>({
    defaultValues: generateDefaultValues(problemData.required_fields),
  })

  return (
    <UnitFormContext.Provider value={{ form, problemData }}>
      {children}
    </UnitFormContext.Provider>
  )
}
