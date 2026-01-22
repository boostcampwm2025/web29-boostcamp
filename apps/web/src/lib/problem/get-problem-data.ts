import type { ProblemDetail, RequiredField } from '@/types/problem.type'

// 서비스별 기본값 정의
const SERVICE_DEFAULT_VALUES: Record<string, Record<string, unknown>> = {
  'S3-bucket-create': {
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
  },
  'CloudFront-origin-settings': {
    originDomain: { domain: '' },
    originPath: { path: '' },
    originName: { name: '' },
    originAccessControl: { enabled: false },
  },
  'CloudFront-distribution-settings': {
    priceClass: { value: 'all' },
    waf: { enabled: false },
    alternativeDomains: { domains: [] },
    customCertificate: { enabled: false },
    supportedHttpVersions: { http2: true, http3: false },
    defaultRootObject: { value: '' },
    standardLogging: { enabled: false },
    ipv6: { enabled: true },
    description: { value: '' },
  },
  'CloudFront-cache-behavior': {
    pathPattern: { value: '' },
    compress: { enabled: true },
    viewerProtocolPolicy: { value: 'redirect-to-https' },
    allowedMethods: { value: 'GET_HEAD' },
    restrictViewerAccess: { enabled: false },
    cachePolicy: { value: '' },
    originRequestPolicy: { value: '' },
  },
  'CloudFront-website-settings': {
    defaultRootObject: { value: 'index.html' },
    customError: { enabled: false },
    geoRestrictions: { type: 'none', locations: [] },
  },
}

// 문제의 required_fields 기반으로 기본값 생성
export function generateDefaultValues(
  requiredFields: RequiredField[],
): Record<string, Record<string, unknown>> {
  return requiredFields.reduce(
    (acc, field) => {
      const key = `${field.service}-${field.service_task}`
      const serviceDefaults = SERVICE_DEFAULT_VALUES[key] || {}

      // 필요한 sections만 포함
      const filteredDefaults: Record<string, unknown> = {}
      field.service_sections.forEach((section) => {
        if (serviceDefaults[section]) {
          filteredDefaults[section] = serviceDefaults[section]
        }
      })

      acc[key] = filteredDefaults
      return acc
    },
    {} as Record<string, Record<string, unknown>>,
  )
}

export async function getProblemData(id: string): Promise<ProblemDetail> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000'

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL이 설정되지 않았습니다.')
  }

  const res = await fetch(`${baseUrl}/api/problems/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('문제 상세 조회 실패')
  }

  const response = await res.json()

  return {
    id: response.id,
    problem_type: response.problem_type,
    title: response.title,
    description: response.description,
    required_fields: response.required_fields,
    tags: response.tags || [],
  }
}
