import {BaseClass} from './Base';
import {Client} from '../client';
import {ServerInterface, ServerResponse, ServerState} from '../typings';
import {Icon} from './Icon';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class Server extends BaseClass implements ServerInterface {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly ownerId: string;
  public readonly version: string;
  public readonly state: ServerState;
  public readonly motd: string;
  public readonly playerData: {
    readonly playerCount: number;
    readonly online?: string[];
    readonly maxPlayers: number;
  };

  public constructor(client: Client, data: ServerResponse) {
    super(client);

    this.id = data.serverId;
    this.name = data.serverName;
    this.icon = new Icon(client, data.serverIcon);
    this.ownerId = data.userId;
    this.version = data.version;
    this.state = data.state;
    this.motd = data.messageOfTheDay;
    this.playerData = {
      playerCount: data.players.online,
      online: data.players.list?.map(player => player.uuid),
      maxPlayers: data.players.max,
    };
  }
}
