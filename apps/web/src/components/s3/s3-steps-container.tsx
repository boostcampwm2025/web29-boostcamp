'use client'

import S3BucketCreate from './s3-bucket-create'
import S3BucketDetail from './s3-bucket-detail'
import S3BucketList from './s3-bucket-list'
import S3FileUpload from './s3-file-upload'

import React from 'react'

import { StepsNavigator } from '@/components/steps'
import type { StepConfig } from '@/components/steps'

const S3_STEPS: StepConfig[] = [
  {
    id: 'create',
    title: '버킷 생성',
    description: '새 버킷 만들기',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <S3BucketCreate onNext={onNext} onPrev={onPrev} canGoPrev={canGoPrev} />
    ),
  },
  {
    id: 'list',
    title: '버킷 목록',
    description: '버킷 조회',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <S3BucketList onNext={onNext} onPrev={onPrev} canGoPrev={canGoPrev} />
    ),
  },
  {
    id: 'detail',
    title: '버킷 상세',
    description: '객체 관리',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <S3BucketDetail onNext={onNext} onPrev={onPrev} canGoPrev={canGoPrev} />
    ),
  },
  {
    id: 'upload',
    title: '파일 업로드',
    description: '객체 업로드',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <S3FileUpload onNext={onNext} onPrev={onPrev} canGoPrev={canGoPrev} />
    ),
  },
]

export default function S3StepsContainer() {
  return (
    <div className="bg-background min-h-screen">
      <StepsNavigator
        steps={S3_STEPS}
        defaultStep={0}
        queryParamName="step"
        className="p-6"
      />
    </div>
  )
}
