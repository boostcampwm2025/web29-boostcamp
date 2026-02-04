import { ProblemType } from '../types/problem-type.enum';
import { TServiceConfigMap } from '../../constants/service-convention';
import { ProblemDescDetail } from '../types/problem-desc-detail-types';

export class ProblemDetailResponseDto {
  id: number;
  problemType: ProblemType;
  title: string;
  description: string;
  descDetail: ProblemDescDetail;
  requiredFields: TServiceConfigMap[];
  fixedOptions?: Record<string, any>;
  tags: string[];
}
