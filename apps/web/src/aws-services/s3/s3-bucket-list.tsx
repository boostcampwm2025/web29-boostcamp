'use client'

import { Lock, LockOpen, RefreshCw, Search } from 'lucide-react'

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
interface Bucket {
  id: string
  name: string
  region: string
  access: 'public' | 'private'
  createdAt: string
}

// 샘플 버킷 데이터
const SAMPLE_BUCKETS: Bucket[] = [
  {
    id: '1',
    name: 'my-application-assets',
    region: '아시아 태평양(서울) ap-northeast-2',
    access: 'private',
    createdAt: '2024년 1월 15일',
  },
  {
    id: '2',
    name: 'user-uploads-prod',
    region: '아시아 태평양(서울) ap-northeast-2',
    access: 'private',
    createdAt: '2024년 2월 20일',
  },
  {
    id: '3',
    name: 'static-website-bucket',
    region: '미국 동부(버지니아 북부) us-east-1',
    access: 'public',
    createdAt: '2024년 3월 5일',
  },
  {
    id: '4',
    name: 'backup-data-storage',
    region: '아시아 태평양(도쿄) ap-northeast-1',
    access: 'private',
    createdAt: '2024년 3월 12일',
  },
]

function EmptyState({ onCreateBucket }: { onCreateBucket: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-muted-foreground mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">버킷이 없습니다</h3>
        <p className="text-sm">버킷을 생성하여 객체를 저장하고 관리하세요.</p>
      </div>
      <Button onClick={onCreateBucket}>버킷 생성</Button>
    </div>
  )
}

interface S3BucketListProps {
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
}

export default function S3BucketList({
  onNext,
  onPrev,
  canGoPrev,
}: S3BucketListProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedBuckets, setSelectedBuckets] = React.useState<Set<string>>(
    new Set(),
  )
  const [buckets] = React.useState<Bucket[]>(SAMPLE_BUCKETS)

  // 검색 필터링
  const filteredBuckets = React.useMemo(() => {
    if (!searchQuery) return buckets
    return buckets.filter((bucket) =>
      bucket.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [buckets, searchQuery])

  // 전체 선택/해제
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBuckets(new Set(filteredBuckets.map((b) => b.id)))
    } else {
      setSelectedBuckets(new Set())
    }
  }

  // 개별 선택/해제
  const handleSelectBucket = (bucketId: string, checked: boolean) => {
    const newSelected = new Set(selectedBuckets)
    if (checked) {
      newSelected.add(bucketId)
    } else {
      newSelected.delete(bucketId)
    }
    setSelectedBuckets(newSelected)
  }

  const handleCreateBucket = () => {
    console.log('버킷 생성 페이지로 이동')
  }

  const handleRefresh = () => {
    console.log('버킷 목록 새로고침')
  }

  const handleBucketClick = (bucketName: string) => {
    console.log('버킷 선택:', bucketName)
    onNext()
  }

  const allSelected =
    filteredBuckets.length > 0 &&
    filteredBuckets.every((bucket) => selectedBuckets.has(bucket.id))

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">버킷</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Amazon S3에 저장된 객체의 컨테이너입니다.
          </p>
        </div>
        <Button onClick={handleCreateBucket}>버킷 생성</Button>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="버킷 이름으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Bucket List or Empty State */}
      {filteredBuckets.length === 0 ? (
        <EmptyState onCreateBucket={handleCreateBucket} />
      ) : (
        <>
          {/* Selection Info */}
          {selectedBuckets.size > 0 && (
            <div className="bg-muted/50 flex items-center justify-between rounded-lg border px-4 py-2">
              <p className="text-sm">
                <span className="font-semibold">{selectedBuckets.size}</span>개
                선택됨
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBuckets(new Set())}
              >
                선택 해제
              </Button>
            </div>
          )}

          {/* Table */}
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
                  <TableHead>이름</TableHead>
                  <TableHead>AWS 리전</TableHead>
                  <TableHead>액세스</TableHead>
                  <TableHead>생성 날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBuckets.map((bucket) => (
                  <TableRow key={bucket.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedBuckets.has(bucket.id)}
                        onCheckedChange={(checked) =>
                          handleSelectBucket(bucket.id, checked === true)
                        }
                        aria-label={`${bucket.name} 선택`}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-primary font-medium hover:underline"
                        onClick={() => handleBucketClick(bucket.name)}
                      >
                        {bucket.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {bucket.region}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {bucket.access === 'public' ? (
                          <>
                            <LockOpen className="text-destructive h-4 w-4" />
                            <span className="text-destructive text-sm">
                              퍼블릭
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock className="text-muted-foreground h-4 w-4" />
                            <span className="text-muted-foreground text-sm">
                              비공개
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {bucket.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Info */}
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <p>총 {filteredBuckets.length}개의 버킷</p>
            {searchQuery && (
              <p>
                &quot;{searchQuery}&quot; 검색 결과: {filteredBuckets.length}개
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
