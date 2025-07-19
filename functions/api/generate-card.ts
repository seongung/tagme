import { Env, Profile } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Parse request body
    const body = await request.json() as { profile: Profile };
    
    if (!body.profile) {
      return new Response(JSON.stringify({ error: 'Profile data is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For Cloudflare Pages Functions, we'll return the profile data
    // and handle image generation on the client side
    return new Response(JSON.stringify({
      success: true,
      profile: body.profile,
      message: 'Profile card data ready for client-side rendering'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Error processing card data:', error);
    return new Response(JSON.stringify({ error: 'Failed to process card data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};