import CookbookProblemClient from './cookbook-problem-client'

import {
  getCookbookProblemDataById,
  getUnitProblemDataById,
} from '@/lib/problem'

interface CookbookProblemPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    unitId: string
  }>
}

export default async function CookbookProblemPage({
  params,
  searchParams,
}: CookbookProblemPageProps) {
  const { id } = await params
  const { unitId } = await searchParams

  const { tags, units } = await getCookbookProblemDataById(id)

  const currentUnitId =
    units.find((unit) => unit.id == unitId)?.id || units[0].id
  const {
    serviceMappers,
    defaultConfigs,
    title: unitTitle,
    descDetail: unitDescDetail,
  } = await getUnitProblemDataById(currentUnitId)

  // 현재 unit의 인덱스를 찾아서 다음 unit ID 계산
  const currentIndex = units.findIndex((u) => u.id === currentUnitId)
  const nextUnitId =
    currentIndex < units.length - 1 ? units[currentIndex + 1].id : undefined

  return (
    <CookbookProblemClient
      key={currentUnitId}
      unitId={currentUnitId}
      cookbookId={id}
      title={unitTitle}
      descDetail={unitDescDetail}
      tags={tags}
      problemData={serviceMappers}
      defaultConfigs={defaultConfigs}
      units={units}
      nextUnitId={nextUnitId}
    />
  )
}
