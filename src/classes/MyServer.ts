import {BaseClass} from './Base';
import {Client} from '../client';
import {
  MyServerInterface,
  MyServerResponse,
  PlayerResponse,
  ResponseStatus,
  ServerCategory,
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
  ServerSubUserDeleteResponse,
  ServerSubUserInviteResponse,
  ServerSubUsersResponse,
  ServerSubUserUpdateResponse,
  ServerWakeupResponse,
  SubUserResponse,
  SubUserRole,
} from '../typings';
import fetch from 'cross-fetch';
import {Icon} from './Icon';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class MyServer extends BaseClass implements MyServerInterface {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly userId: string;
  public readonly version: string;
  public readonly category: ServerCategory;
  public readonly subUsers: SubUserResponse[];
  public readonly state: ServerState;
  public readonly support: {
    readonly offline: boolean;
    readonly bedrock: boolean;
  };
  public readonly usage: {
    readonly ramUsage: number;
    readonly diskUsage: number;
  };
  public readonly backups?: {
    readonly backupId: string;
    readonly createdAt: Date;
  }[];
  public readonly subscription: {
    readonly currentPackageId: number;
    readonly nextPackageId?: number;
  };
  public readonly unlockedIcons: Icon[];
  public readonly settings: {
    readonly lobbyVisible: boolean;
    readonly startupCommand: number;
    readonly cosmetics: boolean;
  };
  public readonly motd: string;
  public readonly playerData: {
    readonly playerCount: number;
    readonly online: PlayerResponse[];
    readonly maxPlayers: number;
  };

  public constructor(client: Client, data: MyServerResponse) {
    super(client);

    this.id = data.serverId;
    this.name = data.serverName;
    this.icon = new Icon(client, data.serverIcon);
    this.userId = data.userId;
    this.version = data.version;
    this.category = data.category;
    this.subUsers = data.subUsers;
    this.state = data.state;
    this.support = {
      offline: data.support.offline,
      bedrock: data.support.bedrock,
    };
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
      cosmetics: data.settings.cosmetics,
    };
    this.motd = data.messageOfTheDay;
    this.playerData = {
      playerCount: data.players.online,
      online: data.players.list,
      maxPlayers: data.players.max,
    };
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return new Map();
      })
      .catch(error => {
        throw error;
      });
  }

  public async getSubUsers(): Promise<SubUserResponse[]> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/subusers`, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<ServerSubUsersResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Server is not found');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async setIcon(icon: string | Icon): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/icon`, {
      method: 'POST',
      body: JSON.stringify({
        iconId: typeof icon === 'string' ? icon : icon.id,
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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

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
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async updateSubUser(
    userId: string,
    role: SubUserRole
  ): Promise<boolean> {
    return await fetch(
      this.client.BASE_URL + `/server/${this.id}/subusers/update`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          role: role,
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerSubUserUpdateResponse>)
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
          throw new Error('Sub user is not found');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async deleteSubUser(userId: string): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/subusers`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerSubUserDeleteResponse>)
      .then(value => {
        console.log(value);

        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error?.body[0].message);
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state. Server may be in hibernation');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Sub user is not found');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async inviteSubUser(
    email: string,
    role: SubUserRole
  ): Promise<boolean> {
    return await fetch(
      this.client.BASE_URL + `/server/${this.id}/subusers/invite`,
      {
        method: 'POST',
        body: JSON.stringify({
          emailAddress: email,
          role: role,
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerSubUserInviteResponse>)
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
          throw new Error('No user with that email is found');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }
}
