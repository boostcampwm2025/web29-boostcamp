'use client'

import { Controller } from 'react-hook-form'

import { TooltipBox } from '@/components/aws-services/common/tooltip-box'
import { SectionContainer } from '@/components/section-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VPC_CREATE_TOOLTIPS } from '@/constants/aws-services/vpc'
import type { VpcSectionProps } from '@/types/aws-services/vpc/vpc-config.types'

export function CidrBlock({ control }: VpcSectionProps) {
  return (
    <div className="space-y-6">
      {/* IPv4 설정 */}
      <SectionContainer
        title={
          <div className="flex items-center gap-2">
            IPv4 CIDR 블록
            <TooltipBox content={VPC_CREATE_TOOLTIPS.ipv4CidrBlock} />
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">IPv4 CIDR</Label>
            <Controller
              name="cidr.cidrBlock"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="10.0.0.0/16"
                  className="max-w-2xl"
                />
              )}
            />
            <p className="text-muted-foreground text-xs">
              CIDR 블록 크기는 /16에서 /28 사이여야 합니다.
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
