'use client'

import { useMemo } from 'react'

import {
  type IServiceMapper,
  serviceMapper,
} from '@/components/aws-services/utils/serviceMapper'
import { useProblemForm } from '@/contexts/problem-form-context'
import { cn } from '@/lib/utils'
import type { ServiceConfig, ServiceType } from '@/types/submitConfig.types'

const getServiceType = (serviceName: string): ServiceType => {
  const serviceTypeMap: Record<string, ServiceType> = {
    s3: 's3',
    cloudFront: 'cloudFront',
    ec2: 'ec2',
    vpc: 'vpc',
    rds: 'rds',
    subnet: 'subnet',
    routeTable: 'routeTable',
    internetGateway: 'internetGateway',
    natGateway: 'natGateway',
    securityGroups: 'securityGroups',
  }
  return serviceTypeMap[serviceName] || 's3'
}

export const ServiceForm = ({
  problemData,
  currentTask,
}: {
  problemData: IServiceMapper[]
  currentTask: IServiceMapper['serviceTask']
}) => {
  const { handleAddItem } = useProblemForm()

  const uniqueTasks = useMemo(() => {
    return problemData.filter(
      (item, index, self) =>
        self.findIndex(
          (t) => t.serviceTask === item.serviceTask && t.label === item.label,
        ) === index,
    )
  }, [problemData])

  const mapper = problemData.find((m) => m.serviceTask === currentTask)

  if (!mapper) return null

  const { Component, config } = serviceMapper(mapper)
  const serviceType = getServiceType(mapper.serviceName)

  return (
    <div
      className={cn(
        'border',
        uniqueTasks.length > 1 ? 'rounded-b-lg border-t-0' : 'rounded-lg',
      )}
    >
      <Component
        config={config}
        onSubmit={(data: ServiceConfig) => handleAddItem(serviceType, data)}
      />
    </div>
  )
}
