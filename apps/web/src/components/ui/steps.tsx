'use client'

import { Check, ChevronRight } from 'lucide-react'

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface Step {
  id: string
  title: string
  description?: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
  className?: string
}

function Steps({ steps, currentStep, onStepClick, className }: StepsProps) {
  return (
    <nav
      aria-label="Progress"
      className={cn(className, 'mx-auto max-w-4xl overflow-y-auto px-6')}
    >
      <div className="w-full overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2 px-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isClickable = onStepClick && (isCompleted || isCurrent)
            const hasNextStep = index !== steps.length - 1

            return (
              <React.Fragment key={step.id}>
                <li className="flex items-center">
                  {/* Step Item */}
                  <button
                    type="button"
                    onClick={() => isClickable && onStepClick(stepNumber)}
                    disabled={!isClickable}
                    className={cn(
                      'group flex flex-col items-center',
                      isClickable && 'cursor-pointer',
                      !isClickable && 'cursor-default',
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {/* Step Circle */}
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                        isCompleted &&
                          'border-primary bg-primary text-primary-foreground',
                        isCurrent &&
                          'border-primary bg-background text-primary',
                        !isCompleted &&
                          !isCurrent &&
                          'border-border bg-background text-muted-foreground',
                        isClickable &&
                          'group-hover:border-primary group-hover:text-primary',
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">
                          {stepNumber}
                        </span>
                      )}
                    </span>

                    {/* Step Title and Description */}
                    <span className="mt-2 flex flex-col items-center whitespace-nowrap">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isCurrent && 'text-primary',
                          isCompleted && 'text-foreground',
                          !isCompleted && !isCurrent && 'text-muted-foreground',
                          isClickable && 'group-hover:text-primary',
                        )}
                      >
                        {step.title}
                      </span>
                      {step.description && (
                        <span className="text-muted-foreground mt-1 text-xs">
                          {step.description}
                        </span>
                      )}
                    </span>
                  </button>
                </li>

                {/* Chevron Separator */}
                {hasNextStep && (
                  <ChevronRight
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isCompleted && 'text-primary',
                      !isCompleted && 'text-muted-foreground',
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export { Steps }
