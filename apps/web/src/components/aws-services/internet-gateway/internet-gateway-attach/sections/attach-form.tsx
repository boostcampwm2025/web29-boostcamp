'use client'

import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

import { TooltipBox } from '@/components/aws-services/common/tooltip-box'
import { SectionContainer } from '@/components/section-container'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ATTACH_TOOLTIPS } from '@/constants/aws-services/internet-gateway'
import type {
  InternetGatewayAttachFormData,
  InternetGatewaySubmitConfig,
} from '@/types/aws-services/internet-gateway/internet-gateway.types'
import type { VpcSubmitConfig } from '@/types/aws-services/vpc/vpc-submit-config.types'

interface AttachFormProps {
  control: Control<InternetGatewayAttachFormData>
  // ServiceConfigItem 래퍼 제거 -> 순수 Config 배열
  igwList: InternetGatewaySubmitConfig[]
  vpcList: VpcSubmitConfig[]
}

export function AttachForm({ control, igwList, vpcList }: AttachFormProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">VPC 연결 설정</h2>
      </div>

      <div className="space-y-8 p-6">
        {/* IGW 선택 */}
        <SectionContainer
          title={
            <div className="flex items-center gap-2">
              인터넷 게이트웨이
              <TooltipBox content={ATTACH_TOOLTIPS.internetGateway} />
            </div>
          }
          description="VPC에 연결할 인터넷 게이트웨이를 선택합니다."
        >
          <Controller
            name="internetGatewayId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="max-w-3xl">
                  <SelectValue placeholder="인터넷 게이트웨이 선택" />
                </SelectTrigger>
                <SelectContent>
                  {igwList.length > 0 ? (
                    igwList.map((igw) => (
                      // 이제 igw.data.xxx 가 아니라 igw.xxx 로 바로 접근합니다.
                      // id는 부모에서 병합해서 넘겨주어야 합니다.
                      <SelectItem key={igw.id} value={igw.id!}>
                        {igw.name || igw.id} ({igw.id})
                        {igw.vpcId ? ` - 연결됨 (${igw.vpcId})` : ''}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-muted-foreground p-2 text-center text-sm">
                      사용 가능한 인터넷 게이트웨이가 없습니다.
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </SectionContainer>

        {/* VPC 선택 */}
        <SectionContainer
          title={
            <div className="flex items-center gap-2">
              사용 가능한 VPC
              <TooltipBox content={ATTACH_TOOLTIPS.availableVpc} />
            </div>
          }
          description="인터넷 게이트웨이를 연결할 VPC를 선택합니다."
        >
          <Controller
            name="vpcId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="max-w-3xl">
                  <SelectValue placeholder="VPC 선택" />
                </SelectTrigger>
                <SelectContent>
                  {vpcList.length > 0 ? (
                    vpcList.map((vpc) => (
                      <SelectItem key={vpc.id} value={vpc.id}>
                        {vpc.name || vpc.id} ({vpc.id})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-muted-foreground p-2 text-center text-sm">
                      연결 가능한 VPC가 없습니다.
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </SectionContainer>
      </div>
    </div>
  )
}
