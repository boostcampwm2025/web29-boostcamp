'use client'

import { ServiceForm } from './service-form'
import { ServiceTabs } from './service-tabs'

import React, { useMemo, useState } from 'react'

import { type IServiceMapper } from '@/components/aws-services/utils/serviceMapper'
import { cn } from '@/lib/utils'

interface ProblemFormContentProps {
  problemData: IServiceMapper[]
}

export function ProblemFormContent({ problemData }: ProblemFormContentProps) {
  const [currTask, setCurrTask] = useState(problemData[0].serviceTask)

  const uniqueTasks = useMemo(() => {
    return problemData.filter(
      (item, index, self) =>
        self.findIndex(
          (t) => t.serviceTask === item.serviceTask && t.label === item.label,
        ) === index,
    )
  }, [problemData])

  const handleTaskChange = (serviceTask: IServiceMapper['serviceTask']) => {
    setCurrTask(serviceTask)
  }

  return (
    <React.Fragment>
      {uniqueTasks.length > 1 && (
        <div
          className={cn(
            uniqueTasks.length < 2 && 'pointer-events-none border-b',
            'm-0 flex w-full items-end',
          )}
        >
          <ServiceTabs
            services={uniqueTasks}
            current={currTask}
            onChange={handleTaskChange}
          />
        </div>
      )}

      <ServiceForm problemData={problemData} currentTask={currTask} />
    </React.Fragment>
  )
}
