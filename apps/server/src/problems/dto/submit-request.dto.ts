import { IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigDto {
  @IsObject()
  configInfo: Record<string, any>;
}

export class SubmitRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConfigDto)
  submitConfig: ConfigDto[];
}

export class NetworkTask {
  source: unknown;
  destination: unknown;
  protocol: unknown;
}

export class NetworkTestRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NetworkTask)
  submitConfig: ConfigDto[];

  @IsObject()
  networkTask: NetworkTask;
}
