import { ResourceAPI, requireAnyIdentifier } from "./base.js";

const TRACK_IDENTIFIER_KEYS = [
  "songstats_track_id",
  "spotify_track_id",
  "apple_music_track_id",
  "isrc",
];

function withTrackIdentifier(params = {}) {
  const query = { ...params };
  requireAnyIdentifier(query, TRACK_IDENTIFIER_KEYS);
  return query;
}

export class TracksAPI extends ResourceAPI {
  info(params = {}) {
    return this._get("tracks/info", { params: withTrackIdentifier(params) });
  }

  stats(params = {}) {
    return this._get("tracks/stats", { params: withTrackIdentifier(params) });
  }

  historicStats(params = {}) {
    return this._get("tracks/historic_stats", { params: withTrackIdentifier(params) });
  }

  activities(params = {}) {
    return this._get("tracks/activities", { params: withTrackIdentifier(params) });
  }

  comments(params = {}) {
    return this._get("tracks/comments", { params: withTrackIdentifier(params) });
  }

  songshare(params = {}) {
    return this._get("tracks/songshare", { params: withTrackIdentifier(params) });
  }

  locations(params = {}) {
    return this._get("tracks/locations", { params: withTrackIdentifier(params) });
  }

  search({ q, ...params } = {}) {
    if (!q) {
      throw new Error("q is required");
    }

    return this._get("tracks/search", { params: { q, ...params } });
  }

  addLinkRequest({ link, ...params } = {}) {
    if (!link) {
      throw new Error("link is required");
    }

    const query = withTrackIdentifier(params);
    query.link = link;
    return this._post("tracks/link_request", { params: query });
  }

  removeLinkRequest({ link, ...params } = {}) {
    if (!link) {
      throw new Error("link is required");
    }

    const query = withTrackIdentifier(params);
    query.link = link;
    return this._delete("tracks/link_request", { params: query });
  }

  addToMemberRelevantList(params = {}) {
    return this._post("tracks/add_to_member_relevant_list", {
      params: withTrackIdentifier(params),
    });
  }

  removeFromMemberRelevantList(params = {}) {
    return this._delete("tracks/remove_from_member_relevant_list", {
      params: withTrackIdentifier(params),
    });
  }
}
