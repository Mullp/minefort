import {ResponseStatus} from '../typings';
import {AbstractReply} from '../reply';
import {PluginManager} from '../plugin';
import {IClient} from './IClient';
import {ServerManager} from '../server';
import {IconManager} from '../icon';
import {NetworkManager} from '../network';
import {UserManager} from '../user';

/**
 * Represents the client.
 */
export class Client implements IClient {
  public readonly BASE_URL = 'https://api.minefort.com/v1';
  public sessionToken = '';

  public readonly servers: ServerManager = new ServerManager(this);
  public readonly icons: IconManager = new IconManager(this);
  public readonly network: NetworkManager = new NetworkManager(this);
  public readonly user: UserManager = new UserManager(this);
  public readonly plugins: PluginManager = new PluginManager(this);

  public get cookie(): string {
    return 'minefort-session=' + this.sessionToken;
  }

  public checkResponse<K extends {status: ResponseStatus}>(
    response: K
  ): Extract<K, {status: ResponseStatus.OK}> {
    if (response.status === ResponseStatus.OK) {
      return response as Extract<K, {status: ResponseStatus.OK}>;
    } else if (response.status === ResponseStatus.NOT_AUTHENTICATED) {
      throw new Error('Not authenticated');
    } else if (response.status === ResponseStatus.INVALID_STATE) {
      throw new Error('Invalid state');
    } else if (response.status === ResponseStatus.INSUFFICIENT_BALANCE) {
      throw new Error('Insufficient balance');
    } else if (response.status === ResponseStatus.ITEM_NOT_FOUND) {
      throw new Error('Item not found');
    } else if (response.status === ResponseStatus.INVALID_INPUT) {
      throw new Error('Invalid input');
    } else if (response.status === ResponseStatus.INVALID_CREDENTIALS) {
      throw new Error('Invalid credentials');
    } else if (response.status === ResponseStatus.SERVER_NAME_ALREADY_IN_USE) {
      throw new Error('Server name already in use');
    } else if (response.status === ResponseStatus.INTERNAL_ERROR) {
      throw new Error('Internal error');
    } else if (response.status === ResponseStatus.SERVER_ACCOUNT_LIMIT) {
      throw new Error('Server account limit');
    } else if (response.status === ResponseStatus.NO_PERMISSION) {
      throw new Error('No permission');
    } else if (response.status === ResponseStatus.ENDPOINT_NOT_FOUND) {
      throw new Error('Endpoint not found');
    }

    throw new Error('Unknown error');
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
          res.json() as Promise<AbstractReply<{}>>,
          res.headers
            .get('set-cookie')
            ?.split('; ')[0]
            .replace('minefort-session=', ''),
        ]);
      })
      .then(value => {
        this.checkResponse(value[0]);
        return value;
      })
      .then(value => {
        if (value[1]) {
          this.sessionToken = value[1];
          return value[1];
        }
        throw new Error('No session token');
      })
      .catch(error => {
        throw error;
      });
  }
}
