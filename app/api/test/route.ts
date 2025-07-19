export const runtime = 'edge'

export async function GET() {
  try {
    // Minimal response with no dependencies
    const response = new Response('Hello from API', { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    return response
  } catch (error) {
    // Return error details
    return new Response(
      JSON.stringify({ 
        error: 'Error in test route',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}