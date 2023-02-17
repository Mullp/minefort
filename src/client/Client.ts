import {AuthManager, IconManager, ServerManager} from '../managers';

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
   * The session cookie. Used to authenticate users.
   */
  public sessionCookie = '';

  public readonly authManager: AuthManager = new AuthManager(this);
  public readonly serverManager: ServerManager = new ServerManager(this);
  public readonly iconManager: IconManager = new IconManager(this);

  /**
   * The session cookie with "minefort-session=" appended in front.
   */
  public get cookie(): string {
    return 'minefort-session=' + this.sessionCookie;
  }
}
