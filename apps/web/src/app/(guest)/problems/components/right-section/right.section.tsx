import { DiagramPanel } from './diagram-panel'
import { FeedbackPanel } from './feedback-panel'
import { CreatedResourcePanel } from './resource-list'
import { SubmitButton } from './submit-button'

export const ProblemRightSection = () => {
  return (
    <section className="sticky top-20 w-full shrink-0 space-y-6 self-start">
      <div className="flex flex-col gap-4">
        <DiagramPanel />
        <CreatedResourcePanel />
        <SubmitButton />
        <FeedbackPanel />
      </div>
    </section>
  )
}
