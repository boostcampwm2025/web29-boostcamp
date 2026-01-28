import { GlobalSubmitConfig, ServiceConfig } from '../types/submitConfig.types'

export function addDefaultConfigs(
  fixedOptions?: ServiceConfig[],
): GlobalSubmitConfig {
  const defaultConfigs: GlobalSubmitConfig = {}
  if (fixedOptions) {
    for (const options of fixedOptions) {
      switch (options._type) {
        case 's3':
          if (!defaultConfigs.s3) defaultConfigs.s3 = []
          defaultConfigs.s3.push({
            id: options.id,
            data: options,
            isReady: true,
          })
          break

        case 'cloudFront':
          if (!defaultConfigs.cloudFront) defaultConfigs.cloudFront = []
          defaultConfigs.cloudFront.push({
            id: options.id,
            data: options,
            isReady: true,
          })
          break

        case 'ec2':
          if (!defaultConfigs.ec2) defaultConfigs.ec2 = []
          defaultConfigs.ec2.push({
            id: options.id,
            data: options,
            isReady: true,
          })
          break
      }
    }
  }
  return defaultConfigs
}
