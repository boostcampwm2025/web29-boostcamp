'use client'

import { ChevronRight, File, Folder, Search, Upload } from 'lucide-react'

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

interface S3Object {
  id: string
  name: string
  type: 'folder' | 'file'
  size?: string
  lastModified?: string
}

const SAMPLE_OBJECTS: S3Object[] = [
  {
    id: '1',
    name: 'images',
    type: 'folder',
  },
  {
    id: '2',
    name: 'documents',
    type: 'folder',
  },
  {
    id: '3',
    name: 'index.html',
    type: 'file',
    size: '2.4 KB',
    lastModified: '2024년 12월 15일 14:30',
  },
  {
    id: '4',
    name: 'app.js',
    type: 'file',
    size: '45.2 KB',
    lastModified: '2024년 12월 20일 09:15',
  },
  {
    id: '5',
    name: 'styles.css',
    type: 'file',
    size: '8.7 KB',
    lastModified: '2024년 12월 18일 16:45',
  },
  {
    id: '6',
    name: 'README.md',
    type: 'file',
    size: '1.2 KB',
    lastModified: '2024년 12월 10일 11:20',
  },
]

function EmptyState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-muted-foreground mb-6 text-center">
        <h3 className="mb-2 text-lg font-semibold">객체가 없습니다</h3>
        <p className="text-sm">파일을 업로드하여 시작하세요.</p>
      </div>
      <Button onClick={onUpload}>
        <Upload className="mr-2 h-4 w-4" />
        업로드
      </Button>
    </div>
  )
}

interface S3BucketDetailProps {
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
}

export default function S3BucketDetail({
  onNext,
  onPrev,
  canGoPrev,
}: S3BucketDetailProps) {
  const [selectedObjects, setSelectedObjects] = React.useState<Set<string>>(
    new Set(),
  )
  const [searchQuery, setSearchQuery] = React.useState('')
  const [objects] = React.useState<S3Object[]>(SAMPLE_OBJECTS)
  const [currentPath] = React.useState('my-application-assets')

  const filteredObjects = React.useMemo(() => {
    if (!searchQuery) return objects
    return objects.filter((obj) =>
      obj.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [objects, searchQuery])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedObjects(new Set(filteredObjects.map((obj) => obj.id)))
    } else {
      setSelectedObjects(new Set())
    }
  }

  const handleSelectObject = (objectId: string, checked: boolean) => {
    const newSelected = new Set(selectedObjects)
    if (checked) {
      newSelected.add(objectId)
    } else {
      newSelected.delete(objectId)
    }
    setSelectedObjects(newSelected)
  }

  const handleUpload = () => {
    onNext()
  }

  const allSelected =
    filteredObjects.length > 0 &&
    filteredObjects.every((obj) => selectedObjects.has(obj.id))

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button className="text-primary hover:underline">버킷</button>
        <ChevronRight className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">{currentPath}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{currentPath}</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            버킷의 객체를 관리하세요
          </p>
        </div>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          업로드
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="객체 이름으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Object List or Empty State */}
      {filteredObjects.length === 0 ? (
        <EmptyState onUpload={handleUpload} />
      ) : (
        <>
          {/* Selection Info */}
          {selectedObjects.size > 0 && (
            <div className="bg-muted/50 flex items-center justify-between rounded-lg border px-4 py-2">
              <p className="text-sm">
                <span className="font-semibold">{selectedObjects.size}</span>개
                선택됨
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedObjects(new Set())}
                >
                  선택 해제
                </Button>
                <Button variant="outline" size="sm">
                  다운로드
                </Button>
                <Button variant="destructive" size="sm">
                  삭제
                </Button>
              </div>
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
                  <TableHead>유형</TableHead>
                  <TableHead>크기</TableHead>
                  <TableHead>마지막 수정 날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObjects.map((obj) => (
                  <TableRow key={obj.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedObjects.has(obj.id)}
                        onCheckedChange={(checked) =>
                          handleSelectObject(obj.id, checked === true)
                        }
                        aria-label={`${obj.name} 선택`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {obj.type === 'folder' ? (
                          <>
                            <Folder className="text-primary h-4 w-4" />
                            <button className="text-primary font-medium hover:underline">
                              {obj.name}
                            </button>
                          </>
                        ) : (
                          <>
                            <File className="text-muted-foreground h-4 w-4" />
                            <button className="text-primary font-medium hover:underline">
                              {obj.name}
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {obj.type === 'folder' ? '폴더' : '파일'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {obj.size || '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {obj.lastModified || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Info */}
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <p>총 {filteredObjects.length}개의 객체</p>
            {searchQuery && (
              <p>
                &quot;{searchQuery}&quot; 검색 결과: {filteredObjects.length}개
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
