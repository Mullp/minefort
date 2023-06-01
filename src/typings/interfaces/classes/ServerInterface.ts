import {ServerState} from '../../ServerTypings';
import {Icon} from '../../../classes';

export interface ServerInterface {
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
  readonly ownerId: string;
  /**
   * The version of the server.
   */
  readonly version: string;
  /**
   * The state of the server.
   */
  readonly state: ServerState;
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
     * A list of UUIDs representing all online players.
     */
    readonly online?: string[];
    /**
     * The max amount of players allowed online at once.
     */
    readonly maxPlayers: number;
  };
}
