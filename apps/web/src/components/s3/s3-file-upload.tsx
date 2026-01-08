'use client'

import { ChevronRight, File, Upload, X } from 'lucide-react'

import React from 'react'

import { SectionContainer } from '@/components/section-container'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface UploadFile {
  id: string
  name: string
  size: string
}

interface S3FileUploadProps {
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean
}

export default function S3FileUpload({
  onNext,
  onPrev,
  canGoPrev,
}: S3FileUploadProps) {
  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      addFiles(Array.from(selectedFiles))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
    }))

    setFiles((prev) => [...prev, ...uploadFiles])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleUploadClick = () => {
    console.log('업로드할 파일:', files)
    alert('실제 업로드 기능은 구현되지 않았습니다.')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button className="text-primary hover:underline" onClick={onPrev}>
          my-application-assets
        </button>
        <ChevronRight className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">업로드</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">업로드</h2>
        <p className="text-muted-foreground">
          파일 및 폴더를 my-application-assets에 업로드하세요
        </p>
      </div>

      {/* File Upload Section */}
      <SectionContainer
        title="파일 및 폴더"
        description="업로드할 파일과 폴더를 추가하세요"
      >
        <div className="space-y-4">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 bg-muted/20'
            }`}
          >
            <Upload
              className={`mb-4 h-12 w-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <p className="mb-2 text-center font-medium">
              {isDragging
                ? '여기에 파일을 놓으세요'
                : '파일을 드래그 앤 드롭하거나'}
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              파일 선택
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <p className="text-muted-foreground mt-4 text-sm">
              또는 폴더를 드래그 앤 드롭하여 업로드
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">
                선택된 파일 ({files.length})
              </p>
              <div className="space-y-2">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-muted/50 flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <File className="text-muted-foreground h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {file.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Permissions */}
      <SectionContainer
        title="권한"
        description="업로드된 파일에 대한 액세스 권한을 지정하세요"
      >
        <RadioGroup defaultValue="private">
          <div className="flex items-start gap-3">
            <RadioGroupItem value="private" id="private" />
            <div className="space-y-1">
              <Label htmlFor="private" className="font-medium">
                비공개(권장)
              </Label>
              <p className="text-muted-foreground text-sm">
                버킷 소유자만 객체에 액세스할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RadioGroupItem value="public-read" id="public-read" />
            <div className="space-y-1">
              <Label htmlFor="public-read" className="font-medium">
                퍼블릭 읽기 액세스 권한 부여
              </Label>
              <p className="text-muted-foreground text-sm">
                모든 사용자가 객체를 읽을 수 있습니다.
              </p>
            </div>
          </div>
        </RadioGroup>
      </SectionContainer>

      {/* Properties */}
      <SectionContainer
        title="속성"
        description="객체의 스토리지 클래스 및 메타데이터를 설정하세요"
      >
        <div className="space-y-4">
          {/* Storage Class */}
          <div className="space-y-2">
            <Label htmlFor="storage-class">스토리지 클래스</Label>
            <Select defaultValue="standard">
              <SelectTrigger id="storage-class" className="max-w-md">
                <SelectValue placeholder="스토리지 클래스 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  Standard - 자주 액세스하는 데이터
                </SelectItem>
                <SelectItem value="intelligent-tiering">
                  Intelligent-Tiering - 액세스 패턴이 변경되는 데이터
                </SelectItem>
                <SelectItem value="standard-ia">
                  Standard-IA - 자주 액세스하지 않는 데이터
                </SelectItem>
                <SelectItem value="onezone-ia">
                  One Zone-IA - 자주 액세스하지 않는 중요하지 않은 데이터
                </SelectItem>
                <SelectItem value="glacier">
                  Glacier Instant Retrieval - 즉시 액세스가 필요한 아카이브
                  데이터
                </SelectItem>
                <SelectItem value="glacier-flexible">
                  Glacier Flexible Retrieval - 즉시 액세스가 필요하지 않은
                  아카이브 데이터
                </SelectItem>
                <SelectItem value="deep-archive">
                  Glacier Deep Archive - 장기 아카이브
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-muted-foreground text-sm">
              스토리지 클래스는 객체가 저장되는 방식과 비용에 영향을 줍니다.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 pt-6">
        <Button variant="outline" onClick={onPrev}>
          취소
        </Button>
        <Button
          onClick={handleUploadClick}
          disabled={files.length === 0}
          className="min-w-[120px]"
        >
          업로드
        </Button>
      </div>
    </div>
  )
}
