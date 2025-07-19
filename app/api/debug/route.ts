import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const debugInfo: any = {
    test: 'debug endpoint working',
    timestamp: new Date().toISOString(),
  }
  
  // Check process.env
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env) {
    debugInfo.hasProcessEnv = true
    // @ts-ignore
    const envKeys = Object.keys(process.env)
    debugInfo.processEnvKeys = envKeys.filter(k => k.includes('CLAUDE') || k.includes('NODE') || k === 'DB')
    debugInfo.hasClaudeApiKey = !!process.env.CLAUDE_API_KEY
    debugInfo.hasClaudeApiUrl = !!process.env.CLAUDE_API_URL
  }
  
  // Check for DB in various locations
  // @ts-ignore
  debugInfo.hasDB_process = !!process?.env?.DB
  // @ts-ignore
  debugInfo.hasDB_globalThis = !!globalThis?.DB
  // @ts-ignore  
  debugInfo.hasDB_cloudflare = !!globalThis?.__env?.DB
  
  return NextResponse.json(debugInfo)
}