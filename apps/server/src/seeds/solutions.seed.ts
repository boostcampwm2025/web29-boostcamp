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

  const vpcDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    cidrBlock: 'DONT_CARE',
    tenancy: 'DONT_CARE',
  };

  const subnetDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
    cidrBlock: 'DONT_CARE',
    availabilityZone: 'DONT_CARE',
  };

  const internetGatewayDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
  };

  const natGatewayDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
    subnetId: 'DONT_CARE',
    subnetName: 'DONT_CARE',
  };

  const routeTableDontCareConfig = {
    id: 'DONT_CARE',
    name: 'DONT_CARE',
    vpcId: 'DONT_CARE',
    vpcName: 'DONT_CARE',
    routes: 'DONT_CARE',
    associations: 'DONT_CARE',
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
            name: 'versioning-bucket', // 필수 조건
            versioningEnabled: true, // 필수 조건
          },
        ],
      },
    },

    {
      problem: problems[2], // 웹 서버용 EC2 인스턴스 생성 (was 3)
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'default-vpc',
            name: 'default-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'default-subnet',
            name: 'default-subnet',
            vpcId: 'default-vpc',
            vpcName: 'default-vpc',
            cidrBlock: '10.0.1.0/24',
            availabilityZone: 'us-east-1a',
          },
        ],
        ec2: [
          {
            ...ec2DontCareConfig,
            name: 'web-server-instance', // 필수 조건
            instanceType: 't2.micro', // 필수 조건
            vpcId: 'default-vpc',
            vpcName: 'default-vpc',
            subnetId: 'default-subnet',
            subnetName: 'default-subnet',
          },
        ],
      },
    },

    {
      problem: problems[3], // EC2 보안 그룹 HTTP 포트 열기
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'default-vpc',
            name: 'default-vpc',
          },
        ],
        securityGroups: [
          {
            ...securityGroupsDontCareConfig,
            name: 'web-server-sg',
            vpcId: 'default-vpc',
            vpcName: 'default-vpc',
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
      problem: problems[4], // [가장 단순한 서버 배포] 1단계: VPC 구축
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
      },
    },
    {
      problem: problems[5], // [가장 단순한 서버 배포] 2단계: IGW 생성 및 연결
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
      },
    },
    {
      problem: problems[6], // [가장 단순한 서버 배포] 3단계: 퍼블릭 서브넷 구성
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
      },
    },

    {
      problem: problems[7], // [가장 단순한 서버 배포] 4단계: 인터넷 경로 설정 및 서브넷 연결
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        routeTable: [
          {
            ...routeTableDontCareConfig,
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
      problem: problems[8], // [가장 단순한 서버 배포] 5단계: EC2 인스턴스 실행
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'cloud-craft-igw',
            name: 'cloud-craft-igw',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        routeTable: [
          {
            ...routeTableDontCareConfig,
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
      problem: problems[9], // NAT 게이트웨이 생성
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'cloud-craft-vpc',
            name: 'cloud-craft-vpc',
            cidrBlock: '10.0.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'cloud-craft-public-subnet',
            name: 'cloud-craft-public-subnet',
            vpcId: 'cloud-craft-vpc',
            vpcName: 'cloud-craft-vpc',
            cidrBlock: '10.0.1.0/24',
          },
        ],
        natGateway: [
          {
            ...natGatewayDontCareConfig,
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
      problem: problems[10], // 보안 그룹 생성 및 인바운드 규칙 설정
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
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
      problem: problems[11], // 1단계: 사용자 지정 VPC
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
      },
    },
    {
      problem: problems[12], // 2단계: 서브넷 분리
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            ...subnetDontCareConfig,
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
      problem: problems[13], // 3단계: IGW 구성
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            ...subnetDontCareConfig,
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
      },
    },
    {
      problem: problems[14], // 4단계: 퍼블릭 라우팅
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            ...subnetDontCareConfig,
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        routeTable: [
          {
            ...routeTableDontCareConfig,
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
      problem: problems[15], // 5단계: NAT & 프라이빗 라우팅
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            ...subnetDontCareConfig,
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        natGateway: [
          {
            ...natGatewayDontCareConfig,
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
            ...routeTableDontCareConfig,
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
            ...routeTableDontCareConfig,
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
      problem: problems[16], // 6단계: 보안 그룹 & EC2
      answerConfig: {
        vpc: [
          {
            ...vpcDontCareConfig,
            id: 'secure-vpc',
            name: 'secure-vpc',
            cidrBlock: '10.1.0.0/16',
            tenancy: 'default',
          },
        ],
        subnet: [
          {
            ...subnetDontCareConfig,
            id: 'secure-public-subnet',
            name: 'secure-public-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.1.0/24',
          },
          {
            ...subnetDontCareConfig,
            id: 'secure-private-subnet',
            name: 'secure-private-subnet',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
            cidrBlock: '10.1.2.0/24',
          },
        ],
        internetGateway: [
          {
            ...internetGatewayDontCareConfig,
            id: 'secure-igw',
            name: 'secure-igw',
            vpcId: 'secure-vpc',
            vpcName: 'secure-vpc',
          },
        ],
        natGateway: [
          {
            ...natGatewayDontCareConfig,
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
            ...routeTableDontCareConfig,
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
            ...routeTableDontCareConfig,
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
            securityGroups: ['secure-web-sg'],
          },
        ],
      },
    },
    // Solutions for High Availability Cookbook (Multi-AZ)
    {
      problem: problems[17], // 1단계: HA VPC
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
      problem: problems[18], // 2단계: Multi-AZ Subnets
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
      problem: problems[19], // 3단계: IGW
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
      problem: problems[20], // 4단계: Unified Routing
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
      problem: problems[21], // 5단계: Web SG
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
      problem: problems[22], // 6단계: Dual Deployment
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
            securityGroups: ['ha-web-sg'],
          },
          {
            ...ec2DontCareConfig,
            id: 'ha-web-2',
            name: 'ha-web-2',
            vpcId: 'ha-vpc',
            vpcName: 'ha-vpc',
            subnetId: 'ha-subnet-c',
            subnetName: 'ha-subnet-c',
            securityGroups: ['ha-web-sg'],
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
