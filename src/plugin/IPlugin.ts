export interface IPlugin {
  /**
   * The plugin's ID.
   */
  readonly id: string;
  /**
   * The plugin's version ID.
   */
  readonly versionId: number;
  /**
   * The plugin's name.
   */
  readonly name: string;
  /**
   * The plugin's description.
   */
  readonly description: string;
  /**
   * The plugin's icon in base64.
   */
  readonly icon: string;
  /**
   * Whether the plugin is installable or not.
   */
  readonly installable: boolean;
}
