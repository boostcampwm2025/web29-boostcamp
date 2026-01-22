'use client'

import {
  AdvancedSettings,
  BlockPublicAccess,
  BucketVersioning,
  DefaultEncryption,
  GeneralConfiguration,
  ObjectOwnership,
  Tags,
} from './sections'

import { type Control, type UseFormSetValue, useForm } from 'react-hook-form'

import { Separator } from '@/components/ui/separator'
import type {
  S3BucketCreateConfig,
  S3BucketFormData,
} from '@/types/aws-services/s3/bucket-create'

interface S3BucketCreateProps {
  config: S3BucketCreateConfig
  // 부모에서 전달받는 props (통합 Form 사용 시)
  control?: Control<S3BucketFormData>
  setValue?: UseFormSetValue<S3BucketFormData>
  formPrefix?: string
}

const defaultValues: S3BucketFormData = {
  general: { bucketName: '', region: 'ap-northeast-2' },
  ownership: { aclEnabled: 'disabled' },
  blockPublicAccess: {
    blockAll: true,
    blockPublicAcls: true,
    ignorePublicAcls: true,
    blockPublicPolicy: true,
    restrictPublicBuckets: true,
  },
  versioning: { enabled: false },
  encryption: { type: 'sse-s3' },
  advancedSettings: { objectLockEnabled: false },
  tags: [],
}

export default function S3BucketCreate({
  config,
  control: externalControl,
  setValue: externalSetValue,
  formPrefix: _formPrefix = '',
}: S3BucketCreateProps) {
  // 부모에서 control이 제공되지 않으면 자체 useForm 사용 (독립 실행용)
  const internalForm = useForm<S3BucketFormData>({ defaultValues })

  // 외부 control이 있으면 사용, 없으면 내부 form 사용
  const control = externalControl ?? internalForm.control
  const setValue = externalSetValue ?? internalForm.setValue

  // formPrefix가 있으면 nested path로 변환 (예: "S3-bucket-create.general")
  // (현재 미사용)

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">버킷 생성</h2>
        <p className="text-muted-foreground">S3 버킷 설정을 구성하세요</p>
      </div>

      {/* Section 1: General Configuration */}
      {config.general && (
        <>
          <GeneralConfiguration control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 2: Object Ownership */}
      {config.ownership && (
        <>
          <ObjectOwnership control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 3: Block Public Access */}
      {config.blockPublicAccess && (
        <>
          <BlockPublicAccess
            control={control}
            config={config}
            setValue={setValue}
          />
          <Separator />
        </>
      )}

      {/* Section 4: Bucket Versioning */}
      {config.versioning && (
        <>
          <BucketVersioning control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 5: Tags (Optional) */}
      {config.tags && (
        <>
          <Tags control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 6: Default Encryption */}
      {config.encryption && (
        <>
          <DefaultEncryption control={control} config={config} />
          <Separator />
        </>
      )}

      {/* Section 7: Advanced Settings */}
      {config.advancedSettings && (
        <AdvancedSettings control={control} config={config} />
      )}
    </div>
  )
}
