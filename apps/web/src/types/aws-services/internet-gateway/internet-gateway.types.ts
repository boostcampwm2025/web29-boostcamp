// types/aws-services/internet-gateway.types.ts

export interface Tag {
  key: string
  value: string
}

// 기존 생성 폼 데이터
export interface InternetGatewayCreateFormData {
  nameTag: string
  tags: Tag[]
}

export interface InternetGatewayAttachFormData {
  internetGatewayId: string
  vpcId: string
}

export type InternetGatewaySubmitConfig = {
  _type: 'internetGateway'

  id?: string

  name: string
  tags?: Tag[]

  vpcId?: string
}
