import {BaseClass} from './Base';
import {Client} from '../client';
import {ArticleAuthorResponse} from '../typings';

/**
 * Represents an {@link ArticleAuthor}
 * @extends {BaseClass}
 */
export class ArticleAuthor extends BaseClass {
  /**
   * The ID of the author
   */
  public readonly id: string;
  /**
   * The name of the author
   */
  public readonly name: string;
  /**
   * The slug of the author
   */
  public readonly slug: string;
  /**
   * The profile image of the author
   */
  public readonly profileImage?: string;
  /**
   * The cover image of the author
   */
  public readonly coverImage?: string;
  /**
   * The biography of the author
   */
  public readonly biography?: string;
  /**
   * The website of the author
   */
  public readonly website?: string;
  /**
   * The location of the author
   */
  public readonly location?: string;
  /**
   * The Facebook of the author
   */
  public readonly facebook?: string;
  /**
   * The Twitter of the author
   */
  public readonly twitter?: string;
  /**
   * The meta content of the author
   */
  public readonly metaContent: {
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
  public readonly url: string;

  public constructor(client: Client, data: ArticleAuthorResponse) {
    super(client);

    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.profileImage = data.profile_image ?? undefined;
    this.coverImage = data.cover_image ?? undefined;
    this.biography = data.bio ?? undefined;
    this.website = data.website ?? undefined;
    this.location = data.location ?? undefined;
    this.facebook = data.facebook ?? undefined;
    this.twitter = data.twitter ?? undefined;
    this.metaContent = {
      title: data.meta_title ?? undefined,
      description: data.meta_description ?? undefined,
    };
    this.url = data.url;
  }
}
