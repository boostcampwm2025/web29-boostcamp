'use client'

import { serviceMapper } from '@/aws-services/utils/serviceMapper'
import { IServiceMapper } from '@/aws-services/utils/serviceMapper'

interface ProblemDetailClientProps {
  problemData: IServiceMapper
}

export default function ProblemDetailClient({
  problemData,
}: ProblemDetailClientProps) {
  const { Component, config } = serviceMapper(problemData)

  return <Component config={config} />
}
