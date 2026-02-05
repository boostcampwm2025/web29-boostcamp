'use client'

import { AWS_ICONS, type AwsIconKey } from '../aws-icons'

import Image from 'next/image'

import { Handle, Position } from '@xyflow/react'

export interface AwsServiceNodeData {
  label: string
  icon: AwsIconKey
  description?: string
  [key: string]: unknown
}

interface AwsServiceNodeProps {
  data: AwsServiceNodeData
}

export function AwsServiceNode({ data }: AwsServiceNodeProps) {
  const iconPath = AWS_ICONS[data.icon]

  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 shadow-lg">
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <Image src={iconPath} alt={data.label} width={100} height={100} />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-800">
          {data.label}
        </span>
        {data.description && (
          <span className="text-xl text-gray-500">{data.description}</span>
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
