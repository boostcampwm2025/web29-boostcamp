'use client'

import { AWS_RESOURCE_ICONS, type AwsResourceIconKey } from '../aws-icons'

import Image from 'next/image'

import { Handle, Position } from '@xyflow/react'

export interface AwsResourceNodeData {
  label: string
  icon: AwsResourceIconKey
  description?: string
  [key: string]: unknown
}

interface AwsResourceNodeProps {
  data: AwsResourceNodeData
}

export function AwsResourceNode({ data }: AwsResourceNodeProps) {
  const iconPath = AWS_RESOURCE_ICONS[data.icon]

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-md">
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <Image
        src={iconPath}
        alt={data.label}
        width={64}
        height={64}
        className="h-16 w-16"
      />
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">
          {data.label}
        </span>
        {data.description && (
          <span className="text-sm text-gray-500">{data.description}</span>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400"
      />
    </div>
  )
}
