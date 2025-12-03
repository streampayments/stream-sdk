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
    "amount": 99.99,
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "productName": "Premium Subscription",
    "description": "Monthly premium subscription"
  }'
```

#### Create Payment (with existing product)
```bash
curl -X POST http://localhost:3000/api/create-payment-with-product \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_123",
    "amount": 99.99,
    "customerEmail": "customer@example.com",
    "customerName": "John Doe"
  }'
```

#### Create Guest Payment (no consumer)
```bash
curl -X POST http://localhost:3000/api/create-guest-payment \
  -H "Content-Type: application/json" \
  -d '{
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

### Response Example:
```json
{
  "success": true,
  "paymentUrl": "https://checkout.streampay.sa/pay/link_abc123",
  "consumerId": "cons_xyz789",
  "productId": "prod_def456"
}
```

## Key Features Demonstrated

1. **Simple Payment Creation**: Create payment link with consumer and product in one call
2. **Existing Product**: Use existing product ID
3. **Guest Checkout**: Create payment without consumer (collect email at checkout)
4. **Redirect URLs**: Success and failure redirect handling
5. **Error Handling**: Proper error handling and response formatting
