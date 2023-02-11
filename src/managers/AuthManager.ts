import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {
  AuthResponse,
  GetMeReturn,
  MeResponse,
  ResponseStatus,
  MyServersResponse,
} from '../typings';
import {MyServer} from '../classes';

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
   * @param {string} email - Email address of the user.
   * @param {string} password - Password of the user.
   * @return {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the authentication was successful or not.
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
            this.client.sessionCookie = value[1];
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
   * @return {Promise<GetMeReturn>} - A promise that resolves to an object of type {@link GetMeReturn}.
   * @throws {Error} - Throws an error if not authenticated.
   * @example
   * const authManager = client.authManager;
   * const me = await authManager.getMe();
   * // me = {
   * //   userId: string;
   * //   emailAddress: string;
   * //   credits: number;
   * //   verified: boolean;
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

  /**
   * Gets all the servers associated with the user.
   * @return {Promise<MyServer[]>} - A promise that resolves to the server list of servers associated with the user.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's servers.
   * const authManager = client.authManager;
   * const servers = await authManager.getAll();
   */
  public async getAll(): Promise<MyServer[]> {
    return await fetch(this.client.BASE_URL + '/user/servers', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<MyServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new MyServer(this.client, server));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        return [] as MyServer[];
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Retrieve a server instance by its id.
   * @param {string} serverId - The id of the server.
   * @returns {Promise<MyServer | void>} - A {@link MyServer} instance.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's server by id.
   * const authManager = client.authManager;
   * const server = await authManager.get('serverId');
   */
  public async get(serverId: string): Promise<MyServer | void> {
    return await this.getAll()
      .then(servers => servers.find(server => server.id === serverId))
      .catch(error => {
        throw error;
      });
  }
}
