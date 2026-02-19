import { SongstatsAPIError, SongstatsTransportError } from "./errors.js";

const DEFAULT_BASE_URL = "https://data.songstats.com";
const DEFAULT_TIMEOUT_MS = 30_000;
const RETRYABLE_STATUS_CODES = new Set([429, 500, 502, 503, 504]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeValue(value) {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(",");
  }

  return value;
}

function serializeParams(params) {
  if (!params) {
    return "";
  }

  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }
    query.set(key, String(normalizeValue(value)));
  }

  const serialized = query.toString();
  return serialized.length ? `?${serialized}` : "";
}

function toHeadersObject(headers) {
  const result = {};
  for (const [key, value] of headers.entries()) {
    result[key] = value;
  }
  return result;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      const text = await response.text();
      return text.length ? { raw: text } : null;
    }
  }

  const text = await response.text();
  return text.length ? { raw: text } : null;
}

export class SongstatsHTTPClient {
  constructor({
    apiKey,
    baseUrl = DEFAULT_BASE_URL,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxRetries = 2,
    fetchImpl,
    userAgent = "songstats-node-sdk/0.2.0",
  } = {}) {
    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    if (maxRetries < 0) {
      throw new Error("maxRetries must be >= 0");
    }

    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.timeoutMs = timeoutMs;
    this.maxRetries = maxRetries;
    this.fetchImpl = fetchImpl || globalThis.fetch;
    this.userAgent = userAgent;
    this.apiKey = apiKey;

    if (!this.fetchImpl) {
      throw new Error("No fetch implementation found. Pass fetchImpl in constructor.");
    }
  }

  async request(method, path, { params, json, headers } = {}) {
    const endpoint = `/enterprise/v1/${path.replace(/^\/+/, "")}`;
    const url = `${this.baseUrl}${endpoint}${serializeParams(params)}`;
    let lastError;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      let response;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const requestHeaders = {
        accept: "application/json",
        "user-agent": this.userAgent,
        apikey: this.apiKey,
        ...headers,
      };

      if (json) {
        requestHeaders["content-type"] = "application/json";
      }

      try {
        response = await this.fetchImpl(url, {
          method,
          signal: controller.signal,
          headers: requestHeaders,
          body: json ? JSON.stringify(json) : undefined,
        });
      } catch (error) {
        lastError = error;
        clearTimeout(timeoutId);

        if (attempt < this.maxRetries) {
          await sleep(200 * 2 ** attempt);
          continue;
        }

        throw new SongstatsTransportError(String(error?.message || error), error);
      }

      clearTimeout(timeoutId);

      if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < this.maxRetries) {
        await sleep(200 * 2 ** attempt);
        continue;
      }

      const payload = await parseResponse(response);

      if (response.status >= 200 && response.status <= 299) {
        return payload;
      }

      const message =
        payload && typeof payload === "object"
          ? payload.message || payload.error || response.statusText
          : response.statusText;

      throw new SongstatsAPIError(
        String(message || "Request failed"),
        response.status,
        payload,
        toHeadersObject(response.headers),
      );
    }

    throw new SongstatsTransportError(
      String(lastError?.message || "Request failed without response"),
      lastError,
    );
  }

  async close() {
    return undefined;
  }
}
