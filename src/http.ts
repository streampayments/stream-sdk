export class StreamSDKError extends Error {
    public readonly status: number;
    public readonly requestId?: string;
    public readonly body?: unknown;
  
    constructor(message: string, opts: { status: number; requestId?: string; body?: unknown }) {
      super(message);
      this.name = "StreamSDKError";
      this.status = opts.status;
      if (opts.requestId !== undefined) {
        this.requestId = opts.requestId;
      }
      if (opts.body !== undefined) {
        this.body = opts.body;
      }
    }
  }
  
  export type Auth =
    | { kind: "apiKey"; apiKey: string } // uses header x-api-key (per OpenAPI)  [oai_citation:2‡stream-app-service.streampay.sa](https://stream-app-service.streampay.sa/openapi.json)
    | { kind: "bearer"; token: string }
    | { kind: "none" };
  
  export type HttpClientOptions = {
    baseUrl: string;
    auth: Auth;
    fetchFn?: typeof fetch;
    userAgent?: string;
  };
  
  function joinUrl(baseUrl: string, path: string) {
    return `${baseUrl.replace(/\/+$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  }
  
  export class HttpClient {
    private readonly baseUrl: string;
    private readonly fetchFn: typeof fetch;
    private readonly userAgent: string;
    private auth: Auth;
  
    constructor(opts: HttpClientOptions) {
      this.baseUrl = opts.baseUrl;
      this.fetchFn = opts.fetchFn ?? fetch;
      this.userAgent = opts.userAgent ?? "stream-sdk/0.1.0";
      this.auth = opts.auth;
    }
  
    setAuth(auth: Auth) {
      this.auth = auth;
    }
  
    async request<TResponse>(opts: {
      method: "GET" | "POST" | "PUT" | "DELETE";
      path: string;
      query?: Record<string, string | number | boolean | null | undefined>;
      body?: unknown;
    }): Promise<TResponse> {
      const url = new URL(joinUrl(this.baseUrl, opts.path));
      if (opts.query) {
        for (const [k, v] of Object.entries(opts.query)) {
          if (v === undefined || v === null) continue;
          url.searchParams.set(k, String(v));
        }
      }
  
      const headers: Record<string, string> = {
        "accept": "application/json",
        "content-type": "application/json",
        "user-agent": this.userAgent
      };
  
      if (this.auth.kind === "apiKey") {
        headers["x-api-key"] = this.auth.apiKey;
      } else if (this.auth.kind === "bearer") {
        headers["authorization"] = `Bearer ${this.auth.token}`;
      }
  
      const fetchOptions: RequestInit = {
        method: opts.method,
        headers
      };

      if (opts.body !== undefined) {
        fetchOptions.body = JSON.stringify(opts.body);
      }

      const res = await this.fetchFn(url.toString(), fetchOptions);
  
      const requestId = res.headers.get("x-request-id") ?? undefined;
  
      const text = await res.text();
      const maybeJson = text ? safeJsonParse(text) : undefined;
  
      if (!res.ok) {
        const msg =
          (maybeJson && typeof maybeJson === "object" && maybeJson && "detail" in maybeJson && String((maybeJson as any).detail)) ||
          `HTTP ${res.status} calling ${opts.method} ${opts.path}`;
        const errorOpts: { status: number; requestId?: string; body?: unknown } = { status: res.status };
        if (requestId !== undefined) {
          errorOpts.requestId = requestId;
        }
        if (maybeJson !== undefined) {
          errorOpts.body = maybeJson;
        } else {
          errorOpts.body = text;
        }
        throw new StreamSDKError(msg, errorOpts);
      }
  
      return (maybeJson ?? (undefined as unknown)) as TResponse;
    }
  }
  
  function safeJsonParse(s: string) {
    try {
      return JSON.parse(s);
    } catch {
      return undefined;
    }
  }