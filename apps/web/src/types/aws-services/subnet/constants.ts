export const SUBNET_CREATE_SECTIONS = ['general'] as const

export type SubnetCreateSectionKey = (typeof SUBNET_CREATE_SECTIONS)[number]

export type SubnetCreateConfig = Record<SubnetCreateSectionKey, boolean>

export const AZ_OPTIONS = [
  { value: 'us-east-1a', label: 'us-east-1a' },
  { value: 'us-east-1b', label: 'us-east-1b' },
  { value: 'us-east-1c', label: 'us-east-1c' },
  { value: 'us-east-1d', label: 'us-east-1d' },
  { value: 'us-east-1e', label: 'us-east-1e' },
  { value: 'us-east-1f', label: 'us-east-1f' },
] as const
