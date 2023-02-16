import {BaseManager} from './BaseManager';
import {Client} from '../lib';
import fetch from 'cross-fetch';
import {
  MyServersResponse,
  ResponseStatus,
  ServerNameAvailableResponse,
  ServersResponse,
} from '../typings';
import {Server} from '../classes/Server';
import {MyServer} from '../classes';

/**
 * Manages API methods for servers.
 * @extends {BaseManager}
 */
export class ServerManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  /**
   * Check if a server name is available.
   * @param serverName - The name of the server to check.
   * @returns A promise that resolves to a boolean indicating if the server name is available or not.
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

  /**
   * Gets all online servers.
   * @param options - Options to the method.
   * @return A promise that resolves to all the online servers.
   * @throws {Error} - Will throw an error if the input is invalid or an internal server error had happened.
   * @example
   * // Get the user's servers.
   * const serverManager = client.serverManager;
   * const servers = await serverManager.getOnlineServers();
   */
  public async getOnlineServers(
    options: {
      paginationSkip?: number;
      limit?: number;
      sortOrder?: 'desc' | 'asc';
    } = {paginationSkip: 0, limit: 500, sortOrder: 'desc'}
  ): Promise<Server[]> {
    return await fetch(this.client.BASE_URL + '/list', {
      method: 'POST',
      body: JSON.stringify({
        pagination: {
          skip: options.paginationSkip,
          limit: options.limit,
        },
        sort: {
          field: 'players.online',
          order: options.sortOrder,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(server => new Server(this.client, server));
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal server error');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Gets an online server by name or id.
   * @param serverIdOrName - The id or name of the server.
   * @param options - Options to the method.
   * @returns A {@link Server} instance.
   * @throws {Error} - Will throw an error if a problem occurred.
   * @example
   * // Get an online server by name.
   * const serverManager = client.serverManager;
   * const server = await serverManager.getOnlineServer('serverName', { byName: true });
   */
  public async getOnlineServer(
    serverIdOrName: string,
    options: {byName?: boolean} = {byName: false}
  ): Promise<Server | null> {
    return await this.getOnlineServers()
      .then(servers => {
        if (options.byName) {
          return servers.find(server => server.name === serverIdOrName) ?? null;
        } else {
          return servers.find(server => server.id === serverIdOrName) ?? null;
        }
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Gets all the servers associated with the user.
   * @return A promise that resolves to the server list of servers associated with the user.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's servers.
   * const serverManager = client.serverManager;
   * const servers = await serverManager.getMyServers();
   */
  public async getMyServers(): Promise<MyServer[]> {
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
   * Gets a server associated with the authenticated user by name or id.
   * @param serverIdOrName - The id or name of the server.
   * @param options - Options to the method.
   * @returns A {@link MyServer} instance.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's server by name.
   * const serverManager = client.serverManager;
   * const server = await serverManager.getMyServer('serverName', { byName: true });
   */
  public async getMyServer(
    serverIdOrName: string,
    options: {byName?: boolean} = {byName: false}
  ): Promise<MyServer | null> {
    return await this.getMyServers()
      .then(servers => {
        if (options.byName) {
          return servers.find(server => server.name === serverIdOrName) ?? null;
        } else {
          return servers.find(server => server.id === serverIdOrName) ?? null;
        }
      })
      .catch(error => {
        throw error;
      });
  }
}
