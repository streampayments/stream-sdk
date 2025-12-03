type Auth = {
    kind: "apiKey";
    apiKey: string;
} | {
    kind: "bearer";
    token: string;
} | {
    kind: "none";
};
type HttpClientOptions = {
    baseUrl: string;
    auth: Auth;
    fetchFn?: typeof fetch;
    userAgent?: string;
};
declare class HttpClient {
    private readonly baseUrl;
    private readonly fetchFn;
    private readonly userAgent;
    private auth;
    constructor(opts: HttpClientOptions);
    setAuth(auth: Auth): void;
    request<TResponse>(opts: {
        method: "GET" | "POST" | "PUT" | "DELETE";
        path: string;
        query?: Record<string, string | number | boolean | null | undefined>;
        body?: unknown;
    }): Promise<TResponse>;
}

interface components {
    schemas: {
        /** BaseConsumerResponse */
        BaseConsumerResponse: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Email */
            email?: string | null;
            /** External Id */
            external_id?: string | null;
            consumer?: components["schemas"]["app__consumer__v2__dtos__Consumer"] | null;
            /** Iban */
            iban?: string | null;
            /** Is Deleted */
            is_deleted: boolean;
            /** Alias */
            alias?: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            branch: components["schemas"]["Branch"];
            /** Comment */
            comment?: string | null;
            /** Communication Methods */
            communication_methods: components["schemas"]["ConsumerCommunicationMethod"][];
            /** Preferred Language */
            preferred_language: string;
        };
        /** Branch */
        Branch: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
        };
        /** BranchDto */
        BranchDto: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
        };
        /**
         * ConsumerCommunicationMethod
         * @enum {string}
         */
        ConsumerCommunicationMethod: "WHATSAPP" | "EMAIL" | "SMS";
        /**
         * ConsumerCreate
         * @description Consumer creation model.
         */
        ConsumerCreate: {
            /**
             * Name
             * @description Consumer name
             */
            name: string;
            /**
             * Phone Number
             * @description Phone number
             */
            phone_number?: string | null;
            /**
             * Email
             * @description Email address
             */
            email?: string | null;
            /**
             * External Id
             * @description External ID
             */
            external_id?: string | null;
            /**
             * Iban
             * @description IBAN
             */
            iban?: string | null;
            /**
             * Alias
             * @description Alias
             */
            alias?: string | null;
            /**
             * Comment
             * @description Comment
             */
            comment?: string | null;
            /**
             * Preferred Language
             * @description Preferred language
             */
            preferred_language?: string | null;
            /**
             * Communication Methods
             * @description Communication methods
             */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
        };
        /** ConsumerResponse */
        ConsumerResponse: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Email */
            email?: string | null;
            /** External Id */
            external_id?: string | null;
            consumer?: components["schemas"]["app__consumer__v2__dtos__Consumer"] | null;
            /** Iban */
            iban?: string | null;
            /** Is Deleted */
            is_deleted: boolean;
            /** Alias */
            alias?: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            branch: components["schemas"]["Branch"];
            /** Comment */
            comment?: string | null;
            /** Communication Methods */
            communication_methods: components["schemas"]["ConsumerCommunicationMethod"][];
            /** Preferred Language */
            preferred_language: string;
            last_invoice_activity?: components["schemas"]["LastInvoiceActivity"] | null;
        };
        /**
         * ConsumerUpdate
         * @description Consumer update model that inherits from ConsumerCreate but makes all fields optional.
         */
        ConsumerUpdate: {
            /** Name */
            name?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            /** Email */
            email?: string | null;
            /** External Id */
            external_id?: string | null;
            /** Iban */
            iban?: string | null;
            /** Alias */
            alias?: string | null;
            /** Comment */
            comment?: string | null;
            /**
             * Preferred Language
             * @description Preferred language
             */
            preferred_language?: string | null;
            /** Communication Methods */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
        };
        /**
         * ContactInformationType
         * @enum {string}
         */
        ContactInformationType: "PHONE" | "EMAIL";
        /** CouponCalculationMetadataDto */
        CouponCalculationMetadataDto: {
            /** Coupons */
            coupons: components["schemas"]["CouponMetadataDto"][];
        };
        /** CouponCreate */
        CouponCreate: {
            /**
             * Name
             * @description Name of the coupon.
             */
            name: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value: number | string;
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             * @default false
             */
            is_percentage: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is active upon creation.
             * @default true
             */
            is_active: boolean;
        };
        /** CouponDetailed */
        CouponDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Name
             * @description Name of the coupon.
             */
            name: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value: string;
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             */
            is_percentage: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is currently active.
             */
            is_active: boolean;
            /**
             * Redemptions
             * @description Indicates how many times this coupon has been used.
             */
            redemptions: number;
        };
        /** CouponDto */
        CouponDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Name
             * @description Name of the coupon.
             */
            name: string;
            /**
             * Discount Value
             * @description Discount value of the coupon (either percentage or fixed).
             */
            discount_value: string;
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             */
            is_percentage: boolean;
            /**
             * Is Active
             * @description Indicates if the coupon is currently active.
             */
            is_active: boolean;
        };
        /** CouponMetadataDto */
        CouponMetadataDto: {
            /** Coupon Id */
            coupon_id: string;
            /** Name */
            name: string;
            /** Is Percentage */
            is_percentage: boolean;
            /** Discount Value */
            discount_value: string;
            /** Order */
            order: number;
            /** Amount Before Discount */
            amount_before_discount: string;
            /** Discount Amount */
            discount_amount: string;
            /** Amount After Discount */
            amount_after_discount: string;
        };
        /** CouponUpdate */
        CouponUpdate: {
            /**
             * Name
             * @description Updated name of the coupon.
             */
            name?: string | null;
            /**
             * Discount Value
             * @description Updated discount value (either percentage or fixed).
             */
            discount_value?: number | string | null;
            /**
             * Is Percentage
             * @description True if the discount is a percentage, False if it is a fixed amount.
             */
            is_percentage?: boolean | null;
            /**
             * Is Active
             * @description Whether the coupon should be active or inactive.
             */
            is_active?: boolean | null;
        };
        /** CreatePaymentLinkDto */
        CreatePaymentLinkDto: {
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Items */
            items: components["schemas"]["CreatePaymentLinkItemDto"][];
            /** Coupons */
            coupons?: string[];
            /**
             * Max Number Of Payments
             * @description Maximum number of times this payment link can be used. If null, the payment link can be used unlimited times. If organization_consumer_id is set, this number becomes how many times that specific customer can pay. Typically this should be set to 1 in that scenario.
             */
            max_number_of_payments?: number | null;
            /**
             * Valid Until
             * @description Datetime after which the payment link is no longer valid. If no timezone is specified, UTC is assumed.
             */
            valid_until?: string | null;
            /** Confirmation Message */
            confirmation_message?: string | null;
            /** @description Configure which payment methods are available for customers to use when paying through this link. Each payment method type can be individually enabled or disabled. If null, the organization's default payment method settings will be used. */
            payment_methods?: components["schemas"]["PaymentMethodDto"] | null;
            /**
             * Custom Fields
             * @description A JSON Schema defining the custom fields.
             */
            custom_fields?: {
                [key: string]: unknown;
            } | null;
            /**
             * Success Redirect Url
             * @description URL to redirect the payer to after a successful payment
             */
            success_redirect_url?: string | null;
            /**
             * Failure Redirect Url
             * @description URL to redirect the payer to after a failed payment
             */
            failure_redirect_url?: string | null;
            /**
             * Organization Consumer Id
             * @description ID of an existing consumer who will pay using this payment link. If set, customer information is not collected and this payment will be for that customer only. This is typically used when a specific customer is paying once. If not set, the link will collect customer information first. Use this when you expect multiple payments from different people, such as for a group trip or event.
             */
            organization_consumer_id?: string | null;
            /**
             * Custom Metadata
             * @description Custom key-value metadata to be sent to payment gateway and returned in webhooks
             */
            custom_metadata?: {
                [key: string]: components["schemas"]["JsonValue"];
            } | null;
            /** @description Type of contact information required for payment collection (PHONE or EMAIL). Defaults to PHONE if not specified. */
            contact_information_type?: components["schemas"]["ContactInformationType"] | null;
        };
        /** CreatePaymentLinkItemDto */
        CreatePaymentLinkItemDto: {
            /**
             * Product Id
             * Format: uuid4
             */
            product_id: string;
            /**
             * Quantity
             * @default 1
             */
            quantity: number;
            /** Coupons */
            coupons?: string[];
        };
        /** FreezeSubscriptionBase */
        FreezeSubscriptionBase: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * Freeze Start Datetime
             * Format: date-time
             */
            freeze_start_datetime: string;
            /** Freeze End Datetime */
            freeze_end_datetime?: string | null;
            /** Notes */
            notes?: string | null;
            /**
             * Subscription Id
             * Format: uuid
             */
            subscription_id: string;
            /**
             * Invoice Id
             * Format: uuid
             */
            invoice_id: string;
            /** Duration */
            duration?: number | null;
        };
        /** FreezeSubscriptionCreateRequest */
        FreezeSubscriptionCreateRequest: {
            /**
             * Freeze Start Datetime
             * Format: date-time
             */
            freeze_start_datetime: string;
            /** Freeze End Datetime */
            freeze_end_datetime?: string | null;
            /** Notes */
            notes?: string | null;
        };
        /** FreezeSubscriptionUpdateRequest */
        FreezeSubscriptionUpdateRequest: {
            /**
             * Freeze Start Datetime
             * Format: date-time
             * @description freeze_start_datetime is always provided even if it dont change
             */
            freeze_start_datetime: string;
            /**
             * Freeze End Datetime
             * @description freeze_end_datetime is optional, if provided, it must be greater than freeze_start_datetime
             */
            freeze_end_datetime: string | null;
            /** Notes */
            notes: string | null;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** InvoiceBase */
        InvoiceBase: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * User Id
             * Format: uuid4
             */
            user_id: string;
            /**
             * Organization Id
             * Format: uuid4
             */
            organization_id: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             */
            organization_consumer_id: string;
            /**
             * Account Id
             * Format: uuid4
             */
            account_id: string;
            /**
             * Branch Id
             * Format: uuid4
             */
            branch_id: string;
            /** Org Invoice Number */
            org_invoice_number: number;
            /** Description */
            description?: string | null;
            /** Total Amount */
            total_amount: string;
            /** Original Amount */
            original_amount: string;
            /** Item Level Discounted Amount */
            item_level_discounted_amount: string;
            /**
             * Total Vat Amount
             * @description Total VAT amount calculated from products
             */
            total_vat_amount?: string | null;
            /**
             * Total Price Excluding Vat
             * @description Total price excluding VAT
             */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            /** Currency */
            currency?: string | null;
            /** Consumer Message */
            consumer_message?: string | null;
            status: components["schemas"]["InvoiceStatusEnum"];
            payment_method: components["schemas"]["PaymentMethodEnum"];
            allowed_payment_flow: components["schemas"]["PaymentFlow"];
            current_payment_flow?: components["schemas"]["PaymentFlow"] | null;
            /** Period Start */
            period_start?: string | null;
            /** Period End */
            period_end?: string | null;
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /** Recurring Interval Count */
            recurring_interval_count?: number | null;
            type?: components["schemas"]["InvoiceType"] | null;
        };
        /** InvoiceDetailed */
        InvoiceDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * User Id
             * Format: uuid4
             */
            user_id: string;
            /**
             * Organization Id
             * Format: uuid4
             */
            organization_id: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             */
            organization_consumer_id: string;
            /**
             * Account Id
             * Format: uuid4
             */
            account_id: string;
            /**
             * Branch Id
             * Format: uuid4
             */
            branch_id: string;
            /** Org Invoice Number */
            org_invoice_number: number;
            /** Description */
            description?: string | null;
            /** Total Amount */
            total_amount: string;
            /** Original Amount */
            original_amount: string;
            /** Item Level Discounted Amount */
            item_level_discounted_amount: string;
            /**
             * Total Vat Amount
             * @description Total VAT amount calculated from products
             */
            total_vat_amount?: string | null;
            /**
             * Total Price Excluding Vat
             * @description Total price excluding VAT
             */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            /** Currency */
            currency?: string | null;
            /** Consumer Message */
            consumer_message?: string | null;
            status: components["schemas"]["InvoiceStatusEnum"];
            payment_method: components["schemas"]["PaymentMethodEnum"];
            allowed_payment_flow: components["schemas"]["PaymentFlow"];
            current_payment_flow?: components["schemas"]["PaymentFlow"] | null;
            /** Period Start */
            period_start?: string | null;
            /** Period End */
            period_end?: string | null;
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /** Recurring Interval Count */
            recurring_interval_count?: number | null;
            type?: components["schemas"]["InvoiceType"] | null;
            /**
             * Invoice Number
             * @description Global unique invoice number
             */
            invoice_number: number;
            /**
             * Remaining Amount
             * @description Remaining amount to be paid
             */
            remaining_amount: string;
            /**
             * Paid Amount
             * @description Total amount already paid
             */
            paid_amount: string;
            /** Exclude Coupons If Installments */
            exclude_coupons_if_installments: boolean;
            organization_consumer: components["schemas"]["app__common__dtos__shared__OrganizationConsumer"];
            /** Items */
            items: components["schemas"]["InvoiceItemDto"][];
            branch?: components["schemas"]["BranchDto"] | null;
            /** Payments */
            payments: components["schemas"]["PaymentDto"][];
            /** Subscription Id */
            subscription_id?: string | null;
            subscription?: components["schemas"]["SubscriptionDetailed"] | null;
            payment_methods?: components["schemas"]["InvoicePaymentMethodDto"] | null;
            /** @description Recurrence pattern for recurring invoices */
            recurrence_pattern?: components["schemas"]["RecurrencePattern"] | null;
            /**
             * Parent Id
             * @description Parent invoice ID for recurring invoices
             */
            parent_id?: string | null;
            /** Custom Field Answers */
            custom_field_answers?: {
                [key: string]: unknown;
            } | null;
            /** Url */
            url: string;
        };
        /** InvoiceItemDto */
        InvoiceItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Product Id
             * Format: uuid4
             */
            product_id: string;
            product: components["schemas"]["ProductDto"];
            /** Quantity */
            quantity: number;
            /** Original Amount */
            original_amount: string;
            /** Discounted Amount */
            discounted_amount: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
        };
        /** InvoiceListFilters */
        InvoiceListFilters: {
            /**
             * Include Payments
             * @default false
             */
            include_payments: boolean | null;
            /** Payment Link Id */
            payment_link_id?: string | null;
            /** Statuses */
            statuses?: components["schemas"]["InvoiceStatusEnum"][] | null;
            /**
             * Payment Statuses
             * @description Invoice includes payments with the following statuses
             */
            payment_statuses?: components["schemas"]["PaymentStatusEnum"][] | null;
            /** Search Term */
            search_term?: string | null;
            /** From Date */
            from_date?: string | null;
            /** To Date */
            to_date?: string | null;
            /**
             * Due Date From
             * @description Invoice's payment due date from this date onwards
             */
            due_date_from?: string | null;
            /**
             * Due Date To
             * @description Invoice's payment due date to this date or older
             */
            due_date_to?: string | null;
            /** From Price */
            from_price?: number | string | null;
            /** To Price */
            to_price?: number | string | null;
            /** Organization Consumer Id */
            organization_consumer_id?: string | null;
            /** Subscription Id */
            subscription_id?: string | null;
        };
        /** InvoiceListItem */
        InvoiceListItem: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * User Id
             * Format: uuid4
             */
            user_id: string;
            /**
             * Organization Id
             * Format: uuid4
             */
            organization_id: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             */
            organization_consumer_id: string;
            /**
             * Account Id
             * Format: uuid4
             */
            account_id: string;
            /**
             * Branch Id
             * Format: uuid4
             */
            branch_id: string;
            /** Org Invoice Number */
            org_invoice_number: number;
            /** Description */
            description?: string | null;
            /** Total Amount */
            total_amount: string;
            /** Original Amount */
            original_amount: string;
            /** Item Level Discounted Amount */
            item_level_discounted_amount: string;
            /**
             * Total Vat Amount
             * @description Total VAT amount calculated from products
             */
            total_vat_amount?: string | null;
            /**
             * Total Price Excluding Vat
             * @description Total price excluding VAT
             */
            total_price_excluding_vat?: string | null;
            /** @description Metadata about how coupons were applied to the invoice */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            /** Currency */
            currency?: string | null;
            /** Consumer Message */
            consumer_message?: string | null;
            status: components["schemas"]["InvoiceStatusEnum"];
            payment_method: components["schemas"]["PaymentMethodEnum"];
            allowed_payment_flow: components["schemas"]["PaymentFlow"];
            current_payment_flow?: components["schemas"]["PaymentFlow"] | null;
            /** Period Start */
            period_start?: string | null;
            /** Period End */
            period_end?: string | null;
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /** Recurring Interval Count */
            recurring_interval_count?: number | null;
            type?: components["schemas"]["InvoiceType"] | null;
            /** Remaining Amount */
            remaining_amount?: string | null;
            /** Paid Amount */
            paid_amount: string;
            organization_consumer: components["schemas"]["app__common__dtos__shared__OrganizationConsumer"];
            subscription?: components["schemas"]["InvoiceListSubscrptionDto"] | null;
            /** Payments */
            payments?: components["schemas"]["PaymentDto"][] | null;
            /**
             * Total Number Of Payments
             * @description Total number of payments for this invoice
             */
            total_number_of_payments: number;
            /**
             * Last Payment Paid At
             * @description The date when the last payment was paid
             */
            last_payment_paid_at?: string | null;
        };
        /** InvoiceListSubscrptionDto */
        InvoiceListSubscrptionDto: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            recurring_interval: components["schemas"]["SubscriptionRecurringInterval"];
            /** Recurring Interval Count */
            recurring_interval_count: number;
            status: components["schemas"]["SubscriptionStatus"];
            /**
             * Current Period Start
             * Format: date-time
             */
            current_period_start: string;
            /** Current Period End */
            current_period_end?: string | null;
            /** Cancel At Period End */
            cancel_at_period_end: boolean;
        };
        /** InvoicePaymentMethodDto */
        InvoicePaymentMethodDto: {
            /**
             * Mada
             * @description mada is enabled
             */
            mada: boolean;
            /**
             * Visa
             * @description visa is enabled
             */
            visa: boolean;
            /**
             * Mastercard
             * @description mastercard is enabled
             */
            mastercard: boolean;
            /**
             * Amex
             * @description amex is enabled
             */
            amex: boolean;
            /**
             * Bank Transfer
             * @description bank_transfer is enabled
             */
            bank_transfer: boolean;
            /**
             * Installment
             * @description installment is enabled
             */
            installment: boolean;
        };
        /**
         * InvoiceStatusEnum
         * @description Invoice status enum representing the lifecycle/state of an invoice.
         *
         *     Status describes the current stage of an invoice in its lifecycle (DRAFT → CREATED → SENT → ACCEPTED → COMPLETED).
         *     This changes over time as the invoice progresses. Different from InvoiceType which describes the payment structure.
         * @enum {string}
         */
        InvoiceStatusEnum: "DRAFT" | "CREATED" | "SENT" | "ACCEPTED" | "REJECTED" | "COMPLETED" | "CANCELED" | "EXPIRED";
        /**
         * InvoiceType
         * @description Invoice type enum representing the payment structure/pattern of an invoice.
         *
         *     Type describes how the invoice is structured for payments (ONE_OFF, RECURRING, INSTALLMENTS, etc.).
         *     This is determined at invoice creation and typically doesn't change. Different from InvoiceStatusEnum
         *     which describes the current lifecycle state of the invoice.
         * @enum {string}
         */
        InvoiceType: "ONE_OFF" | "ONE_OFF_FUTURE" | "RECURRING" | "INSTALLMENTS";
        JsonValue: unknown;
        /**
         * Language
         * @enum {string}
         */
        Language: "AR" | "EN";
        /** LastInvoiceActivity */
        LastInvoiceActivity: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Org Invoice Number */
            org_invoice_number: number;
            /** Subcription Id */
            subcription_id?: string | null;
        };
        /** ListResource[ConsumerResponse] */
        ListResource_ConsumerResponse_: {
            /** Data */
            data: components["schemas"]["ConsumerResponse"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[CouponDetailed] */
        ListResource_CouponDetailed_: {
            /** Data */
            data: components["schemas"]["CouponDetailed"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[FreezeSubscriptionBase] */
        ListResource_FreezeSubscriptionBase_: {
            /** Data */
            data: components["schemas"]["FreezeSubscriptionBase"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[InvoiceListItem] */
        ListResource_InvoiceListItem_: {
            /** Data */
            data: components["schemas"]["InvoiceListItem"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[PaymentLinkDetailed] */
        ListResource_PaymentLinkDetailed_: {
            /** Data */
            data: components["schemas"]["PaymentLinkDetailed"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[ProductDto] */
        ListResource_ProductDto_: {
            /** Data */
            data: components["schemas"]["ProductDto"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** ListResource[SubscriptionDetailed] */
        ListResource_SubscriptionDetailed_: {
            /** Data */
            data: components["schemas"]["SubscriptionDetailed"][];
            pagination: components["schemas"]["Pagination"];
        };
        /** Pagination */
        Pagination: {
            /** Total Count */
            total_count: number;
            /** Max Page */
            max_page: number;
            /** Current Page */
            current_page: number;
            /** Limit */
            limit: number;
            /** Has Next Page */
            has_next_page: boolean;
            /** Has Previous Page */
            has_previous_page: boolean;
        };
        /** PaymentDto */
        PaymentDto: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Amount */
            amount: string;
            /** Currency */
            currency: string;
            /**
             * Scheduled On
             * Format: date-time
             */
            scheduled_on: string;
            /** Invoice Payment Number */
            invoice_payment_number: number;
            type: components["schemas"]["PaymentTypeEnum"];
            payment_method?: components["schemas"]["PaymentMethod"] | null;
            current_status: components["schemas"]["PaymentStatusEnum"];
            /** Payed At */
            payed_at?: string | null;
            /** Settled At */
            settled_at?: string | null;
            /** Refunded At */
            refunded_at?: string | null;
            /** Pdf Link */
            pdf_link?: string | null;
            /** Paid To Account Id */
            paid_to_account_id?: string | null;
        };
        /**
         * PaymentFlow
         * @enum {string}
         */
        PaymentFlow: "ALL" | "AUTO" | "MANUAL";
        /** PaymentLinkDetailed */
        PaymentLinkDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
            /** Description */
            description?: string | null;
            /** Amount */
            amount: string;
            /** Original Amount */
            original_amount: string;
            /** Item Level Discounted Amount */
            item_level_discounted_amount: string;
            /** @description Metadata about how coupons were applied to the payment link */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            /** Currency */
            currency: string;
            /** Max Number Of Payments */
            max_number_of_payments?: number | null;
            /**
             * Valid Until
             * @description UTC datetime after which the payment link is no longer valid
             */
            valid_until?: string | null;
            /** Confirmation Message */
            confirmation_message?: string | null;
            recurring_interval?: components["schemas"]["SubscriptionRecurringInterval"] | null;
            /** Recurring Interval Count */
            recurring_interval_count?: number | null;
            status: components["schemas"]["PaymentLinkStatus"];
            /**
             * Organization Id
             * Format: uuid4
             */
            organization_id: string;
            /**
             * User Id
             * Format: uuid4
             */
            user_id: string;
            /** Organization Consumer Id */
            organization_consumer_id?: string | null;
            /** Deactivate Message */
            deactivate_message?: string | null;
            /** Custom Fields */
            custom_fields?: {
                [key: string]: unknown;
            } | null;
            /** Success Redirect Url */
            success_redirect_url?: string | null;
            /** Failure Redirect Url */
            failure_redirect_url?: string | null;
            /**
             * Custom Metadata
             * @description Custom key-value metadata to be sent to payment gateway and returned in webhooks
             */
            custom_metadata?: {
                [key: string]: components["schemas"]["JsonValue"];
            } | null;
            /** @description Type of contact information required for payment collection (PHONE or EMAIL) */
            contact_information_type?: components["schemas"]["ContactInformationType"] | null;
            /** Items */
            items: components["schemas"]["PaymentLinkItemDto"][];
            /** Coupons */
            coupons: components["schemas"]["CouponDto"][];
            override_payment_methods?: components["schemas"]["PaymentMethodDto"] | null;
            /** Url */
            url?: string | null;
            /**
             * Amount Collected
             * @description Total amount collected from payments
             * @default 0
             */
            amount_collected: string;
        };
        /** PaymentLinkItemDto */
        PaymentLinkItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Product Id
             * Format: uuid4
             */
            product_id: string;
            /** Quantity */
            quantity: number;
            /** Original Amount */
            original_amount: string;
            /** Discounted Amount */
            discounted_amount: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            product: components["schemas"]["ProductDto"];
        };
        /** PaymentLinkListFilters */
        PaymentLinkListFilters: {
            /**
             * Statuses
             * @description Filter by subscription status
             */
            statuses?: components["schemas"]["PaymentLinkStatus"][] | null;
            /**
             * From Date
             * @description datetime is created_at
             */
            from_date?: string | null;
            /**
             * To Date
             * @description datetime is created_at
             */
            to_date?: string | null;
            /**
             * From Price
             * @description limit list by min payment link total amount inclusive
             */
            from_price?: number | string | null;
            /**
             * To Price
             * @description limit list by max payment link total amount inclusive
             */
            to_price?: number | string | null;
            /**
             * Product Ids
             * @description Product ids that need to be in the list of payment links
             */
            product_ids?: string[] | null;
        };
        /**
         * PaymentLinkStatus
         * @enum {string}
         */
        PaymentLinkStatus: "INACTIVE" | "ACTIVE" | "COMPLETED";
        /** PaymentListResponse */
        PaymentListResponse: {
            /** Data */
            data: components["schemas"]["PaymentResponse"][];
        };
        /**
         * PaymentMethod
         * @enum {string}
         */
        PaymentMethod: "MADA" | "MASTERCARD" | "VISA" | "APPLE_PAY" | "AMEX" | "CASH" | "PGW_CARD_UNSPECIFIED" | "BANK_TRANSFER" | "CARD" | "QURRAH";
        /** PaymentMethodDto */
        PaymentMethodDto: {
            /**
             * Visa
             * @description visa is enabled
             * @default false
             */
            visa: boolean;
            /**
             * Mastercard
             * @description mastercard is enabled
             * @default false
             */
            mastercard: boolean;
            /**
             * Amex
             * @description amex is enabled
             * @default false
             */
            amex: boolean;
            /**
             * Bank Transfer
             * @description bank_transfer is enabled
             * @default false
             */
            bank_transfer: boolean;
            /**
             * Installment
             * @description installment is enabled
             * @default false
             */
            installment: boolean;
        };
        /**
         * PaymentMethodEnum
         * @enum {string}
         */
        PaymentMethodEnum: "OPENBANKING" | "PAYMENTGATEWAY";
        /**
         * PaymentRefundReason
         * @enum {string}
         */
        PaymentRefundReason: "REQUESTED_BY_CUSTOMER" | "DUPLICATE" | "FRAUDLENT" | "OTHER";
        /** PaymentRefundRequest */
        PaymentRefundRequest: {
            refund_reason: components["schemas"]["PaymentRefundReason"];
            /** Refund Note */
            refund_note?: string | null;
        };
        /** PaymentResponse */
        PaymentResponse: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Amount */
            amount: string;
            /** Scheduled On */
            scheduled_on: string;
            type: components["schemas"]["PaymentTypeEnum"];
            payment_method?: components["schemas"]["PaymentMethod"] | null;
            current_status: components["schemas"]["PaymentStatusEnum"];
            /** Payed At */
            payed_at?: string | null;
            /** Refunded At */
            refunded_at?: string | null;
            refund_reason?: components["schemas"]["PaymentRefundReason"] | null;
            /** Refund Note */
            refund_note?: string | null;
        };
        /**
         * PaymentStatusEnum
         * @enum {string}
         */
        PaymentStatusEnum: "PENDING" | "PROCESSING" | "FAILED_INITIATION" | "SUCCEEDED" | "FAILED" | "CANCELED" | "UNDER_REVIEW" | "EXPIRED" | "SETTLED" | "REFUNDED";
        /**
         * PaymentTypeEnum
         * @enum {string}
         */
        PaymentTypeEnum: "INITIAL" | "INSTALLMENT";
        /** ProductCreate */
        ProductCreate: {
            /**
             * Name
             * @description Name of the product.
             */
            name: string;
            /**
             * Description
             * @description Description of the product.
             * @default
             */
            description: string | null;
            /**
             * Price
             * @description Price of the product.
             */
            price: number | string;
            /**
             * Is One Time
             * @description Will this product be used only one time in one invoice?
             * @default false
             */
            is_one_time: boolean;
            /** @description the type of product: one off or recurring */
            type: components["schemas"]["ProductType"];
            /** @description Represents the billing cycle interval if product is recurring */
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /**
             * Recurring Interval Count
             * @description The billing cycle multiple if the product is recurring
             * @default 1
             */
            recurring_interval_count: number;
            /**
             * Is Price Exempt From Vat
             * @description Is the price exempt from VAT?
             * @default false
             */
            is_price_exempt_from_vat: boolean | null;
            /**
             * Is Price Inclusive Of Vat
             * @description Is the price inclusive of VAT?
             * @default true
             */
            is_price_inclusive_of_vat: boolean | null;
        };
        /** ProductDto */
        ProductDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Name
             * @description Name of the product.
             */
            name: string;
            /**
             * Description
             * @description Description of the product.
             * @default
             */
            description: string | null;
            /** @description the type of product: one off or recurring */
            type: components["schemas"]["ProductType"];
            /** @description Represents the billing cycle interval if product is recurring */
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /**
             * Recurring Interval Count
             * @description The billing cycle multiple if the product is recurring
             */
            recurring_interval_count: number;
            /**
             * Price
             * @description Total price including VAT.
             */
            price: string;
            /**
             * Currency
             * @description Price currency of the product.
             * @default SAR
             * @enum {string}
             */
            currency: "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BOV" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BZD" | "CAD" | "CDF" | "CHE" | "CHF" | "CHW" | "CLF" | "CLP" | "CNY" | "COP" | "COU" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MXV" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLE" | "SLL" | "SOS" | "SRD" | "SSP" | "STN" | "SVC" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "USN" | "UYI" | "UYU" | "UYW" | "UZS" | "VED" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XCD" | "XOF" | "XPF" | "XSU" | "XUA" | "YER" | "ZAR" | "ZMW" | "ZWL";
            /**
             * Is Active
             * @description Can this product be used in invoices or subscriptions?
             */
            is_active: boolean;
            /**
             * Is One Time
             * @description Shows if the product was created to be used once, and not to be added to product cataloge
             */
            is_one_time: boolean;
            /**
             * Is Price Exempt From Vat
             * @description Is the price exempt from VAT?
             */
            is_price_exempt_from_vat: boolean;
            /**
             * Is Price Inclusive Of Vat
             * @description Is the price inclusive of VAT?
             */
            is_price_inclusive_of_vat: boolean;
            /**
             * Price Excluding Vat
             * @description Price excluding VAT.
             */
            price_excluding_vat: string;
            /**
             * Vat Amount
             * @description VAT amount.
             */
            vat_amount: string;
            /**
             * Is Used In Finalized Invoice
             * @description Is the product used in a finalized invoice?
             * @default false
             */
            is_used_in_finalized_invoice: boolean;
        };
        /** ProductListFilters */
        ProductListFilters: {
            /**
             * Search Term
             * @description Serach by product name or description.
             */
            search_term?: string | null;
            /**
             * Active
             * @description Filter by active or inactive product. Removing this flag will return all products.
             */
            active?: boolean | null;
            /** @description Filter by product type. */
            type?: components["schemas"]["ProductType"] | null;
        };
        /**
         * ProductType
         * @enum {string}
         */
        ProductType: "RECURRING" | "ONE_OFF";
        /** ProductUpdate */
        ProductUpdate: {
            /**
             * Name
             * @description Name of the product.
             */
            name?: string | null;
            /**
             * Description
             * @description Description of the product.
             */
            description?: string | null;
            /**
             * Price
             * @description Price of the product.
             */
            price?: number | string | null;
            /**
             * Is Active
             * @description Whether the product is active. If `true`, the product won't be available for purchase anymore. Existing customers will still have access to the product details in the invoice, and subscriptions will continue normally.
             */
            is_active?: boolean | null;
            /** @description the type of product: one off or recurring */
            type?: components["schemas"]["ProductType"] | null;
            /** @description Represents the billing cycle interval if product is recurring */
            recurring_interval?: components["schemas"]["RecurringInterval"] | null;
            /**
             * Recurring Interval Count
             * @description The billing cycle multiple if the product is recurring
             */
            recurring_interval_count?: number | null;
            /**
             * Is Price Exempt From Vat
             * @description Is the price exempt from VAT?
             * @default false
             */
            is_price_exempt_from_vat: boolean | null;
            /**
             * Is Price Inclusive Of Vat
             * @description Is the price inclusive of VAT?
             * @default true
             */
            is_price_inclusive_of_vat: boolean | null;
        };
        /**
         * RecurrencePattern
         * @enum {string}
         */
        RecurrencePattern: "Hour" | "Day" | "Week" | "Fortnight" | "Month" | "Quarter" | "Half-Year" | "Year";
        /**
         * RecurringInterval
         * @enum {string}
         */
        RecurringInterval: "WEEK" | "MONTH" | "SEMESTER" | "YEAR";
        /** SubscriptionCancel */
        SubscriptionCancel: {
            /**
             * Cancel Related Invoices
             * @description Whether or not to cancel all the related invoices to this subscription. If False, only the subscription will be canceled but the related invoices will remain untouched.
             * @default false
             */
            cancel_related_invoices: boolean;
        };
        /** SubscriptionCreate */
        SubscriptionCreate: {
            /**
             * Notify Consumer
             * @description send notification to consumer about subscription first invoice
             * @default true
             */
            notify_consumer: boolean;
            /**
             * Description
             * @description Description of the subscription.
             * @default
             */
            description: string | null;
            /**
             * Items
             * @description products to purchase.
             */
            items: components["schemas"]["SubscriptionItemCreateDto"][];
            /**
             * Coupons
             * @description coupons to apply to the subscription for discounts.
             * @default []
             */
            coupons: string[] | null;
            /**
             * Organization Consumer Id
             * Format: uuid4
             * @description consumer who is going to subscribe
             */
            organization_consumer_id: string;
            /**
             * Period Start
             * Format: date-time
             * @description starting date of first subscription cycle
             */
            period_start: string;
            /**
             * Until Cycle Number
             * @description specify how many cycles the subscription will last for  until it moves to canceled state automatically
             */
            until_cycle_number?: number | null;
            /** @description overriden payment methods for generated invoices for the payer - sending 'null' for any value means we should follow organization global settings for that method */
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"] | null;
            /**
             * Exclude Coupons If Installments
             * @description if enabled, all applied coupons on subscription level or item level will be excluded, and payer needs to pay full amount of the created invoice when they pay by installments.
             * @default false
             */
            exclude_coupons_if_installments: boolean;
        };
        /** SubscriptionDetailed */
        SubscriptionDetailed: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Description */
            description?: string | null;
            /** Amount */
            amount: string;
            /** Original Amount */
            original_amount: string;
            /** Item Level Discounted Amount */
            item_level_discounted_amount: string;
            /** @description Metadata about how coupons were applied to the subscription */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            /** Remaining Days */
            remaining_days: number;
            /** Currency */
            currency: string;
            recurring_interval: components["schemas"]["SubscriptionRecurringInterval"];
            /** Recurring Interval Count */
            recurring_interval_count: number;
            status: components["schemas"]["SubscriptionStatus"];
            /**
             * Current Period Start
             * Format: date-time
             */
            current_period_start: string;
            /**
             * Current Period End
             * Format: date-time
             */
            current_period_end: string;
            /** Current Cycle Number */
            current_cycle_number: number;
            /** Cancel At Period End */
            cancel_at_period_end: boolean;
            /** Cancel At Cycle Number */
            cancel_at_cycle_number?: number | null;
            /** Started At */
            started_at?: string | null;
            /** Ended At */
            ended_at?: string | null;
            /**
             * User Id
             * Format: uuid4
             */
            user_id: string;
            /**
             * Organization Consumer Id
             * Format: uuid4
             */
            organization_consumer_id: string;
            /** Latest Invoice Id */
            latest_invoice_id?: string | null;
            organization_consumer?: components["schemas"]["app__subscription__v2__dtos__OrganizationConsumer"] | null;
            /** Items */
            items?: components["schemas"]["SubscriptionItemDto"][] | null;
            latest_invoice?: components["schemas"]["InvoiceBase"] | null;
            latest_freeze?: components["schemas"]["FreezeSubscriptionBase"] | null;
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"] | null;
        };
        /** SubscriptionItemCreateDto */
        SubscriptionItemCreateDto: {
            /**
             * Product Id
             * Format: uuid4
             */
            product_id: string;
            /**
             * Quantity
             * @description Quantity must be greater than 0
             */
            quantity: number;
            /**
             * Coupons
             * @description coupons to apply to this specific item for discounts.
             * @default []
             */
            coupons: string[] | null;
        };
        /** SubscriptionItemDto */
        SubscriptionItemDto: {
            /**
             * Created At
             * Format: date-time
             * @description Creation timestamp of the object.
             */
            created_at: string;
            /**
             * Updated At
             * @description Last modification timestamp of the object.
             */
            updated_at: string | null;
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /**
             * Product Id
             * Format: uuid4
             */
            product_id: string;
            /**
             * Subscription Id
             * Format: uuid4
             */
            subscription_id: string;
            /** Quantity */
            quantity: number;
            /** Original Amount */
            original_amount: string;
            /** Discounted Amount */
            discounted_amount: string;
            /** @description Metadata about how coupons were applied to this item */
            coupon_calculation_metadata?: components["schemas"]["CouponCalculationMetadataDto"] | null;
            product: components["schemas"]["ProductDto"];
        };
        /** SubscriptionListFilters */
        SubscriptionListFilters: {
            /**
             * Statuses
             * @description Filter by subscription status
             */
            statuses?: components["schemas"]["SubscriptionStatus"][] | null;
            /**
             * Latest Invoice Is Paid
             * @description Filter subscriptions based on if their latest invoice is paid or partially paid
             */
            latest_invoice_is_paid?: boolean | null;
            /**
             * From Date
             * @description datetime is created_at
             */
            from_date?: string | null;
            /**
             * To Date
             * @description datetime is created_at
             */
            to_date?: string | null;
            /**
             * Current Period Start From Date
             * @description datetime is current_period_start
             */
            current_period_start_from_date?: string | null;
            /**
             * From Price
             * @description limit list by min subscription amount inclusive
             */
            from_price?: number | string | null;
            /**
             * To Price
             * @description limit list by max subscription amount inclusive
             */
            to_price?: number | string | null;
            /**
             * Organization Consumer Id
             * @description filter subscriptions that belongs to organization consumer
             */
            organization_consumer_id?: string | null;
            /**
             * Search Term
             * @description Serach by product name or description.
             */
            search_term?: string | null;
            /**
             * Product Ids
             * @description Product ids that need to be in the list of subscriptions
             */
            product_ids?: string[] | null;
        };
        /** SubscriptionPaymentMethodDto */
        SubscriptionPaymentMethodDto: {
            /**
             * Visa
             * @description override visa from global settings
             */
            visa?: boolean | null;
            /**
             * Mastercard
             * @description override mastercard from global settings
             */
            mastercard?: boolean | null;
            /**
             * Amex
             * @description override amex from global settings
             */
            amex?: boolean | null;
            /**
             * Bank Transfer
             * @description override bank_transfer from global settings
             */
            bank_transfer?: boolean | null;
            /**
             * Installment
             * @description override installment from global settings
             */
            installment?: boolean | null;
            /**
             * Subscription Auto Renewal
             * @description Override organization's subscription auto renewal setting. If True, subscription will auto-renew at the end of each period. If False, subscription will be canceled at the end of the current period. If None (default), uses organization's subscription_auto_renewal setting.
             */
            subscription_auto_renewal?: boolean | null;
        };
        /**
         * SubscriptionRecurringInterval
         * @enum {string}
         */
        SubscriptionRecurringInterval: "WEEK" | "MONTH" | "QUARTER" | "YEAR";
        /**
         * SubscriptionStatus
         * @enum {string}
         */
        SubscriptionStatus: "INACTIVE" | "ACTIVE" | "EXPIRED" | "CANCELED" | "FROZEN";
        /** SubscriptionUpdate */
        SubscriptionUpdate: {
            /**
             * Description
             * @description Description of the subscription.
             */
            description?: string | null;
            /**
             * Items
             * @description products to purchaseIf you want to keep existing items, include them in the list.
             */
            items: components["schemas"]["SubscriptionItemCreateDto"][];
            /**
             * Coupons
             * @description coupons to apply to the subscription for discounts.If you want to keep existing coupons, include them in the list.
             */
            coupons: string[];
            /**
             * Until Cycle Number
             * @description specify how many cycles the subscription will last for  until it moves to canceled state automatically. Sending 'null' will cancel it.
             */
            until_cycle_number?: number | null;
            /** @description overriden payment methods for generated invoices for the payer - sending 'null' for any value means we should follow organization global settings for that method */
            override_payment_methods?: components["schemas"]["SubscriptionPaymentMethodDto"] | null;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** Consumer */
        app__common__dtos__shared__Consumer: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Email */
            email?: string | null;
            preferred_language: components["schemas"]["Language"];
        };
        /** OrganizationConsumer */
        app__common__dtos__shared__OrganizationConsumer: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
            /** Alias */
            alias?: string | null;
            /** Email */
            email?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            preferred_language: components["schemas"]["Language"];
            consumer?: components["schemas"]["app__common__dtos__shared__Consumer"] | null;
            /**
             * Is Deleted
             * @default false
             */
            is_deleted: boolean | null;
            /** Communication Methods */
            communication_methods?: components["schemas"]["ConsumerCommunicationMethod"][] | null;
        };
        /** Consumer */
        app__consumer__v2__dtos__Consumer: {
            /** Id */
            id?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            /** Preferred Language */
            preferred_language?: string | null;
        };
        /** OrganizationConsumer */
        app__subscription__v2__dtos__OrganizationConsumer: {
            /**
             * Id
             * Format: uuid4
             */
            id: string;
            /** Name */
            name: string;
            /** Alias */
            alias?: string | null;
            /** Email */
            email?: string | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}

type ConsumerCreate = components["schemas"]["ConsumerCreate"];
type ConsumerResponse = components["schemas"]["ConsumerResponse"];
type ConsumerUpdate = components["schemas"]["ConsumerUpdate"];
type ConsumerListResponse = components["schemas"]["ListResource_ConsumerResponse_"];
type ProductCreate = components["schemas"]["ProductCreate"];
type ProductDto = components["schemas"]["ProductDto"];
type ProductUpdate = components["schemas"]["ProductUpdate"];
type ProductListResponse = components["schemas"]["ListResource_ProductDto_"];
type CreatePaymentLinkDto = components["schemas"]["CreatePaymentLinkDto"];
type PaymentLinkDetailed = components["schemas"]["PaymentLinkDetailed"];
type PaymentLinkListResponse = components["schemas"]["ListResource_PaymentLinkDetailed_"];
type CouponCreate = components["schemas"]["CouponCreate"];
type CouponDetailed = components["schemas"]["CouponDetailed"];
type CouponUpdate = components["schemas"]["CouponUpdate"];
type CouponListResponse = components["schemas"]["ListResource_CouponDetailed_"];
type InvoiceDetailed = components["schemas"]["InvoiceDetailed"];
type InvoiceListItem = components["schemas"]["InvoiceListItem"];
type InvoiceListResponse = components["schemas"]["ListResource_InvoiceListItem_"];
type PaymentResponse = components["schemas"]["PaymentResponse"];
type PaymentListResponse = components["schemas"]["PaymentListResponse"];
type PaymentRefundRequest = components["schemas"]["PaymentRefundRequest"];
type SubscriptionCreate = components["schemas"]["SubscriptionCreate"];
type SubscriptionDetailed = components["schemas"]["SubscriptionDetailed"];
type SubscriptionUpdate = components["schemas"]["SubscriptionUpdate"];
type SubscriptionListResponse = components["schemas"]["ListResource_SubscriptionDetailed_"];
type SubscriptionCancel = components["schemas"]["SubscriptionCancel"];
type FreezeSubscriptionCreateRequest = components["schemas"]["FreezeSubscriptionCreateRequest"];
type FreezeSubscriptionBase = components["schemas"]["FreezeSubscriptionBase"];
type FreezeSubscriptionUpdateRequest = components["schemas"]["FreezeSubscriptionUpdateRequest"];
type FreezeListResponse = components["schemas"]["ListResource_FreezeSubscriptionBase_"];
type Pagination = components["schemas"]["Pagination"];
type PaginationParams = {
    page?: number;
    size?: number;
    sort?: string;
};
/**
 * Convenience input for "one user + one product" payment link.
 * We convert this into CreatePaymentLinkDto under the hood.
 */
type CreateLinkInput = {
    name: string;
    description?: string | null;
    consumerId?: string | null;
    productId: string;
    quantity?: number;
    validUntil?: Date | string | null;
    maxNumberOfPayments?: number | null;
    successRedirectUrl?: string | null;
    failureRedirectUrl?: string | null;
    coupons?: string[];
    customMetadata?: Record<string, unknown> | null;
    contactInformationType?: "PHONE" | "EMAIL" | null;
};
/**
 * High-level payment link creation with optional inline consumer and product creation
 */
type SimplePaymentLinkInput = {
    name: string;
    description?: string;
    amount: number;
    currency?: string;
    consumer?: {
        id?: string;
        email?: string;
        phone?: string;
        name?: string;
        metadata?: Record<string, unknown>;
    };
    product?: {
        id?: string;
        name?: string;
        description?: string;
        price?: number;
        currency?: string;
        metadata?: Record<string, unknown>;
    };
    quantity?: number;
    validUntil?: Date | string;
    maxNumberOfPayments?: number;
    successRedirectUrl?: string;
    failureRedirectUrl?: string;
    coupons?: string[];
    customMetadata?: Record<string, unknown>;
    contactInformationType?: "PHONE" | "EMAIL";
};
/**
 * Response from simplified payment link creation
 */
type SimplePaymentLinkResponse = {
    paymentLink: PaymentLinkDetailed;
    paymentUrl: string;
    productId: string;
    consumerId: string | undefined;
};

type StreamSDKInitOptions = {
    baseUrl?: string;
    /**
     * If you want to use bearer token instead of apiKey, pass bearerToken.
     * OpenAPI shows endpoints accept either JWTBearer or APIKey.  [oai_citation:4‡stream-app-service.streampay.sa](https://stream-app-service.streampay.sa/openapi.json)
     */
    bearerToken?: string;
    fetchFn?: typeof fetch;
};
declare class StreamSDK {
    static init(apiKey: string, opts?: StreamSDKInitOptions): StreamClient;
}
declare class StreamClient {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Helper to build request options with optional query params
     */
    private buildGetRequest;
    /**
     * Create a new consumer
     * POST /api/v2/consumers
     */
    createConsumer(input: ConsumerCreate): Promise<ConsumerResponse>;
    /**
     * @deprecated Use createConsumer instead
     */
    createUser(input: ConsumerCreate): Promise<ConsumerResponse>;
    /**
     * List all consumers with pagination
     * GET /api/v2/consumers
     */
    listConsumers(params?: PaginationParams): Promise<ConsumerListResponse>;
    /**
     * Get a specific consumer by ID
     * GET /api/v2/consumers/{consumer_id}
     */
    getConsumer(consumerId: string): Promise<ConsumerResponse>;
    /**
     * Update a consumer
     * PUT /api/v2/consumers/{org_consumer_id}
     */
    updateConsumer(consumerId: string, input: ConsumerUpdate): Promise<ConsumerResponse>;
    /**
     * Delete a consumer
     * DELETE /api/v2/consumers/{org_consumer_id}
     */
    deleteConsumer(consumerId: string): Promise<void>;
    /**
     * Create a new product
     * POST /api/v2/products
     */
    createProduct(input: ProductCreate): Promise<ProductDto>;
    /**
     * List all products with pagination
     * GET /api/v2/products
     */
    listProducts(params?: PaginationParams): Promise<ProductListResponse>;
    /**
     * Get a specific product by ID
     * GET /api/v2/products/{product_id}
     */
    getProduct(productId: string): Promise<ProductDto>;
    /**
     * Update a product
     * PUT /api/v2/products/{product_id}
     */
    updateProduct(productId: string, input: ProductUpdate): Promise<ProductDto>;
    /**
     * Delete a product
     * DELETE /api/v2/products/{product_id}
     */
    deleteProduct(productId: string): Promise<void>;
    /**
     * Create a new coupon
     * POST /api/v2/coupons
     */
    createCoupon(input: CouponCreate): Promise<CouponDetailed>;
    /**
     * List all coupons with pagination
     * GET /api/v2/coupons
     */
    listCoupons(params?: PaginationParams): Promise<CouponListResponse>;
    /**
     * Get a specific coupon by ID
     * GET /api/v2/coupons/{coupon_id}
     */
    getCoupon(couponId: string): Promise<CouponDetailed>;
    /**
     * Update a coupon
     * PUT /api/v2/coupons/{coupon_id}
     */
    updateCoupon(couponId: string, input: CouponUpdate): Promise<CouponDetailed>;
    /**
     * Delete a coupon
     * DELETE /api/v2/coupons/{coupon_id}
     */
    deleteCoupon(couponId: string): Promise<void>;
    /**
     * List all invoices with pagination
     * GET /api/v2/invoices
     */
    listInvoices(params?: PaginationParams): Promise<InvoiceListResponse>;
    /**
     * Get a specific invoice by ID
     * GET /api/v2/invoices/{invoice_id}
     */
    getInvoice(invoiceId: string): Promise<InvoiceDetailed>;
    /**
     * List all payments with optional invoice filter
     * GET /api/v2/payments
     */
    listPayments(params?: {
        invoice_id?: string;
    }): Promise<PaymentListResponse>;
    /**
     * Get a specific payment by ID
     * GET /api/v2/payments/{payment_id}
     */
    getPayment(paymentId: string): Promise<PaymentResponse>;
    /**
     * Refund a payment
     * POST /api/v2/payments/{payment_id}/refund
     */
    refundPayment(paymentId: string, input: PaymentRefundRequest): Promise<PaymentResponse>;
    /**
     * Create a new subscription
     * POST /api/v2/subscriptions
     */
    createSubscription(input: SubscriptionCreate): Promise<SubscriptionDetailed>;
    /**
     * List all subscriptions with pagination
     * GET /api/v2/subscriptions
     */
    listSubscriptions(params?: PaginationParams): Promise<SubscriptionListResponse>;
    /**
     * Get a specific subscription by ID
     * GET /api/v2/subscriptions/{subscription_id}
     */
    getSubscription(subscriptionId: string): Promise<SubscriptionDetailed>;
    /**
     * Update a subscription
     * PUT /api/v2/subscriptions/{subscription_id}
     */
    updateSubscription(subscriptionId: string, input: SubscriptionUpdate): Promise<SubscriptionDetailed>;
    /**
     * Cancel a subscription
     * POST /api/v2/subscriptions/{subscription_id}/cancel
     */
    cancelSubscription(subscriptionId: string, input?: SubscriptionCancel): Promise<SubscriptionDetailed>;
    /**
     * Freeze a subscription (pause invoice generation)
     * POST /api/v2/subscriptions/{subscription_id}/freeze
     */
    freezeSubscription(subscriptionId: string, input: FreezeSubscriptionCreateRequest): Promise<FreezeSubscriptionBase>;
    /**
     * List all freeze periods for a subscription
     * GET /api/v2/subscriptions/{subscription_id}/freeze
     */
    listSubscriptionFreezes(subscriptionId: string): Promise<FreezeListResponse>;
    /**
     * Update a subscription freeze period
     * PUT /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
     */
    updateSubscriptionFreeze(subscriptionId: string, freezeId: string, input: FreezeSubscriptionUpdateRequest): Promise<FreezeSubscriptionBase>;
    /**
     * Delete a subscription freeze period
     * DELETE /api/v2/subscriptions/{subscription_id}/freeze/{freeze_id}
     */
    deleteSubscriptionFreeze(subscriptionId: string, freezeId: string): Promise<void>;
    /**
     * Create a payment link (simplified interface)
     * POST /api/v2/payment_links
     */
    createLink(input: CreateLinkInput): Promise<PaymentLinkDetailed>;
    /**
     * Create a payment link (full interface with raw DTO)
     * POST /api/v2/payment_links
     */
    createPaymentLink(input: CreatePaymentLinkDto): Promise<PaymentLinkDetailed>;
    /**
     * List all payment links with pagination
     * GET /api/v2/payment_links
     */
    listPaymentLinks(params?: PaginationParams): Promise<PaymentLinkListResponse>;
    /**
     * Get a specific payment link by ID
     * GET /api/v2/payment_links/{payment_link_id}
     */
    getPaymentLink(paymentLinkId: string): Promise<PaymentLinkDetailed>;
    /**
     * SDK helper: returns a best-effort "pay URL" if the API returns one.
     * (Field name can vary; we keep it defensive.)
     */
    getPaymentUrl(link: PaymentLinkDetailed): string | null;
    /**
     * Simplified one-step payment link creation.
     *
     * This method handles:
     * 1. Creating consumer (if consumer details provided without ID)
     * 2. Creating product (if product details provided without ID)
     * 3. Creating payment link
     * 4. Returning payment URL
     *
     * @example
     * ```typescript
     * const result = await client.createSimplePaymentLink({
     *   name: "Order #1234",
     *   description: "Payment for premium subscription",
     *   amount: 99.99,
     *   currency: "SAR",
     *   consumer: {
     *     email: "customer@example.com",
     *     name: "John Doe"
     *   },
     *   product: {
     *     name: "Premium Subscription",
     *     price: 99.99,
     *     currency: "SAR"
     *   },
     *   successRedirectUrl: "https://example.com/success",
     *   failureRedirectUrl: "https://example.com/failed"
     * });
     *
     * console.log(result.paymentUrl); // Direct payment URL
     * // Optional: Redirect user to result.paymentUrl
     * ```
     */
    createSimplePaymentLink(input: SimplePaymentLinkInput): Promise<SimplePaymentLinkResponse>;
}

export { type ConsumerCreate, type ConsumerListResponse, type ConsumerResponse, type ConsumerUpdate, type CouponCreate, type CouponDetailed, type CouponListResponse, type CouponUpdate, type CreateLinkInput, type CreatePaymentLinkDto, type FreezeListResponse, type FreezeSubscriptionBase, type FreezeSubscriptionCreateRequest, type FreezeSubscriptionUpdateRequest, type InvoiceDetailed, type InvoiceListItem, type InvoiceListResponse, type Pagination, type PaginationParams, type PaymentLinkDetailed, type PaymentLinkListResponse, type PaymentListResponse, type PaymentRefundRequest, type PaymentResponse, type ProductCreate, type ProductDto, type ProductListResponse, type ProductUpdate, type SimplePaymentLinkInput, type SimplePaymentLinkResponse, type SubscriptionCancel, type SubscriptionCreate, type SubscriptionDetailed, type SubscriptionListResponse, type SubscriptionUpdate, StreamSDK as default };
