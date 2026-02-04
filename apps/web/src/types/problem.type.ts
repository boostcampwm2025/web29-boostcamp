export interface ProblemDescDetail {
  overview: string
  requirements?: string
  prerequisites?: string
  learningObjectives?: string
  hint?: string
}

interface BaseProblem {
  id: number
  title: string
  description: string
  descDetail?: ProblemDescDetail
  tags?: string[]
}

export const problemType = {
  UNIT: 'unit',
  COOKBOOK: 'cookbook',
} as const

export type TProblemType =
  | (typeof problemType)['UNIT']
  | (typeof problemType)['COOKBOOK']

export type UnitProblem = BaseProblem

export type CookbookProblem = BaseProblem & {
  problems: UnitProblem[]
}
