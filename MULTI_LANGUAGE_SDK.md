# Multi-Language SDK Generation Guide

Generate StreamPay SDKs for multiple programming languages from your OpenAPI specification.

## 🎯 Quick Start

### Option 1: Auto-Generate (Recommended)

```bash
# 1. Install OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# 2. Run generation script
cd /Users/ibtisamulhaq/Projects/Stream/stream-sdk
./scripts/generate-sdks.sh

# 3. SDKs will be created in generated-sdks/
ls generated-sdks/
# stream-sdk-python/
# stream-sdk-php/
# stream-sdk-ruby/
# stream-sdk-go/
# ... etc
```

---

## 🌍 Supported Languages

### Tier 1: Priority Languages (Generate First)

| Language | Generator | Package Manager | Repository Name |
|----------|-----------|-----------------|-----------------|
| **Python** | `python` | PyPI (pip) | `stream-sdk-python` |
| **PHP** | `php` | Packagist (composer) | `stream-sdk-php` |
| **Ruby** | `ruby` | RubyGems (gem) | `stream-sdk-ruby` |
| **Go** | `go` | GitHub (go get) | `stream-sdk-go` |
| **Java** | `java` | Maven Central | `stream-sdk-java` |

### Tier 2: Additional Languages

| Language | Generator | Package Manager |
|----------|-----------|-----------------|
| **C#** | `csharp-netcore` | NuGet |
| **Swift** | `swift5` | CocoaPods/SPM |
| **Kotlin** | `kotlin` | Maven/Gradle |
| **Rust** | `rust` | Crates.io |
| **Dart** | `dart` | pub.dev |

---

## 📋 Generation Methods

### Method 1: OpenAPI Generator (Free, Open Source)

**Generate Python SDK:**
```bash
openapi-generator-cli generate \
  -i https://stream-app-service.streampay.sa/openapi.json \
  -g python \
  -o ./stream-sdk-python \
  --package-name streampay \
  --additional-properties=\
packageVersion=1.0.0,\
projectName=streampay-sdk,\
packageUrl=https://github.com/streampay/stream-sdk-python
```

**Generate PHP SDK:**
```bash
openapi-generator-cli generate \
  -i https://stream-app-service.streampay.sa/openapi.json \
  -g php \
  -o ./stream-sdk-php \
  --package-name Streampay\\SDK \
  --additional-properties=\
invokerPackage=Streampay\\SDK,\
packageVersion=1.0.0
```

**Generate Go SDK:**
```bash
openapi-generator-cli generate \
  -i https://stream-app-service.streampay.sa/openapi.json \
  -g go \
  -o ./stream-sdk-go \
  --package-name streampay \
  --git-user-id streampay \
  --git-repo-id stream-sdk-go
```

### Method 2: Speakeasy (Premium Quality)

```bash
# Install
brew install speakeasy-api/homebrew-tap/speakeasy

# Generate for multiple languages
speakeasy generate sdk \
  --schema https://stream-app-service.streampay.sa/openapi.json \
  --lang python \
  --out ./stream-sdk-python

speakeasy generate sdk \
  --schema https://stream-app-service.streampay.sa/openapi.json \
  --lang go \
  --out ./stream-sdk-go
```

### Method 3: Manual Creation (Custom Quality)

Use TypeScript SDK as reference and manually create SDKs:
- Better code quality
- Language-specific idioms
- More control
- More time investment

---

## 🏗️ Repository Structure

### Option A: Separate Repositories (Recommended)

```
GitHub Organization: streampay
├── stream-sdk (TypeScript) ✅
├── stream-sdk-python
├── stream-sdk-php
├── stream-sdk-ruby
├── stream-sdk-go
├── stream-sdk-java
└── stream-sdk-csharp
```

**Pros:**
- Independent versioning
- Language-specific best practices
- Easier CI/CD per language
- Native package managers

**Naming Convention:**
- Repository: `stream-sdk-{language}`
- Package: `streampay` or `@streampay/stream-sdk`

### Option B: Monorepo

```
stream-sdks/
├── packages/
│   ├── typescript/
│   ├── python/
│   ├── php/
│   ├── ruby/
│   └── go/
├── docs/
└── scripts/
```

**Pros:**
- Single source of truth
- Synchronized releases
- Shared tooling

---

## 📦 Package Naming Conventions

| Language | Package Name | Repository | Installation |
|----------|-------------|------------|--------------|
| **TypeScript** | `@streampay/stream-sdk` | `stream-sdk` | `npm install @streampay/stream-sdk` |
| **Python** | `streampay` | `stream-sdk-python` | `pip install streampay` |
| **PHP** | `streampay/stream-sdk` | `stream-sdk-php` | `composer require streampay/stream-sdk` |
| **Ruby** | `streampay` | `stream-sdk-ruby` | `gem install streampay` |
| **Go** | `github.com/streampay/stream-sdk-go` | `stream-sdk-go` | `go get github.com/streampay/stream-sdk-go` |
| **Java** | `com.streampay:stream-sdk` | `stream-sdk-java` | Maven/Gradle |
| **C#** | `Streampay.SDK` | `stream-sdk-csharp` | `dotnet add package Streampay.SDK` |

---

## 🚀 Publishing SDKs

### Python (PyPI)

```bash
cd stream-sdk-python

# Build
python setup.py sdist bdist_wheel

# Test locally
pip install dist/streampay-1.0.0-py3-none-any.whl

# Publish
pip install twine
twine upload dist/*
```

**Installation:**
```bash
pip install streampay
```

### PHP (Packagist)

```bash
cd stream-sdk-php

# Create composer.json if not exists
# Push to GitHub
# Register on packagist.org
```

**Installation:**
```bash
composer require streampay/stream-sdk
```

### Ruby (RubyGems)

```bash
cd stream-sdk-ruby

# Build gem
gem build streampay.gemspec

# Publish
gem push streampay-1.0.0.gem
```

**Installation:**
```bash
gem install streampay
```

### Go (GitHub)

```bash
cd stream-sdk-go

# Just push to GitHub
git push origin main
git tag v1.0.0
git push origin v1.0.0
```

**Installation:**
```bash
go get github.com/streampay/stream-sdk-go
```

### Java (Maven Central)

Requires signing and Maven Central account.

**Installation:**
```xml
<dependency>
    <groupId>com.streampay</groupId>
    <artifactId>stream-sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

---

## 🧪 Testing Generated SDKs

### Test Python SDK

```python
# test_sdk.py
import streampay

client = streampay.Client(api_key="test-key")

# Test consumer creation
consumer = client.consumers.create(
    name="Test User",
    email="test@example.com"
)

print(f"Created consumer: {consumer.id}")
```

### Test PHP SDK

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

use Streampay\SDK\Client;

$client = new Client('test-key');

// Test consumer creation
$consumer = $client->consumers->create([
    'name' => 'Test User',
    'email' => 'test@example.com'
]);

echo "Created consumer: {$consumer->id}\n";
```

### Test Go SDK

```go
package main

import (
    "fmt"
    streampay "github.com/streampay/stream-sdk-go"
)

func main() {
    client := streampay.NewClient("test-key")

    consumer, err := client.Consumers.Create(&streampay.ConsumerCreate{
        Name:  "Test User",
        Email: "test@example.com",
    })

    if err != nil {
        panic(err)
    }

    fmt.Printf("Created consumer: %s\n", consumer.ID)
}
```

---

## 📚 Documentation Per Language

Each language SDK should include:

1. **README.md** - Installation and quick start
2. **Examples** - Working code samples
3. **API Reference** - Generated from code docs
4. **Migration Guide** - From other SDKs (if applicable)

### Template README Structure

```markdown
# StreamPay SDK for [Language]

Official [Language] SDK for StreamPay API.

## Installation
[Language-specific installation]

## Quick Start
[Language-specific example]

## API Reference
[Link to docs]

## Support
- Email: support@streampay.sa
- GitHub: https://github.com/streampay/stream-sdk-[language]
```

---

## 🔄 Keeping SDKs in Sync

### Automated Approach

Create GitHub Action to regenerate all SDKs when OpenAPI changes:

```yaml
# .github/workflows/sync-sdks.yml
name: Sync Multi-Language SDKs

on:
  schedule:
    - cron: '0 0 * * *'  # Daily
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate SDKs
        run: ./scripts/generate-sdks.sh

      - name: Create PRs for each language
        # Create PR in each language repo with updates
```

### Manual Process

1. Update OpenAPI spec
2. Run generation script
3. Review generated code
4. Test each SDK
5. Create releases
6. Update documentation

---

## 🎯 Recommended Rollout Plan

### Week 1: Python SDK
- Generate from OpenAPI
- Test thoroughly
- Publish to PyPI
- Update docs

### Week 2: PHP SDK
- Generate and test
- Publish to Packagist
- Update docs

### Week 3: Ruby & Go SDKs
- Generate both
- Publish
- Update docs

### Week 4+: Additional Languages
- Java, C#, Swift as needed
- Based on customer demand

---

## 💡 Tips for Success

1. **Start with auto-generation** - Faster initial release
2. **Refine manually** - Improve generated code over time
3. **Consistent naming** - Same method names across languages
4. **Language idioms** - Adapt to language conventions
5. **Comprehensive tests** - Test all endpoints
6. **CI/CD per language** - Automate testing and publishing
7. **Version synchronization** - Keep versions aligned

---

## 📞 Support

Questions about multi-language SDKs?
- **Developer**: ibtisam@streampay.sa
- **Support**: support@streampay.sa
- **GitHub**: https://github.com/streampay/stream-sdk

---

## 🔗 Resources

- [OpenAPI Generator](https://openapi-generator.tech/)
- [Speakeasy](https://speakeasyapi.dev/)
- [Fern](https://buildwithfern.com/)
- [Your OpenAPI Spec](https://stream-app-service.streampay.sa/openapi.json)
