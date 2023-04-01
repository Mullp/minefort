import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {
  AuthResponse,
  GetMeReturn,
  MeResponse,
  ResponseStatus,
} from '../typings';

/**
 * Manages API methods for authentication.
 * @extends {BaseManager}
 */
export class AuthManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  /**
   * Authenticate a user.
   * @param email - Email address of the user.
   * @param password - Password of the user.
   * @return A promise that resolves to a boolean value indicating whether the authentication was successful or not.
   * @throws {Error} - Throws an error if the input or credentials are invalid.
   * @example
   * const authManager = client.authManager;
   * const success = await authManager.authenticate('email', 'password');
   */
  public async authenticate(email: string, password: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + '/auth/login', {
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
            this.client.sessionToken = value[1];
          }
          return true;
        } else if (value[0].status === ResponseStatus.INVALID_CREDENTIALS) {
          throw new Error('Invalid credentials');
        } else if (value[0].status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value[0].error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Gets information on the current authenticated user.
   * @return A promise that resolves to an object of type {@link GetMeReturn}.
   * @throws {Error} - Throws an error if not authenticated.
   * @example
   * const authManager = client.authManager;
   * const me = await authManager.getMe();
   * // me = {
   * //   userId: string;
   * //   emailAddress: string;
   * //   credits: number;
   * //   verified: boolean;
   * //   affiliate: string;
   * //   ftp: {password: string};
   * //   status: {twoFactor: boolean};
   * // }
   */
  public async getMe(): Promise<GetMeReturn> {
    return await fetch(this.client.BASE_URL + '/user/me', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<MeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.OK) {
          return value.result;
        }

        throw new Error('An unexpected error has occurred');
      })
      .catch(error => {
        throw error;
      });
  }
}
