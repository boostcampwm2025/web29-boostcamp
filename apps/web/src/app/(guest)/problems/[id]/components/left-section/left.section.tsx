import { ProblemFormContent } from './form-content/problem-form-content'
import { ProblemHeader } from './problem-header'

import { IServiceMapper } from '@/components/aws-services/utils/serviceMapper'

interface ProblemLeftSectionProps {
  type: string
  title: string
  description: string
  descDetail: string
  tags: string[]
  problemData: IServiceMapper[]
}

export const ProblemLeftSection = ({
  type,
  title,
  descDetail,
  tags,
  problemData,
}: ProblemLeftSectionProps) => {
  return (
    <section className="space-y-6 overflow-y-auto">
      <ProblemHeader
        type={type}
        title={title}
        description={descDetail}
        tags={tags}
      />
      <ProblemFormContent problemData={problemData} />
    </section>
  )
}
