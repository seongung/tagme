# Gemini API Setup Guide

This app now uses Google's Gemini 2.5 Flash API for generating dating profiles.

## Getting Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy your API key

## Setting Up the API Key

### For Local Development
Create a `.env.local` file in the root directory:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

### For Production (Cloudflare Pages)
Add the API key as a secret using Wrangler:
```bash
npx wrangler secret put GEMINI_API_KEY
```

Then enter your API key when prompted.

## API Configuration

The app is configured to use:
- Model: `gemini-2.0-flash-exp` (Gemini 2.5 Flash)
- Temperature: 0.8 (for creative responses)
- Max tokens: 400 (for longer introductions)

## Testing the API

After setting up your API key, test it by creating a new profile in the app. The Gemini API will generate natural, conversational Korean introductions based on the user's input.