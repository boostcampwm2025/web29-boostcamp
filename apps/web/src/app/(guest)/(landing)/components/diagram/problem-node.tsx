import { BookOpenIcon, LayersIcon } from 'lucide-react'

import { memo } from 'react'

import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from '@/components/base-node'
import { Handle, Position } from '@xyflow/react'

export const ProblemNode = memo(() => {
  return (
    <BaseNode className="hover:ring-primary w-fit rounded-2xl">
      <BaseNodeHeader className="rounded-t-2xl border-b bg-white/90 pl-5 backdrop-blur-xl supports-backdrop-filter:bg-white/90">
        <BaseNodeHeaderTitle>problem</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent className="p-6">
        <div className="rounded-lg border px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="inline-block h-5 w-5" />
            <p className="font-semibold">Cookbook</p>
          </div>

          <div className="flex justify-between gap-2 pt-4 pb-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border px-2 py-1"
              >
                <LayersIcon className="inline-block h-4 w-4" />
                <p className="font-semibold">
                  Unit {String(index + 1).padStart(2, '0')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BaseNodeContent>

      <Handle
        type="target"
        position={Position.Left}
        className="bg-primary-foreground! border-primary/20! border-1.5! size-5!"
      />
    </BaseNode>
  )
})

ProblemNode.displayName = 'ProblemNode'
