import { memo } from 'react'

import Link from 'next/link'

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node'
import { Button } from '@/components/ui/button'
import { Handle, Position } from '@xyflow/react'

export const WelcomeNode = memo(() => {
  return (
    <BaseNode className="hover:ring-primary w-130 rounded-2xl">
      <BaseNodeHeader className="rounded-t-2xl border-b bg-white/90 pl-5 backdrop-blur-xl supports-backdrop-filter:bg-white/90">
        <BaseNodeHeaderTitle>welcome</BaseNodeHeaderTitle>
      </BaseNodeHeader>
      <BaseNodeContent className="p-6">
        <h3 className="text-4xl font-bold">
          <span className="text-primary">클라우드</span>를 이해하며
          <br /> 직접 구성해보세요
        </h3>

        <p className="py-2 text-lg leading-6">
          단계별 선택을 통해 완성하는
          <br /> 인터랙티브 클라우드 아키텍처 시뮬레이터
        </p>
      </BaseNodeContent>
      <BaseNodeFooter className="border-t-0 p-6 pt-0">
        <Button asChild className="nodrag w-full">
          <Link href="/problems?type=unit">문제 풀어보기</Link>
        </Button>
      </BaseNodeFooter>
      <Handle
        type="source"
        position={Position.Right}
        className="bg-primary-foreground! border-primary/20! border-1.5! size-5!"
      />
    </BaseNode>
  )
})

WelcomeNode.displayName = 'WelcomeNode'
