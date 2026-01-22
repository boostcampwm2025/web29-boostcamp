export const enum ProblemType {
  UNIT = 'unit',
  COOKBOOK = 'cookbook',
  SCENARIO = 'scenario',
}

export type Unit = {
  id: number
  title: string
  description: string
  tags?: string[]
}

// 백엔드에서 받아오는 required_fields 구조
export interface RequiredField {
  service: string
  service_task: string
  service_sections: string[]
  fixed_options?: Record<string, unknown>
}

// 문제 상세 데이터 타입
export interface ProblemDetail {
  id: number
  problem_type: ProblemType
  title: string
  description: string
  required_fields: RequiredField[]
  tags: string[]
}
