# GitHub Repository Setup Guide

Quick guide to set up the Stream SDK repository on GitHub for distribution.

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `stream-sdk`
3. **Owner**: `streampay` (or your organization)
4. **Description**: Official Node.js/TypeScript SDK for StreamPay API
5. **Visibility**:
   - **Public** - Anyone can install
   - **Private** - Only team members (requires auth token)
6. **Initialize**: Don't add README, .gitignore, or license (we have them)
7. Click **Create repository**

## Step 2: Push Code to GitHub

```bash
cd /Users/ibtisamulhaq/Projects/Stream/stream-sdk

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Stream SDK v1.0.0

- 37 API endpoints implemented
- Full TypeScript support
- Comprehensive documentation
- Complete test examples"

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/streampay/stream-sdk.git

# Push to GitHub
git push -u origin main
```

## Step 3: Create Release Tag

```bash
# Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0

Initial public release with full API coverage:
- Consumers, Products, Coupons
- Payment Links, Subscriptions
- Invoices, Payments
- Complete TypeScript definitions"

git push origin v1.0.0
```

## Step 4: Create GitHub Release (Optional but Recommended)

1. Go to: `https://github.com/streampay/stream-sdk/releases`
2. Click **"Draft a new release"**
3. **Choose a tag**: `v1.0.0`
4. **Release title**: `Stream SDK v1.0.0`
5. **Description**: Copy from CHANGELOG.md
6. **Attach files**: Upload `streampay-stream-sdk-1.0.0.tgz` (created with `npm pack`)
7. Check **"Set as the latest release"**
8. Click **"Publish release"**

## Step 5: Test Installation

```bash
# In a test project
npm install github:streampay/stream-sdk#v1.0.0

# Test import
node -e "import('@streampay/stream-sdk').then(m => console.log('SDK loaded:', !!m.default))"
```

## Step 6: Share with Users

### For Public Repository

Send users this installation command:
```bash
npm install github:streampay/stream-sdk#v1.0.0
```

### For Private Repository

Users need:

1. **GitHub Personal Access Token** with `repo` scope
   - Create at: https://github.com/settings/tokens
   - Scopes needed: `repo` (full control of private repositories)

2. **Configure npm**:
```bash
# Create .npmrc
echo "//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN" > .npmrc

# Or use environment variable
export GITHUB_TOKEN=ghp_YOUR_TOKEN
npm install github:streampay/stream-sdk#v1.0.0
```

3. **Share token securely**:
   - Don't commit tokens to git
   - Use secret management (1Password, AWS Secrets Manager)
   - Rotate tokens regularly

## Repository Settings (Recommended)

### Branch Protection

1. Go to: Settings → Branches → Add rule
2. **Branch name pattern**: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

### Topics/Tags

Add topics for discoverability:
- `typescript`
- `sdk`
- `payment`
- `streampay`
- `fintech`
- `nodejs`

Go to: Repository → About (gear icon) → Topics

### GitHub Pages (Optional)

Host documentation:
1. Settings → Pages
2. Source: `main` branch, `/docs` folder
3. Save

## Continuous Updates

### When Releasing New Version

```bash
# Update version
npm version minor  # or patch, major

# Build
npm run build

# Commit
git add .
git commit -m "Release v1.1.0"

# Tag
git tag v1.1.0

# Push
git push origin main --tags

# Create GitHub Release
# (Go to GitHub and repeat Step 4)
```

### Auto-versioning with Commit Messages

Use conventional commits:
```bash
git commit -m "feat: add webhook validation"      # minor bump
git commit -m "fix: resolve connection timeout"   # patch bump
git commit -m "feat!: breaking API changes"       # major bump
```

## Troubleshooting

### Users can't install from private repo
**Solution**:
- Ensure they have repository access
- Verify their GitHub token has `repo` scope
- Check token isn't expired

### "Build failed" during npm install
**Solution**:
- Ensure `dist/` is committed OR
- Add build step to `prepare` script:
  ```json
  {
    "scripts": {
      "prepare": "npm run build"
    }
  }
  ```

### Wrong version installed
**Solution**:
- Users should specify exact tag: `#v1.0.0` not `#main`
- Clear npm cache: `npm cache clean --force`

## Quick Reference

```bash
# Current SDK location
/Users/ibtisamulhaq/Projects/Stream/stream-sdk

# Build and test
npm run build
npm run typecheck

# Create release package
npm pack
# Creates: streampay-stream-sdk-1.0.0.tgz

# Git workflow
git add .
git commit -m "your message"
git push

# Tagging
git tag v1.0.0
git push origin v1.0.0

# Installation (for users)
npm install github:streampay/stream-sdk#v1.0.0
```

## Next Steps After GitHub Setup

1. ✅ Code is on GitHub
2. ✅ Release tag created
3. ✅ Users can install
4. 📧 Announce to customers
5. 📚 Update documentation portal
6. 🔍 Monitor GitHub issues
7. 📊 Track adoption

You're ready to share! 🚀
