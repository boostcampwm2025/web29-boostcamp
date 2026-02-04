'use client'

import type { LucideIcon } from 'lucide-react'
import {
  BoxIcon,
  CheckCircle2Icon,
  CloudIcon,
  GlobeIcon,
  LayersIcon,
  NetworkIcon,
  RouteIcon,
  ServerIcon,
  ShieldCheckIcon,
  Trash2Icon,
  ZapIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProblemForm } from '@/contexts/problem-form-context'
import { cn } from '@/lib/utils'
import type {
  ServiceConfig,
  ServiceConfigItem,
} from '@/types/submitConfig.types'

const SERVICE_INFO: Record<
  string,
  { label: string; icon: LucideIcon; color: string }
> = {
  s3: { label: 'S3', icon: BoxIcon, color: 'bg-orange-500/10 text-orange-600' },
  cloudFront: {
    label: 'CloudFront',
    icon: GlobeIcon,
    color: 'bg-purple-500/10 text-purple-600',
  },
  ec2: {
    label: 'EC2',
    icon: ServerIcon,
    color: 'bg-orange-600/10 text-orange-700',
  },
  vpc: {
    label: 'VPC',
    icon: NetworkIcon,
    color: 'bg-green-500/10 text-green-600',
  },
  subnet: {
    label: 'Subnet',
    icon: LayersIcon,
    color: 'bg-blue-500/10 text-blue-600',
  },
  routeTable: {
    label: 'Route Table',
    icon: RouteIcon,
    color: 'bg-blue-600/10 text-blue-700',
  },
  internetGateway: {
    label: 'IGW',
    icon: CloudIcon,
    color: 'bg-pink-500/10 text-pink-600',
  },
  securityGroups: {
    label: 'SG',
    icon: ShieldCheckIcon,
    color: 'bg-green-600/10 text-green-700',
  },
  natGateway: {
    label: 'NAT Gateway',
    icon: ZapIcon,
    color: 'bg-yellow-500/10 text-yellow-600',
  },
}

export const CreatedResourcePanel = () => {
  const { submitConfig, handleRemoveItem } = useProblemForm()

  const totalCount = Object.values(submitConfig).reduce(
    (acc, items) => acc + (items?.length ?? 0),
    0,
  )

  if (totalCount === 0) return null

  return (
    <div className="bg-card/50 flex h-full flex-col rounded-xl border p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-sm font-bold">
          <CheckCircle2Icon className="h-4 w-4 text-green-500" />
          구성된 리소스
        </h4>
        <Badge variant="secondary" className="font-mono text-[10px]">
          TOTAL: {totalCount}
        </Badge>
      </div>

      <div className="scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent max-h-[400px] space-y-4 overflow-y-auto pr-1">
        {Object.entries(submitConfig).map(([serviceType, items]) => {
          if (!items || items.length === 0) return null
          const info = SERVICE_INFO[serviceType] || {
            label: serviceType,
            icon: BoxIcon,
            color: 'bg-muted text-muted-foreground',
          }

          return (
            <div key={serviceType} className="space-y-1.5">
              <div className="flex items-center gap-2 px-1">
                <info.icon
                  className={cn('h-3 w-3', info.color.split(' ')[1])}
                />
                <span className="text-muted-foreground/80 text-[11px] font-bold tracking-wider uppercase">
                  {info.label} ({items.length})
                </span>
              </div>
              <div className="grid gap-1">
                {items.map((item: ServiceConfigItem<ServiceConfig>) => {
                  const data = item.data as Record<string, unknown>
                  return (
                    <div
                      key={item.id}
                      className="group bg-background hover:bg-muted/30 border-border/50 flex items-center justify-between rounded-lg border p-2 pl-3 transition-all duration-200"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-foreground/90 truncate text-xs font-semibold">
                          {(data.name as string) ||
                            (data.nameTag as string) ||
                            '이름없음'}
                        </div>
                        <div className="text-muted-foreground font-mono text-[9px] opacity-60">
                          {item.id.slice(0, 8)} ∙{' '}
                          {(data.cidrBlock as string) ||
                            (data.subnetId as string) ||
                            ''}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-7 w-7 transition-all"
                        onClick={() =>
                          handleRemoveItem(
                            serviceType as keyof typeof submitConfig,
                            item.id,
                          )
                        }
                        title="제거"
                      >
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
