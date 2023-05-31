import {BaseClass} from './Base';
import {ArticleTagInterface, ArticleTagResponse} from '../typings';
import {Client} from '../client';

/**
 * Represents an {@link ArticleTag}
 * @extends {BaseClass}
 */
export class ArticleTag extends BaseClass implements ArticleTagInterface {
  public readonly id: string;
  public readonly name: string;
  public readonly slug: string;
  public readonly description?: string;
  public readonly featureImage?: string;
  public readonly visibility: string;
  public readonly ogContent: {
    readonly image?: string;
    readonly title?: string;
    readonly description?: string;
  };
  public readonly twitterContent: {
    readonly image?: string;
    readonly title?: string;
    readonly description?: string;
  };
  public readonly metaContent: {
    readonly title?: string;
    readonly description?: string;
  };
  public readonly codeInjection: {
    readonly head?: string;
    readonly foot?: string;
  };
  public readonly canonicalUrl?: string;
  public readonly accentColor?: string;
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
