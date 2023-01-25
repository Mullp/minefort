import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {
  ResponseStatus,
  ServerNameAvailableResponse,
  ServersResponse,
} from '../typings';
import {Server} from '../classes';

/**
 * Manages API methods for servers.
 * @extends {BaseManager}
 */
export class ServerManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  /**
   * Gets all the servers associated with the user.
   * @return {Promise<Server[]>} - A promise that resolves to the server list of servers associated with the user.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's servers.
   * const serverManager = client.serverManager;
   * const servers = await serverManager.getAll();
   */
  public async getAll(): Promise<Server[]> {
    return await fetch(this.client.BASE_URL + '/user/servers', {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<ServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new Server(this.client, server));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        }

        return [] as Server[];
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Retrieve a server instance by its id.
   * @param {string} serverId - The id of the server.
   * @returns {Promise<Server | void>} - A {@link Server} instance.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's server by id.
   * const serverManager = client.serverManager;
   * const server = await serverManager.get('serverId');
   */
  public async get(serverId: string): Promise<Server | void> {
    return await this.getAll()
      .then(servers => servers.find(server => server.id === serverId))
      .catch(error => {
        throw error;
      });
  }

  /**
   * Check if a server name is available.
   * @param {string} serverName - The name of the server to check.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the server name is available or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or the input is invalid.
   * @example
   * // Check if a server name is available.
   * const serverManager = client.serverManager;
   * const available = await serverManager.isNameAvailable('serverName');
   */
  public async isNameAvailable(serverName: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + '/server/availability', {
      method: 'POST',
      body: JSON.stringify({
        serverName: serverName,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerNameAvailableResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
