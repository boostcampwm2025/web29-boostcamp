import Link from 'next/link'

import AwsDiagram from '@/components/aws-diagram'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <main className="bg-background mx-auto max-w-[1440px] px-4">
      {/* Hero Section */}
      <section className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="bg-primary h-[80px] w-[80px]"></div>
          <p className="mt-8 text-3xl font-bold">AWS를 실전처럼 학습하세요</p>
          <p className="text-muted-foreground mt-6 text-lg">
            실제 AWS 환경을 시뮬레이션하여 클라우드 인프라를 직접 구축하고
            설정해보세요. <br /> 안전한 샌드박스 환경에서 실습하며 배우는 가장
            효과적인 클라우드 학습 플랫폼입니다.
          </p>

          <div className="mt-6 flex gap-2">
            <Button asChild>
              <Link href="/problems">문제 풀기 시작하기</Link>
            </Button>
          </div>
        </div>
        <div id="xyflow">
          <AwsDiagram />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">왜 클라우드 크래프트인가요?</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            안전하고 효과적인 학습 환경을 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1: 비용 걱정 없음 */}
          <div className="border-border bg-card flex flex-col items-center rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">비용 걱정 없이</h3>
            <p className="text-muted-foreground">
              실제 AWS 요금 폭탄을 맞을 걱정 없이 마음껏 실습하세요. 시뮬레이션
              환경에서 무제한으로 연습할 수 있습니다.
            </p>
          </div>

          {/* Card 2: 실수 두려움 없음 */}
          <div className="border-border bg-card flex flex-col items-center rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">안전한 학습 환경</h3>
            <p className="text-muted-foreground">
              잘못된 설정으로 인한 보안 사고나 데이터 손실 걱정 없이 안심하고
              학습하세요. 샌드박스 환경에서 자유롭게 실험할 수 있습니다.
            </p>
          </div>

          {/* Card 3: 시각화 학습 */}
          <div className="border-border bg-card flex flex-col items-center rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-8 w-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-semibold">시각화된 다이어그램</h3>
            <p className="text-muted-foreground">
              복잡한 AWS 아키텍처를 직관적인 다이어그램으로 확인하며 학습하세요.
              인프라 구성을 한눈에 이해할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">어떻게 작동하나요?</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            세 가지 유형의 문제로 AWS를 마스터하세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: Diagram Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="border-border bg-card rounded-lg border-2 border-dashed p-12">
              <div className="text-muted-foreground flex h-[400px] items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-6xl">📊</div>
                  <p className="text-lg">문제 유형별 시각화</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tabs Content */}
          <div className="order-1 lg:order-2">
            <Tabs defaultValue="cookbook" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cookbook">Cookbook</TabsTrigger>
                <TabsTrigger value="unit">Unit</TabsTrigger>
                <TabsTrigger value="scenario">Scenario</TabsTrigger>
              </TabsList>

              <TabsContent value="cookbook" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <span className="text-2xl">📖</span>
                    </div>
                    <h3 className="text-2xl font-semibold">Cookbook</h3>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed">
                    레시피에 따라 실제 문제를 해결합니다. 웹 서버 배포,
                    데이터베이스 연동, 로드 밸런싱 구성 등 실무에서 자주
                    마주치는 시나리오를 단계별로 학습합니다. 정해진 순서대로
                    따라하며 실전 감각을 익힙니다.
                  </p>
                  <div className="mt-4 rounded-lg bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-900">
                      예시: {'"'}3-tier 웹 애플리케이션을 구축하세요: ALB → EC2
                      (웹 서버) → RDS (데이터베이스){'"'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="unit" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-semibold">Unit</h3>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed">
                    단순 서비스 설정 문제입니다. EC2 인스턴스 생성, VPC 구성,
                    보안 그룹 설정 등 개별 AWS 서비스의 기본 설정을 학습합니다.
                    초보자가 AWS의 핵심 개념을 익히기에 적합합니다.
                  </p>
                  <div className="mt-4 rounded-lg bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-900">
                      예시: {'"'}ap-northeast-2 리전에 t2.micro 인스턴스를
                      생성하고 SSH 접속을 허용하는 보안 그룹을 설정하세요.{'"'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scenario" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <h3 className="text-2xl font-semibold">Scenario</h3>
                  </div>
                  <p className="text-foreground text-lg leading-relaxed">
                    정답이 정해져 있지 않은 검증 문제입니다. 비용 최적화, 성능
                    개선, 보안 강화 등 실제 업무에서 마주하는 복잡한 상황을
                    해결합니다. 여러 해결 방법 중 최적의 아키텍처를 설계하는
                    능력을 키웁니다.
                  </p>
                  <div className="mt-4 rounded-lg bg-purple-50 p-4">
                    <p className="text-sm font-medium text-purple-900">
                      예시: {'"'}월 1000만 방문자를 처리할 수 있으면서 비용은
                      최소화한 아키텍처를 설계하세요.{'"'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}
