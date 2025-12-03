import express from 'express';
import StreamSDK from '@streampayments/stream-sdk';

const app = express();
app.use(express.json());

const streamClient = StreamSDK.init(process.env.STREAM_API_KEY);

/**
 * Simple payment link creation
 * POST /api/create-payment
 *
 * Body: {
 *   amount: 99.99,
 *   customerEmail: "customer@example.com",
 *   customerName: "John Doe",
 *   productName: "Premium Subscription",
 *   description: "Monthly premium subscription"
 * }
 */
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, customerEmail, customerName, productName, description } = req.body;

    const result = await streamClient.createSimplePaymentLink({
      name: productName || `Order ${Date.now()}`,
      description: description || 'Payment',
      amount,
      currency: 'SAR',
      consumer: {
        email: customerEmail,
        name: customerName
      },
      product: {
        name: productName,
        price: amount,
        currency: 'SAR'
      },
      successRedirectUrl: `${req.protocol}://${req.get('host')}/payment/success`,
      failureRedirectUrl: `${req.protocol}://${req.get('host')}/payment/failed`
    });

    res.json({
      success: true,
      paymentUrl: result.paymentUrl,
      consumerId: result.consumerId,
      productId: result.productId
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create payment with existing product
 * POST /api/create-payment-with-product
 *
 * Body: {
 *   productId: "prod_123",
 *   amount: 99.99,
 *   customerEmail: "customer@example.com"
 * }
 */
app.post('/api/create-payment-with-product', async (req, res) => {
  try {
    const { productId, amount, customerEmail, customerName } = req.body;

    const result = await streamClient.createSimplePaymentLink({
      name: `Order ${Date.now()}`,
      amount,
      currency: 'SAR',
      consumer: customerEmail ? {
        email: customerEmail,
        name: customerName
      } : undefined,
      product: {
        id: productId
      },
      successRedirectUrl: `${req.protocol}://${req.get('host')}/payment/success`,
      failureRedirectUrl: `${req.protocol}://${req.get('host')}/payment/failed`
    });

    res.json({
      success: true,
      paymentUrl: result.paymentUrl
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Create payment without consumer (guest checkout)
 * POST /api/create-guest-payment
 *
 * Body: {
 *   amount: 49.99,
 *   productName: "One-time Purchase"
 * }
 */
app.post('/api/create-guest-payment', async (req, res) => {
  try {
    const { amount, productName, description } = req.body;

    const result = await streamClient.createSimplePaymentLink({
      name: productName || `Order ${Date.now()}`,
      description,
      amount,
      currency: 'SAR',
      product: {
        name: productName,
        price: amount,
        currency: 'SAR'
      },
      successRedirectUrl: `${req.protocol}://${req.get('host')}/payment/success`,
      failureRedirectUrl: `${req.protocol}://${req.get('host')}/payment/failed`,
      contactInformationType: 'EMAIL'
    });

    res.json({
      success: true,
      paymentUrl: result.paymentUrl
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Success page
 */
app.get('/payment/success', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: green;">✓ Payment Successful</h1>
        <p>Thank you for your payment!</p>
      </body>
    </html>
  `);
});

/**
 * Failure page
 */
app.get('/payment/failed', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: red;">✗ Payment Failed</h1>
        <p>Your payment could not be processed. Please try again.</p>
      </body>
    </html>
  `);
});

/**
 * List all consumers
 */
app.get('/api/consumers', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listConsumers({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * List all products
 */
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listProducts({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * List all payment links
 */
app.get('/api/payment-links', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    const result = await streamClient.listPaymentLinks({ page, size });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StreamPay Express server running on port ${PORT}`);
  console.log(`\nTest the API:`);
  console.log(`curl -X POST http://localhost:${PORT}/api/create-payment \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"amount": 99.99, "customerEmail": "test@example.com", "customerName": "John Doe", "productName": "Premium Plan"}'`);
});
