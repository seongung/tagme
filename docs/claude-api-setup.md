# Claude API Setup Guide

This guide explains how to configure Claude API via OpenAI-compatible proxy for AI-powered profile intro generation.

## Prerequisites

1. Claude API Key (from your proxy server)
2. Claude API URL (OpenAI-compatible endpoint)
3. Access to your Cloudflare Dashboard

## Step 1: Add Environment Variables

### Via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **tagme-dating-profile**
3. Click on **Settings** → **Environment variables**
4. Click **Add variable**
5. Add the following variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `CLAUDE_API_KEY` | Your API key for the proxy server | `sk-...` or your proxy key |
| `CLAUDE_API_URL` | OpenAI-compatible proxy endpoint | `https://your-proxy-server.com` |
| `CLAUDE_MODEL` | (Optional) Claude model to use | `claude-sonnet-4-20250514` |

### Via Wrangler CLI

```bash
# Add your API key
wrangler pages secret put CLAUDE_API_KEY --project-name tagme-dating-profile
# Enter your API key when prompted

# Add the proxy endpoint URL
wrangler pages secret put CLAUDE_API_URL --project-name tagme-dating-profile
# Enter the URL when prompted (e.g., https://your-proxy-server.com)

# Optionally set a specific model
wrangler pages secret put CLAUDE_MODEL --project-name tagme-dating-profile
# Enter model name when prompted (e.g., claude-sonnet-4-20250514)
```

## Step 2: Verify D1 Database Setup

Make sure your production database is set up:

```bash
# Create the production database (skip if already exists)
wrangler d1 create tagme-profiles

# Apply schema to production database
wrangler d1 execute tagme-profiles --file=./schema.sql --remote
```

## Step 3: Deploy Updated Code

After adding the environment variables, deploy the latest code:

```bash
# Build the application
npm run build

# Deploy to Cloudflare Pages
npm run cf:deploy
```

## Available Claude Models

You can use any of these models by setting the `CLAUDE_MODEL` environment variable:

- `claude-sonnet-4-20250514` - Latest Sonnet 4 model (default)
- `claude-3-opus-20240229` - Most capable Claude 3 model
- `claude-3-sonnet-20240229` - Balanced Claude 3 model
- `claude-3-haiku-20240307` - Fastest model

Note: Available models depend on your proxy server configuration.

## How It Works

1. When a user creates a profile, the system sends their information to the OpenAI-compatible proxy
2. The proxy forwards the request to Claude using the specified model
3. Claude generates a personalized, attractive intro in Korean
4. If the API fails or is not configured, the system uses a fallback generator
5. The generated intro is saved to the D1 database along with the profile

## OpenAI-Compatible Format

The proxy server accepts requests in OpenAI's chat completion format:
- Endpoint: `{CLAUDE_API_URL}/v1/chat/completions`
- Authorization: `Bearer {CLAUDE_API_KEY}`
- Model: `claude-sonnet-4-20250514` or other available models

## Testing

After setup, test the integration:

1. Visit your deployed site
2. Create a new profile
3. Check if the generated intro looks personalized (not from the template list)
4. The intro should be contextual based on the keywords you provide

## Troubleshooting

### API Key Not Working
- Verify the API key format matches your proxy server requirements
- Check that both CLAUDE_API_KEY and CLAUDE_API_URL are set
- Ensure the proxy server is accessible from Cloudflare's network

### Fallback Intros Still Showing
- Check the Functions logs in Cloudflare Dashboard
- Ensure environment variables are properly set
- Verify the deployment includes the latest code changes

### Database Errors
- Ensure D1 database is bound to your Pages project
- Check that the schema has been applied to production
- Verify the database ID in wrangler.toml matches your actual database

## Cost Considerations

- Claude API is usage-based
- Each profile generation uses approximately 100-200 tokens
- Monitor your usage in the Anthropic Console
- Consider implementing rate limiting for production use