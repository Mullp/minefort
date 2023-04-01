import {
  AuthManager,
  IconManager,
  NetworkManager,
  ServerManager,
} from '../managers';

/**
 * Represents the client.
 */
export class Client {
  /**
   * The base url for the Minefort api.
   * @constant
   */
  public readonly BASE_URL = 'https://api.minefort.com/v1';
  /**
   * The session token. Used to authenticate users.
   */
  public sessionToken = '';

  public readonly authManager: AuthManager = new AuthManager(this);
  public readonly serverManager: ServerManager = new ServerManager(this);
  public readonly iconManager: IconManager = new IconManager(this);
  public readonly networkManager: NetworkManager = new NetworkManager(this);

  /**
   * The session token with "minefort-session=" appended in front.
   */
  public get cookie(): string {
    return 'minefort-session=' + this.sessionToken;
  }
}
