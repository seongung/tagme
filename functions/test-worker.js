export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Log all environment variables for debugging
    const envInfo = {
      path: url.pathname,
      hasDB: !!env.DB,
      hasClaude: !!env.CLAUDE_API_KEY,
      envKeys: Object.keys(env),
      headers: Object.fromEntries(request.headers.entries())
    };
    
    if (url.pathname === '/api/test-worker') {
      return new Response(JSON.stringify(envInfo, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // If not our test endpoint, return 404
    return new Response('Not Found', { status: 404 });
  }
}