import {BaseClass} from './Base';
import {Client} from '../lib';
import {Icon, Player, ServerResponse} from '../typings';

export class Server extends BaseClass {
  public readonly id: string;
  public readonly name: string;
  public readonly icon: Icon;
  public readonly userId: string;
  public readonly version: string;
  public readonly state: number;
  public readonly subscription: {currentPackageId: number};
  public readonly unlockedIcons: Icon[];
  public readonly settings: {lobbyVisible: boolean; startupCommand: number};
  public readonly motd: string;
  public readonly playerData: {playerCount: number; online: Player[]; maxPlayers: number};
  public readonly ftp: {password: string};

  public constructor(client: Client, data: ServerResponse) {
    super(client);

    this.id = data.serverId;
    this.name = data.serverName;
    this.icon = data.serverIcon;
    this.userId = data.userId;
    this.version = data.version;
    this.state = data.state;
    this.subscription = {
      currentPackageId: data.subscription.currentPackageId,
    };
    this.unlockedIcons = data.unlockedIcons;
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
}
