import {BaseClass} from './Base';
import {Client} from '../client';
import {ArticleResponse} from '../typings';
import {ArticleAuthor} from './ArticleAuthor';
import {ArticleTag} from './ArticleTag';

/**
 * Represents an {@link Article}
 * @extends {BaseClass}
 */
export class Article extends BaseClass {
  /**
   * The ID of the article
   */
  public readonly id: string;
  /**
   * The UUID of the article
   */
  public readonly uuid: string;
  /**
   * The title of the article
   */
  public readonly title: string;
  /**
   * The slug of the article
   */
  public readonly slug: string;
  /**
   * The HTML content of the article
   */
  public readonly content: string;
  /**
   * The comment ID of the article
   */
  public readonly commentId: string;
  /**
   * The featured image content of the article
   */
  public readonly featuredImage: {
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
  public readonly featured: boolean;
  /**
   * The visibility of the article
   */
  public readonly visibility: string;
  /**
   * The date the article was created
   */
  public readonly createdAt: Date;
  /**
   * The date the article was last updated
   */
  public readonly updatedAt: Date;
  /**
   * The date the article was published
   */
  public readonly publishedAt: Date;
  /**
   * The custom excerpt of the article
   */
  public readonly customExcerpt?: string;
  /**
   * The code injection content of the article
   */
  public readonly codeInjection: {
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
  public readonly customTemplate?: string;
  /**
   * The canonical URL of the article
   */
  public readonly canonicalUrl?: string;
  /**
   * The authors of the article
   */
  public readonly authors: ArticleAuthor[];
  /**
   * The tags of the article
   */
  public readonly tags: ArticleTag[];
  /**
   * The primary author of the article
   */
  public readonly primaryAuthor: ArticleAuthor;
  /**
   * The primary tag of the article
   */
  public readonly primaryTag: ArticleTag;
  /**
   * The URL of the article
   */
  public readonly url: string;
  /**
   * The excerpt of the article
   */
  public readonly excerpt: string;
  /**
   * The reading time of the article
   */
  public readonly readingTime: number;
  /**
   * Whether the article is accessible
   */
  public readonly access: boolean;
  /**
   * Whether comments are enabled on the article
   */
  public readonly commentsEnabled: boolean;
  /**
   * The OG content of the article
   */
  public readonly ogContent: {
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
  public readonly twitterContent: {
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
  public readonly metaContent: {
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
  public readonly emailSubject?: string;
  /**
   * The frontmatter of the article
   */
  public readonly frontmatter?: string;

  public constructor(client: Client, data: ArticleResponse) {
    super(client);

    this.id = data.id;
    this.uuid = data.uuid;
    this.title = data.title;
    this.slug = data.slug;
    this.content = data.html;
    this.commentId = data.comment_id;
    this.featuredImage = {
      url: data.feature_image,
      alt: data.feature_image_alt ?? undefined,
      caption: data.feature_image_caption ?? undefined,
    };
    this.featured = data.featured;
    this.visibility = data.visibility;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.publishedAt = new Date(data.published_at);
    this.customExcerpt = data.custom_excerpt ?? undefined;
    this.codeInjection = {
      head: data.codeinjection_head ?? undefined,
      foot: data.codeinjection_foot ?? undefined,
    };
    this.customTemplate = data.custom_template ?? undefined;
    this.canonicalUrl = data.canonical_url ?? undefined;
    this.authors = data.authors.map(
      author => new ArticleAuthor(client, author)
    );
    this.tags = data.tags.map(tag => new ArticleTag(client, tag));
    this.primaryAuthor = new ArticleAuthor(client, data.primary_author);
    this.primaryTag = new ArticleTag(client, data.primary_tag);
    this.url = data.url;
    this.excerpt = data.excerpt;
    this.readingTime = data.reading_time;
    this.access = data.access;
    this.commentsEnabled = data.comments;
    this.ogContent = {
      image: data.og_image ?? undefined,
      title: data.og_title ?? undefined,
      description: data.og_description ?? undefined,
    };
    this.twitterContent = {
      image: data.twitter_image ?? undefined,
      title: data.twitter_title ?? undefined,
      description: data.twitter_description ?? undefined,
    };
    this.metaContent = {
      title: data.meta_title ?? undefined,
      description: data.meta_description ?? undefined,
    };
    this.emailSubject = data.email_subject ?? undefined;
    this.frontmatter = data.frontmatter ?? undefined;
  }
}
