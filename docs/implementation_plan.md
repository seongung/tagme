# Insta-Style Dating Profile Card Generator - Implementation Plan

## 프로젝트 개요
인스타그램 감성의 소개팅 프로필 카드 생성기를 Cloudflare 기반으로 구현합니다. 사용자가 기본 정보를 입력하면 Claude AI가 매력적인 자기소개를 생성하고, 이를 아름다운 카드 디자인으로 변환하여 PNG로 다운로드할 수 있도록 합니다.

## 기술 스택
- **Frontend**: Next.js + TypeScript + Tailwind CSS (v0 기반)
- **Backend**: Cloudflare Pages Functions
- **AI**: Claude API (OpenAI-compatible format via AI Gateway)
- **Database**: Cloudflare D1
- **Image Generation**: Satori (SVG) + Resvg (PNG)
- **Additional**: QR Code generation, Canvas API

## 구현 작업 목록

### Phase 1: 프로젝트 초기 설정 및 환경 구성

- [x] ~~Cloudflare 프로젝트 설정~~
  - [ ] Cloudflare 계정 생성 및 프로젝트 초기화
  - [x] ~~wrangler.toml 파일 생성 및 설정~~
  - [ ] 환경 변수 설정 (AI Gateway API key 등)

- [x] ~~프로젝트 구조 재구성~~
  - [x] ~~v0 코드를 메인 프로젝트로 이동~~
  - [x] ~~Cloudflare Pages Functions 디렉토리 구조 설정~~
  - [x] ~~TypeScript 설정 최적화~~

### Phase 2: 백엔드 인프라 구축

- [x] ~~Cloudflare D1 데이터베이스 설정~~
  - [ ] D1 데이터베이스 생성 (`wrangler d1 create tagme-profiles`)
  - [x] ~~스키마 정의 (profiles 테이블)~~
    ```sql
    CREATE TABLE profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER,
      instagram TEXT,
      keywords TEXT,
      intro TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ```
  - [x] ~~마이그레이션 스크립트 작성~~

- [ ] Cloudflare AI Gateway 설정
  - [ ] AI Gateway 엔드포인트 구성
  - [ ] Claude API 연동 설정
  - [ ] API 키 및 권한 설정

### Phase 3: API 엔드포인트 개발

- [x] ~~`/api/generate-profile` 엔드포인트 구현~~
  - [x] ~~입력 데이터 검증~~
  - [x] ~~Claude API 호출 로직~~
  - [x] ~~응답 처리 및 에러 핸들링~~

- [x] ~~`/api/save-profile` 엔드포인트 구현~~
  - [x] ~~D1 데이터베이스 저장 로직~~
  - [x] ~~고유 ID 생성 (UUID)~~
  - [x] ~~데이터 정규화~~

- [x] ~~`/api/get-profile/[id]` 엔드포인트 구현~~
  - [x] ~~ID 기반 프로필 조회~~
  - [x] ~~캐싱 전략 구현~~

- [x] ~~`/api/generate-card` 엔드포인트 구현~~
  - [x] ~~Satori를 통한 SVG 생성~~
  - [x] ~~Resvg를 통한 PNG 변환~~
  - [ ] 이미지 최적화

### Phase 4: AI 통합 개발

- [ ] Claude API 통합
  - [ ] OpenAI-compatible 형식으로 API 호출
  - [ ] 프롬프트 엔지니어링
    ```
    당신은 소개팅 프로필 전문가입니다. 
    다음 정보를 바탕으로 매력적이고 진솔한 2-3줄의 자기소개를 작성해주세요:
    - 이름: {name}
    - 나이: {age}
    - 관심사: {keywords}
    
    톤: 친근하고 매력적이며 진솔한
    길이: 50-80자
    ```
  - [ ] 응답 파싱 및 후처리

- [ ] AI 응답 품질 개선
  - [ ] 다양한 템플릿 프롬프트 작성
  - [ ] 키워드 기반 맞춤화
  - [ ] 부적절한 내용 필터링

### Phase 5: 프론트엔드 개선 및 기능 구현

- [x] ~~UI/UX 디자인 개선~~
  - [x] ~~그라데이션 배경 애니메이션 추가~~
  - [x] ~~글래스모피즘 효과 적용~~
  - [x] ~~마이크로 인터랙션 추가~~
  - [x] ~~반응형 디자인 최적화~~

- [x] ~~입력 폼 개선~~
  - [x] ~~실시간 유효성 검증~~
  - [x] ~~입력 필드 애니메이션~~
  - [x] ~~프로그레스 인디케이터~~
  - [ ] 이미지 업로드 기능 (선택사항)

- [x] ~~프로필 카드 디자인 개선~~
  - [x] ~~프리미엄 카드 레이아웃~~
  - [x] ~~커스텀 폰트 적용 (Pretendard)~~
  - [x] ~~그림자 및 깊이 효과~~
  - [ ] 홀로그램 효과 배경

### Phase 6: 이미지 생성 및 다운로드

- [ ] Satori 통합
  - [ ] React 컴포넌트를 SVG로 변환
  - [ ] 커스텀 폰트 임베딩
  - [ ] 이미지 최적화

- [ ] Resvg 통합
  - [ ] SVG to PNG 변환
  - [ ] 해상도 옵션 (1x, 2x, 3x)
  - [ ] 파일 크기 최적화

- [ ] 다운로드 기능
  - [ ] Blob 생성 및 다운로드 트리거
  - [ ] 파일명 커스터마이징
  - [ ] 다운로드 진행률 표시

### Phase 7: QR 코드 및 공유 기능

- [x] ~~QR 코드 생성~~
  - [x] ~~qrcode.js 라이브러리 통합~~
  - [x] ~~프로필 URL 인코딩~~
  - [x] ~~QR 코드 스타일링~~

- [x] ~~공유 기능~~
  - [x] ~~Web Share API 통합~~
  - [ ] 소셜 미디어 공유 버튼
  - [x] ~~링크 복사 기능~~
  - [ ] 단축 URL 생성

### Phase 8: 성능 최적화

- [ ] 프론트엔드 최적화
  - [ ] 코드 스플리팅
  - [ ] 이미지 lazy loading
  - [ ] 번들 사이즈 최적화

- [ ] 백엔드 최적화
  - [ ] Edge 캐싱 전략
  - [ ] API 응답 압축
  - [ ] 데이터베이스 쿼리 최적화

- [ ] AI 응답 최적화
  - [ ] 응답 캐싱
  - [ ] 스트리밍 응답
  - [ ] 타임아웃 처리

### Phase 9: 테스트 및 품질 보증

- [ ] 단위 테스트
  - [ ] API 엔드포인트 테스트
  - [ ] 컴포넌트 테스트
  - [ ] 유틸리티 함수 테스트

- [ ] 통합 테스트
  - [ ] E2E 테스트 시나리오
  - [ ] 크로스 브라우저 테스트
  - [ ] 모바일 반응형 테스트

- [ ] 성능 테스트
  - [ ] 로드 테스트
  - [ ] API 응답 시간 측정
  - [ ] 메모리 사용량 모니터링

### Phase 10: 배포 및 모니터링

- [ ] 배포 준비
  - [ ] 환경 변수 설정
  - [ ] 프로덕션 빌드 최적화
  - [ ] 보안 헤더 설정

- [ ] Cloudflare Pages 배포
  - [ ] GitHub Actions 설정
  - [ ] 자동 배포 파이프라인
  - [ ] 롤백 전략

- [ ] 모니터링 설정
  - [ ] Cloudflare Analytics
  - [ ] 에러 트래킹
  - [ ] 사용자 행동 분석

## 추가 개선사항 (선택)

- [ ] 다국어 지원
- [ ] 다크 모드
- [ ] PWA 지원
- [ ] 프로필 템플릿 선택
- [ ] 소셜 로그인
- [ ] 프로필 갤러리
- [ ] AI 프로필 사진 생성

## 예상 일정

- **Week 1**: Phase 1-2 (환경 설정 및 인프라)
- **Week 2**: Phase 3-4 (API 및 AI 통합)
- **Week 3**: Phase 5-7 (프론트엔드 및 기능 구현)
- **Week 4**: Phase 8-10 (최적화, 테스트, 배포)

## 성공 지표 확인

- [ ] 프로필 카드 생성 클릭률 ≥ 70%
- [ ] 다운로드까지 완료율 ≥ 60%
- [ ] P95 카드 렌더링 시간 ≤ 5초
- [ ] QR 코드 스캔 통한 접속수 ≥ 50명

---

각 작업 완료 시 체크박스에 X 표시하거나 ~~취소선~~을 사용하여 진행 상황을 추적하세요.