import { AWS_SERVICE_REGISTRY } from '../registry/registry'

export interface IServiceMapper {
  inputSections: string[]
  serviceName: keyof typeof AWS_SERVICE_REGISTRY
  serviceTask: string
  label?: string
  fixedOptions?: Record<string, unknown> | Record<string, unknown>[]
}

export const serviceMapper = ({
  serviceName,
  serviceTask,
  inputSections,
  fixedOptions,
}: IServiceMapper) => {
  const service = AWS_SERVICE_REGISTRY[serviceName]
  if (!service) {
    throw new Error(
      'service(ex. s3, ec2... "serviceName") component is not found',
    )
  }
  const page = service[serviceTask]
  if (!page) {
    throw new Error(
      'page(ex. bucketCreate, bucketList... "serviceTask") component is not found',
    )
  }

  const inputSet = new Set(inputSections)
  const baseConfig = inputSections.reduce<Record<string, boolean>>(
    (acc, section) => {
      acc[section] = inputSet.has(section)
      return acc
    },
    {},
  )

  // fixedOptions 가 배열이 아닌 경우(즉, 폼 설정을 위한 메타데이터인 경우) config 에 병합
  const config =
    fixedOptions && !Array.isArray(fixedOptions)
      ? { ...baseConfig, ...fixedOptions }
      : baseConfig

  return {
    Component: page.component,
    config,
  }
}
