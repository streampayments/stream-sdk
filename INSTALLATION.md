# Installation Guide

## Method 1: Install from GitHub (Recommended for Beta)

The easiest way to use the Stream SDK without publishing to npm.

### Prerequisites
- Node.js 18 or higher
- GitHub account with access to the repository

### Installation

Add to your `package.json`:

```json
{
  "dependencies": {
    "@streampay/stream-sdk": "github:streampay/stream-sdk#v1.0.0"
  }
}
```

Or install directly:

```bash
npm install github:streampay/stream-sdk#v1.0.0
```

### Usage

```typescript
import StreamSDK from '@streampay/stream-sdk';

const client = StreamSDK.init(process.env.STREAM_API_KEY);
const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com"
});
```

---

## Method 2: Install from Tarball

For offline or air-gapped environments.

### Get the Package

Download the latest release `.tgz` file from:
- GitHub Releases: https://github.com/streampay/stream-sdk/releases
- Contact support for private download link

### Install

```bash
npm install ./streampay-stream-sdk-1.0.0.tgz
```

Or from URL:

```bash
npm install https://releases.streampay.sa/sdk/streampay-stream-sdk-1.0.0.tgz
```

---

## Method 3: GitHub Packages (Coming Soon)

For organizations using GitHub Packages.

### Setup

```bash
# Configure npm to use GitHub Packages
echo "@streampay:registry=https://npm.pkg.github.com" >> .npmrc

# Login with GitHub Personal Access Token
npm login --scope=@streampay --registry=https://npm.pkg.github.com
# Username: your-github-username
# Password: ghp_YourPersonalAccessToken
# Email: your-email@example.com
```

### Install

```bash
npm install @streampay/stream-sdk
```

---

## Method 4: npm (Public - Coming Soon)

Once available on npm:

```bash
npm install @streampay/stream-sdk
```

---

## Verification

After installation, verify the SDK works:

```bash
# Create test file: test-sdk.mjs
cat > test-sdk.mjs << 'EOF'
import StreamSDK from '@streampay/stream-sdk';
console.log('Stream SDK loaded:', typeof StreamSDK.init);
EOF

# Run test
node test-sdk.mjs
# Should output: Stream SDK loaded: function
```

---

## Upgrading

### From GitHub

```bash
# Update to latest version
npm install github:streampay/stream-sdk#latest

# Or specific version
npm install github:streampay/stream-sdk#v1.1.0
```

### Check Current Version

```bash
npm list @streampay/stream-sdk
```

---

## Private Repository Access

If the SDK repository is private, you need:

1. **GitHub Personal Access Token** with `repo` scope
2. **Add to `.npmrc`:**

```bash
# Create .npmrc in your project root
echo "//npm.pkg.github.com/:_authToken=ghp_YOUR_TOKEN_HERE" >> .npmrc

# Add .npmrc to .gitignore
echo ".npmrc" >> .gitignore
```

3. **Or use environment variable:**

```bash
export GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
npm install github:streampay/stream-sdk
```

---

## Docker/Container Environments

### Dockerfile Example

```dockerfile
FROM node:18-alpine

WORKDIR /app

# If using private GitHub repo
ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc

# Copy package files
COPY package*.json ./

# Install dependencies (including SDK from GitHub)
RUN npm ci

# Clean up token
RUN rm -f .npmrc

COPY . .

CMD ["npm", "start"]
```

**Build:**

```bash
docker build --build-arg GITHUB_TOKEN=ghp_xxx -t myapp .
```

---

## CI/CD Setup

### GitHub Actions

```yaml
- name: Install dependencies
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
    npm ci
    rm .npmrc
```

### GitLab CI

```yaml
install:
  script:
    - echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
    - npm ci
    - rm .npmrc
  variables:
    GITHUB_TOKEN: $CI_JOB_TOKEN
```

---

## Troubleshooting

### Error: "Repository not found"
- Ensure you have access to the GitHub repository
- Check your GitHub token has correct permissions
- Verify the repository URL is correct

### Error: "Unable to authenticate"
- Check your GitHub token is valid
- Ensure token has `repo` scope for private repos
- Try regenerating the token

### Error: "Version not found"
- Check available versions: `git ls-remote https://github.com/streampay/stream-sdk`
- Use `#main` for latest: `npm install github:streampay/stream-sdk#main`

### Build fails during install
- Ensure Node.js 18+ is installed
- Check build logs: `npm install --verbose github:streampay/stream-sdk`
- Try clearing npm cache: `npm cache clean --force`

---

## Support

Need help installing?
- **Email**: support@streampay.sa
- **GitHub Issues**: https://github.com/streampay/stream-sdk/issues
- **Developer Contact**: ibtisam@streampay.sa
- **Documentation**: https://github.com/streampay/stream-sdk
