export class SongstatsError extends Error {
  constructor(message) {
    super(message);
    this.name = "SongstatsError";
  }
}

export class SongstatsTransportError extends SongstatsError {
  constructor(message, cause) {
    super(message);
    this.name = "SongstatsTransportError";
    this.cause = cause;
  }
}

export class SongstatsAPIError extends SongstatsError {
  constructor(message, statusCode, payload = null, headers = {}) {
    super(message);
    this.name = "SongstatsAPIError";
    this.statusCode = statusCode;
    this.payload = payload;
    this.headers = headers;
  }

  toString() {
    return `Songstats API error (${this.statusCode}): ${this.message}`;
  }
}
