'use client'

/* eslint-disable */

import { useMemo, useState, useCallback } from 'react'
import { submitProblemSolution } from '@/lib/problem'
import {
  type IRendererMapper,
  rendererMapper,
} from '@/components/service-renderer'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeedbackDetailCard } from '../components/feedback-detail-card'
import { GlobalSubmitConfig, ServiceType, FinalSubmitConfig, ServiceConfig, ServiceConfigItem } from '@/types/submitConfig.types'
import AwsDiagram, { type AwsNode } from '@/components/aws-diagram'
import { type Edge, useEdgesState, useNodesState, type Node } from '@xyflow/react'
import { useAwsDiagramLogic } from '@/hooks/diagram/useDiagramLogic'
import { FormData } from '@/components/service-renderer/types'

interface ProblemDetailClientProps {
  problemData: IRendererMapper[]
  problemId: string
}

const initialNodes: Node[] = [
  {
    id: 'aws-cloud',
    type: 'awsGroup',
    position: { x: 0, y: 0 },
    data: { label: 'AWS Cloud', icon: 'awsCloud', width: 1000, height: 800 },
  }
]
const initialEdges: Edge[] = []

const initialSubmitConfig: GlobalSubmitConfig = { s3: [] }

const formatTaskName = (task: string) => {
  return task
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ProblemDetailClient({
  problemData,
  problemId,
}: ProblemDetailClientProps) {

  const groupedData = useMemo(() => {
    const groups: Record<string, IRendererMapper[]> = {};

    problemData.forEach((item) => {
      const service = item.serviceName;
      if (!groups[service]) {
        groups[service] = [];
      }
      groups[service].push(item);
    });

    return groups;
  }, [problemData]);

  const serviceKeys = Object.keys(groupedData);
  const defaultServiceTab = serviceKeys[0] || '';


  const [submitConfig, setSubmitConfig] = useState<GlobalSubmitConfig>(initialSubmitConfig)
  const [nodes, setNodes] = useNodesState(initialNodes)
  const [edges, setEdges] = useEdgesState(initialEdges)
  const [feedbacks, setFeedbacks] = useState<FeedbackDto[]>([]);
  const { addAwsResource } = useAwsDiagramLogic(nodes, setNodes, setEdges);

  const handleAddItem = useCallback((serviceType: ServiceType, formData: ServiceConfig) => {
    const configKey = serviceType;
    const currentItems = submitConfig[configKey] || [];

    const newName = formData.name;
    if (newName && currentItems.some(item => item.data.name === newName)) {
      alert(`이미 '${newName}'라는 이름을 가진 리소스가 존재합니다.`);
      return;
    }

    // const newId = crypto.randomUUID();

    setSubmitConfig((prev) => ({
      ...prev,
      [configKey]: [
        ...(prev[configKey] || []),
        { id: formData.name, data: formData, isReady: true }
      ]
    }));

    addAwsResource({ type: serviceType, ...formData });

  }, [nodes.length, submitConfig, setNodes]);

  // TODO: 나중에 참조하고 있는 노드가 있을 경우 삭제 불가 or 재귀적으로 삭제 등 구현.
  const handleRemoveItem = useCallback((serviceType: ServiceType, id: string) => {
    const configKey = serviceType;

    setSubmitConfig((prev) => ({
      ...prev,
      [configKey]: prev[configKey]?.filter((item) => item.id !== id) || []
    }));

    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [setNodes]);

  const onFinalSubmit = async () => {
    const finalSubmitConfig: FinalSubmitConfig = { submitConfig: {} };

    for (const [serviceKey, items] of Object.entries(submitConfig)) {
      finalSubmitConfig.submitConfig[serviceKey as keyof GlobalSubmitConfig] = items.map((item: ServiceConfigItem<ServiceConfig>) => ({
        ...item.data,
        id: item.data.name,
      }));
    }

    const result = await submitProblemSolution(problemId, finalSubmitConfig);
    if (result.result === 'PASS') {
      alert('축하합니다! 모든 리소스를 올바르게 구성했습니다!');
    }
    setFeedbacks(() => [...result.feedback]);
  }

  return (
    // [변경 1] 전체 레이아웃: 1:1 비율(lg:grid-cols-2), 전체 패딩(p-8), 갭(gap-10) 추가
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full p-8 w-full">

      {/* [변경 2] 왼쪽 설정 영역: col-span 제거 (기본값 1), 왼쪽 정렬 상태 유지 */}
      <div className="flex flex-col h-full space-y-6">

        <Tabs defaultValue={defaultServiceTab} className="w-full">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">리소스 구성</h2>
            <TabsList>
              {serviceKeys.map((service) => (
                <TabsTrigger key={service} value={service} className="w-24">
                  {service}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {serviceKeys.map((serviceKey) => {
            const mappers = groupedData[serviceKey];
            const defaultTaskTab = mappers[0]?.serviceTask || '';

            return (
              <TabsContent key={serviceKey} value={serviceKey} className="mt-0">

                <Tabs defaultValue={defaultTaskTab} className="w-full">

                  <div className="border-b mb-6">
                    <TabsList className="bg-transparent p-0 h-auto space-x-6">
                      {mappers.map((mapper) => (
                        <TabsTrigger
                          key={mapper.serviceTask}
                          value={mapper.serviceTask}
                          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 pb-2 text-muted-foreground data-[state=active]:text-foreground transition-none"
                        >
                          {formatTaskName(mapper.serviceTask)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  {mappers.map((mapper) => {
                    const { Renderer, config } = rendererMapper(mapper);
                    const serviceType = mapper.serviceName as ServiceType;

                    const configKey = serviceType;
                    const myCreatedItems = submitConfig[configKey] || [];

                    return (
                      <TabsContent key={mapper.serviceTask} value={mapper.serviceTask} className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="border rounded-xl p-6 bg-card shadow-sm min-h-[400px]">
                          <Renderer
                            config={config}
                            onAdd={handleAddItem}
                            createdItems={myCreatedItems}
                            onRemove={(id: string) => handleRemoveItem(serviceType, id)}
                          />
                        </div>
                      </TabsContent>
                    );
                  })}
                </Tabs>

              </TabsContent>
            );
          })}
        </Tabs>

        {/* 하단 버튼 영역 */}
        <div className="mt-auto pt-6 border-t">
          <Button onClick={onFinalSubmit} size="lg" className="w-full">
            최종 제출 및 채점하기 ({Object.values(submitConfig).flat().length}개 리소스)
          </Button>
        </div>
      </div>

      {/* [변경 3] 오른쪽 다이어그램 영역: col-span 제거, Sticky 위치 조정 */}
      <div className="sticky top-8 h-[calc(100vh-4rem)] flex flex-col space-y-6">
        <div className="flex-1 border rounded-xl overflow-hidden bg-white shadow-sm min-h-[400px]">
          <AwsDiagram
            nodes={nodes}
            edges={edges}
          />
        </div>

        {/* 피드백 카드 높이 고정 방지를 위해 shrink-0 사용 가능 (선택사항) */}
        <div className="shrink-0">
          <FeedbackDetailCard feedback={feedbacks} />
        </div>
      </div>

    </div>
  )
}