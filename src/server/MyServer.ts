import {Client} from '../client';
import {
  ServerCategory,
  ServerProperties,
  ServerState,
  SubUserRole,
} from '../typings';
import fetch from 'cross-fetch';
import {
  AbstractReply,
  MyServerReply,
  PlayerResponse,
  SubUserReply,
} from '../reply';
import {IMyServer} from './IMyServer';
import {BaseClass} from '../base';
import {Icon} from '../icon';
import {FileManager} from './file';
import {Plugin} from '../plugin';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class MyServer extends BaseClass implements IMyServer {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly userId: string;
  public readonly version: string;
  public readonly category: ServerCategory;
  public readonly subUsers: SubUserReply[];
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

  public readonly files = new FileManager(this.client, this);

  public constructor(client: Client, data: MyServerReply) {
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  }

  public async repair(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/repair`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  }

  public async reset(): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/reset`, {
      method: 'POST',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<string>>)
      .then(this.client.checkResponse)
      .then(value => value.result.split('\n'))
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
      .then(
        res =>
          res.json() as Promise<
            AbstractReply<{
              [key: string]: string | number | boolean | null;
            }>
          >
      )
      .then(this.client.checkResponse)
      .then(value => new Map(Object.entries(value.result)))
      .catch(error => {
        throw error;
      });
  }

  public async getSubUsers(): Promise<SubUserReply[]> {
    return await fetch(this.client.BASE_URL + `/server/${this.id}/subusers`, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
      },
    })
      .then(res => res.json() as Promise<AbstractReply<SubUserReply[]>>)
      .then(this.client.checkResponse)
      .then(value => value.result)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  }

  public async installPlugin(plugin: string | Plugin): Promise<boolean> {
    return await fetch(this.client.BASE_URL + `/plugins/${this.id}/install`, {
      method: 'POST',
      body: JSON.stringify({
        pluginId: typeof plugin === 'string' ? plugin : plugin.id,
      }),
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
      .catch(error => {
        throw error;
      });
  }
}
