import {BaseClass} from './Base';
import {Client} from '../lib';
import {
  Player,
  ResponseStatus,
  ServerConsoleResponse,
  ServerDeleteResponse,
  ServerKillResponse,
  ServerNameChangeResponse,
  MyServerResponse,
  ServerStartResponse,
  ServerState,
  ServerStopResponse,
  ServerWakeupResponse,
  ServerMotdChangeResponse,
  ServerPropertyChangeResponse,
} from '../typings';
import fetch from 'cross-fetch';
import {Icon} from './Icon';
import {ServerProperties} from '../typings/ServerTypings';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class MyServer extends BaseClass {
  /**
   * The server's id.
   */
  public readonly id: string;
  /**
   * The server's name.
   */
  public readonly name: string;
  /**
   * The icon of the server.
   */
  public readonly icon: Icon;
  /**
   * The owner of the server's user id.
   */
  public readonly userId: string;
  /**
   * The version of the server.
   */
  public readonly version: string;
  /**
   * The state of the server.
   */
  public readonly state: ServerState;
  /**
   * Information about the server's usage.
   */
  public readonly usage: {
    /**
     * The server's ram usage in megabytes
     */
    ramUsage: number;
    /**
     * The server's disk usage in megabytes
     */
    diskUsage: number;
  };
  /**
   * The backups of the server.
   */
  public readonly backups?: {
    /**
     * The id of the backup.
     */
    backupId: string;
    /**
     * The date at which the backup was taken.
     */
    createdAt: Date;
  }[];
  /**
   * Information about the server's subscription.
   */
  public readonly subscription: {
    /**
     * The package id of the current active subscription.
     */
    currentPackageId: number;
    /**
     * The package id of the next package.
     */
    nextPackageId?: number;
  };
  /**
   * A list of {@link Icon}, that the server has unlocked.
   */
  public readonly unlockedIcons: Icon[];
  /**
   * The server's settings.
   * Note this does not include the properties of the server.
   */
  public readonly settings: {
    /**
     * Whether the server is visible from the lobby.
     */
    lobbyVisible: boolean;
    /**
     * The state of when it can be started from the lobby.
     */
    startupCommand: number;
  };
  /**
   * The server's MotD also known as "Message of the Day".
   */
  public readonly motd: string;
  /**
   * Information about online players.
   */
  public readonly playerData: {
    /**
     * The amount of online players.
     */
    playerCount: number;
    /**
     * A list of {@link Player} representing all online players.
     */
    online: Player[];
    /**
     * The max amount of players allowed online at once.
     */
    maxPlayers: number;
  };
  /**
   * Information about the server's FTP.
   * Note: The FTP username is the server's {@link id}
   * @example Connection information.
   * Host: ftp.minefort.com
   * Port: 21
   * FTP Username: // The server's id
   * FTP Password: // Stored under this.ftp.password
   */
  public readonly ftp: {
    /**
     * The FTP password.
     */
    password: string;
  };

  public constructor(client: Client, data: MyServerResponse) {
    super(client);

    this.id = data.serverId;
    this.name = data.serverName;
    this.icon = new Icon(client, data.serverIcon);
    this.userId = data.userId;
    this.version = data.version;
    this.state = data.state;
    this.usage = {
      diskUsage: data.usage.disk,
      ramUsage: data.usage.ram,
    };
    this.backups = data.backups?.map(backup => {
      return {
        backupId: backup.backupId,
        createdAt: new Date(backup.date),
      };
    });
    this.subscription = {
      currentPackageId: data.subscription.currentPackageId,
      nextPackageId: data.subscription.nextPackageId,
    };
    this.unlockedIcons = data.unlockedIcons.map(icon => new Icon(client, icon));
    this.settings = {
      lobbyVisible: data.settings.lobbyVisible,
      startupCommand: data.settings.startupCommand,
    };
    this.motd = data.messageOfTheDay;
    this.playerData = {
      playerCount: data.players.online,
      online: data.players.list,
      maxPlayers: data.players.max,
    };
    this.ftp = {password: data.ftp.password};
  }

  /**
   * Wakes up the server.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully woken up or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or if the server is already running.
   * @example
   * const success = await server.wakeup()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async wakeup(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/wakeup`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(value => value.json() as Promise<ServerWakeupResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may already be running');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Starts up the server.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully started up or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or if the server is in an invalid state.
   * @example
   * const success = await server.start()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async start(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/start`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerStartResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error(
            'Invalid state. Server may already be running or asleep'
          );
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Stops the server.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully stopped or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or if the server is in an invalid state.
   * @example
   * const success = await server.stop()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async stop(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/stop`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerStopResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error(
            'Invalid state. Server may already be stopped or asleep'
          );
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Forces the server into stopping.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully forced into stopping or not.
   * @throws {Error} - Will throw an error if the user is not authenticated or if the server is in an invalid state.
   * @example
   * const success = await server.kill()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async kill(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/kill`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerKillResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Deletes the server.
   * @param {string} password - The user's password of the server's owner.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully deleted or not.
   * @throws {Error} - Will throw an error if the user is not authenticated, invalid input is given, invalid credentials, or invalid server state.
   * @example
   * const success = await server.delete('password')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async delete(password: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        password: password,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerDeleteResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error?.body[0].message);
        } else if (value.status === ResponseStatus.INVALID_CREDENTIALS) {
          throw new Error('Invalid credentials');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be running');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Sets the name of the server.
   * @param {string} serverName - The new name of the server.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server was successfully renamed or not.
   * @throws {Error} - Will throw an error if the server name is already in use by another Minefort server, if not authenticated, if invalid input, or if the server is in an invalid state.
   * @example
   * const success = await server.setName('new server name')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async setName(serverName: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/name`, {
      method: 'POST',
      body: JSON.stringify({
        serverName: serverName,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerNameChangeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.SERVER_NAME_ALREADY_IN_USE) {
          throw new Error(
            'Server name is already in use by another Minefort server'
          );
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error?.body[0].message);
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Gets the server's console output.
   * @returns {Promise<string[]>} - A promise that resolves to a list of strings representing each line of the console's output.
   * @throws {Error} - Will throw an error if not authenticated, or if the server is in an invalid state.
   * @example
   * const consoleLines = await server.getConsole()
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async getConsole(): Promise<string[]> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/console`, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<ServerConsoleResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.split('\n');
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Sets the motd of the server.
   * @param {string} motd - The new motd of the server.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server's motd was successfully changed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, or if the server is in an invalid state.
   * @example
   * const success = await server.setMotd('new server motd')
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async setMotd(motd: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/motd`, {
      method: 'POST',
      body: JSON.stringify({
        messageOfTheDay: motd,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerMotdChangeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error?.body[0].message);
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Sets a property of the server.
   * @param {string} property - The property.
   * @param {string} value - The new value.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the server's property was successfully changed or not.
   * @throws {Error} - Will throw an error if not authenticated, if invalid input, or if the server is in an invalid state.
   * @example
   * const success = await server.setProperty('pvp', false)
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  public async setProperty(
    property: ServerProperties,
    value: string | number | boolean
  ): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/properties`, {
      method: 'POST',
      body: JSON.stringify({
        property: property,
        value: value,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerPropertyChangeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error?.body[0].message);
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
