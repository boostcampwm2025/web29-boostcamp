import { SectionContainer } from '@/components/section-container'

export default function CloudFrontPage() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">CloudFront</h1>
          <p className="text-muted-foreground text-lg">
            글로벌 콘텐츠 전송 네트워크(CDN)
          </p>
        </div>

        <SectionContainer title="CloudFront 가이드">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">CloudFront란?</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Amazon CloudFront는 전 세계에 분산된 엣지 로케이션을 통해
                콘텐츠를 빠르게 전송하는 CDN 서비스입니다. 사용자와 가장 가까운
                엣지 로케이션에서 콘텐츠를 제공하여 지연 시간을 최소화하고 전송
                속도를 향상시킵니다.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-semibold">주요 개념</h2>
              <ul className="space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  <strong className="text-foreground">
                    배포(Distribution):
                  </strong>{' '}
                  CloudFront가 콘텐츠를 제공하기 위해 사용하는 구성 단위입니다.
                  웹 배포와 RTMP 배포 두 가지 유형이 있습니다.
                </li>
                <li>
                  <strong className="text-foreground">오리진(Origin):</strong>{' '}
                  CloudFront가 콘텐츠를 가져오는 원본 소스입니다. S3 버킷, EC2
                  인스턴스, ELB, 또는 커스텀 HTTP 서버가 될 수 있습니다.
                </li>
                <li>
                  <strong className="text-foreground">
                    엣지 로케이션(Edge Location):
                  </strong>{' '}
                  CloudFront가 콘텐츠를 캐시하고 사용자에게 제공하는 전 세계에
                  분산된 데이터 센터입니다.
                </li>
                <li>
                  <strong className="text-foreground">캐싱:</strong> 자주
                  요청되는 콘텐츠를 엣지 로케이션에 저장하여 응답 속도를
                  향상시킵니다.
                </li>
                <li>
                  <strong className="text-foreground">
                    TTL(Time to Live):
                  </strong>{' '}
                  엣지 로케이션에서 객체를 캐시하는 기간입니다.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">작동 방식</h2>
              <ol className="list-inside list-decimal space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>사용자가 웹사이트나 애플리케이션에 콘텐츠를 요청합니다</li>
                <li>
                  DNS가 요청을 가장 가까운 CloudFront 엣지 로케이션으로
                  라우팅합니다
                </li>
                <li>엣지 로케이션이 캐시에서 요청된 파일을 확인합니다</li>
                <li>캐시에 있으면 즉시 사용자에게 반환합니다</li>
                <li>
                  캐시에 없으면 오리진 서버에서 파일을 가져와 사용자에게
                  전달하고 캐시에 저장합니다
                </li>
              </ol>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">주요 기능</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  <strong>동적 및 정적 콘텐츠 전송:</strong> 모든 유형의 웹
                  콘텐츠 가속화
                </li>
                <li>
                  <strong>SSL/TLS 지원:</strong> HTTPS를 통한 안전한 콘텐츠 전송
                </li>
                <li>
                  <strong>DDoS 공격 방어:</strong> AWS Shield와 통합된 보안
                </li>
                <li>
                  <strong>실시간 모니터링:</strong> CloudWatch를 통한 상세한
                  메트릭 제공
                </li>
                <li>
                  <strong>Lambda@Edge:</strong> 엣지 로케이션에서 코드 실행
                </li>
                <li>
                  <strong>지역 제한:</strong> 특정 국가의 사용자 액세스 제어
                </li>
                <li>
                  <strong>필드 레벨 암호화:</strong> 민감한 데이터 보호
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">캐싱 전략</h2>
              <p className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
                CloudFront는 다양한 캐싱 옵션을 제공하여 성능을 최적화할 수
                있습니다:
              </p>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>기본 TTL, 최소 TTL, 최대 TTL 설정</li>
                <li>쿼리 문자열, 쿠키, 헤더 기반 캐싱</li>
                <li>캐시 무효화를 통한 콘텐츠 즉시 업데이트</li>
                <li>압축을 통한 전송 속도 개선</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">Lambda@Edge</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Lambda@Edge를 사용하면 엣지 로케이션에서 코드를 실행하여
                사용자에게 더 가까운 위치에서 애플리케이션 로직을 처리할 수
                있습니다. 이를 통해 지연 시간을 줄이고 오리진 서버의 부하를
                감소시킬 수 있습니다.
              </p>
              <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                사용 사례: A/B 테스팅, 사용자 인증, 이미지 리사이징, SEO 최적화
                등
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">사용 사례</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>웹사이트 및 웹 애플리케이션 가속화</li>
                <li>비디오 스트리밍 (라이브 및 온디맨드)</li>
                <li>API 가속화</li>
                <li>소프트웨어 및 게임 패치 배포</li>
                <li>정적 자산 제공 (이미지, CSS, JavaScript)</li>
                <li>전자상거래 사이트 성능 개선</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">성능 최적화 팁</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>적절한 TTL 값 설정으로 캐시 효율성 극대화</li>
                <li>파일 압축 활성화로 전송 크기 감소</li>
                <li>여러 오리진 사용으로 부하 분산</li>
                <li>CloudFront 함수나 Lambda@Edge로 동적 콘텐츠 처리</li>
                <li>HTTP/2 및 HTTP/3 활성화로 프로토콜 성능 향상</li>
              </ul>
            </div>
          </div>
        </SectionContainer>

        <div className="flex justify-center pt-4">
          <a
            href="/problems?type=unit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors"
          >
            CloudFront 관련 문제 풀어보기
          </a>
        </div>
      </div>
    </div>
  )
}
