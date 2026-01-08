import { type Step } from '@/components/ui/steps'

// Step render props (단순 navigation만)
export interface StepRenderProps {
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
  canGoNext: boolean
  currentStep: number
  totalSteps: number
}

// Step configuration
export interface StepConfig extends Step {
  id: string
  title: string
  description?: string
  render: (props: StepRenderProps) => React.ReactNode
}

// StepsNavigator props
export interface StepsNavigatorProps {
  steps: StepConfig[]
  defaultStep?: number
  queryParamName?: string
  onComplete?: () => void
  className?: string
}
