import {ResponseStatus} from '../../typings';
import {AbstractReply} from '../AbstractReply';

export type PluginsReply =
  | AbstractReply<PluginReply[]>
  | {
      status: ResponseStatus.OK;
      result: PluginReply[];
      pagination: {
        more: boolean;
        total: number;
      };
    };

export type PluginReply = {
  pluginId: string;
  versionId: number;
  name: string;
  description: string;
  icon: string;
  installable: boolean;
};
