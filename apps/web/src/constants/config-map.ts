import { z } from 'zod'

import S3BucketCreate from '@/aws-services/s3/s3-bucket-create'
import S3BucketDetail from '@/aws-services/s3/s3-bucket-detail'
import S3BucketList from '@/aws-services/s3/s3-bucket-list'

export const serviceConfigMapSchema = z.object({
  service: z.enum(['S3']),
  service_task: z.string(),
  service_sections: z.array(z.string()),
  fixed_option: z.record(z.string(), z.string()),
})

export type TServiceConfigMap = z.infer<typeof serviceConfigMapSchema>

export const configMap = {
  S3: {
    'bucket-create': S3BucketCreate,
    'bucket-detail': S3BucketDetail,
    'bucket-list': S3BucketList,
  },
}
