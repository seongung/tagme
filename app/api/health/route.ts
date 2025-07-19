export const runtime = 'edge'

export async function GET() {
  try {
    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      runtime: 'edge',
      // @ts-ignore
      hasProcess: typeof process !== 'undefined',
      // @ts-ignore  
      hasGlobalThis: typeof globalThis !== 'undefined',
    }
    
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Internal error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}