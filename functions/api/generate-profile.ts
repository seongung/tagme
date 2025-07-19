import { Env } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Parse request body
    const body = await request.json() as {
      name: string;
      age: string;
      instagram?: string;
      keywords: string;
    };

    // Validate required fields
    if (!body.name || !body.age) {
      return new Response(JSON.stringify({ error: 'Name and age are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare keywords array
    const keywordArray = body.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    // Create prompt for Claude
    const prompt = `당신은 소개팅 프로필 전문가입니다. 
다음 정보를 바탕으로 매력적이고 진솔한 2-3줄의 자기소개를 작성해주세요:
- 이름: ${body.name}
- 나이: ${body.age}
- 관심사: ${keywordArray.join(', ')}

톤: 친근하고 매력적이며 진솔한
길이: 50-80자
형식: 자연스러운 한국어 문장으로 작성`;

    // Initialize intro with fallback
    let intro = generateFallbackIntro(body.name, keywordArray);

    // Try to use Claude API via OpenAI-compatible proxy if configured
    if (env.CLAUDE_API_KEY && env.CLAUDE_API_URL) {
      try {
        const claudeResponse = await fetch(`${env.CLAUDE_API_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.CLAUDE_API_KEY}`
          },
          body: JSON.stringify({
            model: env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
            max_tokens: 150,
            temperature: 0.8,
            messages: [
              {
                role: 'system',
                content: '당신은 한국어로 소개팅 프로필을 작성하는 전문가입니다. 매력적이고 진솔한 자기소개를 작성해주세요.'
              },
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        });

        if (claudeResponse.ok) {
          const data = await claudeResponse.json();
          if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            intro = data.choices[0].message.content.trim();
            // Ensure the intro is within the desired length
            if (intro.length > 80) {
              intro = intro.substring(0, 77) + '...';
            }
          }
        } else {
          console.error('Claude API error:', await claudeResponse.text());
        }
      } catch (claudeError) {
        console.error('Error calling Claude API:', claudeError);
        // Fallback intro is already set
      }
    }

    // Prepare profile data
    const profileData = {
      name: body.name,
      age: body.age,
      instagram: body.instagram || '',
      keywords: keywordArray.map(k => k.startsWith('#') ? k : `#${k}`),
      intro: intro
    };

    // Generate unique ID
    const profileId = crypto.randomUUID();

    // Save to D1 database
    if (env.DB) {
      await env.DB.prepare(
        'INSERT INTO profiles (id, name, age, instagram, keywords, intro) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(
        profileId,
        profileData.name,
        profileData.age,
        profileData.instagram,
        JSON.stringify(profileData.keywords),
        profileData.intro
      ).run();
    }

    return new Response(JSON.stringify({
      success: true,
      profileId,
      profile: profileData
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Fallback intro generator
function generateFallbackIntro(name: string, keywords: string[]): string {
  const templates = [
    `안녕하세요, ${name}입니다 ✨ 일상 속 작은 순간들을 소중히 여기며 살아가고 있어요`,
    `${name}이에요 🌸 새로운 사람들과의 만남을 통해 더 넓은 세상을 경험하고 싶어요`,
    `반가워요! ${name}입니다 🌟 진솔한 대화와 따뜻한 추억을 함께 만들어가요`,
    `${name}이라고 해요 💫 평범한 일상을 특별하게 만드는 작은 행복들을 찾아가는 중이에요`,
    `안녕하세요 ${name}입니다 🎀 서로의 이야기를 나누며 성장할 수 있는 관계를 꿈꿔요`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}