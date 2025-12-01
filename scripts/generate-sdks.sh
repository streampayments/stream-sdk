#!/bin/bash
# Generate StreamPay SDKs for multiple languages
# Uses OpenAPI Generator to create SDKs from OpenAPI spec

set -e

OPENAPI_URL="https://stream-app-service.streampay.sa/openapi.json"
BASE_DIR="$(pwd)/generated-sdks"
VERSION="1.0.0"

echo "🚀 Generating StreamPay SDKs from OpenAPI spec..."
echo "📄 OpenAPI URL: $OPENAPI_URL"
echo "📁 Output directory: $BASE_DIR"
echo ""

# Create base directory
mkdir -p "$BASE_DIR"

# Function to generate SDK
generate_sdk() {
    local lang=$1
    local generator=$2
    local package_name=$3
    local output_dir="$BASE_DIR/stream-sdk-$lang"

    echo "🔨 Generating $lang SDK..."

    openapi-generator-cli generate \
        -i "$OPENAPI_URL" \
        -g "$generator" \
        -o "$output_dir" \
        --package-name "$package_name" \
        --additional-properties=packageVersion="$VERSION" \
        --git-repo-id="stream-sdk-$lang" \
        --git-user-id="streampay" \
        --skip-validate-spec

    echo "✅ $lang SDK generated at: $output_dir"
    echo ""
}

# Install OpenAPI Generator CLI if not installed
if ! command -v openapi-generator-cli &> /dev/null; then
    echo "📦 Installing OpenAPI Generator CLI..."
    npm install -g @openapitools/openapi-generator-cli
    echo ""
fi

# Generate SDKs for each language
echo "🌍 Generating SDKs for multiple languages..."
echo ""

# Python
generate_sdk "python" "python" "streampay"

# PHP
generate_sdk "php" "php" "Streampay\\SDK"

# Ruby
generate_sdk "ruby" "ruby" "streampay"

# Go
generate_sdk "go" "go" "streampay"

# Java
generate_sdk "java" "java" "com.streampay.sdk"

# C#
generate_sdk "csharp" "csharp-netcore" "Streampay.SDK"

# Swift (iOS)
generate_sdk "swift" "swift5" "StreampaySDK"

echo "🎉 All SDKs generated successfully!"
echo ""
echo "📁 Output directory: $BASE_DIR"
echo ""
echo "Next steps:"
echo "1. Review generated SDKs in $BASE_DIR"
echo "2. Test each SDK"
echo "3. Create separate GitHub repositories"
echo "4. Publish to package managers:"
echo "   - Python: PyPI (pip)"
echo "   - PHP: Packagist (composer)"
echo "   - Ruby: RubyGems (gem)"
echo "   - Go: GitHub (go get)"
echo "   - Java: Maven Central"
echo "   - C#: NuGet"
echo "   - Swift: CocoaPods/SPM"
