export const AMI_OPTIONS = [
  {
    value: 'amazon-linux',
    label: 'Amazon Linux',
    description: 'AWS에 최적화된 Linux 배포판',
  },
  {
    value: 'ubuntu',
    label: 'Ubuntu',
    description: '가장 인기 있는 Linux 배포판',
  },
  {
    value: 'windows',
    label: 'Windows',
    description: 'Microsoft Windows Server',
  },
  {
    value: 'mac-os',
    label: 'macOS',
    description: 'Apple macOS',
  },
  {
    value: 'red-hat',
    label: 'Red Hat',
    description: 'Red Hat Enterprise Linux',
  },
  {
    value: 'suse-linux',
    label: 'SUSE Linux',
    description: 'SUSE Linux Enterprise',
  },
  {
    value: 'debian',
    label: 'Debian',
    description: 'Debian GNU/Linux',
  },
] as const

export const INSTANCE_TYPE_OPTIONS = [
  {
    value: 't2.micro',
    label: 't2.micro',
    vcpu: '1 vCPU',
    memory: '1 GiB',
  },
  {
    value: 't2.small',
    label: 't2.small',
    vcpu: '1 vCPU',
    memory: '2 GiB',
  },
  {
    value: 't2.medium',
    label: 't2.medium',
    vcpu: '2 vCPU',
    memory: '4 GiB',
  },
  {
    value: 't3.micro',
    label: 't3.micro',
    vcpu: '2 vCPU',
    memory: '1 GiB',
  },
  {
    value: 't3.small',
    label: 't3.small',
    vcpu: '2 vCPU',
    memory: '2 GiB',
  },
  {
    value: 't3.medium',
    label: 't3.medium',
    vcpu: '2 vCPU',
    memory: '4 GiB',
  },
] as const

export const KEY_PAIR_OPTIONS = [
  { value: 'my-key-pair', label: 'my-key-pair' },
  { value: 'dev-key-pair', label: 'dev-key-pair' },
  { value: 'prod-key-pair', label: 'prod-key-pair' },
] as const

export const VOLUME_TYPE_OPTIONS = [
  {
    value: 'gp3',
    label: '범용 SSD (gp3)',
    iops: '3000 IOPS',
  },
  {
    value: 'gp2',
    label: '범용 SSD (gp2)',
    iops: '',
  },
  {
    value: 'io1',
    label: '프로비저닝된 IOPS SSD (io1)',
    iops: '400 IOPS',
  },
  {
    value: 'io2',
    label: '프로비저닝된 IOPS SSD (io2)',
    iops: '8000 IOPS',
  },
  {
    value: 'standard',
    label: '마그네틱(표준)',
    iops: '',
  },
] as const
