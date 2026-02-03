import { DataSource } from 'typeorm';
import { Problem } from '../entities/problem.entity';
import { ProblemType } from '../problems/types/problem-type.enum';
import { Tag } from '../entities/tag.entity';

export async function seedProblems(dataSource: DataSource): Promise<void> {
  const problemRepository = dataSource.getRepository(Problem);
  const tagRepository = dataSource.getRepository(Tag);

  // 태그 데이터 먼저 생성
  const tagNames = [
    'Storage',
    'S3',
    'CDN',
    'CloudFront',
    'Web Hosting',
    'Security',
    'Compute', // 추가
    'EC2', // 추가
    'Server', // 추가
    'Networking',
    'VPC',
  ];

  const tags: Tag[] = [];
  for (const name of tagNames) {
    let tag = await tagRepository.findOne({ where: { name } });
    if (!tag) {
      tag = await tagRepository.save({ name });
    }
    tags.push(tag);
  }

  // 태그 이름으로 찾기 편하게 Map 생성
  const tagMap = new Map(tags.map((tag) => [tag.name, tag]));

  const problems = [
    {
      problemType: ProblemType.UNIT,
      title: '로그 저장용 S3 버킷 생성',
      description: '애플리케이션 로그를 저장하기 위한 S3 버킷을 생성하세요.',
      descDetail: {
        overview:
          'S3는 높은 가용성과 내구성을 제공하는 객체 스토리지 서비스입니다. 로그 데이터를 안전하게 보관하기 위해 기본 설정으로 버킷을 생성해 봅니다.',
        requirements:
          '- 버킷 이름은 전역적으로 고유해야 합니다\n- 버킷 이름은 `my-log-bucket`으로 설정해주세요',
      },
      requiredFields: [
        {
          serviceName: 's3',
          serviceTask: 'bucketCreate',
          serviceSections: ['general', 'tags'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Storage')!, tagMap.get('S3')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'S3 버킷 버전 관리 활성화',
      description:
        '중요한 문서 파일을 저장할 버킷을 만들고 버전 관리를 활성화하세요.',
      descDetail: {
        overview:
          '버전 관리를 활성화하면 실수로 객체를 삭제하거나 덮어써도 이전 버전을 복구할 수 있습니다.',
        learningObjectives:
          '중요 문서나 백업 파일 저장 시 필수적인 버전 관리 설정 방법을 학습합니다.',
      },
      requiredFields: [
        {
          serviceName: 's3',
          serviceTask: 'bucketCreate',
          serviceSections: ['general', 'versioning'],
          fixedOptions: [],
        },
      ],
      tags: [
        tagMap.get('Storage')!,
        tagMap.get('S3')!,
        tagMap.get('Security')!,
      ],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'CloudFront 원본(Origin) 설정',
      description:
        'S3 버킷을 원본으로 하는 CloudFront 배포의 원본 설정을 구성하세요.',
      descDetail: {
        overview:
          'CloudFront는 전 세계 엣지 로케이션을 통해 콘텐츠를 빠르게 전송하는 CDN 서비스입니다.',
        requirements:
          '- S3 버킷을 원본으로 지정\n- 원본 액세스 제어(OAC)를 활성화하여 보안을 강화',
      },
      requiredFields: [
        {
          serviceName: 'cloudFront',
          serviceTask: 'originSettings',
          serviceSections: ['originDomain', 'originAccessControl'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('CDN')!, tagMap.get('CloudFront')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '웹 서버용 EC2 인스턴스 생성',
      description:
        '정적 웹사이트의 백엔드 API 서버를 위한 EC2 인스턴스를 생성하세요.',
      descDetail: {
        overview:
          'EC2는 안전하고 크기를 조정할 수 있는 컴퓨팅 파워를 클라우드에서 제공합니다.',
        requirements:
          '- 프리티어에서 사용 가능한 t2.micro 인스턴스를 생성\n- 기본 네트워크 설정을 구성',
      },
      requiredFields: [
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: [
            'nameTag',
            'ami',
            'instanceType',
            'networkSetting',
            'storage',
          ],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Compute')!, tagMap.get('EC2')!, tagMap.get('Server')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '정적 웹사이트 글로벌 배포 (S3 + CloudFront)',
      description:
        'S3 버킷을 생성하고 CloudFront CDN을 연결하여 웹사이트를 배포하세요.',
      descDetail: {
        overview:
          '단일 리전의 S3 버킷만으로는 전 세계 사용자에게 빠른 속도를 제공하기 어렵습니다.',
        learningObjectives:
          'CloudFront를 S3 앞단에 배치하여 성능을 최적화하고, OAC를 통해 보안을 강화하는 구성을 실습합니다.',
      },
      requiredFields: [
        {
          serviceName: 's3',
          serviceTask: 'bucketCreate',
          serviceSections: ['general'],
          fixedOptions: [],
        },
        {
          serviceName: 'cloudFront',
          serviceTask: 'originSettings',
          serviceSections: ['originDomain', 'originAccessControl'],
          fixedOptions: [],
        },
      ],
      tags: [
        tagMap.get('S3')!,
        tagMap.get('CloudFront')!,
        tagMap.get('CDN')!,
        tagMap.get('Web Hosting')!,
      ],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'S3 버킷 생성하기',
      description: '기본 설정으로 S3 버킷을 하나 생성하세요',
      descDetail: {
        overview:
          'S3는 객체 스토리지 서비스로, 데이터를 파일 단위로 저장하고 관리할 수 있습니다.',
        requirements:
          '특별한 설정 없이 기본 구성으로 S3 버킷을 하나 생성하는 것이 목표입니다. 생성한 버킷은 이후 문제에서 사용될 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 's3',
          serviceTask: 'bucketCreate',
          serviceSections: ['general', 'ownership', 'blockPublicAccess'],
        },
        {
          serviceName: 's3',
          serviceTask: 'bucketList',
          serviceSections: ['header', 'bucketTable', 'searchBar'],
        },
        {
          serviceName: 'cloudFront',
          serviceTask: 'websiteSettings',
          serviceSections: ['defaultRootObject'],
        },
      ],
      tags: [tagMap.get('Storage')!, tagMap.get('S3')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'VPC 생성하기',
      description: '기본 설정으로 VPC를 하나 생성하세요',
      descDetail: {
        overview: 'VPC는 가상 네트워크를 생성하고 관리할 수 있는 서비스입니다.',
        requirements:
          '특별한 설정 없이 기본 구성으로 VPC를 하나 생성하는 것이 목표입니다. 생성한 VPC는 이후 문제에서 사용될 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 'vpc',
          serviceTask: 'vpcCreate',
          serviceSections: ['nameTag', 'cidrBlock', 'tags', 'tenancy'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'EC2 보안 그룹 HTTP 포트 열기',
      description:
        '웹 서버 접근을 위해 보안 그룹에 HTTP(80) 포트를 열어주세요.',
      descDetail: {
        overview:
          '보안 그룹은 EC2 인스턴스의 가상 방화벽 역할을 합니다. 웹 서버를 외부에서 접근하려면 HTTP(80) 포트를 인바운드 규칙에 추가해야 합니다.',
        prerequisities:
          '- VPC가 이미 존재: default-vpc\n- EC2 인스턴스가 이미 존재: web-server',
        learningObjectives:
          '1. 보안 그룹의 역할 이해\n2. 인바운드 규칙 추가 방법\n3. 포트와 소스 IP 설정',
      },
      requiredFields: [
        {
          serviceName: 'ec2',
          serviceTask: 'securityGroupCreate',
          serviceSections: ['basicInfo', 'inboundRules'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'default-vpc',
              name: 'default-vpc',
            },
          ],
        },
      ],
      solution: {
        answerConfig: {
          securityGroups: [
            {
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
      requirements: {
        securityGroup: {
          'web-server-sg': {
            requireOpenPorts: [80],
          },
        },
      },
      tags: [tagMap.get('Security')!, tagMap.get('EC2')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'EC2 User Data로 nginx 웹서버 설정',
      description:
        'User Data 스크립트를 사용하여 EC2 인스턴스에 nginx를 자동 설치하세요.',
      descDetail: {
        overview:
          'EC2 인스턴스 시작 시 자동으로 nginx 웹서버를 설치하고 실행하는 User Data 스크립트를 작성하세요.',
        prerequisities:
          '- VPC와 퍼블릭 서브넷이 이미 존재합니다.\n- 보안 그룹에서 HTTP(80) 포트가 열려있습니다.',
        learningObjectives:
          '1. EC2 User Data 개념 이해\n2. 부트스트래핑을 통한 인스턴스 자동 구성\n3. Amazon Linux에서 nginx 설치 명령어',
        hint: '- Amazon Linux에서는 yum 패키지 매니저를 사용합니다.\n- systemctl 명령으로 서비스를 시작/활성화합니다.',
      },
      requiredFields: [
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: ['nameTag', 'ami', 'userData'],
          fixedOptions: [],
        },
      ],
      solution: {
        answerConfig: {
          ec2: [
            {
              name: 'web-server',
              osType: 'amazon-linux',
              userData: 'DONT_CARE',
            },
          ],
        },
      },
      requirements: {
        ec2: {
          'web-server': {
            requireUserData: true,
            userDataMustContain: ['nginx', 'yum install', 'systemctl start'],
          },
        },
      },
      tags: [tagMap.get('Compute')!, tagMap.get('EC2')!, tagMap.get('Server')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '퍼블릭 서브넷 생성하기',
      description: '기본 설정으로 퍼블릭 서브넷을 하나 생성하세요',
      descDetail: {
        overview:
          '서브넷은 VPC 내에서 IP 주소 범위를 나누어 네트워크를 구성하는 단위입니다.',
        requirements:
          '특별한 설정 없이 기본 구성으로 퍼블릭 서브넷을 하나 생성하는 것이 목표입니다. 생성한 서브넷은 이후 문제에서 사용될 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: [
            'nameTag',
            'vpcSelection',
            'cidrBlock',
            'availabilityZone',
            'publicPrivateSetting',
            'tags',
          ],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'default-vpc',
              name: 'default-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '라우트 테이블 생성하기',
      description: '기본 설정으로 라우트 테이블을 하나 생성하세요',
      descDetail: {
        overview:
          '라우트 테이블은 VPC 내에서 네트워크 트래픽의 경로를 정의하는 역할을 합니다.',
        requirements:
          '특별한 설정 없이 기본 구성으로 라우트 테이블을 하나 생성하는 것이 목표입니다. 생성한 라우트 테이블은 이후 문제에서 사용될 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableCreate',
          serviceSections: ['general'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'default-vpc',
              name: 'default-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 게이트웨이 생성하기',
      description: '기본 설정으로 인터넷 게이트웨이를 하나 생성하세요',
      descDetail: {
        overview:
          '인터넷 게이트웨이는 VPC와 인터넷 간의 통신을 가능하게 하는 서비스입니다.',
        requirements:
          '특별한 설정 없이 기본 구성으로 인터넷 게이트웨이를 하나 생성하는 것이 목표입니다. 생성한 인터넷 게이트웨이는 이후 문제에서 사용될 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayCreate',
          serviceSections: ['nameTag'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 게이트웨이 VPC에 연결하기',
      description: '인터넷 게이트웨이를 기존 VPC에 연결하세요',
      descDetail: {
        overview:
          '인터넷 게이트웨이를 VPC에 연결하면 해당 VPC 내의 리소스가 인터넷과 통신할 수 있습니다.',
        requirements:
          '기존에 생성된 인터넷 게이트웨이를 특정 VPC에 연결하는 것이 목표입니다.',
      },
      requiredFields: [
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayAttach',
          serviceSections: ['attachForm'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'default-vpc',
              name: 'default-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'internetGateway',
              id: 'default-igw',
              name: 'default-igw',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '퍼블릭 서브넷 라우트 테이블 연결하기',
      description: '퍼블릭 서브넷을 라우트 테이블에 연결하세요',
      descDetail: {
        overview:
          '서브넷을 라우트 테이블에 연결하면 해당 서브넷의 트래픽이 라우트 테이블의 규칙을 따르게 됩니다.',
        requirements:
          '기존에 생성된 퍼블릭 서브넷을 특정 라우트 테이블에 연결하는 것이 목표입니다.',
      },
      requiredFields: [
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableEdit',
          serviceSections: ['routes', 'subnetAssociations'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'default-vpc',
              name: 'default-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'public-subnet-1',
              name: 'public-subnet-1',
              vpcId: 'default-vpc',
              vpcName: 'default-vpc',
              cidrBlock: '10.0.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'routeTable',
              id: 'route-table-1',
              name: 'route-table-1',
              vpcId: 'default-vpc',
              vpcName: 'default-vpc',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '리전 내 가상 네트워크(VPC) 구축',
      description:
        '전체 서비스의 논리적 경계가 되는 가상 네트워크인 VPC를 생성합니다.',
      descDetail: {
        overview:
          'VPC(Virtual Private Cloud)는 AWS 계정 전용의 가상 네트워크입니다. AWS 클라우드 내에서 다른 고객의 네트워크와 논리적으로 완전히 격리된 공간을 제공하여, 여러분의 리소스를 안전하게 배치할 수 있는 터전이 됩니다.',
        requirements:
          '- 이름 태그: `cloud-craft-vpc`로 설정하세요.\n- IPv4 CIDR 블록: `10.0.0.0/16`을 입력하세요. 이는 약 65,000개의 프라이빗 IP 주소를 가질 수 있는 크기입니다.',
      },
      requiredFields: [
        {
          serviceName: 'vpc',
          serviceTask: 'vpcCreate',
          serviceSections: ['nameTag', 'cidrBlock'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 연결 관문(IGW) 생성 및 연결',
      description:
        'VPC와 인터넷을 연결하는 대문인 인터넷 게이트웨이를 생성하고 VPC에 부착합니다.',
      descDetail: {
        overview:
          "인터넷 게이트웨이(IGW)는 VPC 내부 리소스(예: EC2)와 인터넷 간의 통신을 가능하게 하는 창구입니다. IGW가 없으면 VPC 내의 서버들은 외부에서 접속할 수도, 외부로 데이터를 보낼 수도 없는 '고립된 섬'이 됩니다.",
        requirements:
          '- 이름 태그: `cloud-craft-igw`로 설정하세요.\n-VPC 연결: 앞서 생성한 `cloud-craft-vpc`를 선택하여 연결하세요',
      },
      requiredFields: [
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayCreate',
          serviceSections: ['nameTag'],
          fixedOptions: [],
        },
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayAttach',
          serviceSections: ['attachForm'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],

      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '외부 통신용 퍼블릭 서브넷 구성',
      description:
        'VPC의 넓은 IP 범위를 쪼개어 실제 서버를 배치할 하위 네트워크(서브넷)를 생성합니다.',
      descDetail: {
        overview:
          "서브넷(Subnet)은 VPC라는 아파트 단지 내의 '특정 동'과 같습니다. 전체 IP 범위를 용도에 맞게 나누어 관리함으로써 보안성과 효율성을 높일 수 있습니다. 여기서는 외부와 직접 통신할 수 있는 '퍼블릭 서브넷'으로 사용할 공간을 만듭니다.",
        requirements:
          '- 이름 태그: `cloud-craft-public-subnet`으로 설정하세요.\n- 대상 VPC: `cloud-craft-vpc`를 선택하세요.\n- IPv4 CIDR 블록: `10.0.1.0/24`를 입력하세요 (VPC 범위 내의 부분 집합).',
      },
      requiredFields: [
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: ['nameTag', 'vpcSelection', 'cidrBlock'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'internetGateway',
              id: 'cloud-craft-igw',
              name: 'cloud-craft-igw',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
            },
          ],
        },
      ],

      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 경로 설정 및 서브넷 연결',
      description:
        '트래픽의 이동 경로(지도)를 정의하는 라우트 테이블을 설정하여 인터넷으로 나가는 길을 뚫어줍니다.',
      descDetail: {
        overview:
          '라우트 테이블은 네트워크 트래픽이 어디로 가야 할지 알려주는 ‘안내 표지판’ 세트입니다.',
        requirements:
          "- 라우트 테이블 태그: 'cloud-craft-public-rt'로 설정하세요.\n- 라우트 규칙: '0.0.0.0/0' 목적지에 대해 대상 'cloud-craft-igw'를 추가하세요.\n- 서브넷 연결: 아까 만든 'cloud-craft-public-subnet'을 이 라우트 테이블에 연결하세요.",
        learningObjectives:
          '지금까지 만든 서브넷이 진짜 ‘퍼블릭’이 되려면, 라우트 테이블에서 "0.0.0.0/0(모든 인터넷 대역)으로 가려면 아까 만든 IGW로 가라"는 규칙을 추가하고 이를 서브넷에 연결해야 합니다.',
      },
      requiredFields: [
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableCreate',
          serviceSections: ['general'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
          ],
        },
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableEdit',
          serviceSections: ['routes', 'subnetAssociations'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'internetGateway',
              id: 'cloud-craft-igw',
              name: 'cloud-craft-igw',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
            },
            {
              _type: 'subnet',
              id: 'cloud-craft-public-subnet',
              name: 'cloud-craft-public-subnet',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
              cidrBlock: '10.0.1.0/24',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '웹 서버용 EC2 인스턴스 실행',
      description:
        '완성된 퍼블릭 인프라 위에 실제 웹 서비스를 제공할 가상 서버(EC2)를 올립니다.',
      descDetail: {
        overview:
          'EC2(Elastic Compute Cloud)는 클라우드에서 자유롭게 대여할 수 있는 가상 컴퓨터입니다.',
        requirements:
          "- 인스턴스 이름: 'cloud-craft-web-server'로 설정하세요.\n- AMI: 'Amazon Linux 2023 AMI'를 선택하세요.\n- 네트워크 설정: 'cloud-craft-vpc'와 'cloud-craft-public-subnet'을 선택하세요.",
        learningObjectives:
          '지금까지 정성껏 만든 네트워크(VPC)와 도로(Route Table), 대문(IGW)이 깔린 서브넷에 이 서버를 배치하면, 전 세계 사람들이 접속할 수 있는 서비스 인프라가 완성됩니다.',
      },
      requiredFields: [
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: ['nameTag', 'ami', 'networkSetting'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'internetGateway',
              id: 'cloud-craft-igw',
              name: 'cloud-craft-igw',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
            },
            {
              _type: 'subnet',
              id: 'cloud-craft-public-subnet',
              name: 'cloud-craft-public-subnet',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
              cidrBlock: '10.0.1.0/24',
            },
            {
              _type: 'routeTable',
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
      ],

      tags: [tagMap.get('Compute')!, tagMap.get('EC2')!],
    },
    {
      title: 'NAT 게이트웨이 생성',
      description:
        '프라이빗 서브넷의 리소스가 인터넷과 통신할 수 있도록 NAT 게이트웨이를 생성하세요.',
      type: ProblemType.UNIT,
      descDetail: {
        overview:
          'NAT(Network Address Translation) 게이트웨이는 프라이빗 서브넷에 위치한 인스턴스들이 인터넷과 통신할 수 있도록 해주는 서비스입니다.',
        requirements:
          "- NAT 게이트웨이 이름: 'cloud-craft-nat'로 설정하세요.\n- 대상 서브넷: 'cloud-craft-public-subnet'을 선택하세요.",
        learningObjectives:
          'NAT 게이트웨이는 퍼블릭 서브넷에 위치하며, 프라이빗 서브넷의 인스턴스들은 NAT 게이트웨이를 통해 인터넷으로 나갑니다.',
      },
      requiredFields: [
        {
          serviceName: 'natGateway',
          serviceTask: 'natGatewayCreate',
          serviceSections: ['general', 'subnet'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'cloud-craft-public-subnet',
              name: 'cloud-craft-public-subnet',
              vpcId: 'cloud-craft-vpc',
              vpcName: 'cloud-craft-vpc',
              cidrBlock: '10.0.1.0/24',
            },
          ],
        },
      ],
      tags: [tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '보안 그룹 생성 및 인바운드 규칙 설정',
      description:
        '웹 서버를 위한 보안 그룹을 생성하고 HTTP(80) 및 SSH(22) 포트를 허용하세요.',
      descDetail: {
        overview:
          '보안 그룹(Security Group)은 인스턴스에 대한 인바운드 및 아웃바운드 트래픽을 제어하는 가상 방화벽 역할을 합니다.',
        requirements: `- 보안 그룹 이름: \`web-server-sg\`로 설정하세요.
- VPC: \`cloud-craft-vpc\`를 선택하세요.
- 인바운드 규칙:
  - HTTP: TCP 프로토콜, 포트 80, 소스 0.0.0.0/0
  - SSH: TCP 프로토콜, 포트 22, 소스 0.0.0.0/0`,
      },
      requiredFields: [
        {
          serviceName: 'securityGroups',
          serviceTask: 'securityGroupsCreate',
          serviceSections: ['basicInfo', 'inboundRules'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'cloud-craft-vpc',
              name: 'cloud-craft-vpc',
              cidrBlock: '10.0.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],
      tags: [tagMap.get('Security')!, tagMap.get('EC2')!],
    },
    // New Advanced Cookbook Problems
    {
      problemType: ProblemType.UNIT,
      title: '사용자 지정 VPC 생성',
      description: '보안 네트워크 구축을 위한 전용 VPC를 생성합니다.',
      descDetail: {
        overview:
          '독립된 네트워크 환경을 구축하기 위해 새로운 VPC를 생성합니다. 이번에는 기본 대역이 아닌 우리가 설계한 특정 IP 대역을 사용합니다.',
        requirements:
          '- 이름 태그: `secure-vpc`로 설정하세요.\n- IPv4 CIDR 블록: `10.1.0.0/16`을 입력하세요. (기존 10.0.0.0/16과 구분)',
      },
      requiredFields: [
        {
          serviceName: 'vpc',
          serviceTask: 'vpcCreate',
          serviceSections: ['nameTag', 'cidrBlock'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '서브넷 분리 (Public & Private)',
      description:
        '외부 통신용 퍼블릭 서브넷과 내부 보호용 프라이빗 서브넷을 생성합니다.',
      descDetail: {
        overview:
          '보안 아키텍처의 핵심은 망 분리입니다. Public Subnet은 인터넷과 직접 통신하는 리소스가, Private Subnet은 인터넷에서 직접 접근할 수 없는 리소스가 위치하여 보안을 강화합니다.',
        requirements:
          "1. Public Subnet:\n   - 이름: 'secure-public-subnet'\n   - CIDR: '10.1.1.0/24'\n   - VPC: 'secure-vpc'\n2. Private Subnet:\n   - 이름: 'secure-private-subnet'\n   - CIDR: '10.1.2.0/24'\n   - VPC: 'secure-vpc'",
        learningObjectives:
          'Public Subnet에는 Load Balancer, NAT Gateway, Bastion Host가, Private Subnet에는 Web Server, DB가 위치하여 보안을 강화합니다.',
      },
      requiredFields: [
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: ['nameTag', 'vpcSelection', 'cidrBlock'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
          ],
        },
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: ['nameTag', 'vpcSelection', 'cidrBlock'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 게이트웨이 구성',
      description:
        'VPC가 인터넷과 통신할 수 있도록 인터넷 게이트웨이를 연결합니다.',
      descDetail: {
        overview:
          'VPC가 인터넷과 통신하기 위해 인터넷 게이트웨이를 생성하고 VPC에 연결합니다.',
        requirements:
          "- 이름: 'secure-igw'\n- VPC 연결: 'secure-vpc'에 연결하세요.",
      },
      requiredFields: [
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayCreate',
          serviceSections: ['nameTag'],
          fixedOptions: [],
        },
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayAttach',
          serviceSections: ['attachForm'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '퍼블릭 라우팅 설정',
      description:
        '퍼블릭 서브넷의 트래픽이 인터넷으로 나갈 수 있도록 라우팅을 설정합니다.',
      descDetail: {
        overview:
          '서브넷이 ‘퍼블릭’이 되려면 인터넷 게이트웨이(IGW)로 향하는 경로가 있어야 합니다.',
        requirements:
          "- 라우트 테이블 이름: 'secure-public-rt'\n- VPC: 'secure-vpc'\n- 라우트 추가: 대상 '0.0.0.0/0' -> 타겟 'secure-igw'\n- 서브넷 연결: 'secure-public-subnet' 연결",
      },
      requiredFields: [
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableCreate',
          serviceSections: ['general'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            // Step 2 & 3 Resources
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
          ],
        },
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableEdit',
          serviceSections: ['routes', 'subnetAssociations'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'NAT Gateway와 프라이빗 라우팅',
      description:
        '프라이빗 서브넷의 인스턴스가 안전하게 인터넷 접속(업데이트 등)을 할 수 있도록 NAT Gateway를 구성합니다.',
      descDetail: {
        overview:
          'Private Subnet의 서버도 OS 업데이트 등을 위해 인터넷 접속이 필요할 때가 있습니다. NAT Gateway를 사용하면, 외부에서는 서버로 직접 접근할 수 없지만(보안), 서버에서는 외부로 요청을 보낼 수 있습니다.',
        requirements:
          "1. NAT Gateway 생성:\n   - 이름: 'secure-nat'\n   - 위치: 'secure-public-subnet' (주의!)\n2. Private 라우트 테이블 구성:\n   - 이름: 'secure-private-rt'\n   - VPC: 'secure-vpc'\n   - 라우트 추가: 대상 '0.0.0.0/0' -> 타겟 'secure-nat'\n   - 서브넷 연결: 'secure-private-subnet' 연결",
        hint: 'NAT Gateway는 반드시 Public Subnet에 배치되어야 합니다.',
      },
      requiredFields: [
        {
          serviceName: 'natGateway',
          serviceTask: 'natGatewayCreate',
          serviceSections: ['general', 'subnet'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
            {
              _type: 'routeTable',
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
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableCreate',
          serviceSections: ['general'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
            {
              _type: 'routeTable',
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
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableEdit',
          serviceSections: ['routes', 'subnetAssociations'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'natGateway',
              id: 'secure-nat',
              name: 'secure-nat',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              subnetId: 'secure-public-subnet',
              subnetName: 'secure-public-subnet',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
            {
              _type: 'routeTable',
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
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '보안 그룹 및 EC2 배포',
      description:
        '보안 그룹을 설정하고 프라이빗 서브넷에 웹 서버를 배포합니다.',
      descDetail: {
        overview:
          '보안 그룹을 생성하고 프라이빗 서브넷에 EC2 인스턴스를 배포하여 보안성을 강화합니다.',
        requirements:
          "1. 보안 그룹 생성:\n   - 이름: 'secure-web-sg'\n   - VPC: 'secure-vpc'\n   - 인바운드 규칙: HTTP(80) 허용 (소스: 0.0.0.0/0)\n2. EC2 인스턴스 생성:\n   - 이름: 'secure-db-server' (프라이빗 DB 서버 역할 가정)\n   - 위치: 'secure-private-subnet'\n   - 보안 그룹: 'secure-web-sg' 선택",
      },
      requiredFields: [
        {
          serviceName: 'securityGroups',
          serviceTask: 'securityGroupsCreate',
          serviceSections: ['basicInfo', 'inboundRules'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
            {
              _type: 'routeTable',
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
              _type: 'routeTable',
              id: 'secure-private-rt',
              name: 'secure-private-rt',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              routes: [
                {
                  destinationCidr: '0.0.0.0/0',
                  targetGatewayId: 'secure-nat',
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
            {
              _type: 'natGateway',
              id: 'secure-nat',
              name: 'secure-nat',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              subnetId: 'secure-public-subnet',
              subnetName: 'secure-public-subnet',
            },
          ],
        },
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: ['nameTag', 'networkSetting', 'securityGroup'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'secure-vpc',
              name: 'secure-vpc',
              cidrBlock: '10.1.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'secure-public-subnet',
              name: 'secure-public-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.1.0/24',
            },
            {
              _type: 'subnet',
              id: 'secure-private-subnet',
              name: 'secure-private-subnet',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              cidrBlock: '10.1.2.0/24',
            },
            {
              _type: 'securityGroups',
              id: 'secure-web-sg',
              name: 'secure-web-sg',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              description: 'Security group for secure web server',
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
            {
              _type: 'internetGateway',
              id: 'secure-igw',
              name: 'secure-igw',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
            },
            {
              _type: 'routeTable',
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
              _type: 'routeTable',
              id: 'secure-private-rt',
              name: 'secure-private-rt',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              routes: [
                {
                  destinationCidr: '0.0.0.0/0',
                  targetGatewayId: 'secure-nat',
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
            {
              _type: 'natGateway',
              id: 'secure-nat',
              name: 'secure-nat',
              vpcId: 'secure-vpc',
              vpcName: 'secure-vpc',
              subnetId: 'secure-public-subnet',
              subnetName: 'secure-public-subnet',
            },
          ],
        },
      ],
      tags: [
        tagMap.get('Compute')!,
        tagMap.get('EC2')!,
        tagMap.get('Security')!,
      ],
    },
    {
      problemType: ProblemType.UNIT,
      title: 'HA 전용 VPC 생성',
      description: '고가용성 아키텍처 구축을 위한 기반 네트워크를 생성합니다.',
      descDetail: {
        overview:
          '고가용성(High Availability)은 시스템이 오랜 기간 동안 지속적으로 정상 운영 가능한 성질을 말합니다.',
        requirements:
          "- 이름 태그: 'ha-vpc'\n- IPv4 CIDR: '10.2.0.0/16' (새로운 대역 사용)",
        learningObjectives:
          '장애 격리 영역인 가용 영역(Available Zone)을 여러 개 사용하기 위한 전용 VPC를 생성합니다.',
      },
      requiredFields: [
        {
          serviceName: 'vpc',
          serviceTask: 'vpcCreate',
          serviceSections: ['nameTag', 'cidrBlock'],
          fixedOptions: [],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '멀티 AZ 서브넷 구성',
      description:
        '서로 다른 가용 영역(AZ)에 두 개의 서브넷을 생성하여 이중화 기반을 마련합니다.',
      descDetail: {
        overview:
          '하나의 데이터 센터(AZ)에 화재나 정전이 발생해도 서비스가 유지되려면, 리소스를 지리적으로 떨어진 두 개 이상의 AZ에 분산 배치해야 합니다.',
        requirements:
          "1. 서브넷 A (Zone A):\n   - 이름: 'ha-subnet-a'\n   - CIDR: '10.2.1.0/24'\n   - AZ: 'us-east-1a'\n   - VPC: 'ha-vpc'\n2. 서브넷 C (Zone C):\n   - 이름: 'ha-subnet-c'\n   - CIDR: '10.2.2.0/24'\n   - AZ: 'us-east-1c'\n   - VPC: 'ha-vpc'",
      },
      requiredFields: [
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: [
            'nameTag',
            'vpcSelection',
            'cidrBlock',
            'availabilityZone',
          ],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
          ],
        },
        {
          serviceName: 'subnet',
          serviceTask: 'subnetCreate',
          serviceSections: [
            'nameTag',
            'vpcSelection',
            'cidrBlock',
            'availabilityZone',
          ],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '인터넷 연결 설정',
      description:
        'HA VPC가 인터넷과 통신할 수 있도록 인터넷 게이트웨이를 연결합니다.',
      descDetail: {
        overview:
          'HA VPC가 인터넷과 통신하기 위해 인터넷 게이트웨이를 생성하고 VPC에 연결합니다.',
        requirements: "- 이름: 'ha-igw'\n- VPC 연결: 'ha-vpc'에 연결하세요.",
      },
      requiredFields: [
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayCreate',
          serviceSections: ['nameTag'],
          fixedOptions: [],
        },
        {
          serviceName: 'internetGateway',
          serviceTask: 'internetGatewayAttach',
          serviceSections: ['attachForm'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
          ],
        },
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '통합 라우팅 테이블 구성',
      description:
        '두 개의 서브넷이 하나의 라우트 테이블을 공유하여 인터넷에 연결되도록 설정합니다.',
      descDetail: {
        overview:
          '각 서브넷마다 라우트 테이블을 따로 만들 수도 있지만, 정책이 동일하다면(둘 다 퍼블릭이라면) 하나의 라우트 테이블을 공유하여 관리 효율을 높일 수 있습니다.',
        requirements:
          "- 이름: 'ha-public-rt'\n- VPC: 'ha-vpc'\n- 라우트: '0.0.0.0/0' -> 'ha-igw'\n- 서브넷 연결: 'ha-subnet-a' 와 'ha-subnet-c' 둘 다 연결하세요.",
      },
      requiredFields: [
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableCreate',
          serviceSections: ['general'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            // Step 2 & 3 Resources
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
            {
              _type: 'internetGateway',
              id: 'ha-igw',
              name: 'ha-igw',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
            },
          ],
        },
        {
          serviceName: 'routeTable',
          serviceTask: 'routeTableEdit',
          serviceSections: ['routes', 'subnetAssociations'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
            {
              _type: 'internetGateway',
              id: 'ha-igw',
              name: 'ha-igw',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
            },
            {
              _type: 'routeTable',
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
      ],
      tags: [tagMap.get('Networking')!, tagMap.get('VPC')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '웹 보안 그룹 생성',
      description: '웹 서비스를 위한 보안 그룹을 생성합니다.',
      descDetail: {
        overview:
          '웹 서비스를 위한 보안 그룹을 생성하고 HTTP 포트를 허용합니다.',
        requirements:
          "- 이름: 'ha-web-sg'\n- VPC: 'ha-vpc'\n- 인바운드 규칙: HTTP (80) 허용 (Anywhere)",
      },
      requiredFields: [
        {
          serviceName: 'securityGroups',
          serviceTask: 'securityGroupsCreate',
          serviceSections: ['basicInfo', 'inboundRules'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
            {
              _type: 'internetGateway',
              id: 'ha-igw',
              name: 'ha-igw',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
            },
            {
              _type: 'routeTable',
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
            {
              _type: 'securityGroups',
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
      ],
      tags: [tagMap.get('Security')!, tagMap.get('EC2')!],
    },
    {
      problemType: ProblemType.UNIT,
      title: '이중화 서버 배포 (Dual Deployment)',
      description:
        '각 가용 영역(AZ)에 하나씩 웹 서버를 배포하여 이중화 구성을 완성합니다.',
      descDetail: {
        overview:
          '인프라만 이중화해서는 소용이 없습니다. 실제 애플리케이션 서버도 각 영역에 분산 배치되어야 합니다.',
        requirements:
          "1. 서버 1 (Zone A):\n   - 이름: 'ha-web-1'\n   - 위치: 'ha-subnet-a'\n   - 보안 그룹: 'ha-web-sg'\n2. 서버 2 (Zone C):\n   - 이름: 'ha-web-2'\n   - 위치: 'ha-subnet-c'\n   - 보안 그룹: 'ha-web-sg'",
        learningObjectives:
          'Zone A가 다운되어도 Zone C의 서버가 요청을 처리할 수 있습니다.',
      },
      requiredFields: [
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: ['nameTag', 'networkSetting', 'securityGroup'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
            {
              _type: 'securityGroups',
              id: 'ha-web-sg',
              name: 'ha-web-sg',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              description: 'Security group for HA web servers',
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
            {
              _type: 'internetGateway',
              id: 'ha-igw',
              name: 'ha-igw',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
            },
            {
              _type: 'routeTable',
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
        {
          serviceName: 'ec2',
          serviceTask: 'instanceCreate',
          serviceSections: ['nameTag', 'networkSetting', 'securityGroup'],
          fixedOptions: [
            {
              _type: 'vpc',
              id: 'ha-vpc',
              name: 'ha-vpc',
              cidrBlock: '10.2.0.0/16',
              tenancy: 'default',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-a',
              name: 'ha-subnet-a',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.1.0/24',
              availabilityZone: 'us-east-1a',
            },
            {
              _type: 'subnet',
              id: 'ha-subnet-c',
              name: 'ha-subnet-c',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              cidrBlock: '10.2.2.0/24',
              availabilityZone: 'us-east-1c',
            },
            {
              _type: 'securityGroups',
              id: 'ha-web-sg',
              name: 'ha-web-sg',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
              description: 'Security group for HA web servers',
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
            {
              _type: 'internetGateway',
              id: 'ha-igw',
              name: 'ha-igw',
              vpcId: 'ha-vpc',
              vpcName: 'ha-vpc',
            },
            {
              _type: 'routeTable',
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
      ],
      tags: [tagMap.get('Compute')!, tagMap.get('EC2')!],
    },
  ];

  for (const problemData of problems) {
    await problemRepository.save(problemData as any);
  }

  console.log('Problems seeded successfully');
}
