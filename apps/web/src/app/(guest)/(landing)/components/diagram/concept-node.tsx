import { memo } from 'react'

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node'
import { Handle, Position } from '@xyflow/react'

export const ConceptNode = memo(() => {
  const concept = [
    {
      name: 'EC2',
    },
    {
      name: 'S3',
    },
    {
      name: 'CloudFront',
    },
    {
      name: 'VPC',
    },
  ]

  return (
    <BaseNode className="hover:ring-primary w-fit rounded-2xl">
      <BaseNodeHeader className="rounded-t-2xl border-b bg-white/90 pl-5 backdrop-blur-xl supports-backdrop-filter:bg-white/90">
        <BaseNodeHeaderTitle>concept</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent className="flex-row gap-2 p-6">
        {concept.map((item) => (
          <div
            key={item.name}
            className="w-fit rounded-lg border px-2 py-1 font-semibold"
          >
            {item.name}
          </div>
        ))}
      </BaseNodeContent>

      <Handle
        type="target"
        position={Position.Left}
        className="bg-primary-foreground! border-primary/20! border-1.5! size-4!"
      />
    </BaseNode>
  )
})

ConceptNode.displayName = 'ConceptNode'
