# Publishing Guide

This guide walks you through publishing the Stream SDK to npm for public customers.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. **Organization Access**: Get access to `@streampay` npm organization (or create it)
3. **2FA Enabled**: Enable two-factor authentication on your npm account

## Step-by-Step Publication Process

### 1. Pre-Publication Checklist

Verify everything is ready:

```bash
# Ensure you're on the correct branch
git checkout main  # or your release branch

# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Run type checking
npm run typecheck

# Build the package
npm run build

# Verify build output
ls -la dist/
```

Expected files in `dist/`:
- `index.js` (ES Module)
- `index.cjs` (CommonJS)
- `index.d.ts` (TypeScript definitions)
- `index.d.cts` (CommonJS TypeScript definitions)
- Source maps

### 2. Test the Package Locally

```bash
# Pack the package (creates a .tgz file)
npm pack

# This creates: streampay-stream-sdk-1.0.0.tgz
# Install it in a test project:
cd /path/to/test-project
npm install /path/to/stream-sdk/streampay-stream-sdk-1.0.0.tgz

# Test import
node -e "import('@streampay/stream-sdk').then(m => console.log(m.default))"
```

### 3. Login to npm

```bash
# Login to npm (first time)
npm login

# Or if already logged in, verify:
npm whoami
```

### 4. Verify Package Contents

```bash
# See what files will be published
npm pack --dry-run

# Should include:
# - dist/
# - package.json
# - README.md
# - LICENSE
# - CHANGELOG.md
```

### 5. Publish to npm

**Option A: Publish Directly (Production)**

```bash
# Publish as public package
npm publish --access public

# For scoped packages, access must be public
```

**Option B: Test with Beta/RC Version First (Recommended)**

```bash
# Update version to beta
npm version 1.0.0-beta.1 --no-git-tag-version

# Publish beta
npm publish --tag beta --access public

# Install beta version:
# npm install @streampay/stream-sdk@beta

# After testing, publish stable:
npm version 1.0.0 --no-git-tag-version
npm publish --access public
```

### 6. Verify Publication

```bash
# Check package on npm
npm info @streampay/stream-sdk

# View on npm website
open https://www.npmjs.com/package/@streampay/stream-sdk

# Test installation
npm install @streampay/stream-sdk
```

### 7. Tag Git Release

```bash
# Commit version bump
git add package.json
git commit -m "Release v1.0.0"

# Create git tag
git tag v1.0.0

# Push to remote
git push origin main
git push origin v1.0.0
```

## Post-Publication Steps

### 1. Announcement

Create announcement for:
- Company blog
- Documentation site
- Social media (Twitter, LinkedIn)
- Developer newsletter
- Slack/Discord community

**Sample Announcement:**
```
🎉 Stream SDK v1.0.0 is now available!

The official Node.js/TypeScript SDK for StreamPay API is now on npm.

✨ Features:
• Full TypeScript support
• 37 endpoints covering all API operations
• Consumers, Products, Subscriptions, Invoices, Payments
• Complete documentation & examples

📦 Install: npm install @streampay/stream-sdk
📚 Docs: https://github.com/streampay/stream-sdk
```

### 2. Update Documentation

- [ ] Add installation instructions to main docs
- [ ] Create getting started guide
- [ ] Add API reference
- [ ] Update code examples on website
- [ ] Add to developer portal

### 3. Create GitHub Release

1. Go to https://github.com/streampay/stream-sdk/releases
2. Click "Draft a new release"
3. Choose tag: `v1.0.0`
4. Title: "Stream SDK v1.0.0"
5. Copy content from CHANGELOG.md
6. Mark as latest release
7. Publish

### 4. Monitor

First 48 hours:
- [ ] Watch npm download stats
- [ ] Monitor GitHub issues
- [ ] Check community feedback
- [ ] Respond to questions quickly

## Troubleshooting

### Error: "403 Forbidden"
**Solution**: Package name is taken or you don't have access to `@streampay` org
```bash
# Check package availability
npm info @streampay/stream-sdk

# Or publish under different scope
# Update package.json name to @yourname/stream-sdk
```

### Error: "Need to authenticate"
**Solution**: Login to npm
```bash
npm login
```

### Error: "Package already published"
**Solution**: Bump version
```bash
npm version patch  # 1.0.0 -> 1.0.1
# or
npm version minor  # 1.0.0 -> 1.1.0
```

### Package is missing files
**Solution**: Check .npmignore and package.json "files"
```bash
npm pack --dry-run
# Ensure dist/ is included
```

## Version Bumping Guide

```bash
# Patch: Bug fixes (1.0.0 -> 1.0.1)
npm version patch

# Minor: New features, backward compatible (1.0.0 -> 1.1.0)
npm version minor

# Major: Breaking changes (1.0.0 -> 2.0.0)
npm version major
```

## Automation (Optional)

Create GitHub Action for automated releases:

```yaml
# .github/workflows/publish.yml
name: Publish to npm
on:
  release:
    types: [published]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Support

For help with publishing:
- **Primary Contact**: ibtisam@streampay.sa
- **Support Team**: support@streampay.sa
- **npm Support**: https://www.npmjs.com/support
- **GitHub Discussions**: https://github.com/streampay/stream-sdk/discussions

## Security

**IMPORTANT**: Never commit:
- npm authentication tokens
- API keys
- Private credentials

Use `.npmrc` for authentication (excluded from git).
