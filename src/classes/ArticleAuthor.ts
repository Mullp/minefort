import {BaseClass} from './Base';
import {Client} from '../client';
import {ArticleAuthorInterface, ArticleAuthorResponse} from '../typings';

/**
 * Represents an {@link ArticleAuthor}
 * @extends {BaseClass}
 */
export class ArticleAuthor extends BaseClass implements ArticleAuthorInterface {
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly profileImage?: string;
  public readonly coverImage?: string;
  public readonly biography?: string;
  public readonly website?: string;
  public readonly location?: string;
  public readonly facebook?: string;
  public readonly twitter?: string;
  public readonly metaContent: {
    readonly title?: string;
    readonly description?: string;
  };
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
