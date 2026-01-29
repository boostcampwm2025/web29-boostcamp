export const INTERNET_GATEWAY_CREATE_SECTIONS = ['nameTag', 'tags'] as const

export const INTERNET_GATEWAY_ATTACH_SECTIONS = ['attachForm'] as const

export type InternetGateWayCreateSectionKey =
  (typeof INTERNET_GATEWAY_CREATE_SECTIONS)[number]

export type InternetGatewayAttachSectionKey =
  (typeof INTERNET_GATEWAY_ATTACH_SECTIONS)[number]

export type InternetGateWayCreateConfig = Record<
  InternetGateWayCreateSectionKey,
  boolean
>

export type InternetGatewayAttachConfig = Record<
  InternetGatewayAttachSectionKey,
  boolean
>
