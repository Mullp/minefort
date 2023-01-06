import {AuthManager} from '../../managers';

export class Client {
  private _BASE_URL = 'https://api.minefort.com/v1';
  private _cookie = '';

  private _authManager: AuthManager = new AuthManager(this);

  get BASE_URL(): string {
    return this._BASE_URL;
  }
  set cookie(value: string) {
    this._cookie = value;
  }
  get cookie(): string {
    return this._cookie;
  }

  get authManager(): AuthManager {
    return this._authManager;
  }
}
