'use client'

import { useState } from 'react'

interface FeatureFlagProps {
  readonly flagKey: string
  readonly components: React.ReactNode[]
  readonly weights?: number[]
}

function selectVariant(
  flagKey: string,
  componentCount: number,
  weights?: number[],
): number {
  const storageKey = `feature-flag-${flagKey}`
  const stored = localStorage.getItem(storageKey)

  if (stored !== null) {
    return Number.parseInt(stored, 10)
  }

  let index: number

  if (weights && weights?.length === componentCount) {
    // 가중치 기반 랜덤 선택
    const totalWeight = weights.reduce((sum, w) => sum + w, 0)
    let random = Math.random() * totalWeight
    index = 0

    for (let i = 0; i < weights.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        index = i
        break
      }
    }
  } else {
    // 균등 분배
    index = Math.floor(Math.random() * componentCount)
  }

  localStorage.setItem(storageKey, index.toString())
  return index
}

export function RandomFeatureFlag({
  flagKey,
  components,
  weights,
}: FeatureFlagProps) {
  const [selectedIndex] = useState(() =>
    selectVariant(flagKey, components.length, weights),
  )

  return <>{components[selectedIndex]}</>
}
