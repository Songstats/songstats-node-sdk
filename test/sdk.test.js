import assert from "node:assert/strict";
import test from "node:test";

import { SongstatsAPIError, SongstatsClient } from "../src/index.js";

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
    },
  });
}

test("info.status sends apikey header", async () => {
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    return jsonResponse(200, { result: "success" });
  };

  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl });
  const data = await client.info.status();

  assert.equal(data.result, "success");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://data.songstats.com/enterprise/v1/status");
  assert.equal(calls[0].options.headers.apikey, "test_key");
});

test("info.sources and definitions routes", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (url.endsWith("/sources")) {
      return jsonResponse(200, { result: "success", sources: [] });
    }
    return jsonResponse(200, { result: "success", definitions: {} });
  };

  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl });

  await client.info.sources();
  assert.equal(calls.at(-1), "https://data.songstats.com/enterprise/v1/sources");

  await client.info.definitions();
  assert.equal(calls.at(-1), "https://data.songstats.com/enterprise/v1/definitions");
});

test("tracks.info hits expected route and params", async () => {
  let capturedUrl;
  const fetchImpl = async (url) => {
    capturedUrl = url;
    return jsonResponse(200, { result: "success" });
  };

  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl });
  await client.tracks.info({ songstats_track_id: "abcd1234", with_links: true });

  const parsed = new URL(capturedUrl);
  assert.equal(parsed.pathname, "/enterprise/v1/tracks/info");
  assert.equal(parsed.searchParams.get("songstats_track_id"), "abcd1234");
  assert.equal(parsed.searchParams.get("with_links"), "true");
});

test("collaborators.topCurators is mapped", async () => {
  let capturedUrl;
  const fetchImpl = async (url) => {
    capturedUrl = url;
    return jsonResponse(200, { result: "success" });
  };

  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl });
  await client.collaborators.topCurators({
    songstats_collaborator_id: "collab1234",
    source: "spotify",
  });

  const parsed = new URL(capturedUrl);
  assert.equal(parsed.pathname, "/enterprise/v1/collaborators/top_curators");
  assert.equal(parsed.searchParams.get("songstats_collaborator_id"), "collab1234");
  assert.equal(parsed.searchParams.get("source"), "spotify");
});

test("api errors raise SongstatsAPIError", async () => {
  const fetchImpl = async () => jsonResponse(401, { result: "error", message: "Invalid Api Key" });
  const client = new SongstatsClient({ apiKey: "bad_key", fetchImpl });

  await assert.rejects(async () => client.info.status(), (error) => {
    assert.equal(error instanceof SongstatsAPIError, true);
    assert.equal(error.statusCode, 401);
    assert.match(String(error), /Invalid Api Key/);
    return true;
  });
});

test("identifier validation", () => {
  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl: async () => jsonResponse(200, {}) });
  assert.throws(() => client.labels.info(), /One identifier is required/);
});

test("artists.search route", async () => {
  let capturedUrl;
  const fetchImpl = async (url) => {
    capturedUrl = url;
    return jsonResponse(200, { result: "success", results: [] });
  };

  const client = new SongstatsClient({ apiKey: "test_key", fetchImpl });
  await client.artists.search({ q: "fred again", limit: 10 });

  const parsed = new URL(capturedUrl);
  assert.equal(parsed.pathname, "/enterprise/v1/artists/search");
  assert.equal(parsed.searchParams.get("q"), "fred again");
  assert.equal(parsed.searchParams.get("limit"), "10");
});
