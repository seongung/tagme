import { Env } from '../../types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { params, env } = context;
  const profileId = params.id as string;

  if (!profileId) {
    return new Response(JSON.stringify({ error: 'Profile ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Fetch from D1 database
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await env.DB.prepare(
      'SELECT * FROM profiles WHERE id = ?'
    ).bind(profileId).first();

    if (!result) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse keywords from JSON string
    const profile = {
      ...result,
      keywords: JSON.parse(result.keywords as string)
    };

    return new Response(JSON.stringify({
      success: true,
      profile
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};