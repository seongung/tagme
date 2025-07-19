#!/bin/bash

echo "Setting up production D1 database for Tagme Dating Profile..."

# Check if database already exists
echo "Checking if database exists..."
wrangler d1 list

echo ""
echo "If 'tagme-profiles' is not in the list above, create it with:"
echo "wrangler d1 create tagme-profiles"
echo ""
echo "Press Enter to continue with schema setup..."
read

# Execute schema on production database
echo "Applying schema to production database..."
wrangler d1 execute tagme-profiles --file=./schema.sql --remote

echo ""
echo "Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Claude API key in Cloudflare Dashboard"
echo "2. Visit your deployed site: https://tagme-dating-profile.pages.dev"
echo "3. Create a test profile to verify everything works"