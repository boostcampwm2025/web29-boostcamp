'use client'

import {
  Background,
  Edge,
  Handle,
  Node,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const VpcNode = ({ data }: { data: { label: string } }) => {
  return (
    <div
      style={{ width: '400px', height: '200px' }}
      className="rounded-lg border-2 border-dashed border-blue-500 bg-blue-50/50 p-4"
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-sm font-semibold text-blue-700">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const EC2Node = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-orange-500 bg-white px-4 py-3 shadow-lg">
      <Handle type="target" position={Position.Top} />
      <div className="h-10 w-10 rounded bg-orange-500"></div>
      <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const InternetNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-green-500 bg-white px-4 py-3 shadow-lg">
      <Handle type="target" position={Position.Top} />
      <div className="h-10 w-10 rounded-full bg-green-500"></div>
      <div className="text-sm font-semibold text-gray-800">{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const nodeTypes = {
  vpc: VpcNode,
  ec2: EC2Node,
  internet: InternetNode,
}

const initialNodes: Node[] = [
  {
    id: 'vpc',
    type: 'vpc',
    position: { x: 0, y: 100 },
    data: { label: 'VPC (10.0.0.0/16)' },
    style: {
      width: 400,
      height: 200,
    },
  },
  {
    id: 'n1',
    type: 'internet',
    position: { x: 120, y: 0 },
    data: { label: 'Internet' },
  },
  {
    id: 'n2',
    type: 'ec2',
    position: { x: 120, y: 80 },
    data: { label: 'EC2 Instance' },
    parentId: 'vpc',
    extent: 'parent' as const,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    type: 'default',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 3 },
    label: 'HTTP/HTTPS',
    labelStyle: { fill: '#10b981', fontWeight: 700, fontSize: 12 },
    markerEnd: {
      type: 'arrowclosed',
      color: '#10b981',
      width: 20,
      height: 20,
    },
  },
]

export default function AwsDiagram() {
  const [nodes] = useNodesState<Node>(initialNodes)
  const [edges] = useEdgesState<Edge>(initialEdges)

  return (
    <div className="h-[500px] w-full rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
