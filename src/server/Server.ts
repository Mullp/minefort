import {Client} from '../client';
import {Icon} from '../icon';
import {BaseClass} from '../base';
import {IServer} from './IServer';
import {ServerState} from '../typings';
import {ServerReply} from '../reply';

/**
 * Represents a server.
 * @extends {BaseClass}
 */
export class Server extends BaseClass implements IServer {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly ownerId: string;
  public readonly version: string;
  public readonly state: ServerState;
  public readonly motd: string;
  public readonly playerData: {
    readonly playerCount: number;
    readonly online: string[];
    readonly maxPlayers: number;
  };

  public constructor(client: Client, data: ServerReply) {
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
      online: data.players.list?.map(player => player.uuid) ?? [],
      maxPlayers: data.players.max,
    };
  }
}
