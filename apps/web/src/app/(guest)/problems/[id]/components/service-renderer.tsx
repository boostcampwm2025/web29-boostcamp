'use client'

import { useUnitForm } from './unit-form-provider'

import { AWS_SERVICE_REGISTRY } from '@/components/aws-services/registry/registry'
import type { RequiredField } from '@/types/problem.type'

interface ServiceRendererProps {
  requiredFields: RequiredField[]
}

export function ServiceRenderer({ requiredFields }: ServiceRendererProps) {
  const { form } = useUnitForm()
  const { control, setValue } = form

  return (
    <div className="space-y-8">
      {requiredFields.map((field) => {
        const formPrefix = `${field.service}-${field.service_task}`

        // Registry에서 컴포넌트 조회
        const service =
          AWS_SERVICE_REGISTRY[
            field.service as keyof typeof AWS_SERVICE_REGISTRY
          ]
        if (!service) {
          console.warn(`Service not found: ${field.service}`)
          return null
        }

        const page = service[field.service_task]
        if (!page) {
          console.warn(
            `Service task not found: ${field.service}/${field.service_task}`,
          )
          return null
        }

        const Component = page.component

        // sections를 config로 변환 (true/false 맵)
        const allSections = page.sections as readonly string[]
        const activeSections = new Set(field.service_sections)
        const config = allSections.reduce(
          (acc, section) => {
            acc[section] = activeSections.has(section)
            return acc
          },
          {} as Record<string, boolean>,
        )

        return (
          <div key={formPrefix} className="bg-card rounded-lg border p-2">
            <Component
              control={control}
              setValue={setValue}
              config={config}
              formPrefix={formPrefix}
            />
          </div>
        )
      })}
    </div>
  )
}
