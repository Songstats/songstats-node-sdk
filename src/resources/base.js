function normalizeValue(value) {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(",");
  }

  return value;
}

export function normalizeParams(params) {
  if (!params) {
    return undefined;
  }

  const result = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }
    result[key] = normalizeValue(value);
  }

  return Object.keys(result).length ? result : undefined;
}

export function requireAnyIdentifier(params, identifierKeys) {
  const found = identifierKeys.some((key) => {
    const value = params[key];
    return value !== null && value !== undefined && value !== "";
  });

  if (found) {
    return;
  }

  throw new Error(`One identifier is required. Supported keys: ${identifierKeys.join(", ")}`);
}

export class ResourceAPI {
  constructor(httpClient) {
    this._http = httpClient;
  }

  _get(path, { params } = {}) {
    return this._http.request("GET", path, { params: normalizeParams(params) });
  }

  _post(path, { params, json } = {}) {
    return this._http.request("POST", path, {
      params: normalizeParams(params),
      json: normalizeParams(json),
    });
  }

  _delete(path, { params } = {}) {
    return this._http.request("DELETE", path, { params: normalizeParams(params) });
  }
}
