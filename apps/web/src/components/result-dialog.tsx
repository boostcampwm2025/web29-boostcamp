'use client'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { CheckIcon, XIcon } from 'lucide-react'

import React from 'react'

import { usePathname } from 'next/navigation'

import { TSolutionStatus } from '@/hooks/useSolutionDialog'

interface ResultDialogProps {
  isOpen: boolean
  status: TSolutionStatus
  onClose: () => void
  onConfirm: () => void
}

export default function ResultDialog({
  isOpen,
  status,
  onClose,
  onConfirm,
}: ResultDialogProps) {
  const isSuccess = status === 'PASS'

  const pathname = usePathname()
  const type = pathname.split('/')[2]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[450px]! p-10 pb-8"
      >
        <DialogHeader className="items-center gap-4">
          {isSuccess ? (
            <CheckIcon className="text-primary bg-primary-foreground size-10 rounded-full p-2" />
          ) : (
            <XIcon className="text-destructive bg-destructive-foreground size-10 rounded-full p-2" />
          )}

          <DialogTitle className="font-bold">
            {isSuccess ? '정답입니다 !' : '아쉬워요'}
          </DialogTitle>

          <DialogDescription className="mt-2 text-center text-black">
            {isSuccess ? (
              <React.Fragment>
                <p>문제 해결에 성공했어요 !</p>
                {type === 'cookbook' ? (
                  <p>다음 문제로 넘어가 볼까요?</p>
                ) : (
                  <p>다른 문제에도 도전해보세요</p>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>다시 살펴볼 부분이 있어요</p>
                <p>피드백을 확인한 후 문제 설명을 다시 검토해보세요</p>
              </React.Fragment>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full justify-center! pt-4">
          {isSuccess ? (
            <Button onClick={onConfirm} className="w-full">
              {type === 'cookbook' ? '다음 문제 풀기' : '다른 문제 도전하기'}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full shadow-none"
            >
              닫기
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
