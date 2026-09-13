# Songstats Node SDK

Official Node.js client for the **Songstats Enterprise API**.

📚 API Documentation: https://docs.songstats.com  
🔑 API Key Access: Please contact api@songstats.com

---

## Requirements

- Node.js >= 18

---

## Installation

Install with your package manager of choice:

    npm install songstats-node-sdk

    yarn add songstats-node-sdk

    pnpm add songstats-node-sdk

    bun add songstats-node-sdk

---

## Quick Start

```js
import { SongstatsClient } from "songstats-node-sdk";

const client = new SongstatsClient({
  apiKey: process.env.SONGSTATS_API_KEY,
});

// API status
const status = await client.info.status();

// Track information
const track = await client.tracks.info({
  songstats_track_id: "abcd1234",
});

// Artist statistics
const artistStats = await client.artists.stats({
  songstats_artist_id: "abcd1234",
  source: "spotify",
});
```

---

## Authentication

All requests include your API key in the `apikey` header.

We recommend storing your key securely in environment variables:

    export SONGSTATS_API_KEY=your_key_here

---

## Available Resource Clients

- `client.info`
- `client.tracks`
- `client.artists`
- `client.collaborators`
- `client.labels`

---

## Error Handling

```js
import { SongstatsAPIError, SongstatsTransportError } from "songstats-node-sdk";

try {
  await client.tracks.info({ songstats_track_id: "invalid" });
} catch (error) {
  if (error instanceof SongstatsAPIError) {
    console.log(`API error: ${error.message}`);
  } else if (error instanceof SongstatsTransportError) {
    console.log(`Transport error: ${error.message}`);
  } else {
    throw error;
  }
}
```

---

## Versioning

This SDK follows Semantic Versioning (SemVer).

---

## License

MIT

## HTTP transport behavior

`timeoutMs` covers each attempt through the complete response body. Transport failures on GET and HEAD requests, including body-read failures, use the configured retry limit. Retried HTTP responses are cancelled before the next attempt. Redirects are rejected to prevent forwarding the API key to another endpoint; configure `baseUrl` to the final API origin. Empty responses return `null`, and malformed JSON is returned as `{ raw: text }`.

## Request retries

`maxRetries` applies only to GET and HEAD requests. Write requests are attempted once
because a transport failure or server error can occur after a write has already
succeeded. Check the resulting state before retrying a write.
