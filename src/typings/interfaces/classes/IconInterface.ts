export interface IconInterface {
  /**
   * The ID of the icon.
   */
  readonly id: string;
  /**
   * The Minecraft item associated with the icon.
   */
  readonly item: string;
  /**
   * The name of the icon.
   */
  readonly name: string;
  /**
   * The image URL of the icon.
   */
  readonly image: string;
  /**
   * The cost of the icon in Minefort credits.
   */
  readonly credits?: number;
}
