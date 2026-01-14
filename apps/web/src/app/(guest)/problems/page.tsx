import { CookbookProblemCard } from './components/cookbook-problem-card'
import { ProblemTypeTab } from './components/problem-type-tab'
import {
  CompactUnitProblemCard,
  UnitProblemCard,
} from './components/unit-problem'

const fakeUnitProblem = {
  id: 1,
  title: 'VPC 서브넷 구성',
  description: 'Public 서브넷에 EC2 인스턴스를 배치하세요',
  tags: ['VPC', 'EC2', 'Subnet', 'Networking'],
}

const fakeCookbookProblem = {
  id: 2,
  title: 'VPC 서브넷 구성',
  description: 'Public 서브넷에 EC2 인스턴스를 배치하세요',
  tags: ['VPC', 'EC2', 'Subnet', 'Networking'],
  problems: [
    {
      id: 1,
      title: 'VPC 서브넷 구성',
      description: 'Public 서브넷에 EC2 인스턴스를 배치하세요',
    },
    {
      id: 3,
      title: '보안 그룹 설정',
      description: 'EC2 인스턴스에 대한 보안 그룹을 설정하세요',
    },
  ],
}

export default function ProblemsPage() {
  return (
    <div className="w-full py-2">
      <div className="flex flex-col gap-4 py-8">
        <h2 className="text-3xl font-bold">문제 목록</h2>
        <p className="text-foreground font-medium">
          기초 개념부터 실전 시나리오까지, 학습 단계에 맞춰 문제를 선택할 수
          있습니다.
        </p>
      </div>

      <ProblemTypeTab />

      <section className="pt-4">
        <CookbookProblemCard {...fakeCookbookProblem}>
          {fakeCookbookProblem.problems.map((problem, index) => (
            <CompactUnitProblemCard
              key={problem.id}
              step={index + 1}
              {...problem}
            />
          ))}
        </CookbookProblemCard>
      </section>
    </div>
  )
}
