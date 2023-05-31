import {ArticleAuthor, ArticleTag} from '../../../classes';

export interface ArticleInterface {
  /**
   * The ID of the article
   */
  readonly id: string;
  /**
   * The UUID of the article
   */
  readonly uuid: string;
  /**
   * The title of the article
   */
  readonly title: string;
  /**
   * The slug of the article
   */
  readonly slug: string;
  /**
   * The HTML content of the article
   */
  readonly content: string;
  /**
   * The comment ID of the article
   */
  readonly commentId: string;
  /**
   * The featured image content of the article
   */
  readonly featuredImage: {
    /**
     * The URL of the featured image
     */
    readonly url: string;
    /**
     * The alt text of the featured image
     */
    readonly alt?: string;
    /**
     * The caption of the featured image
     */
    readonly caption?: string;
  };
  /**
   * Whether the article is featured
   */
  readonly featured: boolean;
  /**
   * The visibility of the article
   */
  readonly visibility: string;
  /**
   * The date the article was created
   */
  readonly createdAt: Date;
  /**
   * The date the article was last updated
   */
  readonly updatedAt: Date;
  /**
   * The date the article was published
   */
  readonly publishedAt: Date;
  /**
   * The custom excerpt of the article
   */
  readonly customExcerpt?: string;
  /**
   * The code injection content of the article
   */
  readonly codeInjection: {
    /**
     * The code injection head content of the article
     */
    readonly head?: string;
    /**
     * The code injection foot content of the article
     */
    readonly foot?: string;
  };
  /**
   * The custom template of the article
   */
  readonly customTemplate?: string;
  /**
   * The canonical URL of the article
   */
  readonly canonicalUrl?: string;
  /**
   * The tags of the article
   */
  readonly tags: ArticleTag[];
  /**
   * The authors of the article
   */
  readonly authors: ArticleAuthor[];
  /**
   * The primary author of the article
   */
  readonly primaryAuthor: ArticleAuthor;
  /**
   * The primary tag of the article
   */
  readonly primaryTag: ArticleTag;
  /**
   * The URL of the article
   */
  readonly url: string;
  /**
   * The excerpt of the article
   */
  readonly excerpt: string;
  /**
   * The reading time of the article
   */
  readonly readingTime: number;
  /**
   * Whether the article is accessible
   */
  readonly access: boolean;
  /**
   * Whether comments are enabled on the article
   */
  readonly commentsEnabled: boolean;
  /**
   * The OG content of the article
   */
  readonly ogContent: {
    /**
     * The OG image of the article
     */
    readonly image?: string;
    /**
     * The OG title of the article
     */
    readonly title?: string;
    /**
     * The OG description of the article
     */
    readonly description?: string;
  };
  /**
   * The Twitter content of the article
   */
  readonly twitterContent: {
    /**
     * The Twitter image of the article
     */
    readonly image?: string;
    /**
     * The Twitter title of the article
     */
    readonly title?: string;
    /**
     * The Twitter description of the article
     */
    readonly description?: string;
  };
  /**
   * The meta content of the article
   */
  readonly metaContent: {
    /**
     * The meta title of the article
     */
    readonly title?: string;
    /**
     * The meta description of the article
     */
    readonly description?: string;
  };
  /**
   * The email subject of the article
   */
  readonly emailSubject?: string;
  /**
   * The frontmatter of the article
   */
  readonly frontmatter?: string;
}
