# OpenAI-Compatible Proxy Setup Summary

## What Changed

The application now uses an OpenAI-compatible proxy server to access Claude API, instead of calling Claude's API directly.

## Key Changes Made

### 1. API Endpoint Structure
- **Before**: Direct Anthropic API (`https://api.anthropic.com/v1/messages`)
- **Now**: OpenAI-compatible proxy (`{CLAUDE_API_URL}/v1/chat/completions`)

### 2. Authentication
- **Before**: `x-api-key` header with Anthropic format
- **Now**: `Authorization: Bearer {CLAUDE_API_KEY}` header (OpenAI format)

### 3. Request/Response Format
- **Before**: Anthropic's message format
- **Now**: OpenAI's chat completion format with `choices` array

### 4. Default Model
- **Before**: `claude-3-sonnet-20240229`
- **Now**: `claude-sonnet-4-20250514`

## Required Environment Variables

Both variables must be set for AI generation to work:

```bash
CLAUDE_API_KEY=your-proxy-api-key
CLAUDE_API_URL=https://your-proxy-server.com
CLAUDE_MODEL=claude-sonnet-4-20250514 # Optional
```

## Testing the Integration

1. Set both environment variables in Cloudflare Dashboard
2. Create a new profile on your site
3. Check if the intro is AI-generated (not from the template list)
4. Monitor Functions logs for any API errors

## Fallback Behavior

If either `CLAUDE_API_KEY` or `CLAUDE_API_URL` is missing, the system will:
- Use the fallback template generator
- Still save profiles to the database
- Function normally without AI features

## Latest Deployment

URL: https://26aa4f61.tagme-dating-profile.pages.dev