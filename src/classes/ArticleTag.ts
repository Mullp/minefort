import {BaseClass} from './Base';
import {ArticleTagResponse} from '../typings';
import {Client} from '../client';

/**
 * Represents an {@link ArticleTag}
 * @extends {BaseClass}
 */
export class ArticleTag extends BaseClass {
  /**
   * The ID of the tag
   */
  public readonly id: string;
  /**
   * The name of the tag
   */
  public readonly name: string;
  /**
   * The slug of the tag
   */
  public readonly slug: string;
  /**
   * The description of the tag
   */
  public readonly description?: string;
  /**
   * The feature image of the tag
   */
  public readonly featureImage?: string;
  /**
   * The visibility of the tag
   */
  public readonly visibility: string;
  /**
   * The OG content of the tag
   */
  public readonly ogContent: {
    /**
     * The image of the OG content
     */
    image?: string;
    /**
     * The title of the OG content
     */
    title?: string;
    /**
     * The description of the OG content
     */
    description?: string;
  };
  /**
   * The Twitter content of the tag
   */
  public readonly twitterContent: {
    /**
     * The image of the Twitter content
     */
    image?: string;
    /**
     * The title of the Twitter content
     */
    title?: string;
    /**
     * The description of the Twitter content
     */
    description?: string;
  };
  /**
   * The meta content of the tag
   */
  public readonly metaContent: {
    /**
     * The title of the meta content
     */
    title?: string;
    /**
     * The description of the meta content
     */
    description?: string;
  };
  /**
   * The code injection of the tag
   */
  public readonly codeInjection: {
    /**
     * The head of the code injection
     */
    head?: string;
    /**
     * The foot of the code injection
     */
    foot?: string;
  };
  /**
   * The canonical URL of the tag
   */
  public readonly canonicalUrl?: string;
  /**
   * The accent color of the tag
   */
  public readonly accentColor?: string;
  /**
   * The URL of the tag
   */
  public readonly url: string;

  public constructor(client: Client, data: ArticleTagResponse) {
    super(client);

    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description ?? undefined;
    this.featureImage = data.feature_image ?? undefined;
    this.visibility = data.visibility;
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
    this.codeInjection = {
      head: data.codeinjection_head ?? undefined,
      foot: data.codeinjection_foot ?? undefined,
    };
    this.canonicalUrl = data.canonical_url ?? undefined;
    this.accentColor = data.accent_color ?? undefined;
    this.url = data.url;
  }
}
