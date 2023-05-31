import {
  IconManager,
  NetworkManager,
  ServerManager,
  UserManager,
} from '../managers';
import {AuthResponse, ResponseStatus} from '../typings';

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

  /**
   * The {@link ServerManager} used to access server related methods.
   */
  public readonly servers: ServerManager = new ServerManager(this);
  /**
   * The {@link IconManager} used to access icon related methods.
   */
  public readonly icons: IconManager = new IconManager(this);
  /**
   * The {@link NetworkManager} used to access network related methods.
   */
  public readonly network: NetworkManager = new NetworkManager(this);
  /**
   * The {@link UserManager} used to access user related methods.
   */
  public readonly user: UserManager = new UserManager(this);

  /**
   * The session token with "minefort-session=" appended in front.
   */
  public get cookie(): string {
    return 'minefort-session=' + this.sessionToken;
  }

  /**
   * Authenticate a user.
   * @param email - Email address of the user.
   * @param password - Password of the user.
   * @return A promise that resolves to the session token.
   * @throws {Error} - Throws an error if the input or credentials are invalid.
   * @example
   * const token = await client.auth('email', 'password');
   */
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
