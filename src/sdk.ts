import { HttpClient, type Auth } from "./http";
import type {
  // Consumers
  ConsumerCreate,
  ConsumerResponse,
  ConsumerUpdate,
  ConsumerListResponse,
  // Products
  ProductCreate,
  ProductDto,
  ProductUpdate,
  ProductListResponse,
  // Payment Links
  CreateLinkInput,
  CreatePaymentLinkDto,
  PaymentLinkDetailed,
  PaymentLinkListResponse,
  // Coupons
  CouponCreate,
  CouponDetailed,
  CouponUpdate,
  CouponListResponse,
  // Invoices
  InvoiceDetailed,
  InvoiceListResponse,
  // Payments
  PaymentResponse,
  PaymentListResponse,
  PaymentRefundRequest,
  // Subscriptions
  SubscriptionCreate,
  SubscriptionDetailed,
  SubscriptionUpdate,
  SubscriptionListResponse,
  SubscriptionCancel,
  FreezeSubscriptionCreateRequest,
  FreezeSubscriptionBase,
  FreezeSubscriptionUpdateRequest,
  FreezeListResponse,
  // Pagination
  PaginationParams,
} from "./types";

/**
 * Default baseUrl comes from OpenAPI servers list.  [oai_citation:3‡stream-app-service.streampay.sa](https://stream-app-service.streampay.sa/openapi.json)
 */
const DEFAULT_BASE_URL = "https://stream-app-service.streampay.sa";

export type StreamSDKInitOptions = {
  baseUrl?: string;
  /**
   * If you want to use bearer token instead of apiKey, pass bearerToken.
   * OpenAPI shows endpoints accept either JWTBearer or APIKey.  [oai_citation:4‡stream-app-service.streampay.sa](https://stream-app-service.streampay.sa/openapi.json)
   */
  bearerToken?: string;
  fetchFn?: typeof fetch;
};

export default class StreamSDK {
  static init(apiKey: string, opts: StreamSDKInitOptions = {}) {
    const auth: Auth =
      opts.bearerToken ? { kind: "bearer", token: opts.bearerToken } :
      apiKey ? { kind: "apiKey", apiKey } :
      { kind: "none" };

    const httpOptions: { baseUrl: string; auth: Auth; fetchFn?: typeof fetch; userAgent: string } = {
      baseUrl: opts.baseUrl ?? DEFAULT_BASE_URL,
      auth,
      userAgent: "stream-sdk/0.1.0"
    };

    if (opts.fetchFn !== undefined) {
      httpOptions.fetchFn = opts.fetchFn;
    }

    const http = new HttpClient(httpOptions);

    return new StreamClient(http);
  }
}

export class StreamClient {
  constructor(private readonly http: HttpClient) {}

  /**
   * Helper to build request options with optional query params
   */
  private buildGetRequest(path: string, query?: Record<string, any>): { method: "GET"; path: string; query?: Record<string, string | number | boolean | null | undefined> } {
    const opts: { method: "GET"; path: string; query?: Record<string, string | number | boolean | null | undefined> } = {
      method: "GET",
      path
    };
    if (query !== undefined) {
      opts.query = query;
    }
    return opts;
  }

  // ===========================
  // CONSUMERS
  // ===========================

  /**
   * Create a new consumer
   * POST /api/v2/consumers
   */
  createConsumer(input: ConsumerCreate): Promise<ConsumerResponse> {
    return this.http.request<ConsumerResponse>({
      method: "POST",
      path: "/api/v2/consumers",
      body: input
    });
  }

  /**
   * @deprecated Use createConsumer instead
   */
  createUser(input: ConsumerCreate): Promise<ConsumerResponse> {
    return this.createConsumer(input);
  }

  /**
   * List all consumers with pagination
   * GET /api/v2/consumers
   */
  listConsumers(params?: PaginationParams): Promise<ConsumerListResponse> {
    const opts: { method: "GET"; path: string; query?: Record<string, string | number | boolean | null | undefined> } = {
      method: "GET",
      path: "/api/v2/consumers"
    };
    if (params !== undefined) {
      opts.query = params;
    }
    return this.http.request<ConsumerListResponse>(opts);
  }

  /**
   * Get a specific consumer by ID
   * GET /api/v2/consumers/{consumer_id}
   */
  getConsumer(consumerId: string): Promise<ConsumerResponse> {
    return this.http.request<ConsumerResponse>({
      method: "GET",
      path: `/api/v2/consumers/${consumerId}`
    });
  }

  /**
   * Update a consumer
   * PUT /api/v2/consumers/{org_consumer_id}
   */
  updateConsumer(consumerId: string, input: ConsumerUpdate): Promise<ConsumerResponse> {
    return this.http.request<ConsumerResponse>({
      method: "PUT",
      path: `/api/v2/consumers/${consumerId}`,
      body: input
    });
  }

  /**
   * Delete a consumer
   * DELETE /api/v2/consumers/{org_consumer_id}
   */
  deleteConsumer(consumerId: string): Promise<void> {
    return this.http.request<void>({
      method: "DELETE",
      path: `/api/v2/consumers/${consumerId}`
    });
  }

  // ===========================
  // PRODUCTS
  // ===========================

  /**
   * Create a new product
   * POST /api/v2/products
   */
  createProduct(input: ProductCreate): Promise<ProductDto> {
    return this.http.request<ProductDto>({
      method: "POST",
      path: "/api/v2/products",
      body: input
    });
  }

  /**
   * List all products with pagination
   * GET /api/v2/products
   */
  listProducts(params?: PaginationParams): Promise<ProductListResponse> {
    return this.http.request<ProductListResponse>(this.buildGetRequest("/api/v2/products", params));
  }

  /**
   * Get a specific product by ID
   * GET /api/v2/products/{product_id}
   */
  getProduct(productId: string): Promise<ProductDto> {
    return this.http.request<ProductDto>({
      method: "GET",
      path: `/api/v2/products/${productId}`
    });
  }

  /**
   * Update a product
   * PUT /api/v2/products/{product_id}
   */
  updateProduct(productId: string, input: ProductUpdate): Promise<ProductDto> {
    return this.http.request<ProductDto>({
      method: "PUT",
      path: `/api/v2/products/${productId}`,
      body: input
    });
  }

  /**
   * Delete a product
   * DELETE /api/v2/products/{product_id}
   */
  deleteProduct(productId: string): Promise<void> {
    return this.http.request<void>({
      method: "DELETE",
      path: `/api/v2/products/${productId}`
    });
  }

  // ===========================
  // COUPONS
  // ===========================

  /**
   * Create a new coupon
   * POST /api/v2/coupons
   */
  createCoupon(input: CouponCreate): Promise<CouponDetailed> {
    return this.http.request<CouponDetailed>({
      method: "POST",
      path: "/api/v2/coupons",
      body: input
    });
  }

  /**
   * List all coupons with pagination
   * GET /api/v2/coupons
   */
  listCoupons(params?: PaginationParams): Promise<CouponListResponse> {
    return this.http.request<CouponListResponse>(this.buildGetRequest("/api/v2/coupons", params));
  }

  /**
   * Get a specific coupon by ID
   * GET /api/v2/coupons/{coupon_id}
   */
  getCoupon(couponId: string): Promise<CouponDetailed> {
    return this.http.request<CouponDetailed>({
      method: "GET",
      path: `/api/v2/coupons/${couponId}`
    });
  }

  /**
   * Update a coupon
   * PUT /api/v2/coupons/{coupon_id}
   */
  updateCoupon(couponId: string, input: CouponUpdate): Promise<CouponDetailed> {
    return this.http.request<CouponDetailed>({
      method: "PUT",
      path: `/api/v2/coupons/${couponId}`,
      body: input
    });
  }

  /**
   * Delete a coupon
   * DELETE /api/v2/coupons/{coupon_id}
   */
  deleteCoupon(couponId: string): Promise<void> {
    return this.http.request<void>({
      method: "DELETE",
      path: `/api/v2/coupons/${couponId}`
    });
  }

  // ===========================
  // INVOICES
  // ===========================

  /**
   * List all invoices with pagination
   * GET /api/v2/invoices
   */
  listInvoices(params?: PaginationParams): Promise<InvoiceListResponse> {
    return this.http.request<InvoiceListResponse>(this.buildGetRequest("/api/v2/invoices", params));
  }

  /**
   * Get a specific invoice by ID
   * GET /api/v2/invoices/{invoice_id}
   */
  getInvoice(invoiceId: string): Promise<InvoiceDetailed> {
    return this.http.request<InvoiceDetailed>({
      method: "GET",
      path: `/api/v2/invoices/${invoiceId}`
    });
  }

  // ===========================
  // PAYMENTS
  // ===========================

  /**
   * List all payments with optional invoice filter
   * GET /api/v2/payments
   */
  listPayments(params?: { invoice_id?: string }): Promise<PaymentListResponse> {
    return this.http.request<PaymentListResponse>(this.buildGetRequest("/api/v2/payments", params));
  }

  /**
   * Get a specific payment by ID
   * GET /api/v2/payments/{payment_id}
   */
  getPayment(paymentId: string): Promise<PaymentResponse> {
    return this.http.request<PaymentResponse>({
      method: "GET",
      path: `/api/v2/payments/${paymentId}`
    });
  }

  /**
   * Refund a payment
   * POST /api/v2/payments/{payment_id}/refund
   */
  refundPayment(paymentId: string, input: PaymentRefundRequest): Promise<PaymentResponse> {
    return this.http.request<PaymentResponse>({
      method: "POST",
      path: `/api/v2/payments/${paymentId}/refund`,
      body: input
    });
  }

  // ===========================
  // SUBSCRIPTIONS
  // ===========================

  /**
   * Create a new subscription
   * POST /api/v2/subscriptions
   */
  createSubscription(input: SubscriptionCreate): Promise<SubscriptionDetailed> {
    return this.http.request<SubscriptionDetailed>({
      method: "POST",
      path: "/api/v2/subscriptions",
      body: input
    });
  }

  /**
   * List all subscriptions with pagination
   * GET /api/v2/subscriptions
   */
  listSubscriptions(params?: PaginationParams): Promise<SubscriptionListResponse> {
    return this.http.request<SubscriptionListResponse>(this.buildGetRequest("/api/v2/subscriptions", params));
  }

  /**
   * Get a specific subscription by ID
   * GET /api/v2/subscriptions/{subscription_id}
   */
  getSubscription(subscriptionId: string): Promise<SubscriptionDetailed> {
    return this.http.request<SubscriptionDetailed>({
      method: "GET",
      path: `/api/v2/subscriptions/${subscriptionId}`
    });
  }

  /**
   * Update a subscription
   * PUT /api/v2/subscriptions/{subscription_id}
   */
  updateSubscription(subscriptionId: string, input: SubscriptionUpdate): Promise<SubscriptionDetailed> {
    return this.http.request<SubscriptionDetailed>({
      method: "PUT",
      path: `/api/v2/subscriptions/${subscriptionId}`,
      body: input
    });
  }

  /**
   * Cancel a subscription
   * POST /api/v2/subscriptions/{subscription_id}/cancel
   */
  cancelSubscription(subscriptionId: string, input?: SubscriptionCancel): Promise<SubscriptionDetailed> {
    return this.http.request<SubscriptionDetailed>({
      method: "POST",
      path: `/api/v2/subscriptions/${subscriptionId}/cancel`,
      body: input
    });
  }

  /**
   * Freeze a subscription (pause invoice generation)
   * POST /api/v2/subscriptions/{subscription_id}/freeze
   */
  freezeSubscription(subscriptionId: string, input: FreezeSubscriptionCreateRequest): Promise<FreezeSubscriptionBase> {
    return this.http.request<FreezeSubscriptionBase>({
      method: "POST",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze`,
      body: input
    });
  }

  /**
   * List all freeze periods for a subscription
   * GET /api/v2/subscriptions/{subscription_id}/freeze
   */
  listSubscriptionFreezes(subscriptionId: string): Promise<FreezeListResponse> {
    return this.http.request<FreezeListResponse>({
      method: "GET",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze`
    });
  }

  /**
   * Update a subscription freeze period
   * PUT /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
   */
  updateSubscriptionFreeze(
    subscriptionId: string,
    freezeId: string,
    input: FreezeSubscriptionUpdateRequest
  ): Promise<FreezeSubscriptionBase> {
    return this.http.request<FreezeSubscriptionBase>({
      method: "PUT",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze/${freezeId}`,
      body: input
    });
  }

  /**
   * Delete a subscription freeze period
   * DELETE /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
   */
  deleteSubscriptionFreeze(subscriptionId: string, freezeId: string): Promise<void> {
    return this.http.request<void>({
      method: "DELETE",
      path: `/api/v2/subscriptions/${subscriptionId}/freeze/${freezeId}`
    });
  }

  // ===========================
  // PAYMENT LINKS
  // ===========================

  /**
   * Create a payment link (simplified interface)
   * POST /api/v2/payment_links
   */
  async createLink(input: CreateLinkInput): Promise<PaymentLinkDetailed> {
    const dto: CreatePaymentLinkDto = {
      name: input.name,
      description: input.description ?? null,

      // Required by schema: items[]
      items: [
        {
          // openapi types will enforce the correct keys; commonly it's product_id + quantity
          product_id: input.productId,
          quantity: input.quantity ?? 1
        } as any
      ],

      coupons: input.coupons ?? [],
      max_number_of_payments: input.maxNumberOfPayments ?? null,
      valid_until: toIsoOrNull(input.validUntil),

      success_redirect_url: input.successRedirectUrl ?? null,
      failure_redirect_url: input.failureRedirectUrl ?? null,

      organization_consumer_id: input.consumerId ?? null,
      custom_metadata: input.customMetadata ?? null,
      contact_information_type: input.contactInformationType ?? null
    } as any;

    return this.http.request<PaymentLinkDetailed>({
      method: "POST",
      path: "/api/v2/payment_links",
      body: dto
    });
  }

  /**
   * Create a payment link (full interface with raw DTO)
   * POST /api/v2/payment_links
   */
  createPaymentLink(input: CreatePaymentLinkDto): Promise<PaymentLinkDetailed> {
    return this.http.request<PaymentLinkDetailed>({
      method: "POST",
      path: "/api/v2/payment_links",
      body: input
    });
  }

  /**
   * List all payment links with pagination
   * GET /api/v2/payment_links
   */
  listPaymentLinks(params?: PaginationParams): Promise<PaymentLinkListResponse> {
    return this.http.request<PaymentLinkListResponse>(this.buildGetRequest("/api/v2/payment_links", params));
  }

  /**
   * Get a specific payment link by ID
   * GET /api/v2/payment_links/{payment_link_id}
   */
  getPaymentLink(paymentLinkId: string): Promise<PaymentLinkDetailed> {
    return this.http.request<PaymentLinkDetailed>({
      method: "GET",
      path: `/api/v2/payment_links/${paymentLinkId}`
    });
  }

  /**
   * SDK helper: returns a best-effort "pay URL" if the API returns one.
   * (Field name can vary; we keep it defensive.)
   */
  getPaymentUrl(link: PaymentLinkDetailed): string | null {
    const anyLink = link as any;
    return (
      anyLink?.payment_url ??
      anyLink?.paymentUrl ??
      anyLink?.url ??
      anyLink?.link ??
      anyLink?.redirect_url ??
      anyLink?.checkout_url ??
      null
    );
  }
}

function toIsoOrNull(v: Date | string | null | undefined): string | null {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  // assume already ISO or acceptable date-time string per API
  return v;
}