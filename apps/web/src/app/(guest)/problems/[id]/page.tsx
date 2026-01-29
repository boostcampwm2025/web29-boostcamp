import ProblemDetailClient from './problem-detail-client'

import { getProblemData } from '@/lib/problem/get-problem-data'

interface ProblemDetailPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    type?: string
  }>
}

export default async function ProblemDetailPage({
  params,
  searchParams,
}: ProblemDetailPageProps) {
  const { id } = await params
  const { type } = await searchParams

  const {
    title,
    description,
    descDetail,
    tags,
    serviceMappers,
    defaultConfigs,
  } = await getProblemData(id)

  const mockFeedbackMessages = [
    {
      service: 'mockservice',
      field: 'mockfield',
      message: 'mockMessage',
    },
  ]

  return (
    <ProblemDetailClient
      type={type!}
      problemId={id}
      title={title}
      description={description}
      descDetail={descDetail}
      tags={tags}
      problemData={serviceMappers}
      defaultConfigs={defaultConfigs}
      initialFeedback={mockFeedbackMessages}
    />
  )
}
