import {BaseClass} from './Base';
import {Client} from '../client';
import {
  MyServerResponse,
  Player,
  ResponseStatus,
  ServerConsoleResponse,
  ServerDeleteResponse,
  ServerIconChangeResponse,
  ServerKillResponse,
  ServerMotdChangeResponse,
  ServerNameChangeResponse,
  ServerProperties,
  ServerPropertiesResponse,
  ServerPropertyChangeResponse,
  ServerSleepResponse,
  ServerStartResponse,
  ServerState,
  ServerStopResponse,
  ServerWakeupResponse,
} from '../typings';
import fetch from 'cross-fetch';
import {Icon} from './Icon';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class MyServer extends BaseClass {
  /**
   * The server's ID.
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
   * The owner of the server's user ID.
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
    readonly ramUsage: number;
    /**
     * The server's disk usage in megabytes
     */
    readonly diskUsage: number;
  };
  /**
   * The backups of the server.
   */
  public readonly backups?: {
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
  public readonly subscription: {
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
  public readonly unlockedIcons: Icon[];
  /**
   * The server's settings.
   * Note this does not include the properties of the server.
   */
  public readonly settings: {
    /**
     * Whether the server is visible from the lobby.
     */
    readonly lobbyVisible: boolean;
    /**
     * The state of when it can be started from the lobby.
     */
    readonly startupCommand: number;
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
    readonly playerCount: number;
    /**
     * A list of {@link Player} representing all online players.
     */
    readonly online: Player[];
    /**
     * The max amount of players allowed online at once.
     */
    readonly maxPlayers: number;
  };
  /**
   * Information about the server's cross-platform support.
   */
  public readonly support: {
    /**
     * Whether the server supports cracked players.
     */
    readonly offline: boolean;
    /**
     * Whether the server supports bedrock players.
     */
    readonly bedrock: boolean;
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
    this.support = {
      offline: data.support.offline,
      bedrock: data.support.bedrock,
    };
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
  public async sleep(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/sleep`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerSleepResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may already be asleep');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
   * Gets the server's console output.
   * @returns A promise that resolves to a list of strings representing each line of the console's output.
   * @throws {Error} - Will throw an error if not authenticated, if the server is in an invalid state, or if the server is not found.
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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

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
  public async getProperties(): Promise<
    Map<string, string | number | boolean | null>
  > {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/properties`, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<ServerPropertiesResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return new Map(Object.entries(value.result));
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return new Map();
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
   * const success = await server.setIcon(icon);
   */
  public async setIcon(iconId: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/icon`, {
      method: 'POST',
      body: JSON.stringify({
        iconId: iconId,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerIconChangeResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server or icon is not found');
        } else if (value.status === ResponseStatus.INSUFFICIENT_BALANCE) {
          throw new Error('Insufficient balance');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
