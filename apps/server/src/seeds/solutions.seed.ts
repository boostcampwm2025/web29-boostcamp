import { DataSource } from 'typeorm';
import { Solution } from '../entities/solution.entity';
import { Problem } from '../entities/problem.entity';

export async function seedSolutions(dataSource: DataSource): Promise<void> {
  const solutionRepository = dataSource.getRepository(Solution);
  const problemRepository = dataSource.getRepository(Problem);

  const problems = await problemRepository.find({
    order: { id: 'ASC' },
  });

  if (problems.length < 5) {
    console.log('Not enough problems found. Skipping solution seeding.');
    return;
  }

  // Common DONT_CARE Templates
  const s3DontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    region: 'DONT_CARE',
    aclEnabled: 'DONT_CARE',
    ownershipModel: 'DONT_CARE',
    blockAll: 'DONT_CARE',
    blockPublicAcls: 'DONT_CARE',
    ignorePublicAcls: 'DONT_CARE',
    blockPublicPolicy: 'DONT_CARE',
    objectLockEnabled: 'DONT_CARE',
    restrictPublicBuckets: 'DONT_CARE',
    encryptionType: 'DONT_CARE',
    versioningEnabled: 'DONT_CARE',
    tags: 'DONT_CARE',
  };

  const securityGroupsDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    description: 'DONT_CARE',
    ipPermissions: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
  };

  const ec2DontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
    subnetId: 'DONT_CARE',
    subnetName: 'DONT_CARE',
    osType: 'DONT_CARE',
    instanceType: 'DONT_CARE',
    keyName: 'DONT_CARE',
    autoAssignPublicIp: 'DONT_CARE',
    allowSSH: 'DONT_CARE',
    allowHTTPS: 'DONT_CARE',
    allowHTTP: 'DONT_CARE',
    storageSize: 'DONT_CARE',
    volumeType: 'DONT_CARE',
    userData: 'DONT_CARE',
    securityGroups: 'DONT_CARE',
  };

  const cloudFrontDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    originType: 'DONT_CARE',
    selectedBucket: 'DONT_CARE',
    customDomain: 'DONT_CARE',
    originPath: 'DONT_CARE',
    accessControl: 'DONT_CARE',
    oacName: 'DONT_CARE',
    distributionName: 'DONT_CARE',
    description: 'DONT_CARE',
    enabled: 'DONT_CARE',
    priceClass: 'DONT_CARE',
    cnames: 'DONT_CARE',
    sslCertificate: 'DONT_CARE',
    acmCertificateArn: 'DONT_CARE',
    minTlsVersion: 'DONT_CARE',
    ipv6Enabled: 'DONT_CARE',
    viewerProtocolPolicy: 'DONT_CARE',
    allowedMethods: 'DONT_CARE',
    cachePolicy: 'DONT_CARE',
    managedPolicyName: 'DONT_CARE',
    customTTL: 'DONT_CARE',
    compressionEnabled: 'DONT_CARE',
    viewerRequestFunction: 'DONT_CARE',
    viewerResponseFunction: 'DONT_CARE',
    defaultRootObject: 'DONT_CARE',
    errorResponses: 'DONT_CARE',
    loggingEnabled: 'DONT_CARE',
    loggingBucket: 'DONT_CARE',
    logPrefix: 'DONT_CARE',
    wafEnabled: 'DONT_CARE',
    webAclId: 'DONT_CARE',
  };

  const solutions = [
    {
      problem: problems[0], // 로그 저장용 S3 버킷 생성
      answerConfig: {
        s3: [
          {
            ...s3DontCareConfig,
            name: 'my-log-bucket', // 필수 조건
          },
        ],
      },
    },
    {
      problem: problems[1], // S3 버킷 버전 관리 활성화
      answerConfig: {
        s3: [
          {
            ...s3DontCareConfig,
            versioningEnabled: true, // 필수 조건
          },
        ],
      },
    },
    {
      problem: problems[2], // CloudFront 원본 설정
      answerConfig: {
        cloudFront: [
          {
            ...cloudFrontDontCareConfig,
            originType: 's3',
            // originDomain 관련 필드는 현재 프론트 DTO와 매칭 필요 (임시로 DONT_CARE 유지)
          },
        ],
      },
    },
    {
      problem: problems[3], // 웹 서버용 EC2 인스턴스 생성
      answerConfig: {
        ec2: [
          {
            ...ec2DontCareConfig,
            instanceType: 't2.micro', // 필수 조건
          },
        ],
      },
    },
    {
      problem: problems[4], // 정적 웹사이트 글로벌 배포 (S3 + CloudFront)
      answerConfig: {
        s3: [
          {
            ...s3DontCareConfig,
            name: 'my-global-site', // 문제의 필수 조건
          },
        ],
        cloudFront: [
          {
            ...cloudFrontDontCareConfig,
            originType: 's3',
          },
        ],
      },
    },
    {
      problem: problems[5], // S3 버킷 생성하기 (Unit)
      answerConfig: {
        s3: [
          {
            ...s3DontCareConfig, // 특별한 조건 없음 (기본 생성)
          },
        ],
      },
    },
    {
      problem: problems[6], // EC2 인스턴스 생성하기 (Unit)
      answerConfig: {
        ec2: [
          {
            ...ec2DontCareConfig, // 특별한 조건 없음 (기본 생성)
          },
        ],
      },
    },
    {
      problem: problems[14], // [가장 단순한 서버 배포] 1단계: VPC 구축
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
      },
    },
    {
      problem: problems[15], // [가장 단순한 서버 배포] 2단계: IGW 생성 및 연결
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
      },
    },
    {
      problem: problems[16], // [가장 단순한 서버 배포] 3단계: 퍼블릭 서브넷 구성
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        internetGateway: [
          {
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
      },
    },

    {
      problem: problems[17], // [가장 단순한 서버 배포] 4단계: 인터넷 경로 설정 및 서브넷 연결
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
        subnet: [
          {
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        routeTable: [
          {
            id: 'cloud-craft-public-rt',
            name: 'cloud-craft-public-rt',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'cloud-craft-igw',
                targetGatewayName: 'cloud-craft-igw',
              },
              {
                destinationCidr: '10.0.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'cloud-craft-public-subnet',
                subnetName: 'cloud-craft-public-subnet',
              },
            ],
          },
        ],
      },
    },
    {
      problem: problems[18], // [가장 단순한 서버 배포] 5단계: EC2 인스턴스 실행
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
        subnet: [
          {
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        routeTable: [
          {
            id: 'cloud-craft-public-rt',
            name: 'cloud-craft-public-rt',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'cloud-craft-igw',
                targetGatewayName: 'cloud-craft-igw',
              },
              {
                destinationCidr: '10.0.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'cloud-craft-public-subnet',
                subnetName: 'cloud-craft-public-subnet',
              },
            ],
          },
        ],
        ec2: [
          {
            ...ec2DontCareConfig,
            id: 'cloud-craft-web-server',
            name: 'cloud-craft-web-server',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            subnetId: 'cloud-craft-public-subnet',
            subnetName: 'cloud-craft-public-subnet',
            osType: 'amazon-linux',
          },
        ],
      },
    },
    {
      problem: problems[19], // NAT 게이트웨이 생성
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        natGateway: [
          {
            id: 'cloud-craft-nat',
            name: 'cloud-craft-nat',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            subnetId: 'cloud-craft-public-subnet',
            subnetName: 'cloud-craft-public-subnet',
          },
        ],
      },
    },
    {
      problem: problems[20], // 보안 그룹 생성 및 인바운드 규칙 설정
      answerConfig: {
        vpc: [
          {
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        securityGroups: [
          {
            ...securityGroupsDontCareConfig,
            id: 'web-server-sg',
            name: 'web-server-sg',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            ipPermissions: [
              {
                ipProtocol: 'tcp',
                fromPort: '80',
                toPort: '80',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
              },
              {
                ipProtocol: 'tcp',
                fromPort: '22',
                toPort: '22',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
              },
            ],
          },
        ],
      },
    },
    // Solutions for Advanced Cookbook (Secure Network)
    {
      problem: problems[21], // 1단계: 사용자 지정 VPC
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
      },
    },
    {
      problem: problems[22], // 2단계: 서브넷 분리
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
      },
    },
    {
      problem: problems[23], // 3단계: IGW 구성
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
      },
    },
    {
      problem: problems[24], // 4단계: 퍼블릭 라우팅
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        routeTable: [
          {
            id: 'secure-public-rt',
            name: 'secure-public-rt',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'secure-igw',
                targetGatewayName: 'secure-igw',
              },
              {
                destinationCidr: '10.1.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'secure-public-subnet',
                subnetName: 'secure-public-subnet',
              },
            ],
          },
        ],
      },
    },
    {
      problem: problems[25], // 5단계: NAT & 프라이빗 라우팅
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        natGateway: [
          {
            id: 'secure-nat',
            name: 'secure-nat',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            subnetId: 'secure-public-subnet',
            subnetName: 'secure-public-subnet',
          },
        ],
        routeTable: [
          {
            // Public RT check (to ensure it persists)
            id: 'secure-public-rt',
            name: 'secure-public-rt',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'secure-igw',
                targetGatewayName: 'secure-igw',
              },
              {
                destinationCidr: '10.1.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'secure-public-subnet',
                subnetName: 'secure-public-subnet',
              },
            ],
          },
          {
            id: 'secure-private-rt',
            name: 'secure-private-rt',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'secure-nat', // Targets NAT
                targetGatewayName: 'secure-nat',
              },
              {
                destinationCidr: '10.1.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'secure-private-subnet',
                subnetName: 'secure-private-subnet',
              },
            ],
          },
        ],
      },
    },
    {
      problem: problems[26], // 6단계: 보안 그룹 & EC2
      answerConfig: {
        vpc: [
          {
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        natGateway: [
          {
            id: 'secure-nat',
            name: 'secure-nat',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            subnetId: 'secure-public-subnet',
            subnetName: 'secure-public-subnet',
          },
        ],
        routeTable: [
          {
            // Public RT check (to ensure it persists)
            id: 'secure-public-rt',
            name: 'secure-public-rt',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'secure-igw',
                targetGatewayName: 'secure-igw',
              },
              {
                destinationCidr: '10.1.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'secure-public-subnet',
                subnetName: 'secure-public-subnet',
              },
            ],
          },
          {
            id: 'secure-private-rt',
            name: 'secure-private-rt',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'secure-nat', // Targets NAT
                targetGatewayName: 'secure-nat',
              },
              {
                destinationCidr: '10.1.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'secure-private-subnet',
                subnetName: 'secure-private-subnet',
              },
            ],
          },
        ],
        securityGroups: [
          {
            ...securityGroupsDontCareConfig,
            id: 'secure-web-sg',
            name: 'secure-web-sg',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            ipPermissions: [
              {
                ipProtocol: 'tcp',
                fromPort: '80',
                toPort: '80',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
              },
            ],
          },
        ],
        ec2: [
          {
            ...ec2DontCareConfig,
            id: 'secure-db-server',
            name: 'secure-db-server',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            subnetId: 'secure-private-subnet',
            subnetName: 'secure-private-subnet',
          },
        ],
      },
    },
    // Solutions for High Availability Cookbook (Multi-AZ)
    {
      problem: problems[27], // 1단계: HA VPC
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
      },
    },
    {
      problem: problems[28], // 2단계: Multi-AZ Subnets
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'ha-subnet-a',
            name: 'ha-subnet-a',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.1.0/24',
            availabilityZone: 'us-east-1a',
          },
          {
            id: 'ha-subnet-c',
            name: 'ha-subnet-c',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.2.0/24',
            availabilityZone: 'us-east-1c',
          },
        ],
      },
    },
    {
      problem: problems[29], // 3단계: IGW
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'ha-subnet-a',
            name: 'ha-subnet-a',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.1.0/24',
            availabilityZone: 'us-east-1a',
          },
          {
            id: 'ha-subnet-c',
            name: 'ha-subnet-c',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.2.0/24',
            availabilityZone: 'us-east-1c',
          },
        ],
        internetGateway: [
          {
            id: 'ha-igw',
            name: 'ha-igw',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
          },
        ],
      },
    },
    {
      problem: problems[30], // 4단계: Unified Routing
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            id: 'ha-igw',
            name: 'ha-igw',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
          },
        ],
        subnet: [
          {
            id: 'ha-subnet-a',
            name: 'ha-subnet-a',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.1.0/24',
            availabilityZone: 'us-east-1a',
          },
          {
            id: 'ha-subnet-c',
            name: 'ha-subnet-c',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.2.0/24',
            availabilityZone: 'us-east-1c',
          },
        ],
        routeTable: [
          {
            id: 'ha-public-rt',
            name: 'ha-public-rt',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'ha-igw',
                targetGatewayName: 'ha-igw',
              },
              {
                destinationCidr: '10.2.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'ha-subnet-a',
                subnetName: 'ha-subnet-a',
              },
              {
                subnetId: 'ha-subnet-c',
                subnetName: 'ha-subnet-c',
              },
            ],
          },
        ],
      },
    },
    {
      problem: problems[31], // 5단계: Web SG
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'ha-subnet-a',
            name: 'ha-subnet-a',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.1.0/24',
            availabilityZone: 'us-east-1a',
          },
          {
            id: 'ha-subnet-c',
            name: 'ha-subnet-c',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.2.0/24',
            availabilityZone: 'us-east-1c',
          },
        ],
        internetGateway: [
          {
            id: 'ha-igw',
            name: 'ha-igw',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
          },
        ],
        routeTable: [
          {
            id: 'ha-public-rt',
            name: 'ha-public-rt',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'ha-igw',
                targetGatewayName: 'ha-igw',
              },
              {
                destinationCidr: '10.2.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'ha-subnet-a',
                subnetName: 'ha-subnet-a',
              },
              {
                subnetId: 'ha-subnet-c',
                subnetName: 'ha-subnet-c',
              },
            ],
          },
        ],
        securityGroups: [
          {
            ...securityGroupsDontCareConfig,
            id: 'ha-web-sg',
            name: 'ha-web-sg',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            ipPermissions: [
              {
                ipProtocol: 'tcp',
                fromPort: '80',
                toPort: '80',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
              },
            ],
          },
        ],
      },
    },
    {
      problem: problems[32], // 6단계: Dual Deployment
      answerConfig: {
        vpc: [
          {
            id: 'ha-vpc',
            name: 'ha-vpc',
            cidrBlock: '10.2.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            id: 'ha-subnet-a',
            name: 'ha-subnet-a',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.1.0/24',
            availabilityZone: 'us-east-1a',
          },
          {
            id: 'ha-subnet-c',
            name: 'ha-subnet-c',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            cidrBlock: '10.2.2.0/24',
            availabilityZone: 'us-east-1c',
          },
        ],
        internetGateway: [
          {
            id: 'ha-igw',
            name: 'ha-igw',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
          },
        ],
        routeTable: [
          {
            id: 'ha-public-rt',
            name: 'ha-public-rt',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            routes: [
              {
                destinationCidr: '0.0.0.0/0',
                targetGatewayId: 'ha-igw',
                targetGatewayName: 'ha-igw',
              },
              {
                destinationCidr: '10.2.0.0/16',
                targetGatewayId: 'local',
                targetGatewayName: 'local',
              },
            ],
            associations: [
              {
                subnetId: 'ha-subnet-a',
                subnetName: 'ha-subnet-a',
              },
              {
                subnetId: 'ha-subnet-c',
                subnetName: 'ha-subnet-c',
              },
            ],
          },
        ],
        securityGroups: [
          {
            ...securityGroupsDontCareConfig,
            id: 'ha-web-sg',
            name: 'ha-web-sg',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            ipPermissions: [
              {
                ipProtocol: 'tcp',
                fromPort: '80',
                toPort: '80',
                cidrIp: '0.0.0.0/0',
                isInbound: true,
              },
            ],
          },
        ],
        ec2: [
          {
            ...ec2DontCareConfig,
            id: 'ha-web-1',
            name: 'ha-web-1',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            subnetId: 'ha-subnet-a',
            subnetName: 'ha-subnet-a',
          },
          {
            ...ec2DontCareConfig,
            id: 'ha-web-2',
            name: 'ha-web-2',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            subnetId: 'ha-subnet-c',
            subnetName: 'ha-subnet-c',
          },
        ],
      },
    },
  ];

  for (const solutionData of solutions) {
    if (!solutionData.problem) continue; // 문제 데이터가 없으면 스킵
    await solutionRepository.save(solutionData);
  }

  console.log('Solutions seeded successfully');
}
