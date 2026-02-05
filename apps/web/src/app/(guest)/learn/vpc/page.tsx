import { AwsQuickLink } from '../components/aws-quick-link'

import { SectionContainer } from '@/components/section-container'

export default function VPCPage() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">VPC (Virtual Private Cloud)</h1>
          <p className="text-muted-foreground text-lg">
            격리된 가상 네트워크 환경
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <AwsQuickLink href="https://docs.aws.amazon.com/ko_kr/vpc/latest/userguide/what-is-amazon-vpc.html" />

          <SectionContainer>
            <div className="space-y-12">
              <div>
                <h2 className="mb-3 text-2xl font-semibold">VPC란?</h2>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  Amazon VPC는 AWS 클라우드에서 논리적으로 격리된 가상
                  네트워크를 프로비저닝할 수 있게 해주는 서비스입니다. IP 주소
                  범위 선택, 서브넷 생성, 라우트 테이블 및 네트워크 게이트웨이
                  구성 등 가상 네트워킹 환경을 완벽하게 제어할 수 있습니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">주요 개념</h2>
                <ul className="space-y-3 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>
                    <strong className="text-foreground">CIDR 블록:</strong>{' '}
                    VPC의 IP 주소 범위를 정의합니다. 예: 10.0.0.0/16은
                    10.0.0.0부터 10.0.255.255까지의 주소를 포함합니다.
                  </li>
                  <li>
                    <strong className="text-foreground">서브넷(Subnet):</strong>{' '}
                    VPC 내의 IP 주소 범위입니다. 퍼블릭 서브넷과 프라이빗
                    서브넷으로 구분할 수 있습니다.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      라우트 테이블(Route Table):
                    </strong>{' '}
                    네트워크 트래픽이 전달되는 경로를 결정하는 규칙 집합입니다.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      인터넷 게이트웨이(Internet Gateway):
                    </strong>{' '}
                    VPC와 인터넷 간의 통신을 가능하게 하는 구성 요소입니다.
                  </li>
                  <li>
                    <strong className="text-foreground">NAT 게이트웨이:</strong>{' '}
                    프라이빗 서브넷의 인스턴스가 인터넷에 연결할 수 있도록
                    하면서 인터넷에서 해당 인스턴스로의 연결은 차단합니다.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">서브넷 유형</h2>
                <ul className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>
                    <strong className="text-foreground">퍼블릭 서브넷:</strong>{' '}
                    인터넷 게이트웨이로의 라우트가 있는 서브넷입니다. 인터넷에서
                    직접 액세스할 수 있는 리소스(예: 웹 서버)를 배치합니다.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      프라이빗 서브넷:
                    </strong>{' '}
                    인터넷 게이트웨이로의 라우트가 없는 서브넷입니다.
                    데이터베이스나 애플리케이션 서버 같은 백엔드 리소스를
                    배치합니다.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      VPN 전용 서브넷:
                    </strong>{' '}
                    VPN 연결을 통해서만 액세스할 수 있는 서브넷입니다.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">보안 기능</h2>
                <p className="mb-3 leading-relaxed text-gray-700 dark:text-gray-300">
                  VPC는 여러 계층의 보안 기능을 제공합니다:
                </p>
                <ul className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>
                    <strong className="text-foreground">
                      보안 그룹(Security Group):
                    </strong>{' '}
                    인스턴스 수준의 가상 방화벽으로 상태 저장 방식으로
                    작동합니다.
                  </li>
                  <li>
                    <strong className="text-foreground">네트워크 ACL:</strong>{' '}
                    서브넷 수준의 방화벽으로 상태 비저장 방식으로 작동합니다.
                  </li>
                  <li>
                    <strong className="text-foreground">VPN 연결:</strong>{' '}
                    온프레미스 네트워크와 VPC 간 안전한 연결
                  </li>
                  <li>
                    <strong className="text-foreground">VPC 피어링:</strong>{' '}
                    다른 VPC와 프라이빗 IP를 통한 통신
                  </li>
                  <li>
                    <strong className="text-foreground">VPC 엔드포인트:</strong>{' '}
                    AWS 서비스에 인터넷 게이트웨이 없이 프라이빗하게 연결
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">라우팅</h2>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                  라우트 테이블은 네트워크 트래픽의 경로를 제어합니다. 각
                  서브넷은 라우트 테이블과 연결되어야 하며, 명시적으로 연결되지
                  않은 서브넷은 메인 라우트 테이블과 자동으로 연결됩니다.
                </p>
                <p className="mt-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <strong>예시:</strong> 퍼블릭 서브넷의 라우트 테이블에는
                  0.0.0.0/0 → 인터넷 게이트웨이 라우트가 있어 인터넷 액세스를
                  허용합니다.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">
                  VPC 설계 모범 사례
                </h2>
                <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>여러 가용 영역을 사용하여 고가용성 확보</li>
                  <li>퍼블릭 및 프라이빗 서브넷 분리로 보안 강화</li>
                  <li>적절한 CIDR 블록 크기 선택 (향후 확장 고려)</li>
                  <li>
                    보안 그룹과 네트워크 ACL을 함께 사용하여 다층 보안 구현
                  </li>
                  <li>VPC 흐름 로그를 활성화하여 네트워크 트래픽 모니터링</li>
                  <li>NAT 게이트웨이를 각 가용 영역에 배치하여 가용성 향상</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">연결 옵션</h2>
                <ul className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>
                    <strong className="text-foreground">
                      인터넷 게이트웨이:
                    </strong>{' '}
                    퍼블릭 인터넷 연결
                  </li>
                  <li>
                    <strong className="text-foreground">
                      NAT 게이트웨이/NAT 인스턴스:
                    </strong>{' '}
                    프라이빗 서브넷의 아웃바운드 인터넷 연결
                  </li>
                  <li>
                    <strong className="text-foreground">VPN 연결:</strong>{' '}
                    온프레미스 네트워크와 암호화된 연결
                  </li>
                  <li>
                    <strong className="text-foreground">
                      AWS Direct Connect:
                    </strong>{' '}
                    전용 네트워크 연결
                  </li>
                  <li>
                    <strong className="text-foreground">VPC 피어링:</strong> VPC
                    간 프라이빗 연결
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Transit Gateway:
                    </strong>{' '}
                    여러 VPC 및 온프레미스 네트워크 중앙 집중식 연결
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-2xl font-semibold">사용 사례</h2>
                <ul className="list-inside list-disc space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>다중 계층 웹 애플리케이션 호스팅</li>
                  <li>재해 복구 솔루션 구축</li>
                  <li>하이브리드 클라우드 아키텍처</li>
                  <li>격리된 개발, 테스트, 프로덕션 환경 구성</li>
                  <li>규정 준수 요구사항 충족</li>
                </ul>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  )
}
