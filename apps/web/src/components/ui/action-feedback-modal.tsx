'use client'

import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

import {
  type FeedbackType,
  useActionFeedback,
} from '@/contexts/action-feedback-context'
import { cn } from '@/lib/utils'

const FEEDBACK_CONFIG: Record<
  FeedbackType,
  { icon: LucideIcon; color: string; bgColor: string; borderColor: string }
> = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  info: {
    icon: Info,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  error: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
}

export function ActionFeedbackModal() {
  const { isVisible, message, title, type } = useActionFeedback()

  if (!isVisible) return null

  const config = FEEDBACK_CONFIG[type]
  const Icon = config.icon

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-end justify-center pb-20 md:items-center md:pb-0">
      <div
        className={cn(
          'bg-background/40 flex max-w-[90vw] items-start gap-4 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl md:max-w-md',
          'animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out',
          config.borderColor,
        )}
      >
        <div
          className={cn('mt-0.5 rounded-xl p-2.5 shadow-inner', config.bgColor)}
        >
          <Icon className={cn('h-5 w-5', config.color)} />
        </div>
        <div className="flex flex-col gap-0.5 pr-2">
          {title && (
            <h5 className="text-foreground/90 mb-1 text-sm leading-none font-bold tracking-tight">
              {title}
            </h5>
          )}
          <p className="text-foreground/75 text-[13px] leading-snug font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
