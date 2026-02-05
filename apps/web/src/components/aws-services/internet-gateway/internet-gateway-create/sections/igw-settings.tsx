'use client'

import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

import { SectionContainer } from '@/components/section-container'
import { Input } from '@/components/ui/input'
import type { InternetGatewayCreateFormData } from '@/types/aws-services/internet-gateway/internet-gateway.types'

interface IgwSettingsProps {
  control: Control<InternetGatewayCreateFormData>
}

export function IgwSettings({ control }: IgwSettingsProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">인터넷 게이트웨이 설정</h2>
      </div>

      <div className="p-6">
        <SectionContainer
          title="이름 태그"
          description="'Name' 키와 사용자가 지정하는 값을 포함하는 태그를 생성합니다."
        >
          <Controller
            name="nameTag"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="my-internet-gateway"
                className="max-w-3xl"
              />
            )}
          />
        </SectionContainer>
      </div>
    </div>
  )
}
