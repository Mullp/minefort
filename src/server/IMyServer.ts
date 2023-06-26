import {
  ServerCategory,
  ServerProperties,
  ServerState,
  SubUserRole,
} from '../typings';
import {PlayerResponse, SubUserReply} from '../reply';
import {Icon} from '../icon';
import {FileManager} from './file';
import {Plugin} from '../plugin';

export interface IMyServer {
  /**
   * The server's ID.
   */
  readonly id: string;
  /**
   * The server's name.
   */
  readonly name: string;
  /**
   * The icon of the server.
   */
  readonly icon: Icon;
  /**
   * The owner of the server's user ID.
   */
  readonly userId: string;
  /**
   * The version of the server.
   */
  readonly version: string;
  /**
   * The category of the server.
   */
  readonly category: ServerCategory;
  /**
   * The sub users of the server.
   */
  readonly subUsers: SubUserReply[];
  /**
   * The state of the server.
   */
  readonly state: ServerState;
  /**
   * Information about the server's cross-platform support.
   */
  readonly support: {
    /**
     * Whether the server supports cracked players.
     */
    readonly offline: boolean;
    /**
     * Whether the server supports bedrock players.
     */
    readonly bedrock: boolean;
  };
  /**
   * Information about the server's usage.
   */
  readonly usage: {
    /**
     * The server's ram usage in megabytes
     */
    readonly ramUsage: number;
    /**
     * The server's disk usage in megabytes
     */
    readonly diskUsage: number;
  };
  /**
   * The backups of the server.
   */
  readonly backups?: {
    /**
     * The ID of the backup.
     */
    readonly backupId: string;
    /**
     * The date at which the backup was taken.
     */
    readonly createdAt: Date;
  }[];
  /**
   * Information about the server's subscription.
   */
  readonly subscription: {
    /**
     * The package ID of the current active subscription.
     */
    readonly currentPackageId: number;
    /**
     * The package ID of the next package.
     */
    readonly nextPackageId?: number;
  };
  /**
   * A list of {@link Icon}, that the server has unlocked.
   */
  readonly unlockedIcons: Icon[];
  /**
   * The server's settings.
   * Note this does not include the properties of the server.
   */
  readonly settings: {
    /**
     * Whether the server is visible from the lobby.
     */
    readonly lobbyVisible: boolean;
    /**
     * The state of when it can be started from the lobby.
     */
    readonly startupCommand: number;
    /**
     * Whether cosmetics are enabled.
     */
    readonly cosmetics: boolean;
  };
  /**
   * The server's MotD also known as "Message of the Day".
   */
  readonly motd: string;
  /**
   * Information about online players.
   */
  readonly playerData: {
    /**
     * The amount of online players.
     */
    readonly playerCount: number;
    /**
     * A list of {@link PlayerResponse} representing all online players.
     */
    readonly online: PlayerResponse[];
    /**
     * The max amount of players allowed online at once.
     */
    readonly maxPlayers: number;
  };

  /**
   * The {@link FileManager} used to access file related methods.
   */
  readonly files: FileManager;

  /**
   * Wakes up the server.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully woken up or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.wakeup()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  wakeup(): Promise<boolean>;

  /**
   * Starts up the server.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully started up or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.start()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  start(): Promise<boolean>;

  /**
   * Stops the server.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully stopped or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.stop()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  stop(): Promise<boolean>;

  /**
   * Forces the server into stopping.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully forced into stopping or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.kill()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  kill(): Promise<boolean>;

  /**
   * Puts the server into hibernation.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully put into hibernation or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * // Puts the server into hibernation.
   * const success = await server.sleep()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  sleep(): Promise<boolean>;

  /**
   * Deletes the server.
   * @param password - The user's password of the server owner.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully deleted or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, invalid input is given, invalid credentials, or invalid server state.
   * @example
   * const success = await server.delete('password')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  delete(password: string): Promise<boolean>;

  /**
   * Repairs the server by resetting default server files.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully repaired or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   */
  repair(): Promise<boolean>;

  /**
   * Resets the server.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully reset or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, if the server is in an invalid state, or if the server is not found.
   */
  reset(): Promise<boolean>;

  /**
   * Gets the server's console output.
   * @returns A promise that resolves to a list of strings representing each line of the console's output.
   * @throws {Error} - Will throw an error if not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const consoleLines = await server.getConsole()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  getConsole(): Promise<string[]>;

  /**
   * Gets the server's properties.
   * @returns A promise that resolves to a map of strings representing the server's properties.
   * @throws {Error} - Will throw an error if not authenticated, if the server is not found, or if the server is in an invalid state.
   * @example
   * // Example of getting the server's difficulty.
   * const properties = await server.getProperties()
   *   .catch(error => {
   *     console.error(error);
   *   });
   *
   * console.log("Server's difficulty is: " + properties.get("difficulty"));
   */
  getProperties(): Promise<Map<string, string | number | boolean | null>>;

  /**
   * Gets the server's sub users.
   * @returns A promise that resolves to a list of {@link SubUserReply} representing the server's sub users.
   * @throws {Error} - Will throw an error if not authenticated, if the server is in an invalid state, or if the server is not found.
   * @example
   * const subUsers = await server.getSubUsers()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  getSubUsers(): Promise<SubUserReply[]>;

  /**
   * Sets the motd of the server.
   * @param motd - The new motd of the server.
   * @returns A promise that resolves to a boolean value indicating whether the server's motd was successfully changed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.setMotd('new server motd')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  setMotd(motd: string): Promise<boolean>;

  /**
   * Sets the name of the server.
   * @param serverName - The new name of the server.
   * @returns A promise that resolves to a boolean value indicating whether the server was successfully renamed or not.
   * @throws {Error} - Will throw an error if the server name is already in use by another Minefort server, if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.setName('new server name')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  setName(serverName: string): Promise<boolean>;

  /**
   * Sets the icon of the server. **Note: If server doesn't own the icon, it will be purchased.**
   * @param icon - The icon to set.
   * @returns A promise that resolves to a boolean value indicating whether the server's icon was successfully changed or purchased, or not.
   * @throws {Error} - Will throw an error if not authenticated, if the server is in an invalid state, if the server or the icon is not found, or if the authenticated user does not have enough funds to purchase the icon.
   * @example
   * // Change the server's icon to the icon with the name 'Sweet Berries Icon'
   * const icon = await client.icons
   *   .getIcon('Sweet Berries Icon', { byName: true })
   *   .catch(error => {
   *     console.error(error);
   *   });
   *
   * if (!icon) throw new Error('Icon not found');
   *
   * const success = await server.setIcon(icon);
   */
  setIcon(icon: Icon): Promise<boolean>;

  /**
   * Sets the icon of the server. **Note: If server doesn't own the icon, it will be purchased.**
   * @param iconId - The ID of the icon to set.
   * @returns A promise that resolves to a boolean value indicating whether the server's icon was successfully changed or purchased, or not.
   * @throws {Error} - Will throw an error if not authenticated, if the server is in an invalid state, if the server or the icon is not found, or if the authenticated user does not have enough funds to purchase the icon.
   * @example
   * // Change the server's icon to the icon with the name 'Sweet Berries Icon'
   * const icon = await client.iconManager
   *   .getIcon('Sweet Berries Icon', { byName: true })
   *   .catch(error => {
   *     console.error(error);
   *   });
   *
   * if (!icon) throw new Error('Icon not found');
   *
   * const success = await server.setIcon(icon.id);
   */
  setIcon(iconId: string): Promise<boolean>;

  /**
   * Sets a property of the server.
   * @param property - The property.
   * @param value - The new value.
   * @returns A promise that resolves to a boolean value indicating whether the server's property was successfully changed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   * @example
   * const success = await server.setProperty('pvp', false)
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  setProperty(
    property: ServerProperties,
    value: string | number | boolean
  ): Promise<boolean>;

  /**
   * Updates a sub user's role.
   * @param userId - The ID of the sub user.
   * @param role - The new role of the sub user.
   * @returns A promise that resolves to a boolean value indicating whether the sub user's role was successfully changed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   */
  updateSubUser(userId: string, role: SubUserRole): Promise<boolean>;

  /**
   * Deletes a sub user.
   * @param userId - The ID of the sub user.
   * @returns A promise that resolves to a boolean value indicating whether the sub user was successfully deleted or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   */
  deleteSubUser(userId: string): Promise<boolean>;

  /**
   * Invites a sub user.
   * @param email - The email of the sub user.
   * @param role - The role of the sub user.
   * @returns A promise that resolves to a boolean value indicating whether the sub user was successfully invited or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, or if the server is not found.
   */
  inviteSubUser(email: string, role: SubUserRole): Promise<boolean>;

  /**
   * Installs a plugin on the server.
   * @param pluginId - The ID of the plugin to install.
   * @returns A promise that resolves to a boolean value indicating whether the plugin was successfully installed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, if the server is not found, or if the plugin is not found.
   */
  installPlugin(pluginId: string): Promise<boolean>;

  /**
   * Installs a plugin on the server.
   * @param plugin - The plugin to install.
   * @returns A promise that resolves to a boolean value indicating whether the plugin was successfully installed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, if the server is in an invalid state, if the server is not found, or if the plugin is not found.
   */
  installPlugin(plugin: Plugin): Promise<boolean>;
}
