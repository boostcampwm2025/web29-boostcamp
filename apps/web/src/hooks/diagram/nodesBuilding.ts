import { type Node } from '@xyflow/react'

const CONFIG = {
  GAP: 20,
  PADDING: 60,
  ROOT_ID: 'aws-cloud',
  ROOT_INIT_WIDTH: 1000,
  ROOT_INIT_HEIGHT: 800,
  FIRST_LAYER_INIT_WIDTH: 800,
  FIRST_LAYER_INIT_HEIGHT: 600,
  SUB_LAYER_INIT_WIDTH: 600,
  SUB_LAYER_INIT_HEIGHT: 400,
}

type Row = {
  nodes: Node[]
  width: number // 자식들의 너비 합 + 최소 갭
  height: number // 행의 최대 높이
}

type LayoutResult = {
  rows: Row[]
  contentWidth: number // 실제 콘텐츠들이 차지하는 최대 너비
  contentHeight: number // 실제 콘텐츠들이 차지하는 전체 높이
  diff: number // |너비 - 높이| (정사각형 편차)
}

const applyLayoutToNode = (
  targetNodeId: string,
  currentNodes: Node[],
): Node[] => {
  // 1. 내 직속 자식들 찾기
  const allChildren = currentNodes.filter((n) => n.parentId === targetNodeId)

  // 자식이 없으면 아무것도 안 함
  if (allChildren.length === 0) {
    return currentNodes
  }

  const layoutChildren = allChildren.filter(
    (n) => n.data?.type !== 'internetGateway',
  )
  const specialChildren = allChildren.filter(
    (n) => n.data?.type === 'internetGateway',
  )

  // 2. 기초 데이터 계산 (총 면적, 최대 자식 너비 등) - 레이아웃 자식만 고려
  let totalArea = 0
  let maxChildWidth = 0

  layoutChildren.forEach((child) => {
    const w = Number(child.data?.width) || 100
    const h = Number(child.data?.height) || 50
    totalArea += w * h
    if (w > maxChildWidth) maxChildWidth = w
  })

  const simulateLayout = (maxWidthLimit: number): LayoutResult => {
    const rows: Row[] = []
    let currentRowNodes: Node[] = []
    let currentRowWidth = 0
    let currentRowHeight = 0
    let simulCurrentX = CONFIG.PADDING

    layoutChildren.forEach((child) => {
      const childW = Number(child.data?.width) || 100
      const childH = Number(child.data?.height) || 50

      // 줄바꿈 체크 (현재 위치가 한계선을 넘으면)
      if (
        simulCurrentX + childW + CONFIG.GAP > maxWidthLimit + CONFIG.PADDING &&
        currentRowNodes.length > 0
      ) {
        rows.push({
          nodes: currentRowNodes,
          width: currentRowWidth,
          height: currentRowHeight,
        })
        currentRowNodes = []
        currentRowWidth = 0
        currentRowHeight = 0
        simulCurrentX = CONFIG.PADDING
      }

      currentRowNodes.push(child)
      const gap = currentRowNodes.length > 1 ? CONFIG.GAP : 0
      currentRowWidth += childW + gap
      currentRowHeight = Math.max(currentRowHeight, childH)
      simulCurrentX += childW + CONFIG.GAP
    })

    // 마지막 줄 처리
    if (currentRowNodes.length > 0) {
      rows.push({
        nodes: currentRowNodes,
        width: currentRowWidth,
        height: currentRowHeight,
      })
    }

    // 전체 콘텐츠 크기 계산
    const contentWidth = rows.reduce((max, row) => Math.max(max, row.width), 0)
    const contentHeight =
      rows.reduce((sum, row) => sum + row.height, 0) +
      (rows.length - 1) * CONFIG.GAP

    return {
      rows,
      contentWidth,
      contentHeight,
      diff: Math.abs(contentWidth - contentHeight), // 가로 세로 차이
    }
  }

  const idealSide = Math.sqrt(totalArea * 1.3) // 여유 계수 1.3

  // 너비 후보군 생성 (이상적 너비, 좁게, 넓게, 최소폭 등)
  const candidates = [
    Math.max(idealSide, maxChildWidth),
    Math.max(idealSide * 0.8, maxChildWidth),
    Math.max(idealSide * 1.2, maxChildWidth),
    Math.max(idealSide * 1.5, maxChildWidth),
    Math.max(maxChildWidth, CONFIG.SUB_LAYER_INIT_WIDTH - CONFIG.PADDING * 2),
  ]

  // 중복 제거 및 정렬
  const uniqueCandidates = Array.from(new Set(candidates)).sort((a, b) => a - b)

  // 가장 정사각형에 가까운 결과(diff가 최소인 것) 선택
  let bestResult = simulateLayout(uniqueCandidates[0])

  for (let i = 1; i < uniqueCandidates.length; i++) {
    const result = simulateLayout(uniqueCandidates[i])
    if (result.diff < bestResult.diff) {
      bestResult = result
    }
  }

  const targetNode = currentNodes.find((n) => n.id === targetNodeId)
  let minParentWidth = CONFIG.SUB_LAYER_INIT_WIDTH
  let minParentHeight = CONFIG.SUB_LAYER_INIT_HEIGHT

  // 노드 타입별 최소 크기 지정
  if (targetNode?.id === CONFIG.ROOT_ID) {
    minParentWidth = CONFIG.ROOT_INIT_WIDTH
    minParentHeight = CONFIG.ROOT_INIT_HEIGHT
  } else if (
    targetNode?.data?.type === 'region' ||
    targetNode?.data?.type === 'global' ||
    targetNode?.data?.type === 'vpc'
  ) {
    minParentWidth = CONFIG.FIRST_LAYER_INIT_WIDTH
    minParentHeight = CONFIG.FIRST_LAYER_INIT_HEIGHT
  }

  // 특수 자식(IGW)이 있을 경우 상단 여백 추가 확보
  const hasSpecialChildren = specialChildren.length > 0
  const topPadding = hasSpecialChildren ? 100 : CONFIG.PADDING
  const bottomPadding = hasSpecialChildren ? 100 : CONFIG.PADDING // 대칭을 위해 하단도 동일하게

  // 최종 부모 크기 = Max(콘텐츠 크기 + 패딩, 최소 크기)
  const newParentWidth = Math.max(
    bestResult.contentWidth + CONFIG.PADDING * 2,
    minParentWidth,
  )
  const newParentHeight = Math.max(
    bestResult.contentHeight + topPadding + bottomPadding,
    minParentHeight,
  )

  // 수직 중앙 정렬 (Align Content: Center)
  // (newHeight - contentHeight) / 2 가 중앙인데, 최소 topPadding은 보장해야 함
  let startY = (newParentHeight - bestResult.contentHeight) / 2
  startY = Math.max(startY, topPadding)

  let currentY = startY
  const updatedChildren: Node[] = []

  bestResult.rows.forEach((row) => {
    // 1. 순수 아이템들의 너비 합 구하기
    const rowItemsWidth = row.nodes.reduce(
      (sum, n) => sum + (Number(n.data?.width) || 100),
      0,
    )

    // 2. 가용 공백(Whitespace) 계산
    const availableSpace = newParentWidth - CONFIG.PADDING * 2 - rowItemsWidth

    // 3. 슬롯 개수 (아이템 N개면 공간은 N+1개)
    const slots = row.nodes.length + 1

    // 4. 개별 갭 크기 계산 (음수 방지)
    const gapSize = Math.max(0, availableSpace / slots)

    // 5. X 좌표 시작점 (첫 번째 갭 이후부터 시작)
    let currentX = CONFIG.PADDING + gapSize

    row.nodes.forEach((child) => {
      const childW = Number(child.data?.width) || 100

      updatedChildren.push({
        ...child,
        position: { x: currentX, y: currentY },
      })

      // 다음 아이템 위치 = 현재위치 + 아이템너비 + 갭
      currentX += childW + gapSize
    })

    // 다음 줄 Y 위치
    currentY += row.height + CONFIG.GAP
  })

  // 2. 특수 자식 노드 배치 (중앙 상단)
  const totalSpecialWidth =
    specialChildren.reduce(
      (sum, child) => sum + (Number(child.data?.width) || 100),
      0,
    ) +
    (specialChildren.length - 1) * CONFIG.GAP

  let currentSpecialX = (newParentWidth - totalSpecialWidth) / 2

  specialChildren.forEach((child) => {
    const childW = Number(child.data?.width) || 100
    const yPos = 0 // 상단에 완전히 밀착

    updatedChildren.push({
      ...child,
      position: { x: currentSpecialX, y: yPos },
    })

    currentSpecialX += childW + CONFIG.GAP
  })

  return currentNodes.map((node) => {
    // 부모 노드: 크기 업데이트
    if (node.id === targetNodeId) {
      return {
        ...node,
        data: {
          ...node.data,
          width: newParentWidth,
          height: newParentHeight,
        },
        width: newParentWidth,
        height: newParentHeight,
      }
    }
    // 자식 노드: 위치 업데이트
    const updatedChild = updatedChildren.find((c) => c.id === node.id)
    return updatedChild || node
  })
}

export { applyLayoutToNode }

export const recalculateTree = (allNodes: Node[]) => {
  // 1. 노드 별 깊이(Depth) 계산을 위한 맵 생성
  const depthMap = new Map<string, number>()

  const getDepth = (nodeId: string): number => {
    if (depthMap.has(nodeId)) return depthMap.get(nodeId)!

    const node = allNodes.find((n) => n.id === nodeId)
    // 부모가 없으면 Root (Depth 0)
    if (!node || !node.parentId) {
      depthMap.set(nodeId, 0)
      return 0
    }

    // 부모의 깊이 + 1
    const depth = getDepth(node.parentId) + 1
    depthMap.set(nodeId, depth)
    return depth
  }

  // 모든 노드의 depth 미리 계산
  allNodes.forEach((node) => getDepth(node.id))

  // 2. 깊이가 깊은 순서대로(내림차순) 정렬된 '계산 대기열' 생성
  // Leaf Node(자식) -> Root(부모) 순서
  const sortedNodes = [...allNodes].sort((a, b) => {
    const depthA = depthMap.get(a.id) || 0
    const depthB = depthMap.get(b.id) || 0
    return depthB - depthA // 내림차순 (3 -> 2 -> 1 -> 0)
  })

  // 3. 정렬된 순서대로 레이아웃 적용 (누적 업데이트)
  let currentNodes = allNodes

  sortedNodes.forEach((node) => {
    // 그룹 노드(컨테이너)인 경우에만 레이아웃 계산 수행
    currentNodes = applyLayoutToNode(node.id, currentNodes)
  })

  return currentNodes
}
