'use client'

import { ProblemLeftSection } from '../../components/left-section'
import { ProblemRightSection } from '../../components/right-section'
import { CookbookProblemHeader } from './components/cookbook-header'
import { CookbookUnitProblemHeader } from './components/cookbook-unit-header'

import { useEffect, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { mergeServiceDefaultValues } from '@/components/aws-services/registry/form-defaults-factory'
import type { IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { ProblemFormProvider } from '@/contexts/problem-form-context'
import { ProblemDescDetail } from '@/types/problem.type'
import { GlobalSubmitConfig } from '@/types/submitConfig.types'

interface CookbookProblemClientProps {
  unitId: string
  cookbookId: string
  title: string
  descDetail: string
  unitDescDetail: ProblemDescDetail
  tags: string[]
  problemData: IServiceMapper[]
  defaultConfigs: GlobalSubmitConfig
  units: { id: string; title: string }[]
  nextUnitId?: string
}

export default function CookbookProblemClient({
  unitId,
  cookbookId,
  title,
  descDetail,
  unitDescDetail,
  tags,
  problemData,
  defaultConfigs,
  units,
  nextUnitId,
}: CookbookProblemClientProps) {
  const defaultValues = useMemo(
    () => mergeServiceDefaultValues(problemData),
    [problemData],
  )

  const router = useRouter()
  useEffect(() => {
    router.push(`/problems/cookbook/${cookbookId}?unitId=${unitId}`)
  }, [])

  return (
    <>
      <CookbookProblemHeader
        title={title}
        descDetail={descDetail}
        tags={tags}
        units={units}
        currUnitId={unitId}
      />
      <ProblemFormProvider
        defaultValues={defaultValues}
        unitId={unitId}
        cookbookId={cookbookId}
        problemType="cookbook"
        nextUnitId={nextUnitId}
        defaultConfigs={defaultConfigs}
      >
        <div className="mt-4 grid grid-cols-2 gap-4">
          <ProblemLeftSection problemData={problemData}>
            <CookbookUnitProblemHeader
              unitDescDetail={unitDescDetail}
              units={units}
              currUnitId={unitId}
            />
          </ProblemLeftSection>

          <ProblemRightSection />
        </div>
      </ProblemFormProvider>
    </>
  )
}
