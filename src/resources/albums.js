import { ResourceAPI, requireAnyIdentifier } from "./base.js";

const ALBUM_IDENTIFIER_KEYS = ["songstats_album_id", "spotify_album_id", "apple_music_album_id", "beatport_album_id"];

function withAlbumIdentifier(params = {}) {
  const query = { ...params };
  requireAnyIdentifier(query, ALBUM_IDENTIFIER_KEYS);
  return query;
}

export class AlbumsAPI extends ResourceAPI {
  info(params = {}) {
    return this._get("albums/info", { params: withAlbumIdentifier(params) });
  }

  stats(params = {}) {
    return this._get("albums/stats", { params: withAlbumIdentifier(params) });
  }
}
