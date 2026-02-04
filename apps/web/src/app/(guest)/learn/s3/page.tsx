import { SectionContainer } from '@/components/section-container'

export default function S3Page() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">S3 (Simple Storage Service)</h1>
          <p className="text-muted-foreground text-lg">
            확장 가능한 객체 스토리지 서비스
          </p>
        </div>

        <SectionContainer title="S3 가이드">
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-2xl font-semibold">S3란?</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Amazon S3는 인터넷 스토리지 서비스로, 웹 어디서나 원하는 양의
                데이터를 저장하고 검색할 수 있습니다. 높은 내구성, 가용성,
                확장성을 제공하며 비용 효율적인 객체 스토리지 솔루션입니다.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">주요 개념</h2>
              <ul className="space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  <strong className="text-foreground">버킷(Bucket):</strong>{' '}
                  S3에서 객체를 저장하는 컨테이너입니다. 모든 객체는 버킷에
                  포함됩니다. 버킷 이름은 전역적으로 고유해야 합니다.
                </li>
                <li>
                  <strong className="text-foreground">객체(Object):</strong>{' '}
                  S3에 저장되는 기본 엔티티입니다. 파일과 해당 파일을 설명하는
                  메타데이터로 구성됩니다.
                </li>
                <li>
                  <strong className="text-foreground">키(Key):</strong> 버킷 내
                  객체의 고유 식별자입니다. 버킷, 키, 버전 ID의 조합으로 각
                  객체를 고유하게 식별합니다.
                </li>
                <li>
                  <strong className="text-foreground">리전(Region):</strong>{' '}
                  버킷이 저장되는 지리적 AWS 리전입니다. 지연 시간 최소화, 비용
                  절감, 규제 요구 사항 충족을 위해 선택합니다.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">스토리지 클래스</h2>
              <p className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
                S3는 다양한 사용 사례에 맞는 여러 스토리지 클래스를 제공합니다:
              </p>
              <ul className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  <strong className="text-foreground">S3 Standard:</strong> 자주
                  액세스하는 데이터를 위한 기본 스토리지 클래스
                </li>
                <li>
                  <strong className="text-foreground">
                    S3 Intelligent-Tiering:
                  </strong>{' '}
                  액세스 패턴이 변경되는 데이터를 자동으로 최적화
                </li>
                <li>
                  <strong className="text-foreground">S3 Standard-IA:</strong>{' '}
                  자주 액세스하지 않지만 빠른 액세스가 필요한 데이터
                </li>
                <li>
                  <strong className="text-foreground">S3 One Zone-IA:</strong>{' '}
                  단일 가용 영역에 저장되는 저빈도 액세스 데이터
                </li>
                <li>
                  <strong className="text-foreground">
                    S3 Glacier Instant Retrieval:
                  </strong>{' '}
                  분기에 한 번 액세스하는 아카이브 데이터
                </li>
                <li>
                  <strong className="text-foreground">
                    S3 Glacier Flexible Retrieval:
                  </strong>{' '}
                  1년에 1-2회 액세스하는 아카이브
                </li>
                <li>
                  <strong className="text-foreground">
                    S3 Glacier Deep Archive:
                  </strong>{' '}
                  장기 보관을 위한 최저비용 스토리지
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">
                버킷 정책 및 액세스 제어
              </h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                S3는 여러 수준에서 액세스 제어를 제공합니다:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>
                  <strong>IAM 정책:</strong> 사용자 및 역할에 대한 권한 관리
                </li>
                <li>
                  <strong>버킷 정책:</strong> 버킷 수준에서 액세스 권한 정의
                </li>
                <li>
                  <strong>ACL(Access Control Lists):</strong> 개별 객체에 대한
                  액세스 제어
                </li>
                <li>
                  <strong>퍼블릭 액세스 차단:</strong> 의도하지 않은 퍼블릭
                  액세스 방지
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">주요 기능</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>버전 관리: 객체의 여러 버전 유지</li>
                <li>
                  수명 주기 정책: 객체를 자동으로 다른 스토리지 클래스로 전환
                  또는 삭제
                </li>
                <li>복제: 다른 리전이나 계정으로 객체 자동 복제</li>
                <li>이벤트 알림: 객체 생성, 삭제 등의 이벤트에 대한 알림</li>
                <li>정적 웹사이트 호스팅: S3를 웹 서버로 사용</li>
                <li>서버 측 암호화: 저장 데이터 자동 암호화</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">사용 사례</h2>
              <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                <li>정적 웹사이트 호스팅</li>
                <li>백업 및 복원</li>
                <li>데이터 아카이빙</li>
                <li>빅데이터 분석</li>
                <li>미디어 파일 저장 및 배포</li>
                <li>애플리케이션 데이터 저장</li>
                <li>재해 복구</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold">내구성 및 가용성</h2>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                S3는 99.999999999%(11 9&apos;s)의 내구성과 99.99%의 가용성을
                제공합니다. 데이터는 여러 디바이스와 여러 시설에 자동으로
                복제되어 저장됩니다.
              </p>
            </div>
          </div>
        </SectionContainer>

        <div className="flex justify-center pt-4">
          <a
            href="/problems?type=unit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors"
          >
            S3 관련 문제 풀어보기
          </a>
        </div>
      </div>
    </div>
  )
}
