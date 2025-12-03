# StreamPay SDK Examples

This directory contains example implementations of the StreamPay SDK.

## Setup

1. Install dependencies:
```bash
cd examples
npm install
```

2. Set your API key:
```bash
export STREAM_API_KEY="your_api_key_here"
```

## Express.js Example

A complete Express.js server showing how to create payment links with the StreamPay SDK.

### Run the server:
```bash
npm run express
```

### Available endpoints:

#### Create Payment (with new consumer and product)
```bash
curl -X POST http://localhost:3000/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Order #1234",
    "amount": 99.99,
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "productName": "Premium Subscription",
    "description": "Monthly premium subscription"
  }'
```

#### Create Payment (with existing product)
Fetches product details automatically and supports multiple products:
```bash
# Single product
curl -X POST http://localhost:3000/api/create-payment-with-product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Order #5678",
    "productIds": ["prod_123"],
    "customerEmail": "customer@example.com",
    "customerName": "John Doe"
  }'

# Multiple products
curl -X POST http://localhost:3000/api/create-payment-with-product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bundle Order #9012",
    "productIds": ["prod_123", "prod_456", "prod_789"],
    "customerEmail": "customer@example.com"
  }'
```

#### Create Guest Payment (no consumer)
```bash
curl -X POST http://localhost:3000/api/create-guest-payment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Guest Order #3456",
    "amount": 49.99,
    "productName": "One-time Purchase",
    "description": "Single item purchase"
  }'
```

#### List Resources
```bash
# List consumers
curl http://localhost:3000/api/consumers?page=1&size=10

# List products
curl http://localhost:3000/api/products?page=1&size=10

# List payment links
curl http://localhost:3000/api/payment-links?page=1&size=10
```

### Response Examples:

**Simple Payment:**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "consumerId": "cons_xyz789",
  "productId": "prod_def456"
}
```

**Payment with Existing Products:**
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "totalAmount": 299.97,
  "products": [
    {
      "id": "prod_123",
      "name": "Premium Plan",
      "price": "99.99"
    },
    {
      "id": "prod_456",
      "name": "Add-on Feature",
      "price": "199.98"
    }
  ]
}
```

## Key Features Demonstrated

1. **Simple Payment Creation**: Create payment link with consumer and product in one call
2. **Multiple Products**: Use existing product IDs (single or multiple)
3. **Automatic Amount Calculation**: Fetches product details and calculates total
4. **Smart Consumer Matching**: Reuses existing consumers by email
5. **Guest Checkout**: Create payment without consumer (collect email at checkout)
6. **Custom Payment Link Names**: User-defined payment link names
7. **Redirect URLs**: Success and failure redirect handling
8. **Error Handling**: Proper error handling and response formatting
