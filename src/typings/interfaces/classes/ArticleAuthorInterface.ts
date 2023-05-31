export interface ArticleAuthorInterface {
  /**
   * The ID of the author
   */
  readonly id: string;
  /**
   * The name of the author
   */
  readonly name: string;
  /**
   * The slug of the author
   */
  readonly slug: string;
  /**
   * The profile image of the author
   */
  readonly profileImage?: string;
  /**
   * The cover image of the author
   */
  readonly coverImage?: string;
  /**
   * The biography of the author
   */
  readonly biography?: string;
  /**
   * The website of the author
   */
  readonly website?: string;
  /**
   * The location of the author
   */
  readonly location?: string;
  /**
   * The Facebook of the author
   */
  readonly facebook?: string;
  /**
   * The Twitter of the author
   */
  readonly twitter?: string;
  /**
   * The meta content of the author
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
   * The URL of the author
   */
  readonly url: string;
}
