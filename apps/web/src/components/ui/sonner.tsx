'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

import { useTheme } from 'next-themes'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      icons={{
        success: (
          <div className="rounded-xl bg-green-500/10 p-2 shadow-inner">
            <CircleCheckIcon className="size-5 text-green-500" />
          </div>
        ),
        info: (
          <div className="rounded-xl bg-blue-500/10 p-2 shadow-inner">
            <InfoIcon className="size-5 text-blue-500" />
          </div>
        ),
        warning: (
          <div className="rounded-xl bg-amber-500/10 p-2 shadow-inner">
            <TriangleAlertIcon className="size-5 text-amber-500" />
          </div>
        ),
        error: (
          <div className="rounded-xl bg-red-500/10 p-2 shadow-inner">
            <OctagonXIcon className="size-5 text-red-500" />
          </div>
        ),
        loading: (
          <div className="rounded-xl bg-blue-500/10 p-2 shadow-inner">
            <Loader2Icon className="size-5 animate-spin text-blue-500" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast bg-background/40 backdrop-blur-xl border rounded-2xl shadow-2xl px-5 py-4',
          icon: '!h-auto !w-auto !mr-2',
          title: 'text-foreground/90 text-sm font-bold tracking-tight',
          description:
            'text-foreground/75 text-[13px] leading-snug font-medium',
          success: 'border-green-500/20',
          info: 'border-blue-500/20',
          warning: 'border-amber-500/20',
          error: 'border-red-500/20',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
