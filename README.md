
![clc](https://github.com/user-attachments/assets/d2853850-f5ac-4b8f-b5e8-a0cc1cafa925)

[![hits](https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2Fboostcampwm2025%2Fweb29-LBD?color=blue&label=hits&size=small)](https://myhits.vercel.app)

<br/>

## ☁️ 프로젝트 소개

> **CloudCraft**는 실제 클라우드 계정 없이 콘솔형 UI에서 직접 설정을 조작하며 클라우드 아키텍처와 동작을 직관적으로 학습할 수 있도록 돕는 시뮬레이션 플랫폼입니다.

클라우드 서비스에 대한 이론적 지식만으로는 실제 클라우드 인프라 구축이 어려울 수 있습니다. CloudCraft는 실습 환경을 제공하여 **Learning by Doing** 방식으로 클라우드 서비스를 체험하고 학습할 수 있도록 지원합니다.

### 핵심 가치

- **비용 부담 없음**: AWS 계정 없이 무료로 학습 가능
- **대화형 학습**: 실제 AWS 콘솔과 유사한 UI로 직접 조작
- **실시간 시각화**: 설정에 따른 아키텍처 다이어그램 자동 생성
- **즉각적 피드백**: 답안 검증 및 상세한 피드백 제공
- **단계별 학습**: Unit 문제부터 복합 Cookbook까지 체계적 커리큘럼

### 프로젝트 기간

`2025.12.08 ~ 26.02.05`

<br/>

## ☁️ 주요 기능

### 1. 콘솔형 UI

<img alt="스크린샷 2026-02-01 오후 8 54 52" src="https://github.com/user-attachments/assets/093258c5-b0c6-4f25-8cb9-3f8ec00245ac" />

AWS 실제 콘솔과 유사한 인터페이스로 다양한 클라우드 서비스를 설정할 수 있습니다.

**지원 서비스**
- **컴퓨팅**: EC2 Instance, Security Group
- **네트워킹**: VPC, Subnet, Route Table
- **스토리지**: S3 Bucket
- **CDN**: CloudFront
- 추가 서비스 확장 예정 (IAM, RDS 등)

### 2. 실시간 아키텍처 다이어그램

<img alt="스크린샷 2026-02-01 오후 8 51 05" src="https://github.com/user-attachments/assets/b209bef2-681b-4f21-be52-4020daa9dc41" />

사용자의 서비스 설정에 따라 React Flow 기반의 인터랙티브한 아키텍처 다이어그램이 자동 생성됩니다.

**특징**
- 서비스 간 연결 관계 시각화
- 줌 인/아웃 및 패닝 지원

### 3. 문제 유형 시스템

#### Unit 문제

<img alt="스크린샷 2026-02-01 오후 8 49 06" src="https://github.com/user-attachments/assets/b3b3bd6b-db51-4e48-9e2c-ed0c5683b224" />

클라우드 서비스 설정을 학습하는 기본 문제입니다.
- 예: "EC2 인스턴스 생성하기", "S3 버킷 만들기"

#### Cookbook 문제

<img alt="스크린샷 2026-02-01 오후 8 49 25" src="https://github.com/user-attachments/assets/c188eefe-a5a2-48af-8029-fe349e8e1d3b" />

여러 Unit 문제를 조합한 복합 시나리오 문제입니다.
- 예: "S3 + CloudFront로 정적 웹사이트 배포하기"
- 실무 아키텍처 패턴 학습

<br/>

## ☁️ 기술 스택

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Diagram**: @xyflow/react (React Flow)
- **Form**: React Hook Form + Zod
- **Testing**: Jest

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: MySQL
- **Testing**: Jest

### DevOps & Tools
- **Package Manager**: pnpm (monorepo)
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions, Netlify
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

<br/>

## ☁️ 프로젝트 구조

```
web29-boostcamp/
├── apps/
│   ├── server/              # NestJS Backend
│   │   ├── src/
│   │   │   ├── cookbooks/   # Cookbook 문제 API
│   │   │   ├── problems/    # Problem 문제 API
│   │   │   ├── entities/    # TypeORM 엔티티
│   │   │   ├── migrations/  # DB 마이그레이션
│   │   │   └── seeds/       # 시드 데이터
│   │   └── test/            # 테스트
│   │
│   └── web/                 # Next.js Frontend
│       ├── src/
│       │   ├── app/         # App Router 페이지
│       │   ├── components/  # 재사용 컴포넌트
│       │   │   ├── aws-services/  # AWS 서비스 UI
│       │   │   └── diagram/       # 다이어그램 컴포넌트
│       │   ├── contexts/    # React Context
│       │   ├── hooks/       # Custom Hooks
│       │   ├── lib/         # 라이브러리 및 유틸 함수	
│       │   └── types/       # TypeScript 타입 정의
│       └── public/
│
├── docker-compose.yml       # 프로덕션 배포 설정
├── pnpm-workspace.yaml      # Monorepo 설정
└── package.json
```

<br/>

## ☁️ 설치 및 실행

### 사전 요구사항

- Node.js 20 이상
- pnpm 8 이상
- Docker & Docker Compose (선택사항)
- MySQL 8 이상 (로컬 개발시)

### 로컬 개발 환경 설정

#### 1. 저장소 클론

```bash
git clone https://github.com/boostcampwm2025/web29-boostcamp.git
cd web29-boostcamp
```

#### 2. 의존성 설치

```bash
pnpm install
```

#### 3. 환경 변수 설정 (선택사항)

로컬 개발시에는 기본 포트(Frontend: 3000, Backend: 3001)로 자동 설정되어 별도 환경변수 설정이 필요 없습니다.


**Backend (`apps/server/.env`)**
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=cloudcraft

# Application (선택사항, 기본값: 3001)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### 4. 데이터베이스 설정

```bash
# MySQL 데이터베이스 생성
mysql -u root -p
CREATE DATABASE cloudcraft;

# 마이그레이션 실행
cd apps/server
pnpm migration:run

# 시드 데이터 삽입
pnpm seed
```

#### 5. 개발 서버 실행

```bash
# 루트 디렉토리에서 전체 실행
pnpm dev

# 또는 개별 실행
pnpm dev:web  # Frontend만 실행
cd apps/server && pnpm start:dev  # Backend만 실행
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api

### Docker를 사용한 실행

```bash
# 프로덕션 빌드 및 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 종료
docker-compose down
```

<br/>

## ☁️ 테스트

```bash
# 전체 테스트
pnpm test

# Frontend 테스트
cd apps/web
pnpm test
pnpm test:watch      # Watch 모드
pnpm test:coverage   # 커버리지

# Backend 테스트
cd apps/server
pnpm test
pnpm test:e2e       # E2E 테스트
pnpm test:cov       # 커버리지
```

<br/>

## ☁️ 데이터베이스 스키마

주요 엔티티 관계:

```
User (사용자)
  ↓
Problem (문제)
  ├── Unit 문제 (독립적)
  └── Cookbook 문제
         ↓
      CookbookProblem (연결 테이블)
         ↓
      여러 Unit 문제들
         ↓
      Solution (정답)
```

상세 스키마는 [데이터베이스 설계](https://github.com/boostcampwm2025/web29-LBD/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84) 에서 확인할 수 있습니다.

<br/>

## ☁️ 기여 가이드

### 브랜치 전략

- `main`: 메인 브랜치 (직접 push 금지)
- `feat/*`: 기능 개발
- `fix/*`: 버그 수정
- `refactor/*`: 리팩토링
- `docs/*`: 문서 작업

### 커밋 컨벤션

| 타입 | 설명 |
| --- | --- |
| **feat** | 새로운 기능 정의 또는 추가, 새로운 타입 정의 |
| **add** | 이미지·아이콘 등 리소스 파일 추가 |
| **refactor** | 코드 리팩토링 또는 구조 개선 (파일/폴더 이동 포함) |
| **design** | UI 스타일링 (CSS 작업 등) |
| **fix** | 버그 수정 |
| **del** | 파일 삭제 |
| **docs** | 문서 수정 (README 등) |
| **test** | 테스트 코드 작성 |
| **gitfix** | `.gitignore` 수정 |
| **chore** | 주석 추가/제거, 포맷팅, 세미콜론 보완 등 코드 작동에 영향 없는 정리 작업 |
| **setting** | 프로젝트 설정 관련 작업 (패키지 설치 등) |
| **deploy** | 배포 관련 작업 |


### Pull Request

1. 이슈 생성 및 할당
2. 브랜치 생성
3. 코드 작성 및 테스트
4. PR 생성
5. 최소 1명의 리뷰 승인 필요
6. CI 테스트 통과 후 머지
<br/>

## ☁️ 인프라 아키텍처 다이어그램

<img alt="스크린샷 2026-02-01 오후 7 06 31" src="https://github.com/user-attachments/assets/ad3ad154-6f94-4a34-a0e6-2832216fd114" />

<br/>

## ☁️ 개발 팀

> 🐥 러닝바이두잉(Learning by Doing)을 실천하는 팀 **러바두** 입니다!

<table>
  <tr align="center">
    <th>J047_김승현</th>
    <th>J057_김용준</th>
    <th>J254_조윤주</th>
    <th>J303_김동규</th>
  </tr>
  <tr align="center">
    <td>
      <img src="https://avatars.githubusercontent.com/u/130816706" width="120px"/>
      <br/>
      <a href="https://github.com/vvzvvv" target="_blank">
       <b>vvzvvv</b>
      </a>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/212116342" width="120px"/>
      <br/>
      <a href="https://github.com/shahhenshah" target="_blank">
       <b>shahhenshah</b>
      </a>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/125597330" width="120px"/>
      <br/>
      <a href="https://github.com/zooyaam" target="_blank">
       <b>zooyaam</b>
      </a>
    </td>
    <td>
      <img src="https://avatars.githubusercontent.com/u/106072839" width="120px"/>
      <br/>
      <a href="https://github.com/caffesale" target="_blank">
       <b>caffesale</b>
      </a>
    </td>
  </tr>
</table>

<br/>

## ☁️ 라이선스

이 프로젝트는 부스트캠프 웹·모바일 10기 그룹 프로젝트입니다.

<br/>

## 🔗 링크

- [Wiki](https://github.com/boostcampwm2025/web29-boostcamp/wiki)
- [프로젝트 보드](https://github.com/orgs/boostcampwm2025/projects/269)

---

<div align="center">
  
**CloudCraft**로 클라우드 여정을 시작하세요! ☁️✨

Made by Team 러바두

</div>
