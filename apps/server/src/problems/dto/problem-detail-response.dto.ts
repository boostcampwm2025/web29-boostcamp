import { ProblemType } from '../types/problem-type.enum';

export class ProblemDetailResponseDto {
  id: number;
  problemType: ProblemType;
  title: string;
  description: string;
  requiredFields: Array<{
    field: string;
    fixedOptions?: Record<string, any>;
  }>;
  tags: string[];
}
