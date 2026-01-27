'use client'

import { ServiceTitle } from '../../common/service-title'
import {
  CustomErrorPagesSection,
  DefaultRootObjectSection,
  LoggingSection,
  ReviewSummarySection,
  WafSection,
} from './sections'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import type { CloudFrontSubmitConfig } from '@/types/aws-services/cloudfront/cloudfront-submit-config.types'
import type {
  CloudFrontWebsiteFormData,
  CloudFrontWebsiteSettingsConfig,
} from '@/types/aws-services/cloudfront/website-settings'

const DEFAULT_VALUES: CloudFrontWebsiteFormData = {
  defaultRootObject: 'index.html',
  errorResponses: [],
  loggingEnabled: false,
  loggingBucket: '',
  logPrefix: '',
  wafEnabled: false,
  webAclId: '',
}

interface CloudFrontWebsiteSettingsProps {
  config: CloudFrontWebsiteSettingsConfig
  onSubmit: (data: CloudFrontSubmitConfig) => void
  buttonText?: string
}

export default function CloudFrontWebsiteSettings({
  config,
  onSubmit,
  buttonText = 'CloudFront 설정 추가',
}: CloudFrontWebsiteSettingsProps) {
  const { control, handleSubmit, setValue, reset } =
    useForm<CloudFrontWebsiteFormData>({
      mode: 'onChange',
      defaultValues: DEFAULT_VALUES,
    })

  const handleFormSubmit = handleSubmit((data) => {
    const uniqueId = crypto.randomUUID()
    const submitData: CloudFrontSubmitConfig = {
      _type: 'cloudFront',
      id: `cloudfront-website-${uniqueId}`,
      name: `cloudfront-website-${uniqueId}`,
      defaultRootObject: data.defaultRootObject,
      errorResponses: data.errorResponses,
      loggingEnabled: data.loggingEnabled,
      loggingBucket: data.loggingBucket,
      logPrefix: data.logPrefix,
      wafEnabled: data.wafEnabled,
      webAclId: data.webAclId,
    }
    onSubmit(submitData)
    reset(DEFAULT_VALUES)
  })

  return (
    <form onSubmit={handleFormSubmit} className="w-full space-y-4 p-8">
      <ServiceTitle
        title="일반 설정 편집"
        description="Default Root Object 및 기타 웹사이트 설정을 구성하세요"
        button={{
          isDisabled: false,
          buttonText,
        }}
      />

      {config.defaultRootObject && (
        <DefaultRootObjectSection control={control} config={config} />
      )}

      {config.customErrorPages && (
        <CustomErrorPagesSection
          control={control}
          config={config}
          setValue={setValue}
        />
      )}

      {config.logging && <LoggingSection control={control} config={config} />}

      {config.waf && <WafSection control={control} config={config} />}

      {config.reviewSummary && (
        <ReviewSummarySection control={control} config={config} />
      )}
    </form>
  )
}
