import {AuthManager, ServerManager} from '../../managers';

export class Client {
  public readonly BASE_URL = 'https://api.minefort.com/v1';
  public sessionCookie = '';

  public readonly authManager: AuthManager = new AuthManager(this);
  public readonly serverManager: ServerManager = new ServerManager(this);

  public get cookie(): string {
    return 'minefort-session=' + this.sessionCookie;
  }
}
