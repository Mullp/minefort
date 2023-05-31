import {
  IconManager,
  NetworkManager,
  ServerManager,
  UserManager,
} from '../managers';
import {AuthResponse, ClientInterface, ResponseStatus} from '../typings';

/**
 * Represents the client.
 */
export class Client implements ClientInterface {
  public readonly BASE_URL = 'https://api.minefort.com/v1';
  public sessionToken = '';

  public readonly servers: ServerManager = new ServerManager(this);
  public readonly icons: IconManager = new IconManager(this);
  public readonly network: NetworkManager = new NetworkManager(this);
  public readonly user: UserManager = new UserManager(this);

  public get cookie(): string {
    return 'minefort-session=' + this.sessionToken;
  }

  public async auth(email: string, password: string): Promise<string> {
    return await fetch(this.BASE_URL + '/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        emailAddress: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return Promise.all([
          res.json() as Promise<AuthResponse>,
          res.headers
            .get('set-cookie')
            ?.split('; ')[0]
            .replace('minefort-session=', ''),
        ]);
      })
      .then(value => {
        if (value[0].status === ResponseStatus.OK) {
          if (value[1]) {
            this.sessionToken = value[1];
            return value[1];
          }
          throw new Error('No session token');
        } else if (value[0].status === ResponseStatus.INVALID_CREDENTIALS) {
          throw new Error('Invalid credentials');
        } else if (value[0].status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value[0].error.body[0].message);
        }

        throw new Error('Unknown error');
      })
      .catch(error => {
        throw error;
      });
  }
}
