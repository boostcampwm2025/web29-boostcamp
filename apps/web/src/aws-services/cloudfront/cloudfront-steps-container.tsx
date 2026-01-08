import CloudFrontCacheBehavior from './cloudfront-cache-behavior'
import CloudFrontDistributionList from './cloudfront-distribution-list'
import CloudFrontDistributionSettings from './cloudfront-distribution-settings'
import CloudFrontOriginSettings from './cloudfront-origin-settings'
import CloudFrontWebsiteSettings from './cloudfront-website-settings'

import React from 'react'

import { StepsNavigator } from '@/components/steps'
import type { StepConfig } from '@/components/steps'

const CLOUDFRONT_STEPS: StepConfig[] = [
  {
    id: 'origin',
    title: 'Origin 설정',
    description: 'S3 버킷 선택',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <CloudFrontOriginSettings
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
      />
    ),
  },
  {
    id: 'distribution',
    title: '배포 설정',
    description: '기본 구성',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <CloudFrontDistributionSettings
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
      />
    ),
  },
  {
    id: 'cache',
    title: '캐시 및 동작',
    description: '캐시 정책',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <CloudFrontCacheBehavior
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
      />
    ),
  },
  {
    id: 'list',
    title: '배포 목록',
    description: '배포 확인',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <CloudFrontDistributionList
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
      />
    ),
  },
  {
    id: 'website',
    title: '일반 설정',
    description: 'Default Root Object',
    render: ({ onNext, onPrev, canGoPrev }) => (
      <CloudFrontWebsiteSettings
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
      />
    ),
  },
]

export default function CloudFrontStepsContainer() {
  return (
    <div className="bg-background min-h-screen">
      <StepsNavigator
        steps={CLOUDFRONT_STEPS}
        defaultStep={0}
        queryParamName="step"
        className="p-6"
      />
    </div>
  )
}
