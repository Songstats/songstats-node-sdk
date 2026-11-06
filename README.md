# Songstats Node SDK

Official Node.js client for the **Songstats Enterprise API**.

📚 API Documentation: https://developers.stats.company/songstats<br>
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

## Albums

Requires Songstats album access. Member/entity keys must also supply an artist or label parent. Album info includes paginated known tracks; pass its returned `next_cursor` as `cursor` to the same info method. Artist and label catalogs accept `catalog_type=albums`; track catalogs remain the default.

```
client.albums.info({ songstats_album_id: "..." })
client.albums.stats({ songstats_album_id: "...", source: "spotify" })
client.artists.catalog({ songstats_artist_id: "...", catalog_type: "albums" })
```

Album stats default to release-member recording counters. Shared counters are not release-exclusive. `scope=recording_catalog` opts into wider recording performance and is unavailable for label-scoped calls. Spotify and TIDAL return `popularity_current` (0–100); Deezer returns `saves_total` (album favourites). Each uses the highest measured value among eligible releases on that platform, not a sum across editions. Values may be unavailable or stale. No separate album catalog/tracks method is provided.
