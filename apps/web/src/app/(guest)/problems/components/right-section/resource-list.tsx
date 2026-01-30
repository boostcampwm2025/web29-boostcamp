'use client'

import {
  CheckCircle2Icon,
  RotateCcwIcon,
  ServerIcon,
  GlobeIcon,
  BoxIcon,
  NetworkIcon,
  LayersIcon,
  RouteIcon,
  ShieldCheckIcon,
  ZapIcon,
  CloudIcon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProblemForm } from '@/contexts/problem-form-context'

const SERVICE_INFO: Record<string, { label: string; icon: any; color: string }> =
{
  s3: { label: 'S3', icon: BoxIcon, color: 'bg-orange-500/10 text-orange-600' },
  cloudFront: {
    label: 'CloudFront',
    icon: GlobeIcon,
    color: 'bg-purple-500/10 text-purple-600',
  },
  ec2: { label: 'EC2', icon: ServerIcon, color: 'bg-orange-600/10 text-orange-700' },
  vpc: { label: 'VPC', icon: NetworkIcon, color: 'bg-green-500/10 text-green-600' },
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
    <div className="rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm p-4 h-full flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="flex items-center gap-2 text-sm font-bold">
          <CheckCircle2Icon className="h-4 w-4 text-green-500" />
          구성된 리소스
        </h4>
        <Badge variant="secondary" className="font-mono text-[10px]">
          TOTAL: {totalCount}
        </Badge>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[400px] pr-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
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
                <info.icon className={cn('h-3 w-3', info.color.split(' ')[1])} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {info.label} ({items.length})
                </span>
              </div>
              <div className="grid gap-1">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="group bg-background hover:bg-muted/30 flex items-center justify-between rounded-lg border border-border/50 p-2 pl-3 transition-all duration-200"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-semibold text-foreground/90">
                        {item.data.name || item.data.nameTag || '이름없음'}
                      </div>
                      <div className="text-muted-foreground font-mono text-[9px] opacity-60">
                        {item.id.slice(0, 8)} ∙ {item.data.cidrBlock || item.data.subnetId || ''}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      onClick={() => handleRemoveItem(serviceType as any, item.id)}
                      title="취소"
                    >
                      <RotateCcwIcon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
