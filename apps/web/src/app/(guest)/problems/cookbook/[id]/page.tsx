import CookbookProblemClient from './cookbook-problem-client'

import {
  getCookbookProblemDataById,
  getUnitProblemDataById,
} from '@/lib/problem'

interface CookbookProblemPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CookbookProblemPage({
  params,
}: CookbookProblemPageProps) {
  const { id } = await params

  const { title, description, tags, units } =
    await getCookbookProblemDataById(id)

  const { unitTitle, unitDescription, serviceMappers, defaultConfigs } =
    await getUnitProblemDataById(units[0].id)

  const mockFeedbackMessages = [
    {
      service: 'mockservice',
      field: 'mockfield',
      message: 'mockMessage',
    },
  ]

  return (
    <CookbookProblemClient
      unitId={units[0].id}
      cookbookId={id}
      title={title}
      description={description}
      tags={tags}
      problemData={serviceMappers}
      defaultConfigs={defaultConfigs}
      initialFeedback={mockFeedbackMessages}
      units={units}
    />
  )
}
