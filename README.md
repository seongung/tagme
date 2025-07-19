# Tagme - 인스타 스타일 소개팅 프로필 카드 생성기

AI 기반 매력적인 소개팅 프로필 카드를 생성하고 공유할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 🤖 **AI 자기소개 생성**: Claude AI가 입력된 정보를 바탕으로 매력적인 자기소개를 자동 생성
- 🎨 **아름다운 카드 디자인**: 인스타그램 감성의 프리미엄 프로필 카드
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두에서 완벽하게 작동
- 🔗 **QR 코드 생성**: 프로필 공유를 위한 QR 코드 자동 생성
- 💾 **PNG 다운로드**: 고화질 프로필 카드 이미지 다운로드
- 🚀 **Cloudflare 기반**: 빠른 성능과 글로벌 배포

## 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Cloudflare Pages Functions
- **Database**: Cloudflare D1
- **AI**: Claude API (via Cloudflare AI Gateway)
- **Image Generation**: Satori + Resvg
- **Deployment**: Cloudflare Pages

## 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- pnpm (또는 npm/yarn)
- Cloudflare 계정
- Claude API 키 (선택사항)

### 설치

1. 저장소 클론
```bash
git clone https://github.com/yourusername/tagme.git
cd tagme
```

2. 의존성 설치
```bash
pnpm install
```

3. 환경 변수 설정
```bash
cp .env.example .env.local
```

4. 개발 서버 실행
```bash
pnpm dev
```

### Cloudflare 설정

1. D1 데이터베이스 생성
```bash
wrangler d1 create tagme-profiles
```

2. 데이터베이스 스키마 초기화
```bash
pnpm db:init
```

3. Cloudflare Pages에 배포
```bash
pnpm deploy
```

## 프로젝트 구조

```
tagme/
├── app/                    # Next.js 앱 디렉토리
├── components/            # React 컴포넌트
├── functions/            # Cloudflare Pages Functions
│   └── api/             # API 엔드포인트
├── lib/                 # 유틸리티 함수
├── public/              # 정적 파일
├── styles/              # 스타일 파일
└── docs/                # 문서
```

## API 엔드포인트

- `POST /api/generate-profile`: AI 프로필 생성
- `GET /api/get-profile/[id]`: 프로필 조회
- `POST /api/generate-card`: 프로필 카드 이미지 생성

## 개발 가이드

자세한 개발 가이드는 [CLAUDE.md](./CLAUDE.md) 파일을 참조하세요.

## 라이선스

MIT License