'use client'

import { useUnitForm } from './unit-form-provider'

import { useMemo } from 'react'

import {
  Background,
  type Edge,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export function DiagramPanel() {
  const { form, problemData } = useUnitForm()

  // form 데이터 구독 (실시간 업데이트)
  const formData = form.watch()

  // formData 기반으로 노드 생성
  const { nodes: generatedNodes, edges: generatedEdges } = useMemo(() => {
    return generateDiagram(problemData.required_fields, formData)
  }, [problemData.required_fields, formData])

  const [nodes] = useNodesState<Node>(generatedNodes)
  const [edges] = useEdgesState<Edge>(generatedEdges)

  return (
    <div className="h-[400px] rounded-xl border bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
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

// 다이어그램 생성 함수
function generateDiagram(
  requiredFields: { service: string; service_task: string }[],
  formData: Record<string, Record<string, unknown>>,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // 서비스별로 노드 생성
  requiredFields.forEach((field, index) => {
    const key = `${field.service}-${field.service_task}`
    const data = formData[key] || {}

    // 서비스 노드
    nodes.push({
      id: key,
      position: { x: 50, y: 50 + index * 120 },
      data: {
        label: getNodeLabel(field.service, field.service_task, data),
      },
      style: {
        padding: 16,
        borderRadius: 8,
        border: `2px solid ${getServiceColor(field.service)}`,
        backgroundColor: `${getServiceColor(field.service)}20`,
        fontSize: 12,
        minWidth: 200,
      },
    })
  })

  // 노드 간 연결 (순차적으로)
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${i}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      animated: true,
      style: { stroke: '#94a3b8', strokeWidth: 2 },
    })
  }

  return { nodes, edges }
}

function getNodeLabel(
  service: string,
  task: string,
  data: Record<string, unknown>,
): string {
  // 서비스별 라벨 생성
  if (service === 'S3' && task === 'bucket-create') {
    const general = data.general as { bucketName?: string } | undefined
    const bucketName = general?.bucketName || '(버킷 이름 미입력)'
    return `🪣 S3 Bucket\n${bucketName}`
  }

  if (service === 'CloudFront') {
    if (task === 'origin-settings') {
      const originDomain = data.originDomain as { domain?: string } | undefined
      return `☁️ CloudFront Origin\n${originDomain?.domain || '(도메인 미입력)'}`
    }
    return `☁️ CloudFront\n${task}`
  }

  return `${service}\n${task}`
}

function getServiceColor(service: string): string {
  const colors: Record<string, string> = {
    S3: '#569a31',
    CloudFront: '#8c4fff',
    EC2: '#ff9900',
    VPC: '#248814',
  }
  return colors[service] || '#64748b'
}
