'use client'

import { ConceptNode, ProblemNode, WelcomeNode } from '../diagram'

import { Background, FitViewOptions, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-10.5rem)] w-full">
      <LandingDiagram />
    </section>
  )
}

const LandingDiagram = () => {
  const nodeTypes = {
    welcomeNode: WelcomeNode,
    conceptNode: ConceptNode,
    problemNode: ProblemNode,
  }

  const defaultNodes = [
    {
      id: 'welcome',
      position: { x: 220, y: 200 },
      data: {},
      type: 'welcomeNode',
    },
    {
      id: 'concept',
      position: { x: 1200, y: 100 },
      data: {},
      type: 'conceptNode',
    },
    {
      id: 'problem',
      position: { x: 920, y: 360 },
      data: {},
      type: 'problemNode',
    },
  ]

  const defaultEdges = [
    {
      id: 'e-welcome-concept',
      source: 'welcome',
      target: 'concept',
      animated: true,
    },
    {
      id: 'e-welcome-problem',
      source: 'welcome',
      target: 'problem',
      animated: true,
    },
  ]

  const fitViewOptions: FitViewOptions = {
    padding: '150px',
    maxZoom: 1,
  }

  return (
    <div className="relative h-[calc(100vh-10.5rem)] w-full overflow-hidden">
      <DiagramGradient />

      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        panOnDrag={false}
        zoomOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}

const DiagramGradient = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(40%_80%_at_30%_50%,rgba(100,147,242,0.22),transparent_70%)]" />
    </div>
  )
}
