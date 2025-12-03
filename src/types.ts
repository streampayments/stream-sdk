import type { components } from "./generated/openapi";

// ===========================
// Consumers
// ===========================
export type ConsumerCreate = components["schemas"]["ConsumerCreate"];
export type ConsumerResponse = components["schemas"]["ConsumerResponse"];
export type ConsumerUpdate = components["schemas"]["ConsumerUpdate"];
export type ConsumerListResponse = components["schemas"]["ListResource_ConsumerResponse_"];

// ===========================
// Products
// ===========================
export type ProductCreate = components["schemas"]["ProductCreate"];
export type ProductDto = components["schemas"]["ProductDto"];
export type ProductUpdate = components["schemas"]["ProductUpdate"];
export type ProductListResponse = components["schemas"]["ListResource_ProductDto_"];

// ===========================
// Payment Links
// ===========================
export type CreatePaymentLinkDto = components["schemas"]["CreatePaymentLinkDto"];
export type PaymentLinkDetailed = components["schemas"]["PaymentLinkDetailed"];
export type PaymentLinkListResponse = components["schemas"]["ListResource_PaymentLinkDetailed_"];

// ===========================
// Coupons
// ===========================
export type CouponCreate = components["schemas"]["CouponCreate"];
export type CouponDetailed = components["schemas"]["CouponDetailed"];
export type CouponUpdate = components["schemas"]["CouponUpdate"];
export type CouponListResponse = components["schemas"]["ListResource_CouponDetailed_"];

// ===========================
// Invoices
// ===========================
export type InvoiceDetailed = components["schemas"]["InvoiceDetailed"];
export type InvoiceListItem = components["schemas"]["InvoiceListItem"];
export type InvoiceListResponse = components["schemas"]["ListResource_InvoiceListItem_"];

// ===========================
// Payments
// ===========================
export type PaymentResponse = components["schemas"]["PaymentResponse"];
export type PaymentListResponse = components["schemas"]["PaymentListResponse"];
export type PaymentRefundRequest = components["schemas"]["PaymentRefundRequest"];

// ===========================
// Subscriptions
// ===========================
export type SubscriptionCreate = components["schemas"]["SubscriptionCreate"];
export type SubscriptionDetailed = components["schemas"]["SubscriptionDetailed"];
export type SubscriptionUpdate = components["schemas"]["SubscriptionUpdate"];
export type SubscriptionListResponse = components["schemas"]["ListResource_SubscriptionDetailed_"];
export type SubscriptionCancel = components["schemas"]["SubscriptionCancel"];
export type FreezeSubscriptionCreateRequest = components["schemas"]["FreezeSubscriptionCreateRequest"];
export type FreezeSubscriptionBase = components["schemas"]["FreezeSubscriptionBase"];
export type FreezeSubscriptionUpdateRequest = components["schemas"]["FreezeSubscriptionUpdateRequest"];
export type FreezeListResponse = components["schemas"]["ListResource_FreezeSubscriptionBase_"];

// ===========================
// Pagination & Query Params
// ===========================
export type Pagination = components["schemas"]["Pagination"];
export type PaginationParams = {
  page?: number;
  size?: number;
  sort?: string;
};

/**
 * Convenience input for "one user + one product" payment link.
 * We convert this into CreatePaymentLinkDto under the hood.
 */
export type CreateLinkInput = {
  name: string;
  description?: string | null;

  // If set, the payer is fixed and customer-info is not collected (per spec).
  consumerId?: string | null;

  productId: string;
  quantity?: number;

  validUntil?: Date | string | null;
  maxNumberOfPayments?: number | null;

  successRedirectUrl?: string | null;
  failureRedirectUrl?: string | null;

  // Optional escape hatch: raw CreatePaymentLinkDto fields
  coupons?: string[];
  customMetadata?: Record<string, unknown> | null;
  contactInformationType?: "PHONE" | "EMAIL" | null;
};

// ===========================
// SIMPLIFIED PAYMENT LINK CREATION
// ===========================

/**
 * High-level payment link creation with optional inline consumer and product creation
 *
 * Smart Matching:
 * - Consumer: Searches for existing consumer by email or phone before creating new
 * - Product: Searches for existing product by name and price before creating new
 * - To force creation of new resources, use unique identifiers
 * - To use specific existing resources, provide id field
 */
export type SimplePaymentLinkInput = {
  // Payment link details
  name: string;
  description?: string;
  amount: number;
  currency?: string;

  // Consumer (optional) - either ID or create inline
  consumer?: {
    id?: string;          // If provided, uses this consumer (skips search)
    email?: string;       // Used for matching existing consumers
    phone?: string;       // Used for matching existing consumers
    name?: string;
    metadata?: Record<string, unknown>;
  };

  // Product - either ID or create inline
  product?: {
    id?: string;          // If provided, uses this product (skips search)
    name?: string;        // Used for matching existing products
    description?: string;
    price?: number;       // Used for matching existing products
    currency?: string;
    metadata?: Record<string, unknown>;
  };

  // Payment link settings
  quantity?: number;
  validUntil?: Date | string;
  maxNumberOfPayments?: number;

  // Redirect URLs
  successRedirectUrl?: string;
  failureRedirectUrl?: string;

  // Optional fields
  coupons?: string[];
  customMetadata?: Record<string, unknown>;
  contactInformationType?: "PHONE" | "EMAIL";

  // Control behavior
  options?: {
    /**
     * If true, always creates new consumer/product even if matching ones exist
     * Default: false (reuses existing resources)
     */
    forceCreate?: boolean;
  };
};

/**
 * Response from simplified payment link creation
 */
export type SimplePaymentLinkResponse = {
  paymentLink: PaymentLinkDetailed;
  paymentUrl: string;
  productId: string;
  consumerId: string | undefined;
};