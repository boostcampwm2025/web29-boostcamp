import { SectionContainer } from '@/components/section-container'

export default function LearnPage() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            클라우드 개념 학습
          </h1>
          <p className="text-muted-foreground text-lg">
            AWS 클라우드 서비스의 핵심 개념을 이해하고 실전에 활용해보세요
          </p>
        </div>

        <SectionContainer>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">시작하기</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              왼쪽 사이드바에서 학습하고 싶은 AWS 서비스를 선택하세요. 각
              서비스의 개념, 주요 기능, 사용 사례를 상세히 설명합니다.
            </p>
            <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>EC2:</strong> 확장 가능한 클라우드 컴퓨팅 서비스
              </li>
              <li>
                <strong>S3:</strong> 확장 가능한 객체 스토리지 서비스
              </li>
              <li>
                <strong>CloudFront:</strong> 글로벌 콘텐츠 전송 네트워크(CDN)
              </li>
              <li>
                <strong>VPC:</strong> 격리된 가상 네트워크 환경
              </li>
            </ul>
          </div>
        </SectionContainer>

        <SectionContainer className="">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold">직접 실습해보세요!</h2>
            <p className="text-muted-foreground">
              CloudCraft의 문제 풀이를 통해 학습한 개념을 직접 적용해볼 수
              있습니다.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <a
                href="/problems"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors"
              >
                문제 풀어보기
              </a>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  )
}
