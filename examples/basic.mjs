#!/usr/bin/env node

/**
 * Stream SDK - Basic Usage Examples
 *
 * This example demonstrates how to use the Stream SDK to interact with the Stream API.
 * Make sure to set your API key in the STREAM_API_KEY environment variable.
 *
 * Usage:
 *   export STREAM_API_KEY="your-api-key"
 *   node examples/basic.mjs
 */

import StreamSDK from "../dist/index.js";

// Initialize the SDK with your API key
const apiKey = process.env.STREAM_API_KEY;
if (!apiKey) {
  console.error("❌ Error: STREAM_API_KEY environment variable is not set");
  console.error("   Please set it with: export STREAM_API_KEY='your-api-key'");
  process.exit(1);
}

const client = StreamSDK.init(apiKey, {
  // Optional: override the base URL (defaults to production)
  // baseUrl: "https://stream-app-service.streampay.sa"
});

async function main() {
  try {
    console.log("🚀 Stream SDK Examples\n");

    // ===========================
    // CONSUMERS (Users)
    // ===========================
    console.log("📋 1. Creating a consumer...");
    const consumer = await client.createConsumer({
      name: "John Doe",
      phone_number: "+966501234567",
      email: "john.doe@example.com",
      preferred_language: "en"
    });
    console.log(`✅ Created consumer: ${consumer.id}`);

    // List consumers with pagination
    console.log("\n📋 2. Listing consumers...");
    const consumers = await client.listConsumers({ page: 1, size: 10 });
    console.log(`✅ Found ${consumers.pagination.total_count} consumers`);

    // Get a specific consumer
    console.log("\n📋 3. Getting consumer details...");
    const consumerDetails = await client.getConsumer(consumer.id);
    console.log(`✅ Consumer name: ${consumerDetails.name}`);

    // ===========================
    // PRODUCTS
    // ===========================
    console.log("\n📦 4. Creating a product...");
    const product = await client.createProduct({
      name: "Premium Subscription",
      description: "Monthly premium subscription",
      price: 99.99,
      currency: "SAR",
      type: "SERVICE"
    });
    console.log(`✅ Created product: ${product.id}`);

    // List products
    console.log("\n📦 5. Listing products...");
    const products = await client.listProducts({ page: 1, size: 10 });
    console.log(`✅ Found ${products.pagination.total_count} products`);

    // Update product
    console.log("\n📦 6. Updating product...");
    const updatedProduct = await client.updateProduct(product.id, {
      price: 89.99,
      description: "Monthly premium subscription - Special offer!"
    });
    console.log(`✅ Updated product price to ${updatedProduct.price}`);

    // ===========================
    // COUPONS
    // ===========================
    console.log("\n🎟️  7. Creating a coupon...");
    const coupon = await client.createCoupon({
      code: "SAVE20",
      discount_type: "PERCENTAGE",
      discount_value: 20,
      active: true,
      max_redemptions: 100
    });
    console.log(`✅ Created coupon: ${coupon.code}`);

    // List coupons
    console.log("\n🎟️  8. Listing coupons...");
    const coupons = await client.listCoupons({ page: 1, size: 10 });
    console.log(`✅ Found ${coupons.pagination.total_count} coupons`);

    // ===========================
    // PAYMENT LINKS
    // ===========================
    console.log("\n💳 9. Creating a payment link...");
    const paymentLink = await client.createLink({
      name: "Premium Subscription Payment",
      description: "Pay for your premium subscription",
      productId: product.id,
      quantity: 1,
      coupons: [coupon.code],
      consumerId: consumer.id,
      successRedirectUrl: "https://example.com/success",
      failureRedirectUrl: "https://example.com/failure"
    });
    console.log(`✅ Created payment link: ${paymentLink.id}`);

    // Get the payment URL
    const paymentUrl = client.getPaymentUrl(paymentLink);
    if (paymentUrl) {
      console.log(`💰 Payment URL: ${paymentUrl}`);
    }

    // List payment links
    console.log("\n💳 10. Listing payment links...");
    const paymentLinks = await client.listPaymentLinks({ page: 1, size: 10 });
    console.log(`✅ Found ${paymentLinks.pagination.total_count} payment links`);

    // ===========================
    // SUBSCRIPTIONS (Optional - Requires Payment Method)
    // ===========================
    console.log("\n🔄 11. Subscription operations...");
    console.log("ℹ️  Skipping subscription creation (requires payment method configuration)");

    // Example subscription creation (uncomment when payment method is configured):
    /*
    const subscription = await client.createSubscription({
      organization_consumer_id: consumer.id,
      items: [{
        product_id: product.id,
        quantity: 1
      }],
      billing_cycle: "MONTHLY",
      payment_method: {
        type: "CARD",
        // Add payment method details here
      }
    });
    console.log(`✅ Created subscription: ${subscription.id}`);

    // List subscriptions
    const subscriptions = await client.listSubscriptions({ page: 1, size: 10 });
    console.log(`✅ Found ${subscriptions.pagination.total_count} subscriptions`);

    // Freeze subscription
    const freeze = await client.freezeSubscription(subscription.id, {
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      reason: "Customer requested pause"
    });
    console.log(`✅ Subscription frozen until: ${freeze.end_date}`);
    */

    // ===========================
    // INVOICES
    // ===========================
    console.log("\n🧾 12. Listing invoices...");
    const invoices = await client.listInvoices({ page: 1, size: 10 });
    console.log(`✅ Found ${invoices.pagination.total_count} invoices`);

    if (invoices.data.length > 0) {
      const invoice = await client.getInvoice(invoices.data[0].id);
      console.log(`✅ Invoice details: ${invoice.id} - ${invoice.status}`);
    }

    // ===========================
    // PAYMENTS
    // ===========================
    console.log("\n💰 13. Listing payments...");
    const payments = await client.listPayments();
    console.log(`✅ Found ${payments.data.length} payments`);

    if (payments.data.length > 0) {
      const payment = await client.getPayment(payments.data[0].id);
      console.log(`✅ Payment details: ${payment.id} - ${payment.status}`);

      // Refund example (uncomment to use)
      /*
      const refund = await client.refundPayment(payment.id, {
        reason: "CUSTOMER_REQUEST",
        note: "Customer requested refund"
      });
      console.log(`✅ Refund processed: ${refund.id}`);
      */
    }

    // ===========================
    // CLEANUP (Optional)
    // ===========================
    console.log("\n🧹 Cleaning up test data...");

    // Delete coupon
    await client.deleteCoupon(coupon.id);
    console.log("✅ Deleted coupon");

    // Delete product
    await client.deleteProduct(product.id);
    console.log("✅ Deleted product");

    // Delete consumer
    await client.deleteConsumer(consumer.id);
    console.log("✅ Deleted consumer");

    console.log("\n✨ All examples completed successfully!");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.status) {
      console.error(`   Status: ${error.status}`);
    }
    if (error.requestId) {
      console.error(`   Request ID: ${error.requestId}`);
    }
    if (error.body) {
      console.error(`   Details:`, JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

// Run the examples
main();
