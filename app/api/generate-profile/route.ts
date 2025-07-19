import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Emoji mapping for common Korean interests/keywords
function addEmojisToKeywords(keywords: string[]): string[] {
  const emojiMap: { [key: string]: string } = {
    '여행': '✈️',
    '카페': '☕',
    '맛집': '🍽️',
    '요리': '👨‍🍳',
    '영화': '🎬',
    '음악': '🎵',
    '운동': '💪',
    '헬스': '🏋️',
    '요가': '🧘',
    '독서': '📚',
    '사진': '📷',
    '그림': '🎨',
    '강아지': '🐕',
    '고양이': '🐈',
    '산책': '🚶',
    '게임': '🎮',
    '쇼핑': '🛍️',
    '패션': '👗',
    '뷰티': '💄',
    '드라마': '📺',
    '넷플릭스': '📺',
    '캠핑': '🏕️',
    '등산': '⛰️',
    '수영': '🏊',
    '러닝': '🏃',
    '와인': '🍷',
    '맥주': '🍺',
    '커피': '☕',
    '디저트': '🍰',
    '베이킹': '🧁',
    '춤': '💃',
    '노래': '🎤',
    '드라이브': '🚗',
    '전시회': '🖼️',
    '공연': '🎭',
    '봉사': '🤝',
    '명상': '🧘‍♀️',
    '테니스': '🎾',
    '골프': '⛳',
    '축구': '⚽',
    '농구': '🏀',
    '야구': '⚾',
    '필라테스': '🤸',
    '자전거': '🚴',
    '꽃': '🌸',
    '식물': '🌱',
    '브런치': '🥐',
    '콘서트': '🎫',
    '뮤지컬': '🎭',
    '미술관': '🏛️',
    '바다': '🌊',
    '산': '🏔️',
    '자연': '🌿',
    '반려동물': '🐾',
    '글쓰기': '✍️',
    '개발': '💻',
    '책': '📖',
  }
  
  return keywords.map(keyword => {
    const cleanKeyword = keyword.startsWith('#') ? keyword : `#${keyword}`
    const keywordWithoutHash = keyword.replace('#', '')
    
    // Check for exact match (case sensitive for Korean)
    const emoji = emojiMap[keywordWithoutHash] || '✨'
    
    // Only add emoji if keyword doesn't already have one
    const hasEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(cleanKeyword)
    if (!hasEmoji) {
      return `${cleanKeyword} ${emoji}`
    }
    return cleanKeyword
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.name || !body.age) {
      return NextResponse.json(
        { error: 'Name and age are required' },
        { status: 400 }
      )
    }

    const keywordArray = body.keywords
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0)

    // Determine tone based on age
    const age = parseInt(body.age)
    let toneInstructions = ''
    
    if (age >= 20 && age <= 25) {
      toneInstructions = `
톤: Gen Z 스타일, 캐주얼하고 재미있게
- "ㅋㅋㅋ", "ㅎㅎ" 같은 표현 자연스럽게 사용
- 이모티콘이나 느낌표로 활기찬 느낌
- 트렌디한 표현 사용 (예: "갓생 살기", "존맛탱", "찐친")
- 짧고 임팩트 있는 문장`
    } else if (age >= 26 && age <= 30) {
      toneInstructions = `
톤: 밀레니얼 감성, 균형잡힌 캐주얼
- 친근하면서도 진중한 톤
- 일상적이고 공감가는 표현
- 적당한 유머와 위트
- 자연스럽고 편안한 대화체`
    } else if (age >= 31 && age <= 40) {
      toneInstructions = `
톤: 성숙하면서도 따뜻한
- 진솔하고 안정감 있는 표현
- 구체적인 가치관이나 목표 언급
- 경험에서 우러나온 이야기
- 품격 있으면서도 친근한 어투`
    } else {
      toneInstructions = `
톤: 우아하고 지적인
- 깊이 있고 사려 깊은 표현
- 인생의 지혜가 느껴지는 문장
- 여유롭고 품격 있는 어투
- 따뜻하고 포용력 있는 느낌`
    }

    const mbtiInfo = body.mbti ? `- MBTI: ${body.mbti}\n` : ''

    const prompt = `당신은 자연스럽고 매력적인 자기소개를 쓰는 전문가입니다.

다음 정보로 일상적인 대화하듯 자연스러운 자기소개를 작성해주세요:
- 이름: ${body.name}
- 나이: ${body.age}세
${mbtiInfo}- 관심사: ${keywordArray.join(', ')}

${toneInstructions}

요구사항:
- 딱딱한 소개팅 앱 느낌이 아닌, 친구에게 자신을 소개하는 듯한 자연스러운 문체
- 100-150자 내외로 충실하게 작성
- 관심사를 자연스럽게 녹여내기
${body.mbti ? '- MBTI 특성을 재치있게 반영' : ''}
- 진부한 표현 피하기 (예: "안녕하세요, OO입니다" 같은 시작 피하기)
- 개성 있고 기억에 남는 소개

자기소개:`

    let intro = generateFallbackIntro(body.name, keywordArray, age, body.mbti)

    // Try Gemini API if configured
    // @ts-ignore
    if (process.env.GEMINI_API_KEY) {
      try {
        // @ts-ignore
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `당신은 한국어로 소개팅 프로필을 작성하는 전문가입니다. 매력적이고 진솔한 자기소개를 작성해주세요.\n\n${prompt}`
              }]
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 400,
              topP: 0.95,
              topK: 40
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_NONE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_NONE"
              }
            ]
          })
        })

        if (geminiResponse.ok) {
          const data = await geminiResponse.json()
          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            intro = data.candidates[0].content.parts[0].text.trim()
            // Don't truncate - we want the full natural introduction
          }
        }
      } catch (error) {
        console.error('Error calling Gemini API:', error)
      }
    }

    // Add emojis to keywords
    const keywordsWithEmojis = addEmojisToKeywords(keywordArray)
    
    const profileData = {
      name: body.name,
      age: body.age,
      instagram: body.instagram || '',
      mbti: body.mbti || '',
      keywords: keywordsWithEmojis,
      intro: intro
    }

    const profileId = crypto.randomUUID()

    // Save to D1 if available - try multiple approaches
    // @ts-ignore
    let db = process.env?.DB || globalThis?.DB || globalThis?.__env?.DB;
    if (db) {
      try {
        await db.prepare(
          'INSERT INTO profiles (id, name, age, instagram, mbti, keywords, intro) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          profileId,
          profileData.name,
          profileData.age,
          profileData.instagram,
          profileData.mbti,
          JSON.stringify(profileData.keywords),
          profileData.intro
        ).run()
      } catch (error) {
        console.error('Error saving to database:', error)
      }
    }

    return NextResponse.json({
      success: true,
      profileId,
      profile: profileData,
      debug: {
        keywordArray: keywordArray,
        keywordsWithEmojis: keywordsWithEmojis
      }
    })

  } catch (error) {
    console.error('Error generating profile:', error)
    return NextResponse.json(
      { error: 'Failed to generate profile' },
      { status: 500 }
    )
  }
}

function generateFallbackIntro(name: string, keywords: string[], age: number, mbti?: string): string {
  const randomKeyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)] : ''
  
  if (age >= 20 && age <= 25) {
    const templates = [
      `${randomKeyword} 덕후 ${name}이에요ㅋㅋㅋ 요즘 갓생 살려고 노력중인데 현실은 침대와 찐친이죠ㅎㅎ 같이 재밌는 일상 만들어가실 분 찾아요!`,
      `${name}이구요~ ${age}살 ${mbti ? mbti + ' ' : ''}${randomKeyword} 좋아하는 사람이에요!! 존맛탱 맛집 찾아다니면서 인생 즐기는 중 ㅎㅎ`,
      `평소엔 ${randomKeyword} 하면서 소확행 찾는 ${name}입니다~ 재밌는 얘기하면서 킥킥대실 분 구해요 ㅋㅋㅋ`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  } else if (age >= 26 && age <= 30) {
    const templates = [
      `${randomKeyword}를 좋아하는 ${age}살 ${name}입니다. ${mbti ? mbti + '답게 ' : ''}일할 땐 열심히, 놀 땐 제대로 노는 스타일이에요. 편하게 일상 공유하면서 서로 좋은 영향 주고받을 수 있으면 좋겠어요.`,
      `${name}이에요. 주말엔 ${randomKeyword} 즐기면서 워라밸 지키려고 노력하는 중이에요. ${mbti ? mbti + ' 특유의 ' : ''}소소한 일상 속에서 특별한 순간들 만들어갈 분 찾고 있어요.`,
      `평범한 직장인 ${name}입니다. ${randomKeyword}에 진심인 편이고, 함께 있으면 편안하고 즐거운 사람이 되고 싶어요. 서로의 취미 공유하면서 성장할 수 있는 관계면 좋겠네요.`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  } else if (age >= 31 && age <= 40) {
    const templates = [
      `${age}살 ${name}입니다. ${mbti ? mbti + '로서 ' : ''}${randomKeyword}를 통해 삶의 균형을 찾아가고 있어요. 서로의 가치관을 존중하며 함께 성장할 수 있는 진솔한 만남을 희망합니다.`,
      `${randomKeyword}를 즐기며 나름의 방식으로 일상을 채워가는 ${name}입니다. 이제는 혼자보다 둘이서 만들어가는 추억이 더 의미 있을 나이가 된 것 같네요.`,
      `${name}이라고 합니다. ${mbti ? mbti + ' 성향으로 ' : ''}깊이 있는 대화와 ${randomKeyword} 같은 취미 생활을 중요하게 생각해요. 서로를 이해하고 배려하는 성숙한 관계를 만들어가고 싶습니다.`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  } else {
    const templates = [
      `${name}입니다. 인생의 많은 계절을 지나며 ${randomKeyword}의 즐거움을 알게 되었어요. ${mbti ? mbti + '답게 ' : ''}이제는 조급하지 않고 여유롭게, 서로를 있는 그대로 받아들일 수 있는 만남을 기대합니다.`,
      `${randomKeyword}를 사랑하는 ${name}입니다. 나이가 주는 지혜로 상대방을 더 깊이 이해하고 포용할 수 있게 되었네요. 함께 걸으며 이야기 나눌 동반자를 찾고 있습니다.`,
      `오랜 시간 쌓아온 경험과 ${randomKeyword}에 대한 애정을 나눌 수 있는 ${name}입니다. ${mbti ? mbti + '의 ' : ''}따뜻함으로 서로에게 위안이 되는 관계를 만들어가고 싶어요.`,
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }
}