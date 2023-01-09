import {BaseClass} from './Base';
import {Client} from '../lib';
import {BaseIcon, IconResponse} from '../typings';

export class Icon extends BaseClass {
  public readonly id: string;
  public readonly item: string;
  public readonly name: string;
  public readonly image: string;
  public readonly credits?: number;

  public constructor(client: Client, data: BaseIcon & Partial<IconResponse>) {
    super(client);

    this.id = data.iconId;
    this.item = data.item;
    this.name = data.name;
    this.image = data.image;

    this.credits = data.credits;
  }
}
