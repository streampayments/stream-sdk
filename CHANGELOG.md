# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-02

### Added
- Initial public release by Ibtisam (ibtisam@streampay.sa)
- Complete SDK implementation with 37 endpoints
- **Consumers**: Full CRUD operations (create, list, get, update, delete)
- **Products**: Full CRUD operations (create, list, get, update, delete)
- **Coupons**: Full CRUD operations (create, list, get, update, delete)
- **Payment Links**: Create and list payment links with URL helper
- **Subscriptions**: Full lifecycle management (create, list, get, update, cancel)
- **Subscription Freezing**: Pause and resume subscriptions (create, list, update, delete freezes)
- **Invoices**: List and retrieve invoice details
- **Payments**: List, retrieve, and refund payments
- TypeScript support with auto-generated types from OpenAPI
- Comprehensive error handling with `StreamSDKError`
- Support for both API Key and Bearer Token authentication
- Pagination support for list endpoints
- Full ES Module and CommonJS support
- Comprehensive documentation and examples

### Features
- Type-safe API client
- Automatic request/response serialization
- Request ID tracking for debugging
- Custom base URL and fetch function support
- Detailed error responses with status codes and request IDs

## [Unreleased]

### Planned
- Request retry logic with exponential backoff
- Webhook signature verification helpers
- Rate limiting handling
- Request caching for GET operations
- CLI tool for testing API calls
