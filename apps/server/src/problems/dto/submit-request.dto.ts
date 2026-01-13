import { IsArray, ValidateNested, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigDto {
  @IsString()
  configType: string;

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

export class ScenarioSubmitRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NetworkTask)
  submitConfig: ConfigDto[];

  @IsObject()
  networkTask: NetworkTask;
}
