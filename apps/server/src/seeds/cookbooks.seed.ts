import { DataSource } from 'typeorm';
import { Cookbook } from '../entities/cookbook.entity';
import { CookbookProblem } from '../entities/cookbook-problem.entity';
import { Problem } from '../entities/problem.entity';
import { Tag } from '../entities/tag.entity';

export async function seedCookbooks(dataSource: DataSource): Promise<void> {
  const cookbookRepository = dataSource.getRepository(Cookbook);
  const problemRepository = dataSource.getRepository(Problem);
  const tagRepository = dataSource.getRepository(Tag);

  // 모든 태그 조회
  const allTags = await tagRepository.find();
  const tagMap = new Map(allTags.map((tag) => [tag.name, tag]));

  // 기존 쿡북용 태그 필터링
  const tags = [
    tagMap.get('S3')!,
    tagMap.get('CloudFront')!,
    tagMap.get('Web Hosting')!,
    tagMap.get('EC2')!,
  ].filter(Boolean);

  // 모든 문제 조회
  const problems = await problemRepository.find({
    order: { id: 'ASC' },
  });

  if (problems.length < 5) {
    console.log('Not enough problems found. Skipping cookbook seeding.');
    return;
  }

  // Cookbook 생성
  const cookbook = await cookbookRepository.save({
    title: 'AWS 정적 웹 호스팅 마스터하기',
    description:
      'S3, CloudFront, EC2를 사용하여 웹 서비스 인프라를 구축해 봅니다.',
    descDetail:
      '이 쿡북에서는 AWS의 핵심 서비스인 S3(스토리지), CloudFront(CDN), EC2(컴퓨팅)를 다룹니다. 정적 웹사이트 호스팅부터 백엔드 서버를 위한 인스턴스 생성까지, 웹 서비스를 위한 기초 인프라를 단계별로 구성해 봅니다.',
    tags: tags,
  });

  // 두 번째 Cookbook 생성: 가장 단순한 서버 배포 아키텍처
  const networkTags = [
    tagMap.get('Networking')!,
    tagMap.get('VPC')!,
    tagMap.get('EC2')!,
  ].filter(Boolean);

  const cookbook2 = await cookbookRepository.save({
    title: 'EC2 기반의 가장 단순한 서버 배포 아키텍처 구축',
    description:
      'VPC, Subnet, IGW, Route Table을 설정하고 EC2 인스턴스를 배포하는 기본 네트워크 인프라를 실습합니다.',
    descDetail:
      '이 쿡북에서는 AWS의 가장 기초적이면서 필수적인 네트워크 구성 요소를 다룹니다. 가상 프라이빗 클라우드(VPC)를 생성하는 것부터 시작하여, 인터넷 통신을 위한 게이트웨이와 라우팅 설정, 그리고 실제 서버(EC2)를 배치하는 전 과정을 단계별로 시스템에 구축해 봅니다.',
    tags: networkTags,
  });

  // Cookbook-Problem 연결
  const cookbookProblems = [
    {
      cookbookId: cookbook.id,
      problemId: problems[0].id, // 로그 저장용 S3 버킷 생성
      orderNumber: 1,
      cookbook: cookbook,
      problem: problems[0],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[1].id, // S3 버킷 버전 관리 활성화
      orderNumber: 2,
      cookbook: cookbook,
      problem: problems[1],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[2].id, // CloudFront 원본 설정
      orderNumber: 3,
      cookbook: cookbook,
      problem: problems[2],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[3].id, // 웹 서버용 EC2 인스턴스 생성
      orderNumber: 4,
      cookbook: cookbook,
      problem: problems[3],
    },
    {
      cookbookId: cookbook.id,
      problemId: problems[4].id, // 정적 웹사이트 글로벌 배포 (복합)
      orderNumber: 5,
      cookbook: cookbook,
      problem: problems[4],
    },
  ];

  // Cookbook 2 - Problem 연결
  const cookbook2Problems = [
    {
      cookbookId: cookbook2.id,
      problemId: problems[14].id,
      orderNumber: 1,
      cookbook: cookbook2,
      problem: problems[14],
    },
    {
      cookbookId: cookbook2.id,
      problemId: problems[15].id,
      orderNumber: 2,
      cookbook: cookbook2,
      problem: problems[15],
    },
    {
      cookbookId: cookbook2.id,
      problemId: problems[16].id,
      orderNumber: 3,
      cookbook: cookbook2,
      problem: problems[16],
    },
    {
      cookbookId: cookbook2.id,
      problemId: problems[17].id,
      orderNumber: 4,
      cookbook: cookbook2,
      problem: problems[17],
    },
    {
      cookbookId: cookbook2.id,
      problemId: problems[18].id,
      orderNumber: 5,
      cookbook: cookbook2,
      problem: problems[18],
    },
  ];

  // Cookbook 3 - 보안 네트워크 아키텍처
  const securityTags = [
    tagMap.get('Networking')!,
    tagMap.get('VPC')!,
    tagMap.get('Security')!,
  ].filter(Boolean);

  const cookbook3 = await cookbookRepository.save({
    title: '보안 네트워크 아키텍처 구축 (NAT Gateway)',
    description:
      '프라이빗 서브넷의 보안을 유지하면서 인터넷 통신을 지원하는 고급 네트워크를 구축합니다.',
    descDetail:
      '이 쿡북에서는 실제 엔터프라이즈 환경에서 사용되는 보안 네트워크 구성을 실습합니다. 퍼블릭/프라이빗 서브넷을 분리하고, NAT Gateway를 통해 내부 자원을 보호하면서도 외부 통신(업데이트 등)을 지원하는 아키텍처를 직접 구축해 봅니다.',
    tags: securityTags,
  });

  const cookbook3Problems = [
    {
      cookbookId: cookbook3.id,
      problemId: problems[21].id, // 1단계: 사용자 지정 VPC
      orderNumber: 1,
      cookbook: cookbook3,
      problem: problems[21],
    },
    {
      cookbookId: cookbook3.id,
      problemId: problems[22].id, // 2단계: 서브넷 분리
      orderNumber: 2,
      cookbook: cookbook3,
      problem: problems[22],
    },
    {
      cookbookId: cookbook3.id,
      problemId: problems[23].id, // 3단계: IGW 구성
      orderNumber: 3,
      cookbook: cookbook3,
      problem: problems[23],
    },
    {
      cookbookId: cookbook3.id,
      problemId: problems[24].id, // 4단계: 퍼블릭 라우팅
      orderNumber: 4,
      cookbook: cookbook3,
      problem: problems[24],
    },
    {
      cookbookId: cookbook3.id,
      problemId: problems[25].id, // 5단계: NAT & 프라이빗 라우팅
      orderNumber: 5,
      cookbook: cookbook3,
      problem: problems[25],
    },
    {
      cookbookId: cookbook3.id,
      problemId: problems[26].id, // 6단계: 보안 그룹 & EC2
      orderNumber: 6,
      cookbook: cookbook3,
      problem: problems[26],
    },
  ];

  // Cookbook 4 - 고가용성(HA) 아키텍처
  const haTags = [
    tagMap.get('Networking')!,
    tagMap.get('VPC')!,
    tagMap.get('EC2')!,
  ].filter(Boolean);

  const cookbook4 = await cookbookRepository.save({
    title: '고가용성(High Availability) 웹 아키텍처 구축',
    description:
      '다중 가용 영역(Multi-AZ)을 활용하여 장애에 강한 이중화 아키텍처를 설계합니다.',
    descDetail:
      '이 쿡북에서는 클라우드의 핵심 장점인 고가용성(HA)을 실습합니다. 단일 데이터 센터 장애에도 서비스를 유지할 수 있도록, 두 개의 가용 영역(Zone A, Zone C)에 서브넷과 웹 서버를 분산 배치하고 이중화 구성을 완성해 봅니다.',
    tags: haTags,
  });

  const cookbook4Problems = [
    {
      cookbookId: cookbook4.id,
      problemId: problems[27].id,
      orderNumber: 1,
      cookbook: cookbook4,
      problem: problems[27],
    }, // HA VPC
    {
      cookbookId: cookbook4.id,
      problemId: problems[28].id,
      orderNumber: 2,
      cookbook: cookbook4,
      problem: problems[28],
    }, // Multi-AZ Subnets
    {
      cookbookId: cookbook4.id,
      problemId: problems[29].id,
      orderNumber: 3,
      cookbook: cookbook4,
      problem: problems[29],
    }, // IGW
    {
      cookbookId: cookbook4.id,
      problemId: problems[30].id,
      orderNumber: 4,
      cookbook: cookbook4,
      problem: problems[30],
    }, // Unified Routing
    {
      cookbookId: cookbook4.id,
      problemId: problems[31].id,
      orderNumber: 5,
      cookbook: cookbook4,
      problem: problems[31],
    }, // Web SG
    {
      cookbookId: cookbook4.id,
      problemId: problems[32].id,
      orderNumber: 6,
      cookbook: cookbook4,
      problem: problems[32],
    }, // Dual Deployment
  ];

  const cookbookProblemRepository = dataSource.getRepository(CookbookProblem);
  for (const cp of [
    ...cookbookProblems,
    ...cookbook2Problems,
    ...cookbook3Problems,
    ...cookbook4Problems,
  ]) {
    await cookbookProblemRepository.save(cp);
  }

  console.log('Cookbooks seeded successfully');
}
