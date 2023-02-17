import {BaseClass} from './Base';
import {Client} from '../client';
import {ServerState, ServerResponse} from '../typings';
import {Icon} from './Icon';

/**
 * Represents a server of a user.
 * @extends {BaseClass}
 */
export class Server extends BaseClass {
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
  public readonly ownerId: string;
  /**
   * The version of the server.
   */
  public readonly version: string;
  /**
   * The state of the server.
   */
  public readonly state: ServerState;
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
     * A list of uuids representing all online players.
     */
    online?: string[];
    /**
     * The max amount of players allowed online at once.
     */
    maxPlayers: number;
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
