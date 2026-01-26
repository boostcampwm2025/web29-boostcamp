import { DataSource } from 'typeorm';
import { Cookbook } from '../entities/cookbook.entity';
import { CookbookProblem } from '../entities/cookbook-problem.entity';
import { Problem } from '../entities/problem.entity';
import { Tag } from '../entities/tag.entity';

export async function seedCookbooks(dataSource: DataSource): Promise<void> {
  const cookbookRepository = dataSource.getRepository(Cookbook);
  const problemRepository = dataSource.getRepository(Problem);
  const tagRepository = dataSource.getRepository(Tag);

  // 태그 조회
  const tags = await tagRepository.find({
    where: [
      { name: 'S3' },
      { name: 'CloudFront' },
      { name: 'Web Hosting' },
      { name: 'EC2' },
    ],
  });

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

  const cookbookProblemRepository = dataSource.getRepository(CookbookProblem);
  for (const cp of cookbookProblems) {
    await cookbookProblemRepository.save(cp);
  }

  console.log('Cookbooks seeded successfully');
}
