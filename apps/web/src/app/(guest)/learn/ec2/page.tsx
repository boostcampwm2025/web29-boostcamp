import { AwsQuickLink } from '../components/aws-quick-link'
import { LightbulbIcon } from 'lucide-react'

import { SectionContainer } from '@/components/section-container'

export default function EC2Page() {
  return (
    <div className="py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">EC2 (Elastic Compute Cloud)</h1>
          <p className="text-muted-foreground text-lg">
            AWS에서 빌려 쓰는 가상의 컴퓨터
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <AwsQuickLink href="https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/concepts.html" />

          <SectionContainer>
            <div className="space-y-12">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  왜 EC2가 필요한가요?
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    웹사이트를 만들거나 앱을 배포하려면, 그것을{' '}
                    <strong>실행할 컴퓨터(서버)</strong>가 필요해요. 예전에는
                    기업이나 개인이{' '}
                    <strong>직접 컴퓨터를 구매해서 서버실에 설치</strong>
                    했습니다. 그런데 이 방식은 비용이 많이 들고, 관리가
                    복잡하며, 확장이 어렵다는 단점이 있었죠.
                  </p>
                  <p>
                    그래서 등장한 것이 바로 <strong>클라우드 컴퓨터</strong>,
                    그리고 그 대표주자가 <strong>EC2</strong>입니다.
                  </p>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  EC2는 어떤 서비스인가요?
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  <strong>EC2 (Elastic Compute Cloud)</strong>는 AWS에서
                  제공하는 <strong>가상의 서버</strong>입니다. AWS에 접속해서
                  “컴퓨터 하나 주세요!” 하고 인스턴스를 만들면, 그 위에 우리가
                  원하는 웹사이트나 프로그램을 실행할 수 있습니다.
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>AWS</strong> = 컴퓨터 빌려주는 회사
                  </li>
                  <li>
                    <strong>EC2</strong> = 그 컴퓨터의 이름
                  </li>
                  <li>
                    <strong>인스턴스</strong> = 빌려서 만든 컴퓨터 한 대
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  EC2는 정말 컴퓨터처럼 생겼나요?
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  놀랍게도, <strong>진짜 컴퓨터와 매우 비슷</strong>하게
                  구성되어 있어요!
                </p>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-foreground">
                      <tr>
                        <th className="p-4 font-medium">우리가 아는 컴퓨터</th>
                        <th className="p-4 font-medium">EC2 인스턴스</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y">
                      <tr>
                        <td className="p-4">CPU (연산 처리)</td>
                        <td className="p-4">vCPU (가상 CPU)</td>
                      </tr>
                      <tr>
                        <td className="p-4">메모리(RAM)</td>
                        <td className="p-4">EC2 메모리</td>
                      </tr>
                      <tr>
                        <td className="p-4">하드디스크</td>
                        <td className="p-4">EBS (Elastic Block Store)</td>
                      </tr>
                      <tr>
                        <td className="p-4">운영체제(OS)</td>
                        <td className="p-4">리눅스, 우분투, 윈도우 등</td>
                      </tr>
                      <tr>
                        <td className="p-4">인터넷 연결</td>
                        <td className="p-4">VPC, 보안 그룹 설정</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">EC2의 핵심 개념</h2>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      인스턴스 (Instance)
                    </strong>
                    EC2에서 만든 <strong>가상의 컴퓨터 한 대</strong>입니다.
                    생성하자마자 바로 켜서 사용할 수 있습니다.
                  </li>
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      AMI (Amazon Machine Image)
                    </strong>
                    어떤 운영체제를 쓸지 고르는 <strong>설치 이미지</strong>
                    입니다 (리눅스, 우분투, 윈도우 등).
                  </li>
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      인스턴스 타입
                    </strong>
                    컴퓨터 성능을 고르는 옵션입니다 (예: <code>t2.micro</code>,{' '}
                    <code>p3.2xlarge</code>).
                  </li>
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      EBS (Elastic Block Store)
                    </strong>
                    <strong>하드디스크 역할</strong>을 하며, 인스턴스가 꺼져도
                    데이터는 여기에 저장됩니다.
                  </li>
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      키 페어 (Key Pair)
                    </strong>
                    인스턴스에 접속하기 위한 <strong>비밀번호 파일</strong>
                    입니다. 분실 시 접속할 수 없으니 꼭 보관해야 합니다.
                  </li>
                  <li>
                    <strong className="text-foreground mb-1 block text-lg">
                      보안 그룹 (Security Group)
                    </strong>
                    EC2로 들어오는{' '}
                    <strong>인터넷 트래픽을 제어하는 방화벽</strong>입니다. (예:
                    SSH 접속을 위해 22번 포트 개방)
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">EC2의 장점</h2>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-foreground">
                      <tr>
                        <th className="p-4 font-medium">장점</th>
                        <th className="p-4 font-medium">설명</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y">
                      <tr>
                        <td className="p-4 font-medium">비용 절약</td>
                        <td className="p-4">
                          쓰는 만큼만 과금되고, 끄면 요금 없음
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">빠른 설정</td>
                        <td className="p-4">
                          클릭 몇 번이면 몇 분 안에 서버 생성
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">자유로운 선택</td>
                        <td className="p-4">
                          OS, 성능, 저장공간 등 원하는대로
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">유연한 확장성</td>
                        <td className="p-4">
                          트래픽 많아지면 인스턴스 타입만 바꾸면 끝
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">글로벌 인프라</td>
                        <td className="p-4">
                          서울, 도쿄, 프랑크푸르트 등 전 세계 서버 이용 가능
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  EC2 전체 사용 흐름
                </h2>
                <ol className="list-decimal space-y-2 pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>인스턴스 생성</strong> (운영체제, 사양 선택)
                  </li>
                  <li>
                    <strong>보안 그룹 설정</strong> (어떤 트래픽을 받을지 설정)
                  </li>
                  <li>
                    <strong>키 페어 다운로드</strong> (접속할 때 쓸 비밀번호
                    파일)
                  </li>
                  <li>
                    <strong>인스턴스 접속</strong> (SSH나 원격 접속으로)
                  </li>
                  <li>
                    <strong>서비스 실행</strong> (웹 서버, API 서버 등)
                  </li>
                  <li>
                    <strong>사용 후 종료</strong> (켜둔 채 두면 과금됨!)
                  </li>
                </ol>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                <div className="flex items-center gap-2">
                  <LightbulbIcon className="mb-2 h-6 w-6 text-amber-400 dark:text-amber-500" />
                  <h3 className="mb-2 text-lg font-semibold text-amber-800 dark:text-amber-200">
                    꼭 기억하세요 !
                  </h3>
                </div>
                <p className="pl-1 text-amber-700 dark:text-amber-300">
                  실제 환경에서 EC2 인스턴스를{' '}
                  <strong>켜두면 요금이 발생</strong>
                  합니다. 사용을 마쳤다면 꼭{' '}
                  <strong>종료(terminate 또는 stop)</strong> 하세요.
                </p>
              </div>
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  )
}
