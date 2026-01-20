import { IsArray, IsString } from 'class-validator';

// TODO: 각 서비스별 Config 타입 구체화하기

export class EC2Config {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  vpcId: string;

  @IsString()
  vpcName: string;

  @IsString()
  subnetId: string;
  @IsString()
  subnetName: string;

  @IsString()
  instanceType: string;

  @IsString({ each: true })
  securityGroups: string[]; // Security Group names
}

export class VPCConfig {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  cidrBlock: string;
}

export class SubnetConfig {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  vpcId: string;

  @IsString()
  vpcName: string;

  @IsString()
  cidrBlock: string;
}

export class SecurityGroupsConfig {
  @IsString()
  id: string;
  @IsString()
  vpcId: string;
  @IsString()
  vpcName: string;
  @IsString()
  name: string;
}

export class S3Config {
  @IsString()
  id: string;

  @IsString()
  name: string;
}

export class InternetGatewayConfig {
  @IsString()
  id: string;
  @IsString()
  vpcId: string;
  @IsString()
  name: string;
}

export type GatewayTypes = InternetGatewayConfig;

export class RouteTableEntry {
  @IsString()
  destinationCidr: string;
  @IsString()
  targetGatewayId: string;
}

export class RouteTableConfig {
  @IsString()
  id: string;
  @IsString()
  vpcId: string;
  @IsString()
  name: string;
  @IsArray()
  routes: RouteTableEntry[];
  @IsString({ each: true })
  associations: string[]; // Subnet IDs
}

export type ServiceConfigTypes =
  | EC2Config
  | VPCConfig
  | SubnetConfig
  | RouteTableConfig
  | SecurityGroupsConfig
  | S3Config
  | InternetGatewayConfig;
