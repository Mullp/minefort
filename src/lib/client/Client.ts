import {AuthManager, ServerManager} from '../../managers';

export class Client {
  private _BASE_URL = 'https://api.minefort.com/v1';
  private _sessionCookie = '';

  private _authManager: AuthManager = new AuthManager(this);
  private _serverManager: ServerManager = new ServerManager(this);

  public get BASE_URL(): string {
    return this._BASE_URL;
  }

  public set sessionCookie(value: string) {
    this._sessionCookie = value;
  }

  public get sessionCookie(): string {
    return this._sessionCookie;
  }

  public get cookie(): string {
    return 'minefort-session=' + this._sessionCookie;
  }

  public get authManager(): AuthManager {
    return this._authManager;
  }

  public get serverManager(): ServerManager {
    return this._serverManager;
  }
}
