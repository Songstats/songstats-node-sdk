import { ResourceAPI, requireAnyIdentifier } from "./base.js";

class EntityAPI extends ResourceAPI {
  constructor(httpClient, { resource, identifierKeys }) {
    super(httpClient);
    this._resource = resource;
    this._identifierKeys = identifierKeys;
  }

  _withIdentifier(params = {}) {
    const query = { ...params };
    requireAnyIdentifier(query, this._identifierKeys);
    return query;
  }

  info(params = {}) {
    return this._get(`${this._resource}/info`, { params: this._withIdentifier(params) });
  }

  stats(params = {}) {
    return this._get(`${this._resource}/stats`, { params: this._withIdentifier(params) });
  }

  historicStats(params = {}) {
    return this._get(`${this._resource}/historic_stats`, { params: this._withIdentifier(params) });
  }

  audience(params = {}) {
    return this._get(`${this._resource}/audience`, { params: this._withIdentifier(params) });
  }

  audienceDetails({ country_code, ...params } = {}) {
    if (!country_code) {
      throw new Error("country_code is required");
    }

    const query = this._withIdentifier(params);
    query.country_code = country_code;
    return this._get(`${this._resource}/audience/details`, { params: query });
  }

  catalog(params = {}) {
    return this._get(`${this._resource}/catalog`, { params: this._withIdentifier(params) });
  }

  search({ q, ...params } = {}) {
    if (!q) {
      throw new Error("q is required");
    }

    return this._get(`${this._resource}/search`, { params: { q, ...params } });
  }

  activities(params = {}) {
    return this._get(`${this._resource}/activities`, { params: this._withIdentifier(params) });
  }

  songshare(params = {}) {
    return this._get(`${this._resource}/songshare`, { params: this._withIdentifier(params) });
  }

  topTracks(params = {}) {
    return this._get(`${this._resource}/top_tracks`, { params: this._withIdentifier(params) });
  }

  topPlaylists(params = {}) {
    return this._get(`${this._resource}/top_playlists`, { params: this._withIdentifier(params) });
  }

  topCurators(params = {}) {
    return this._get(`${this._resource}/top_curators`, { params: this._withIdentifier(params) });
  }

  topCommentors(params = {}) {
    return this._get(`${this._resource}/top_commentors`, { params: this._withIdentifier(params) });
  }

  addLinkRequest({ link, ...params } = {}) {
    if (!link) {
      throw new Error("link is required");
    }

    const query = this._withIdentifier(params);
    query.link = link;
    return this._post(`${this._resource}/link_request`, { params: query });
  }

  removeLinkRequest({ link, ...params } = {}) {
    if (!link) {
      throw new Error("link is required");
    }

    const query = this._withIdentifier(params);
    query.link = link;
    return this._delete(`${this._resource}/link_request`, { params: query });
  }

  addTrackRequest({ link, spotify_track_id, isrc, ...params } = {}) {
    if (!link && !spotify_track_id && !isrc) {
      throw new Error("One of link, spotify_track_id, or isrc is required");
    }

    const query = this._withIdentifier(params);
    query.link = link;
    query.spotify_track_id = spotify_track_id;
    query.isrc = isrc;
    return this._post(`${this._resource}/track_request`, { params: query });
  }

  removeTrackRequest({ songstats_track_id, spotify_track_id, ...params } = {}) {
    if (!songstats_track_id && !spotify_track_id) {
      throw new Error("songstats_track_id or spotify_track_id is required");
    }

    const query = this._withIdentifier(params);
    query.songstats_track_id = songstats_track_id;
    query.spotify_track_id = spotify_track_id;
    return this._delete(`${this._resource}/track_request`, { params: query });
  }

  addToMemberRelevantList(params = {}) {
    return this._post(`${this._resource}/add_to_member_relevant_list`, {
      params: this._withIdentifier(params),
    });
  }

  removeFromMemberRelevantList(params = {}) {
    return this._delete(`${this._resource}/remove_from_member_relevant_list`, {
      params: this._withIdentifier(params),
    });
  }
}

export class ArtistsAPI extends EntityAPI {
  constructor(httpClient) {
    super(httpClient, {
      resource: "artists",
      identifierKeys: ["songstats_artist_id", "spotify_artist_id", "apple_music_artist_id"],
    });
  }
}

export class CollaboratorsAPI extends EntityAPI {
  constructor(httpClient) {
    super(httpClient, {
      resource: "collaborators",
      identifierKeys: [
        "songstats_collaborator_id",
        "spotify_artist_id",
        "apple_music_artist_id",
        "tidal_artist_id",
      ],
    });
  }
}

export class LabelsAPI extends EntityAPI {
  constructor(httpClient) {
    super(httpClient, {
      resource: "labels",
      identifierKeys: ["songstats_label_id", "beatport_label_id"],
    });
  }
}
