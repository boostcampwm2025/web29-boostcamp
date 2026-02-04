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

import { usePathname } from 'next/navigation'

import { TSolutionStatus } from '@/hooks/useSolutionDialog'

interface ResultDialogProps {
  isOpen: boolean
  status: TSolutionStatus
  variant?: 'DEFAULT' | 'COOKBOOK_LAST_UNIT'
  onClose: () => void
  onConfirm: () => void
}

export default function ResultDialog({
  isOpen,
  status,
  variant = 'DEFAULT',
  onClose,
  onConfirm,
}: ResultDialogProps) {
  const pathname = usePathname()
  const type = pathname.split('/')[2]

  const dialogConfig = {
    PASS: {
      icon: (
        <CheckIcon className="text-primary bg-primary-foreground size-10 rounded-full p-2" />
      ),
      title: variant === 'COOKBOOK_LAST_UNIT' ? '축하합니다 !' : '정답입니다 !',
      description:
        variant === 'COOKBOOK_LAST_UNIT' ? (
          <>
            <span>하나의 쿡북을 전부 완료했어요!</span>
            <br />
            <span>더 많은 아키텍처 문제들이 기다리고 있어요</span>
          </>
        ) : (
          <>
            <span>문제 해결에 성공했어요 !</span>
            <br />
            <span>
              {type === 'cookbook'
                ? '다음 문제로 넘어가 볼까요?'
                : '다른 문제에도 도전해보세요'}
            </span>
          </>
        ),
      buttonText:
        type === 'cookbook'
          ? variant === 'COOKBOOK_LAST_UNIT'
            ? '문제 목록으로 이동하기'
            : '다음 문제 풀기'
          : '다른 문제 도전하기',
      buttonVariant: 'default' as const,
      onClick: onConfirm,
    },

    FAIL: {
      icon: (
        <XIcon className="text-destructive bg-destructive-foreground size-10 rounded-full p-2" />
      ),
      title: '아쉬워요',
      description: (
        <>
          <span>다시 살펴볼 부분이 있어요</span>
          <br />
          <span>피드백을 확인한 후 문제 설명을 다시 검토해보세요</span>
        </>
      ),
      buttonText: '닫기',
      buttonVariant: 'outline' as const,
      onClick: onClose,
    },
  } as const

  if (status === 'IDLE') {
    return null
  }

  const config = dialogConfig[status]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[450px]! p-10 pb-8"
      >
        <DialogHeader className="items-center gap-4">
          {config.icon}

          <DialogTitle className="font-bold">{config.title}</DialogTitle>

          <DialogDescription className="mt-2 text-center text-black">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full justify-center! pt-4">
          <Button
            variant={config.buttonVariant}
            onClick={config.onClick}
            className="w-full shadow-none"
          >
            {config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
