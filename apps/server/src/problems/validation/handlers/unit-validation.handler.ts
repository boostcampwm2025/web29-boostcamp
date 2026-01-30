import { Injectable } from '@nestjs/common';
import { ProblemValidationHandler, ProblemData } from './validation.handler';
import { FieldValidationHandler } from './field-validation.handler';
import { SubmitResponseDto } from 'src/problems/dto/submit-response.dto';
import { SubmitRequestDto } from 'src/problems/dto/submit-request.dto';
import { FeedbackDto } from '@/problems/dto/submit-response.dto';
import { ProblemType } from '@/problems/types/problem-type.enum';
import {
  ServiceConfigTypes,
  SubnetConfig,
  VPCConfig,
  RouteTableConfig,
} from '@/problems/types/service-config-type.enum';
import { UnitProblemValidateResult } from '@/problems/types/unit-problem-validate-results';
import {
  UnitProblemFeedbackType,
  feedbackMessages,
} from '@/problems/types/unit-problem-feedback-types';
import { containsCidr } from '../utils/cidr-utils';
import { Ec2ScenarioHandler } from './unit-service-specific-validation/unit-ec2-scenario.handler';
import { S3ScenarioHandler } from './unit-service-specific-validation/unit-s3-scenario.handler';
import { SgScenarioHandler } from './unit-service-specific-validation/unit-sg-scenario.handler';
import { NetworkScenarioHandler } from './unit-service-specific-validation/unit-network-scenario.handler';
import { removeUndefined } from '../utils/refine-request';

function hasCidrBlock(
  config: Partial<ServiceConfigTypes>,
): config is VPCConfig | SubnetConfig {
  return 'cidrBlock' in config;
}

function hasName(config: unknown): config is { name: string } {
  return config !== null && typeof config === 'object' && 'name' in config;
}

@Injectable()
export class UnitValidationHandler implements ProblemValidationHandler {
  constructor(
    private readonly fieldValidationHandler: FieldValidationHandler,
    private readonly ec2ScenarioHandler: Ec2ScenarioHandler,
    private readonly s3ScenarioHandler: S3ScenarioHandler,
    private readonly sgScenarioHandler: SgScenarioHandler,
    private readonly networkScenarioHandler: NetworkScenarioHandler,
  ) { }

  support(problemType: ProblemType): boolean {
    return problemType === ProblemType.UNIT;
  }

  validate(
    submitRequestDto: SubmitRequestDto,
    problemData: ProblemData,
  ): SubmitResponseDto {
    const { submitConfig, networkTask } = submitRequestDto;

    // 1. 사전 검증 (Guard Clause)
    if (!problemData || !submitConfig) {
      throw new Error('문제가 존재하지 않거나 제출된 설정이 없습니다.');
    }
    if (networkTask) {
      throw new Error('Unit 문제에는 networkTask가 필요하지 않습니다.');
    }

    const solutionConfig = problemData.solution;
    const requirements = problemData.requirements || {};

    const mismatchedConfigs: Partial<UnitProblemValidateResult> = {};

    // 2. 서비스별 설정 비교 (Diffing)
    for (const serviceKey in solutionConfig) {
      const diffResult = this.diffServiceConfigs(
        submitConfig[serviceKey] || [],
        solutionConfig[serviceKey] || [],
        serviceKey,
      );

      if (
        diffResult.onlyInAnswer.length > 0 ||
        diffResult.onlyInSolution.length > 0
      ) {
        mismatchedConfigs[serviceKey] = diffResult;
      }
    }

    // 3. 피드백 생성 (Generation)
    const feedbacks = this.generateFeedbacks(mismatchedConfigs);

    // 4. 필드 단위 심층 검증 (Deep Validation)
    const fieldFeedbacks =
      this.fieldValidationHandler.validate(submitRequestDto);
    feedbacks.push(...fieldFeedbacks);

    // 5. 문제별 시나리오 검증 (Scenario Validation)
    feedbacks.push(
      ...this.ec2ScenarioHandler.validate(submitConfig, requirements.ec2),
    );
    feedbacks.push(
      ...this.s3ScenarioHandler.validate(submitConfig, requirements.s3),
    );
    feedbacks.push(
      ...this.sgScenarioHandler.validate(
        submitConfig,
        requirements.securityGroup,
      ),
    );
    feedbacks.push(
      ...this.networkScenarioHandler.validate(
        submitConfig,
        requirements.network,
      ),
    );

    return {
      result: Object.keys(mismatchedConfigs).length === 0 ? 'PASS' : 'FAIL',
      feedback: feedbacks,
    };
  }

  private normalizeConfig(
    config: ServiceConfigTypes,
    serviceKey: string,
  ): ServiceConfigTypes {
    const refined = removeUndefined(config) as any;

    if (serviceKey === 'routeTable') {
      if (Array.isArray(refined.routes)) {
        refined.routes.sort((a, b) =>
          (a.destinationCidr || '').localeCompare(b.destinationCidr || ''),
        );
      }
      if (Array.isArray(refined.associations)) {
        refined.associations.sort((a, b) =>
          (a.subnetId || '').localeCompare(b.subnetId || ''),
        );
      }
    } else if (serviceKey === 'securityGroups') {
      if (Array.isArray(refined.ipPermissions)) {
        refined.ipPermissions.sort((a, b) => {
          const check = (a.ipProtocol || '').localeCompare(b.ipProtocol || '');
          if (check !== 0) return check;

          const fromPortA = parseInt(a.fromPort || '0', 10);
          const fromPortB = parseInt(b.fromPort || '0', 10);
          const check2 = fromPortA - fromPortB;
          if (check2 !== 0) return check2;

          const toPortA = parseInt(a.toPort || '0', 10);
          const toPortB = parseInt(b.toPort || '0', 10);
          return toPortA - toPortB;
        });
      }
    } else if (serviceKey === 's3') {
      if (Array.isArray(refined.tags)) {
        refined.tags.sort((a, b) => (a.key || '').localeCompare(b.key || ''));
      }
    } else if (serviceKey === 'nacl') {
      if (Array.isArray(refined.entries)) {
        refined.entries.sort((a, b) => {
          const numA = parseInt(a.ruleNumber || '0', 10);
          const numB = parseInt(b.ruleNumber || '0', 10);
          return numA - numB;
        });
      }
    } else if (serviceKey === 'cloudFront') {
      if (Array.isArray(refined.cnames)) {
        refined.cnames.sort();
      }
    }

    return refined;
  }

  private diffServiceConfigs(
    answerConfigs: ServiceConfigTypes[],
    solutionConfigs: ServiceConfigTypes[],
    serviceKey: string,
  ): {
    onlyInAnswer: ServiceConfigTypes[];
    onlyInSolution: ServiceConfigTypes[];
  } {
    const refinedAnswerConfigs = answerConfigs.map((config) =>
      this.normalizeConfig(config, serviceKey),
    );
    const normalizedSolutionConfigs = solutionConfigs.map((config) =>
      this.normalizeConfig(config, serviceKey),
    );

    const matchedAnswerIndices = new Set<number>();
    const matchedSolutionIndices = new Set<number>();

    for (let i = 0; i < refinedAnswerConfigs.length; i++) {
      for (let j = 0; j < normalizedSolutionConfigs.length; j++) {
        if (matchedAnswerIndices.has(i)) break;
        if (matchedSolutionIndices.has(j)) continue;

        if (
          this.isConfigMatch(
            refinedAnswerConfigs[i],
            normalizedSolutionConfigs[j],
            serviceKey,
          )
        ) {
          matchedAnswerIndices.add(i);
          matchedSolutionIndices.add(j);
        }
      }
    }

    return {
      onlyInAnswer: refinedAnswerConfigs.filter(
        (_, i) => !matchedAnswerIndices.has(i),
      ),
      onlyInSolution: normalizedSolutionConfigs.filter(
        (_, i) => !matchedSolutionIndices.has(i),
      ),
    };
  }

  private isConfigMatch(
    answer: ServiceConfigTypes,
    solution: ServiceConfigTypes,
    serviceKey: string,
  ): boolean {
    const isNetworkResource = serviceKey === 'vpc' || serviceKey === 'subnet';
    const hasCidr = 'cidrBlock' in answer && 'cidrBlock' in solution;

    if (isNetworkResource && hasCidr) {
      return this.isVPCorSubnetConfigMatch(answer, solution);
    }

    if (serviceKey === 'routeTable') {
      // normalizeConfig가 이미 적용되어 있으므로 바로 비교
      return this.isDeepEqual(answer, solution);
    }

    return this.isDeepEqual(answer, solution);
  }

  private isVPCorSubnetConfigMatch(
    answer: VPCConfig | SubnetConfig,
    solution: VPCConfig | SubnetConfig,
  ): boolean {
    const { cidrBlock: answerCidr, ...answerRest } = answer;
    const { cidrBlock: solutionCidr, ...solutionRest } = solution;

    if (!answerCidr) {
      return false;
    }
    if (!solutionCidr) {
      return false;
    }

    // 1. CIDR 검증 (포함 관계 확인)
    if (
      solutionCidr !== 'DONT_CARE' &&
      !containsCidr(solutionCidr, answerCidr)
    ) {
      return false;
    }

    // 2. 나머지 필드 검증
    return this.isDeepEqual(answerRest, solutionRest);
  }

  private generateFeedbacks(
    validationInfo: UnitProblemValidateResult,
  ): FeedbackDto[] {
    const feedbacks: FeedbackDto[] = [];
    for (const [serviceKey, entry] of Object.entries(validationInfo)) {
      if (!entry) continue;
      const { onlyInAnswer, onlyInSolution } = entry;

      // 1. 서비스 누락 (Service Missing)
      feedbacks.push(
        ...this.createServiceMissingFeedbacks(
          onlyInAnswer,
          onlyInSolution,
          serviceKey,
        ),
      );

      const solutionMap = new Map<string, ServiceConfigTypes>();
      for (const config of onlyInSolution) {
        if ('name' in config) {
          solutionMap.set(config.name, config);
        }
      }

      for (const submittedConfig of onlyInAnswer) {
        if (!hasName(submittedConfig)) continue;
        const matchedSolution = solutionMap.get(submittedConfig.name);

        if (!matchedSolution) {
          feedbacks.push({
            serviceType: serviceKey,
            service: submittedConfig.name,
            code: UnitProblemFeedbackType.SERVICE_MISSING,
            message: '제출한 이름을 다시 한 번 확인해주세요.',
          });
          continue;
        }

        // 2. 필드 누락 (Field Missing)
        feedbacks.push(
          ...this.createFieldMissingFeedbacks(
            submittedConfig,
            matchedSolution,
            serviceKey,
          ),
        );

        // 3. 불필요한 필드 (Unnecessary Field)
        feedbacks.push(
          ...this.createUnnecessaryFieldFeedbacks(
            submittedConfig,
            matchedSolution,
            serviceKey,
          ),
        );

        // 4. 값 불일치 (Incorrect Value)
        feedbacks.push(
          ...this.createIncorrectValueFeedbacks(
            submittedConfig,
            matchedSolution,
            serviceKey,
          ),
        );
      }
    }
    return feedbacks;
  }

  private createServiceMissingFeedbacks(
    onlyInAnswer: ServiceConfigTypes[],
    onlyInSolution: ServiceConfigTypes[],
    serviceKey: string,
  ): FeedbackDto[] {
    const refinedAnswerConfigs = onlyInAnswer.map((config) =>
      removeUndefined(config),
    );
    const count = onlyInSolution.length - refinedAnswerConfigs.length;
    if (count <= 0) return [];

    return [
      {
        serviceType: serviceKey,
        code: UnitProblemFeedbackType.SERVICE_MISSING,
        message: feedbackMessages[UnitProblemFeedbackType.SERVICE_MISSING](
          serviceKey,
          `${count}개의 서비스 설정이 누락되었습니다.`,
        ),
      },
    ];
  }

  private createFieldMissingFeedbacks(
    submitted: ServiceConfigTypes,
    solution: ServiceConfigTypes,
    serviceKey: string,
  ): FeedbackDto[] {
    const solutionKeys = Object.keys(solution);

    const refinedSubmitted: ServiceConfigTypes = removeUndefined(submitted);
    const refinedSubmittedKeys = Object.keys(refinedSubmitted);

    const onlyInSolutionKeys = solutionKeys.filter(
      (key) => !refinedSubmittedKeys.includes(key),
    );
    if (onlyInSolutionKeys.length === 0) return [];

    const serviceName = hasName(submitted) ? submitted.name : undefined;

    return onlyInSolutionKeys.map((field) => ({
      serviceType: serviceKey,
      service: serviceName,
      field,
      code: UnitProblemFeedbackType.FIELD_MISSING,
      message: feedbackMessages[UnitProblemFeedbackType.FIELD_MISSING](
        serviceKey,
        field,
      ),
    }));
  }

  private createUnnecessaryFieldFeedbacks(
    submitted: ServiceConfigTypes,
    solution: ServiceConfigTypes,
    serviceKey: string,
  ): FeedbackDto[] {
    const refindedSubmitted: ServiceConfigTypes = removeUndefined(submitted);
    const refindedSubmittedKeys = Object.keys(refindedSubmitted);
    const solutionKeys = Object.keys(solution);

    const onlyInSumbittedKeys = refindedSubmittedKeys.filter(
      (key) => !solutionKeys.includes(key),
    );

    if (onlyInSumbittedKeys.length === 0) return [];

    const serviceName = hasName(submitted) ? submitted.name : undefined;

    return onlyInSumbittedKeys.map((field) => ({
      serviceType: serviceKey,
      service: serviceName,
      field,
      code: UnitProblemFeedbackType.UNNECESSARY,
      message: feedbackMessages[UnitProblemFeedbackType.UNNECESSARY](
        serviceKey,
        field,
      ),
    }));
  }

  private createIncorrectValueFeedbacks(
    submitted: ServiceConfigTypes,
    solution: ServiceConfigTypes,
    serviceKey: string,
  ): FeedbackDto[] {
    const refindedSubmitted: ServiceConfigTypes = removeUndefined(submitted);
    const refindedSubmittedKeys = Object.keys(refindedSubmitted);
    const solutionKeys = Object.keys(solution);
    const commonKeys = refindedSubmittedKeys.filter((key) =>
      solutionKeys.includes(key),
    );
    const incorrectFields: string[] = [];

    const isNetworkResource = serviceKey === 'vpc' || serviceKey === 'subnet';

    for (const key of commonKeys) {
      if (
        isNetworkResource &&
        key === 'cidrBlock' &&
        hasCidrBlock(refindedSubmitted) &&
        hasCidrBlock(solution)
      ) {
        const subCidr = refindedSubmitted.cidrBlock;
        const solCidr = solution.cidrBlock;

        if (solCidr === 'DONT_CARE' || containsCidr(solCidr, subCidr)) {
          continue;
        }
      }

      // 순서 무관 비교를 위한 전처리 로직 제거 (이미 normalizeConfig 적용됨)
      if (!this.isDeepEqual(refindedSubmitted[key], solution[key])) {
        incorrectFields.push(key);
      }
    }

    const serviceName = hasName(refindedSubmitted)
      ? refindedSubmitted.name
      : undefined;

    return incorrectFields.map((field) => ({
      serviceType: serviceKey,
      service: serviceName,
      field,
      code: UnitProblemFeedbackType.INCORRECT,
      message: feedbackMessages[UnitProblemFeedbackType.INCORRECT](
        serviceKey,
        field,
      ),
    }));
  }

  private isDeepEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) return true;
    if (obj2 === 'DONT_CARE') return true;

    if (obj1 === null || obj2 === null || typeof obj1 !== typeof obj2) {
      return false;
    }

    if (typeof obj1 !== 'object') {
      return false;
    }

    if (obj1 instanceof Date && obj2 instanceof Date) {
      return obj1.getTime() === obj2.getTime();
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;
      return obj1.every((item, index) => this.isDeepEqual(item, obj2[index]));
    }

    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const o1 = removeUndefined(obj1) as Record<string, unknown>;
    const o2 = removeUndefined(obj2) as Record<string, unknown>;
    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => {
      if (!Object.prototype.hasOwnProperty.call(o2, key)) return false;
      return this.isDeepEqual(o1[key], o2[key]);
    });
  }
}
