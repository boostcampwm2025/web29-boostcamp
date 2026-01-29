import UnitProblemClient from './unit-problem-client'

import { getUnitProblemDataById } from '@/lib/problem'

interface UnitProblemPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UnitProblemPage({
  params,
}: UnitProblemPageProps) {
  const { id } = await params

  const { title, description, tags, serviceMappers, defaultConfigs } =
    await getUnitProblemDataById(id)

  return (
    <UnitProblemClient
      unitId={id}
      title={title}
      description={description}
      tags={tags}
      problemData={serviceMappers}
      defaultConfigs={defaultConfigs}
    />
  )
}
