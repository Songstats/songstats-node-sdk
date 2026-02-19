import { SongstatsHTTPClient } from "./http.js";
import {
  ArtistsAPI,
  CollaboratorsAPI,
  InfoAPI,
  LabelsAPI,
  TracksAPI,
} from "./resources/index.js";

export class SongstatsClient {
  constructor({
    apiKey,
    baseUrl = "https://data.songstats.com",
    timeoutMs = 30_000,
    maxRetries = 2,
    fetchImpl,
  } = {}) {
    this._http = new SongstatsHTTPClient({
      apiKey,
      baseUrl,
      timeoutMs,
      maxRetries,
      fetchImpl,
    });

    this.info = new InfoAPI(this._http);
    this.tracks = new TracksAPI(this._http);
    this.artists = new ArtistsAPI(this._http);
    this.collaborators = new CollaboratorsAPI(this._http);
    this.labels = new LabelsAPI(this._http);
  }

  async close() {
    await this._http.close();
  }
}
