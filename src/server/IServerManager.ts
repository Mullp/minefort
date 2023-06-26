import {Server} from './Server';
import {MyServer} from './MyServer';

export interface IServerManager {
  /**
   * Check if a server name is available.
   * @param serverName - The name of the server to check.
   * @returns - Whether the server name is available or not.
   * @example
   * // Check if a server name is available.
   * const available = await client.server.isNameAvailable('serverName');
   */
  isNameAvailable(serverName: string): Promise<boolean>;

  /**
   * Gets online servers.
   * @param options - Options to the method.
   * @param options.paginationSkip - The amount of servers to skip.
   * @param options.limit - The amount of servers to get.
   * @param options.sortOrder - The order to sort the servers by.
   * @return - A list of online servers.
   * @example
   * // Get the top 5 servers with the most players.
   * const servers = await client.server.getOnlineServers({limit: 5});
   */
  getOnlineServers(options: {
    paginationSkip?: number;
    limit?: number;
    sortOrder?: 'desc' | 'asc';
  }): Promise<Server[]>;

  /**
   * Gets all online servers.
   * @return - A list of all online servers.
   * @example
   * // Get all online servers.
   * const servers = await client.server.getOnlineServers();
   */
  getOnlineServers(): Promise<Server[]>;

  /**
   * Gets all the servers owned by the user.
   * @return - A list of all the servers owned by the user.
   * @example
   * // Get the user's servers.
   * const servers = await client.server.getMyServers();
   */
  getMyServers(): Promise<MyServer[]>;

  /**
   * Create a server.
   * @param serverName - The name of the server.
   * @param template - The template to use for the server, defaults to "default".
   * @returns - Whether the server was created or not.
   * @example
   * // Create a server.
   * const success = await client.server.createServer('serverName');
   */
  createServer(serverName: string, template: string): Promise<boolean>;
}
