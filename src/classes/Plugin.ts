import {BaseClass} from './Base';
import {PluginInterface, PluginTypeResponse} from '../typings';
import {Client} from '../client';

/**
 * Represents a plugin.
 * @extends {BaseClass}
 */
export class Plugin extends BaseClass implements PluginInterface {
  public readonly id: string;
  public readonly versionId: number;
  public readonly name: string;
  public readonly description: string;
  public readonly icon: string;
  public readonly installable: boolean;

  public constructor(client: Client, data: PluginTypeResponse) {
    super(client);

    this.id = data.pluginId;
    this.versionId = data.versionId;
    this.name = data.name;
    this.description = data.description;
    this.icon = data.icon;
    this.installable = data.installable;
  }
}
