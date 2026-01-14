import { S3BucketFormData } from './s3-form-data.types'

import type {
  AwsSectionProps,
  AwsWithSetValueSectionProps,
  GeneralBackendConfig,
} from '@/aws-services/types/aws-general-types'

export type S3ConfigKeys =
  | 'general'
  | 'ownership'
  | 'blockPublicAccess'
  | 'versioning'
  | 'encryption'
  | 'advancedSettings'
  | 'tags'

export type S3BackendConfig = GeneralBackendConfig<S3ConfigKeys>

export type S3SectionProps = AwsSectionProps<S3BucketFormData, S3ConfigKeys>
export type S3WithSetValuesSectionProps = AwsWithSetValueSectionProps<
  S3BucketFormData,
  S3ConfigKeys
>
