import {BaseClass} from '../../base';
import {Client} from '../../client';
import {ArticleAuthor} from './ArticleAuthor';
import {ArticleTag} from './ArticleTag';
import {IArticle} from './IArticle';
import {ArticleReply} from '../../reply';

/**
 * Represents an {@link Article}
 * @extends {BaseClass}
 */
export class Article extends BaseClass implements IArticle {
  public readonly id: string;
  public readonly uuid: string;
  public readonly title: string;
  public readonly slug: string;
  public readonly content: string;
  public readonly commentId: string;
  public readonly featuredImage: {
    readonly url: string;
    readonly alt?: string;
    readonly caption?: string;
  };
  public readonly featured: boolean;
  public readonly visibility: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly publishedAt: Date;
  public readonly customExcerpt?: string;
  public readonly codeInjection: {
    readonly head?: string;
    readonly foot?: string;
  };
  public readonly customTemplate?: string;
  public readonly canonicalUrl?: string;
  public readonly authors: ArticleAuthor[];
  public readonly tags: ArticleTag[];
  public readonly primaryAuthor: ArticleAuthor;
  public readonly primaryTag: ArticleTag;
  public readonly url: string;
  public readonly excerpt: string;
  public readonly readingTime: number;
  public readonly access: boolean;
  public readonly commentsEnabled: boolean;
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
  public readonly emailSubject?: string;
  public readonly frontmatter?: string;

  public constructor(client: Client, data: ArticleReply) {
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
