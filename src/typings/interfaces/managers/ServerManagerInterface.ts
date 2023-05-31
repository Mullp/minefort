import {MyServer, Server} from '../../../classes';

export interface ServerManagerInterface {
  /**
   * Check if a server name is available.
   * @param serverName - The name of the server to check.
   * @returns A promise that resolves to a boolean indicating if the server name is available or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or the input is invalid.
   * @example
   * // Check if a server name is available.
   * const available = await client.server.isNameAvailable('serverName');
   */
  isNameAvailable(serverName: string): Promise<boolean>;

  /**
   * Gets all online servers.
   * @param options - Options to the method.
   * @param options.paginationSkip - The amount of servers to skip.
   * @param options.limit - The amount of servers to get.
   * @param options.sortOrder - The order to sort the servers by.
   * @return A promise that resolves to all the online servers.
   * @throws {Error} - Will throw an error if the input is invalid or an internal server error had happened.
   * @example
   * // Get the user's servers.
   * const servers = await client.server.getOnlineServers();
   */
  getOnlineServers(options: {
    paginationSkip?: number;
    limit?: number;
    sortOrder?: 'desc' | 'asc';
  }): Promise<Server[]>;

  /**
   * Gets an online server by name or ID.
   * @param serverIdOrName - The ID or name of the server.
   * @param options - Options to the method.
   * @param options.byName - Whether to get the server by its name or not.
   * @returns A {@link Server} instance or `null` if the server was not found.
   * @throws {Error} - Will throw an error if a problem occurred.
   * @example
   * // Get an online server by name.
   * const server = await client.server.getOnlineServer('serverName', { byName: true });
   */
  getOnlineServer(
    serverIdOrName: string,
    options: {byName?: boolean}
  ): Promise<Server | null>;

  /**
   * Gets all the servers associated with the user.
   * @return A promise that resolves to the server list of servers associated with the user.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's servers.
   * const servers = await client.server.getMyServers();
   */
  getMyServers(): Promise<MyServer[]>;

  /**
   * Gets a server associated with the authenticated user by name or ID.
   * @param serverIdOrName - The ID or name of the server.
   * @param options - Options to the method.
   * @param options.byName - Whether to get the server by its name or not.
   * @returns A {@link MyServer} instance or `null` if the server was not found.
   * @throws {Error} - Will throw an error if the user is not authenticated.
   * @example
   * // Get the user's server by name.
   * const server = await client.server.getMyServer('serverName', { byName: true });
   */
  getMyServer(
    serverIdOrName: string,
    options: {byName?: boolean}
  ): Promise<MyServer | null>;

  /**
   * Creates a server.
   * @param serverName - The name of the server.
   * @param template - The template to use for the server, defaults to "default".
   * @returns A promise that resolves to a boolean indicating whether the server was created or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the input is invalid, if the server name is already taken, or if the server could not be created.
   * @example
   * // Create a server.
   * const created = await client.server.createServer('serverName');
   */
  createServer(serverName: string, template: string): Promise<boolean>;
}
