export type FeedbackDetail = {
  serviceType?: string // 서비스 종류 (s3, ec2, vpc 등)
  service?: string // 리소스 이름
  field?: string // 문제가 있는 필드
  code: string // 피드백 코드 (그룹핑 키로 사용)
  message: string // 표시 메시지
}
