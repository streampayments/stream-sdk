# @streampay/stream-sdk

Official Node.js/TypeScript SDK for StreamPay API - A complete payment processing solution supporting consumers, products, subscriptions, invoices, and payment links.

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

- 🔐 **Authentication**: API Key and Bearer Token support
- 👥 **Consumers**: Full CRUD operations for customer management
- 📦 **Products**: Create and manage products and services
- 🎟️ **Coupons**: Discount codes and promotional campaigns
- 💳 **Payment Links**: Generate one-time or recurring payment links
- 🔄 **Subscriptions**: Recurring billing with flexible cycles
- 🧾 **Invoices**: Invoice management and tracking
- 💰 **Payments**: Payment processing and refunds
- 📝 **TypeScript**: Full type safety with auto-generated types from OpenAPI
- ⚡ **Modern**: ES Modules and CommonJS support

## Installation

### Option 1: Install from GitHub (Current)

```bash
npm install github:streampay/stream-sdk#v1.0.0
```

Or add to `package.json`:

```json
{
  "dependencies": {
    "@streampay/stream-sdk": "github:streampay/stream-sdk#v1.0.0"
  }
}
```

### Option 2: Install from npm (Coming Soon)

```bash
npm install @streampay/stream-sdk
```

See [INSTALLATION.md](./INSTALLATION.md) for more installation options including tarball, private registries, and CI/CD setup.

## Quick Start

```typescript
import StreamSDK from "@streampay/stream-sdk";

// Initialize with API key
const client = StreamSDK.init(process.env.STREAM_API_KEY!);

// Create a consumer
const consumer = await client.createConsumer({
  name: "John Doe",
  email: "john@example.com",
  phone_number: "+966501234567",
  preferred_language: "en"
});

// Create a product
const product = await client.createProduct({
  name: "Premium Plan",
  price: 99.99,
  currency: "SAR",
  description: "Monthly subscription"
});

// Generate a payment link
const paymentLink = await client.createLink({
  name: "Premium Plan Payment",
  consumerId: consumer.id,
  productId: product.id,
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure"
});

console.log("Payment URL:", client.getPaymentUrl(paymentLink));
```

## Configuration

### Basic Initialization

```typescript
const client = StreamSDK.init("your-api-key");
```

### Advanced Options

```typescript
const client = StreamSDK.init("your-api-key", {
  baseUrl: "https://stream-app-service.streampay.sa", // Optional: override base URL
  bearerToken: "jwt-token", // Optional: use bearer token instead of API key
  fetchFn: customFetch // Optional: custom fetch implementation
});
```

## API Reference

### Consumers

Manage customer information and contact details.

```typescript
// Create a consumer
const consumer = await client.createConsumer({
  name: "Jane Smith",
  email: "jane@example.com",
  phone_number: "+966501234567",
  preferred_language: "ar"
});

// List consumers with pagination
const consumers = await client.listConsumers({
  page: 1,
  size: 20
});

// Get consumer by ID
const consumer = await client.getConsumer("consumer-id");

// Update consumer
const updated = await client.updateConsumer("consumer-id", {
  name: "Jane Doe",
  email: "jane.doe@example.com"
});

// Delete consumer
await client.deleteConsumer("consumer-id");
```

### Products

Create and manage products and services.

```typescript
// Create a product
const product = await client.createProduct({
  name: "Premium Subscription",
  description: "Monthly premium features",
  price: 149.99,
  currency: "SAR",
  type: "SERVICE"
});

// List products
const products = await client.listProducts({ page: 1, size: 10 });

// Get product by ID
const product = await client.getProduct("product-id");

// Update product
const updated = await client.updateProduct("product-id", {
  price: 129.99,
  description: "Updated description"
});

// Delete product
await client.deleteProduct("product-id");
```

### Coupons

Manage discount codes and promotional campaigns.

```typescript
// Create a coupon
const coupon = await client.createCoupon({
  code: "SUMMER2024",
  discount_type: "PERCENTAGE",
  discount_value: 25,
  active: true,
  max_redemptions: 100,
  valid_from: new Date().toISOString(),
  valid_until: new Date("2024-12-31").toISOString()
});

// List coupons
const coupons = await client.listCoupons({ page: 1, size: 10 });

// Get coupon details
const coupon = await client.getCoupon("coupon-id");

// Update coupon
const updated = await client.updateCoupon("coupon-id", {
  active: false
});

// Delete coupon
await client.deleteCoupon("coupon-id");
```

### Payment Links

Generate payment links for one-time or recurring payments.

```typescript
// Simple payment link
const link = await client.createLink({
  name: "Product Payment",
  description: "Pay for premium features",
  productId: "product-id",
  quantity: 1,
  consumerId: "consumer-id", // Optional: pre-fill customer info
  coupons: ["SAVE20"], // Optional: apply coupons
  validUntil: new Date("2024-12-31").toISOString(),
  maxNumberOfPayments: 1,
  successRedirectUrl: "https://yourapp.com/success",
  failureRedirectUrl: "https://yourapp.com/failure",
  contactInformationType: "EMAIL" // or "PHONE"
});

// Advanced: Full DTO interface
const link = await client.createPaymentLink({
  name: "Complex Payment",
  items: [
    { product_id: "product-1", quantity: 2 },
    { product_id: "product-2", quantity: 1 }
  ],
  coupons: ["DISCOUNT10"],
  organization_consumer_id: "consumer-id",
  max_number_of_payments: 3,
  valid_until: "2024-12-31T23:59:59Z",
  success_redirect_url: "https://yourapp.com/success",
  failure_redirect_url: "https://yourapp.com/failure"
});

// List payment links
const links = await client.listPaymentLinks({ page: 1, size: 10 });

// Get payment link
const link = await client.getPaymentLink("link-id");

// Get payment URL
const url = client.getPaymentUrl(link);
```

### Subscriptions

Manage recurring billing and subscriptions.

```typescript
// Create a subscription
const subscription = await client.createSubscription({
  organization_consumer_id: "consumer-id",
  items: [
    { product_id: "product-id", quantity: 1 }
  ],
  billing_cycle: "MONTHLY", // WEEKLY, MONTHLY, QUARTERLY, YEARLY
  payment_method: {
    type: "CARD",
    // Add payment method details
  },
  auto_cancel_after_cycles: 12 // Optional: auto-cancel after N cycles
});

// List subscriptions
const subscriptions = await client.listSubscriptions({ page: 1, size: 10 });

// Get subscription
const subscription = await client.getSubscription("subscription-id");

// Update subscription
const updated = await client.updateSubscription("subscription-id", {
  items: [
    { product_id: "new-product-id", quantity: 2 }
  ]
});

// Cancel subscription
await client.cancelSubscription("subscription-id", {
  reason: "Customer requested cancellation"
});

// Freeze subscription (pause billing)
const freeze = await client.freezeSubscription("subscription-id", {
  start_date: new Date().toISOString(),
  end_date: new Date("2024-12-31").toISOString(),
  reason: "Customer on vacation"
});

// List freeze periods
const freezes = await client.listSubscriptionFreezes("subscription-id");

// Update freeze period
const updated = await client.updateSubscriptionFreeze(
  "subscription-id",
  "freeze-id",
  { end_date: new Date("2024-11-30").toISOString() }
);

// Delete freeze period
await client.deleteSubscriptionFreeze("subscription-id", "freeze-id");
```

### Invoices

Track and manage invoices.

```typescript
// List invoices
const invoices = await client.listInvoices({
  page: 1,
  size: 20,
  sort: "created_at:desc"
});

// Get invoice details
const invoice = await client.getInvoice("invoice-id");
```

### Payments

Process and manage payments and refunds.

```typescript
// List payments
const payments = await client.listPayments();

// List payments for specific invoice
const payments = await client.listPayments({
  invoice_id: "invoice-id"
});

// Get payment details
const payment = await client.getPayment("payment-id");

// Process refund
const refund = await client.refundPayment("payment-id", {
  reason: "CUSTOMER_REQUEST",
  note: "Customer requested full refund"
});
```

## Error Handling

The SDK throws `StreamSDKError` for API errors:

```typescript
import { StreamSDKError } from "@streampay/stream-sdk";

try {
  const consumer = await client.createConsumer({ ... });
} catch (error) {
  if (error instanceof StreamSDKError) {
    console.error("API Error:", error.message);
    console.error("Status:", error.status);
    console.error("Request ID:", error.requestId);
    console.error("Details:", error.body);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Pagination

List endpoints support pagination:

```typescript
const result = await client.listProducts({
  page: 1,        // Page number (1-indexed)
  size: 20,       // Items per page
  sort: "name:asc" // Optional: sort field and direction
});

console.log("Total items:", result.pagination.total_count);
console.log("Current page:", result.pagination.current_page);
console.log("Has next page:", result.pagination.has_next_page);
console.log("Items:", result.data);
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import StreamSDK, {
  ConsumerCreate,
  ProductDto,
  PaymentLinkDetailed
} from "@streampay/stream-sdk";

const createConsumer = async (data: ConsumerCreate) => {
  return await client.createConsumer(data);
};
```

## Examples

Check the [examples](./examples) directory for complete working examples:

- [Basic Usage](./examples/basic.mjs) - Comprehensive example covering all SDK features

Run the example:

```bash
export STREAM_API_KEY="your-api-key"
npm run build
node examples/basic.mjs
```

## Development

### Generate Types from OpenAPI

```bash
npm run gen
```

### Build

```bash
npm run build
```

### Type Check

```bash
npm run typecheck
```

### Watch Mode

```bash
npm run dev
```

## API Documentation

For detailed API documentation, visit the [OpenAPI specification](https://stream-app-service.streampay.sa/openapi.json).

## License

MIT

## Support

For support and questions:
- **Email**: support@streampay.sa
- **GitHub Issues**: https://github.com/streampay/stream-sdk/issues
- **Documentation**: https://github.com/streampay/stream-sdk

## Contributors

Developed and maintained by:
- **Ibtisam** (ibtisam@streampay.sa)
- StreamPay Team

---

**Base URL**: `https://stream-app-service.streampay.sa`
**Authentication**: API Key via `x-api-key` header or Bearer Token
