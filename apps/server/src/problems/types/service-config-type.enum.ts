import { IsString } from 'class-validator';

// TODO: 각 서비스별 Config 타입 구체화하기

export class EC2Config {
  @IsString()
  id: string;
  @IsString()
  vpcId: string;

  @IsString()
  subnetId: string;

  @IsString()
  instanceType: string;
}

export class VPCConfig {
  @IsString()
  id: string;

  @IsString()
  cidrBlock: string;
}

export class SubnetConfig {
  @IsString()
  id: string;

  @IsString()
  vpcId: string;

  @IsString()
  cidrBlock: string;
}
