'use client'

import type { S3BucketCreateConfig } from './constants'
import {
  AdvancedSettings,
  BlockPublicAccess,
  BucketVersioning,
  DefaultEncryption,
  GeneralConfiguration,
  ObjectOwnership,
  Tags,
} from './sections'
import type { S3BucketFormData } from './types'

import { useForm } from 'react-hook-form'

import { FeedbackDetailCard } from '@/app/(guest)/problems/components/feedback-detail-card'
import { Separator } from '@/components/ui/separator'

interface S3BucketCreateProps {
  config: S3BucketCreateConfig
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

const mockFeedbackMessages = [
  {
    service: 'S3',
    field: '',
    message:
      '버킷 이름은 전역적으로 고유해야 합니다. 다른 이름을 시도해 주세요.',
  },
  {
    service: 'S3',
    field: 'blockPublicAccess',
    message:
      '퍼블릭 액세스 차단 설정이 권장됩니다. 보안 위험을 줄이기 위해 모든 퍼블릭 액세스를 차단하는 것이 좋습니다.',
  },
  {
    service: 'S3',
    field: 'encryption',
    message:
      '버킷 암호화를 활성화하여 저장된 데이터를 보호하는 것이 좋습니다. SSE-S3 또는 SSE-KMS를 사용하는 것을 고려해 보세요.',
  },
]

export default function S3BucketCreate({ config }: S3BucketCreateProps) {
  const { control, setValue } = useForm<S3BucketFormData>({
    defaultValues,
  })
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">버킷 생성</h2>
        <p className="text-muted-foreground">S3 버킷 설정을 구성하세요</p>
      </div>

      <FeedbackDetailCard feedback={mockFeedbackMessages} />

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
