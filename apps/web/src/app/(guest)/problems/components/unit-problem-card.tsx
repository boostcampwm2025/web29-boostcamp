import { PlayIcon, TagIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const UnitProblemCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VPC 서브넷 구성</CardTitle>
        <div className="flex gap-1">
          <Badge variant={'secondary'} className="rounded-md">
            <TagIcon className="h-4 w-4" />
            Badge
          </Badge>
          <Badge variant={'secondary'} className="rounded-md">
            <TagIcon className="h-4 w-4" />
            Badge
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Public 서브넷에 EC2 인스턴스를 배치하세요
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button className="w-full font-semibold" variant={'ghost'}>
          <PlayIcon className="mr-1" />
          문제 풀기
        </Button>
      </CardFooter>
    </Card>
  )
}
