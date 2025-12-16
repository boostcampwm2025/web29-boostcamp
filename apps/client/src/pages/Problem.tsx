import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import '@xyflow/react'
import { ReactFlow } from '@xyflow/react'

export interface IFormValues {
  instance: string
  ami: string
  vpc: string
  subnet: string
  securityGroup: string
}

function Problem() {
  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: {
      instance: 't2.micro',
      ami: '',
      vpc: '',
      subnet: '',
      securityGroup: '',
    },
  })
  return (
    <section className="grid grid-cols-[450px_1fr] h-screen">
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="problem">problem</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>문제설명</CardTitle>
            </CardHeader>
            <CardContent>정상 동작하는 EC2 인스턴스를 생성하세요.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="problem">
          <Card>
            <CardHeader>
              <CardTitle>EC2 인스턴스 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <Controller
                  name="instance"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <Label className="mb-2">인스턴스 타입</Label>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="인스턴스 타입: t2.micro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t2.micro">t2.micro</SelectItem>
                        <SelectItem value="t2.small">t2.small</SelectItem>
                        <SelectItem value="t3.micro">t3.micro</SelectItem>
                        <SelectItem value="t3.small">t3.small</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                f
                <Controller
                  name="ami"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <Label className="mb-2">AMI</Label>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="Amazon linux 2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon-linux-2">Amazon 2</SelectItem>
                        <SelectItem value="ubuntu-20.04">
                          Ubuntu 20.04
                        </SelectItem>
                        <SelectItem value="ubuntu-22.04">
                          Ubuntu 22.04
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="vpc"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <Label className="mb-2">VPC</Label>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="VPC (default)" />
                      </SelectTrigger>
                    </Select>
                  )}
                />
                <Controller
                  name="subnet"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <Label className="mb-2">서브넷</Label>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="subnet-public-1a" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t2.micro">
                          subnet-public-1a
                        </SelectItem>
                        <SelectItem value="t2.small">
                          subnet-public-1b
                        </SelectItem>
                        <SelectItem value="t3.micro">
                          subnet-private-1a
                        </SelectItem>
                        <SelectItem value="t3.small">
                          subnet-private-1b
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="securityGroup"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <Label className="mb-2">보안 그룹</Label>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="인스턴스 타입: t2.micro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sg-ssh">
                          sg-ssh (SSH 허용)
                        </SelectItem>
                        <SelectItem value="sg-web">
                          sg-web (HTTP/HTTPS 허용)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" type="button">
                    힌트 보기
                  </Button>
                  <Button type="submit">인스턴스 시작</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <ReactFlow nodes={[]} edges={[]} fitView />
      </div>
    </section>
  )
}

export default Problem
