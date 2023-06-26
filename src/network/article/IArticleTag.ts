export interface IArticleTag {
  /**
   * The ID of the tag
   */
  readonly id: string;
  /**
   * The name of the tag
   */
  readonly name: string;
  /**
   * The slug of the tag
   */
  readonly slug: string;
  /**
   * The description of the tag
   */
  readonly description?: string;
  /**
   * The feature image of the tag
   */
  readonly featureImage?: string;
  /**
   * The visibility of the tag
   */
  readonly visibility: string;
  /**
   * The OG content of the tag
   */
  readonly ogContent: {
    /**
     * The image of the OG content
     */
    readonly image?: string;
    /**
     * The title of the OG content
     */
    readonly title?: string;
    /**
     * The description of the OG content
     */
    readonly description?: string;
  };
  /**
   * The Twitter content of the tag
   */
  readonly twitterContent: {
    /**
     * The image of the Twitter content
     */
    readonly image?: string;
    /**
     * The title of the Twitter content
     */
    readonly title?: string;
    /**
     * The description of the Twitter content
     */
    readonly description?: string;
  };
  /**
   * The meta content of the tag
   */
  readonly metaContent: {
    /**
     * The title of the meta content
     */
    readonly title?: string;
    /**
     * The description of the meta content
     */
    readonly description?: string;
  };
  /**
   * The code injection of the tag
   */
  readonly codeInjection: {
    /**
     * The head of the code injection
     */
    readonly head?: string;
    /**
     * The foot of the code injection
     */
    readonly foot?: string;
  };
  /**
   * The canonical URL of the tag
   */
  readonly canonicalUrl?: string;
  /**
   * The accent color of the tag
   */
  readonly accentColor?: string;
  /**
   * The URL of the tag
   */
  readonly url: string;
}
