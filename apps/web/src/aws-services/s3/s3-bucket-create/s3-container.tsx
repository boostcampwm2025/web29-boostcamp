'use client'

import S3BucketCreate from './s3-bucket-create'
import { S3BackendConfig, S3BucketFormData } from './types'

import React from 'react'
import { useForm } from 'react-hook-form'

export default function S3Container() {
  const s3BackendConfig: S3BackendConfig = {
    general: { visible: true },
    ownership: { visible: true },
    blockPublicAccess: { visible: true },
    versioning: { visible: true },
    encryption: { visible: true },
    advancedSettings: { visible: true },
    tags: { visible: true },
  }
  const { control, handleSubmit, setValue } = useForm<S3BucketFormData>({
    defaultValues: {
      general: {
        bucketName: '',
        region: 'ap-northeast-2',
      },
      ownership: {
        aclEnabled: 'disabled',
        ownershipModel: undefined,
      },
      blockPublicAccess: {
        blockAll: true,
        blockPublicAcls: true,
        ignorePublicAcls: true,
        blockPublicPolicy: true,
        restrictPublicBuckets: true,
      },
      versioning: {
        enabled: false,
      },
      encryption: {
        type: 'sse-s3',
      },
      advancedSettings: {
        objectLockEnabled: false,
      },
      tags: [],
    },
  })
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <form onSubmit={handleSubmit(console.log)}>
          <S3BucketCreate
            control={control}
            config={s3BackendConfig}
            setValue={setValue}
          />
        </form>
      </div>

      <div></div>
    </div>
  )
}
