export const UnitProblemFeedbackType = {
  SERVICE_MISSING: 'SERVICE_MISSING',
  FIELD_MISSING: 'FIELD_MISSING',
  UNNECESSARY: 'UNNECESSARY',
  INCORRECT: 'INCORRECT',
  INVALID: 'INVALID',
} as const;

export const feedbackMessages = {
  [UnitProblemFeedbackType.SERVICE_MISSING]: (
    service: string,
    details: string,
  ) =>
    `${service} 리소스가 부족합니다. 문제 해결을 위해 ${service}를 추가로 생성해야 합니다. (${details})`,
  [UnitProblemFeedbackType.FIELD_MISSING]: (service: string, details: string) =>
    `${service} 설정에서 '${details}' 항목이 빠져 있습니다. 해당 항목을 설정해주세요.`,
  [UnitProblemFeedbackType.UNNECESSARY]: (service: string, details: string) =>
    `${service} 설정에 불필요한 '${details}' 항목이 포함되어 있습니다. 해당 설정을 제거하거나 기본값으로 되돌려주세요.`,
  [UnitProblemFeedbackType.INCORRECT]: (service: string, details: string) =>
    `${service}의 '${details}' 설정이 요구사항과 다릅니다. 문제 지문을 다시 확인하여 올바른 값을 선택해주세요.`,
  [UnitProblemFeedbackType.INVALID]: (service: string, details: string) =>
    `${service}의 '${details}' 형식이 올바르지 않습니다. 형식을 다시 확인해주세요.`,
};

export const NetworkFeedbackScenarios = {
  IGW_NOT_ATTACHED: 'IGW_NOT_ATTACHED',
  ROUTES_TO_IGW_MISSING: 'ROUTES_TO_IGW_MISSING',
  SUBNET_RT_ASSOCIATION_MISSING: 'SUBNET_RT_ASSOCIATION_MISSING',
  PRIVATE_SUBNET_HAS_IGW_ROUTE: 'PRIVATE_SUBNET_HAS_IGW_ROUTE',
  NAT_GW_MISSING_IN_ROUTE: 'NAT_GW_MISSING_IN_ROUTE',
  NAT_GW_IN_WRONG_SUBNET: 'NAT_GW_IN_WRONG_SUBNET',
  NACL_DENY_TRAFFIC: 'NACL_DENY_TRAFFIC',
};

export const EC2FeedbackScenarios = {
  // Instance type
  EC2_WRONG_INSTANCE_TYPE: 'EC2_WRONG_INSTANCE_TYPE',

  // OS/AMI
  EC2_WRONG_OS_TYPE: 'EC2_WRONG_OS_TYPE',

  // Key pair
  EC2_KEY_PAIR_MISSING: 'EC2_KEY_PAIR_MISSING',
  EC2_WRONG_KEY_NAME: 'EC2_WRONG_KEY_NAME',

  // VPC/Subnet
  EC2_VPC_MISSING: 'EC2_VPC_MISSING',
  EC2_WRONG_VPC: 'EC2_WRONG_VPC',
  EC2_SUBNET_MISSING: 'EC2_SUBNET_MISSING',
  EC2_WRONG_SUBNET: 'EC2_WRONG_SUBNET',
  EC2_IN_WRONG_SUBNET: 'EC2_IN_WRONG_SUBNET',
  EC2_SUBNET_NOT_IN_VPC: 'EC2_SUBNET_NOT_IN_VPC',

  // Network settings
  EC2_PUBLIC_IP_MISSING: 'EC2_PUBLIC_IP_MISSING',
  EC2_PUBLIC_IP_SHOULD_BE_DISABLED: 'EC2_PUBLIC_IP_SHOULD_BE_DISABLED',
  EC2_SSH_NOT_ALLOWED: 'EC2_SSH_NOT_ALLOWED',
  EC2_SSH_SHOULD_BE_BLOCKED: 'EC2_SSH_SHOULD_BE_BLOCKED',
  EC2_HTTP_NOT_ALLOWED: 'EC2_HTTP_NOT_ALLOWED',
  EC2_HTTP_SHOULD_BE_BLOCKED: 'EC2_HTTP_SHOULD_BE_BLOCKED',
  EC2_HTTPS_NOT_ALLOWED: 'EC2_HTTPS_NOT_ALLOWED',
  EC2_HTTPS_SHOULD_BE_BLOCKED: 'EC2_HTTPS_SHOULD_BE_BLOCKED',

  // Storage
  EC2_STORAGE_TOO_SMALL: 'EC2_STORAGE_TOO_SMALL',
  EC2_STORAGE_TOO_LARGE: 'EC2_STORAGE_TOO_LARGE',
  EC2_WRONG_VOLUME_TYPE: 'EC2_WRONG_VOLUME_TYPE',

  // User Data
  EC2_USER_DATA_MISSING: 'EC2_USER_DATA_MISSING',
  EC2_USER_DATA_INCOMPLETE: 'EC2_USER_DATA_INCOMPLETE',
};

export const SGFeedbackScenarios = {
  SG_INBOUND_PORT_CLOSED: 'SG_INBOUND_PORT_CLOSED',
  SG_SSH_OPEN_TO_WORLD: 'SG_SSH_OPEN_TO_WORLD',
  SG_WRONG_SOURCE: 'SG_WRONG_SOURCE',
  EC2_WRONG_SG_ATTACHED: 'EC2_WRONG_SG_ATTACHED',
};

export const S3FeedbackScenarios = {
  BUCKET_NOT_ENCRYPTED: 'BUCKET_NOT_ENCRYPTED',
  BUCKET_PUBLIC_ACCESS_BLOCK_MISSING: 'BUCKET_PUBLIC_ACCESS_BLOCK_MISSING',
  BUCKET_VERSIONING_DISABLED: 'BUCKET_VERSIONING_DISABLED',
};
