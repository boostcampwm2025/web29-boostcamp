# PR: refactor/#132-caffesale

## Summary

AWS 서비스 폼 컴포넌트의 UX 개선 및 피드백 시스템 리팩토링

## Changes

### 1. ActionFeedback 모달을 Sonner Toast로 교체

기존 커스텀 `ActionFeedbackModal` 및 `ActionFeedbackContext`를 제거하고, `sonner` 라이브러리 기반 Toast 시스템으로 전환했습니다.

**변경된 파일:**
- `apps/web/src/components/ui/action-feedback-modal.tsx` - 삭제
- `apps/web/src/contexts/action-feedback-context.tsx` - 삭제
- `apps/web/src/components/ui/sonner.tsx` - 신규 생성
- `apps/web/src/app/layout.tsx` - Toaster 컴포넌트 적용
- `apps/web/src/contexts/problem-form-context.tsx` - toast 사용으로 변경
- `apps/web/src/components/aws-services/internet-gateway/internet-gateway-attach/internet-gateway-attach.tsx` - toast 사용으로 변경
- `apps/web/src/components/aws-services/route-table/route-table-edit/route-table-edit.tsx` - toast 사용으로 변경

**추가된 패키지:**
- `sonner@^2.0.7`
- `next-themes@^0.4.6`

### 2. ServiceTitle 컴포넌트에서 버튼 prop 제거

`ServiceTitle` 컴포넌트의 책임을 타이틀/설명 표시로 단순화하고, 버튼은 각 폼 컴포넌트 하단으로 이동했습니다.

**변경된 파일:**
- `apps/web/src/components/aws-services/common/service-title.tsx` - `button` prop 제거

### 3. 폼 버튼을 폼 하단으로 이동

모든 AWS 서비스 생성 폼에서 제출 버튼을 폼 상단에서 하단으로 이동하여 UX 일관성을 개선했습니다.

**변경된 파일:**
- `apps/web/src/components/aws-services/s3/s3-bucket-create/s3-bucket-create.tsx`
- `apps/web/src/components/aws-services/cloudfront/cloudfront-cache-behavior/cloudfront-cache-behavior.tsx`
- `apps/web/src/components/aws-services/cloudfront/cloudfront-distribution-settings/cloudfront-distribution-settings.tsx`
- `apps/web/src/components/aws-services/cloudfront/cloudfront-origin-settings/cloudfront-origin-settings.tsx`
- `apps/web/src/components/aws-services/cloudfront/cloudfront-website-settings/cloudfront-website-settings.tsx`
- `apps/web/src/components/aws-services/ec2/ec2-instance-create/ec2-instance-create.tsx`

### 4. Unit Card 높이 통일

문제 목록 페이지의 Unit Card 높이를 고정하여 그리드 레이아웃의 일관성을 개선했습니다.

**변경된 파일:**
- `apps/web/src/app/(guest)/problems/(list)/components/unit/unit-card.tsx`
  - 카드 높이 고정: `h-[324px]`
  - 설명 텍스트 줄 제한: `line-clamp-3`

### 5. 기타

- `apps/web/src/app/(guest)/problems/components/left-section/form-content/problem-form-content.tsx` - 코드 포맷팅

## Commits

| Hash | Message |
|------|---------|
| 5051616 | refactor: replace ActionFeedback with sonner toast |
| 3b1a36c | style: format problem-form-content.tsx |
| af6969f | refactor: remove button prop from ServiceTitle component |
| 575ccdb | refactor: move S3 bucket create button to form bottom |
| 2c55d28 | refactor: move CloudFront form buttons to bottom |
| 87bbd11 | refactor: move EC2 instance create button to form bottom |
| 0ccc6de | style: unify Unit Card heights with fixed height layout |

## Stats

- **Files changed:** 18
- **Insertions:** 175
- **Deletions:** 269
