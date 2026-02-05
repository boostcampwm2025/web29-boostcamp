'use client'

import { Controller } from 'react-hook-form'

import { SectionContainer } from '@/components/section-container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { VpcSectionProps } from '@/types/aws-services/vpc/vpc-config.types'

export function CidrBlock({ control }: VpcSectionProps) {
  return (
    <div className="space-y-6">
      {/* IPv4 설정 */}
      <SectionContainer title="IPv4 CIDR 블록">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">IPv4 CIDR</Label>
            <Controller
              name="cidr.cidrBlock"
              control={control}
              rules={{
                required: 'CIDR 블록을 입력하세요',
                pattern: {
                  value: /^(\d{1,3}\.){3}\d{1,3}\/(1[6-9]|2[0-8])$/,
                  message:
                    '올바른 CIDR 형식이어야 하며, /16에서 /28 사이여야 합니다.',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    placeholder="10.0.0.0/16"
                    className="max-w-2xl"
                  />
                  {error && (
                    <p className="text-destructive text-sm">{error.message}</p>
                  )}
                </>
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
