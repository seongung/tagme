import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json(
      { error: 'Profile ID is required' },
      { status: 400 }
    )
  }

  try {
    // Try multiple approaches to access D1
    // @ts-ignore
    let db = process.env?.DB || globalThis?.DB || globalThis?.__env?.DB;
    if (db) {
      const result = await db.prepare(
        'SELECT * FROM profiles WHERE id = ?'
      ).bind(id).first()

      if (result) {
        return NextResponse.json({
          id: result.id,
          name: result.name,
          age: result.age,
          instagram: result.instagram,
          mbti: result.mbti,
          keywords: JSON.parse(result.keywords || '[]'),
          intro: result.intro,
          created_at: result.created_at
        })
      }
    }

    return NextResponse.json(
      { error: 'Profile not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}