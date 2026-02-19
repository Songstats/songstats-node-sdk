import { ResourceAPI } from "./base.js";

export class InfoAPI extends ResourceAPI {
  sources() {
    return this._get("sources");
  }

  status() {
    return this._get("status");
  }

  uptimeCheck() {
    return this._get("uptime_check");
  }

  uptime_check() {
    return this.uptimeCheck();
  }

  definitions() {
    return this._get("definitions");
  }
}
