import type { EC2InstanceCreateConfig } from '../../../constants/aws-services/ec2/ec2-instance-create.constants'
import type { EC2InstanceFormData } from '../../../types/aws-services/ec2/ec2-form-data.types'
import type { AwsServiceSectionTypes } from '../aws-general-types'

type EC2InstanceCreateTypes = AwsServiceSectionTypes<
  EC2InstanceFormData,
  EC2InstanceCreateConfig
>

export type EC2SectionProps = EC2InstanceCreateTypes['SectionProps']
export type EC2WithSetValueSectionProps =
  EC2InstanceCreateTypes['WithSetValueProps']
