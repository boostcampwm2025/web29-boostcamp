'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { TooltipBox } from '@/components/aws-services/common/tooltip-box'
import { SectionContainer } from '@/components/section-container'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ROUTE_TABLE_EDIT_TOOLTIPS } from '@/constants/aws-services/route-table'
import type { RouteTableEditFormData } from '@/types/aws-services/route-table/route-table.types'
import type { SubnetSubmitConfig } from '@/types/aws-services/subnet/subnet-submit-config.types'

interface SubnetAssociationsProps {
  availableSubnets: SubnetSubmitConfig[]
}

export function SubnetAssociations({
  availableSubnets,
}: SubnetAssociationsProps) {
  const { control } = useFormContext<RouteTableEditFormData>()

  return (
    <SectionContainer
      title={
        <div className="flex items-center gap-2">
          서브넷 연결 (Subnet Associations)
          <TooltipBox content={ROUTE_TABLE_EDIT_TOOLTIPS.subnetAssociations} />
        </div>
      }
      description="이 라우팅 테이블을 명시적으로 사용할 서브넷을 선택합니다."
    >
      <div className="overflow-hidden rounded-md border">
        {/* Controller를 사용하여 상태 변화를 즉각적으로 구독하고 제어합니다 */}
        <Controller
          control={control}
          name="associatedSubnetIds"
          render={({ field }) => {
            // 현재 선택된 ID 배열 (없으면 빈 배열)
            const selectedIds = field.value || []

            return (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[10%] text-center text-nowrap">
                      연결
                    </TableHead>
                    <TableHead className="w-[23%]">이름</TableHead>
                    <TableHead className="w-[23%]">서브넷 ID</TableHead>
                    <TableHead className="w-[21%]">IPv4 CIDR</TableHead>
                    <TableHead className="w-[23%]">가용 영역</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableSubnets.length > 0 ? (
                    availableSubnets.map((subnet) => {
                      const isChecked = selectedIds.includes(subnet.id)

                      return (
                        <TableRow
                          key={subnet.id}
                          className="hover:bg-muted/5 cursor-pointer"
                          // 행 전체 클릭 시 체크박스 토글 (UX 개선)
                          onClick={() => {
                            const newIds = isChecked
                              ? selectedIds.filter((id) => id !== subnet.id)
                              : [...selectedIds, subnet.id]
                            field.onChange(newIds)
                          }}
                        >
                          <TableCell
                            className="px-0 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newIds = checked
                                  ? [...selectedIds, subnet.id]
                                  : selectedIds.filter((id) => id !== subnet.id)
                                field.onChange(newIds)
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {subnet.name || '-'}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {subnet.id}
                          </TableCell>
                          <TableCell>{subnet.cidrBlock}</TableCell>
                          <TableCell>{subnet.availabilityZone}</TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-muted-foreground py-8 text-center"
                      >
                        연결 가능한 서브넷이 없습니다. (같은 VPC 내의 서브넷만
                        표시됩니다)
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )
          }}
        />
      </div>
    </SectionContainer>
  )
}
