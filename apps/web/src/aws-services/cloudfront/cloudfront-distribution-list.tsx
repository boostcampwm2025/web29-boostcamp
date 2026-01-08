'use client'

import {
  CheckCircle2,
  Clock,
  Globe,
  Info,
  RefreshCw,
  Search,
  XCircle,
} from 'lucide-react'

import React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// 샘플 데이터 타입
interface Distribution {
  id: string
  name: string
  domainName: string
  status: 'Enabled' | 'Disabled'
  state: 'Deployed' | 'Deploying' | 'In Progress'
  lastModified: string
  origin: string
}

// 샘플 배포 데이터
const SAMPLE_DISTRIBUTIONS: Distribution[] = [
  {
    id: 'E1ABCDEFGH123',
    name: 'my-static-website',
    domainName: 'd111111abcdef8.cloudfront.net',
    status: 'Enabled',
    state: 'Deployed',
    lastModified: '2024년 1월 15일 14:32',
    origin: 'my-application-assets.s3.ap-northeast-2.amazonaws.com',
  },
  {
    id: 'E2BCDEFGHI234',
    name: 'api-distribution',
    domainName: 'd222222abcdef8.cloudfront.net',
    status: 'Enabled',
    state: 'Deployed',
    lastModified: '2024년 2월 20일 10:15',
    origin: 'api.example.com',
  },
  {
    id: 'E3CDEFGHIJ345',
    name: '',
    domainName: 'd333333abcdef8.cloudfront.net',
    status: 'Disabled',
    state: 'Deployed',
    lastModified: '2024년 3월 5일 16:48',
    origin: 'static-website-bucket.s3.us-east-1.amazonaws.com',
  },
  {
    id: 'E4DEFGHIJK456',
    name: 'cdn-assets',
    domainName: 'd444444abcdef8.cloudfront.net',
    status: 'Enabled',
    state: 'In Progress',
    lastModified: '2024년 3월 12일 09:22',
    origin: 'cdn-static-assets.s3.us-west-2.amazonaws.com',
  },
]

function EmptyState({
  onCreateDistribution,
}: {
  onCreateDistribution: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Globe className="text-muted-foreground mb-4 h-16 w-16" />
      <div className="text-muted-foreground mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">배포가 없습니다</h3>
        <p className="text-sm">
          CloudFront 배포를 생성하여 콘텐츠를 전 세계로 빠르게 전송하세요.
        </p>
      </div>
      <Button onClick={onCreateDistribution}>배포 생성</Button>
    </div>
  )
}

interface CloudFrontDistributionListProps {
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
}

export default function CloudFrontDistributionList({
  onNext,
  onPrev,
  canGoPrev,
}: CloudFrontDistributionListProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedDistributions, setSelectedDistributions] = React.useState<
    Set<string>
  >(new Set())
  const [distributions] = React.useState<Distribution[]>(SAMPLE_DISTRIBUTIONS)

  // 검색 필터링
  const filteredDistributions = React.useMemo(() => {
    if (!searchQuery) return distributions
    return distributions.filter(
      (dist) =>
        dist.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dist.domainName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [distributions, searchQuery])

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDistributions(new Set(filteredDistributions.map((d) => d.id)))
    } else {
      setSelectedDistributions(new Set())
    }
  }

  // 개별 선택/해제
  const handleSelectDistribution = (distId: string, checked: boolean) => {
    const newSelected = new Set(selectedDistributions)
    if (checked) {
      newSelected.add(distId)
    } else {
      newSelected.delete(distId)
    }
    setSelectedDistributions(newSelected)
  }

  const handleCreateDistribution = () => {
    console.log('배포 생성 페이지로 이동')
    // Step 1로 이동하여 새 배포 생성 시작
  }

  const handleRefresh = () => {
    console.log('배포 목록 새로고침')
  }

  const handleDistributionClick = (distId: string) => {
    console.log('배포 선택:', distId)
    // 배포 선택 후 Default Root Object 설정으로 이동
    onNext()
  }

  const allSelected =
    filteredDistributions.length > 0 &&
    filteredDistributions.every((dist) => selectedDistributions.has(dist.id))

  // State 아이콘 및 색상
  const getStateIcon = (state: Distribution['state']) => {
    switch (state) {
      case 'Deployed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'Deploying':
      case 'In Progress':
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStateColor = (state: Distribution['state']) => {
    switch (state) {
      case 'Deployed':
        return 'text-green-600'
      case 'Deploying':
      case 'In Progress':
        return 'text-orange-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">배포 생성 완료</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              배포가 생성되었습니다. 배포를 선택하여 Default Root Object를
              설정하세요.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">다음 단계:</p>
            <p>
              배포를 선택하여 Default Root Object(예: index.html)를 설정하세요.
              이 설정은 루트 URL 접근 시 반환될 파일을 지정합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="배포 ID, 이름 또는 도메인으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Distribution List or Empty State */}
      {filteredDistributions.length === 0 && !searchQuery ? (
        <EmptyState onCreateDistribution={handleCreateDistribution} />
      ) : (
        <>
          {/* Selection Info */}
          {selectedDistributions.size > 0 && (
            <div className="bg-muted/50 flex items-center justify-between rounded-lg border px-4 py-2">
              <p className="text-sm">
                <span className="font-semibold">
                  {selectedDistributions.size}
                </span>
                개 선택됨
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDistributions(new Set())}
                >
                  선택 해제
                </Button>
                <Button variant="outline" size="sm">
                  비활성화
                </Button>
                <Button variant="outline" size="sm">
                  삭제
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          {filteredDistributions.length === 0 ? (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-16">
              <Search className="mb-4 h-12 w-12" />
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          ) : (
            <>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={handleSelectAll}
                          aria-label="모두 선택"
                        />
                      </TableHead>
                      <TableHead>배포 ID</TableHead>
                      <TableHead>도메인 이름</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>마지막 수정</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDistributions.map((dist) => (
                      <TableRow key={dist.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedDistributions.has(dist.id)}
                            onCheckedChange={(checked) =>
                              handleSelectDistribution(
                                dist.id,
                                checked === true,
                              )
                            }
                            aria-label={`${dist.id} 선택`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <button
                              className="text-primary font-medium hover:underline"
                              onClick={() => handleDistributionClick(dist.id)}
                            >
                              {dist.id}
                            </button>
                            {dist.name && (
                              <p className="text-muted-foreground text-xs">
                                {dist.name}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="text-muted-foreground h-4 w-4" />
                            <span className="font-mono text-sm">
                              {dist.domainName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-xs truncate text-sm">
                          {dist.origin}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {dist.status === 'Enabled' ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">
                                  활성화
                                </span>
                              </>
                            ) : (
                              <>
                                <XCircle className="text-muted-foreground h-4 w-4" />
                                <span className="text-muted-foreground text-sm">
                                  비활성화
                                </span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStateIcon(dist.state)}
                            <span
                              className={`text-sm ${getStateColor(dist.state)}`}
                            >
                              {dist.state}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {dist.lastModified}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Footer Info */}
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <p>총 {filteredDistributions.length}개의 배포</p>
                {searchQuery && (
                  <p>
                    &quot;{searchQuery}&quot; 검색 결과:{' '}
                    {filteredDistributions.length}개
                  </p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
