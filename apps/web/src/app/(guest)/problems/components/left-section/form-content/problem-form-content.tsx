'use client'

import { ServiceForm } from './service-form'
import { ServiceTabs } from './service-tabs'

import React, { useState } from 'react'

import { type IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { cn } from '@/lib/utils'

interface ProblemFormContentProps {
  problemData: IServiceMapper[]
}

export function ProblemFormContent({ problemData }: ProblemFormContentProps) {
  const [currService, setCurrService] = useState(problemData[0].serviceName)

  const handleServiceChange = (serviceName: IServiceMapper['serviceName']) => {
    setCurrService(serviceName)
  }

  return (
    <React.Fragment>
      <div
        className={cn(
          problemData.length < 2 && 'pointer-events-none border-b',
          'm-0 flex w-full items-end',
        )}
      >
        <ServiceTabs
          services={problemData}
          current={currService}
          onChange={handleServiceChange}
        />
      </div>

      <ServiceForm problemData={problemData} currentService={currService} />
    </React.Fragment>
  )
}
