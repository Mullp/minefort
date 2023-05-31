import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {
  NetworkManagerInterface,
  ResponseStatus,
  ArticlesResponse,
  ArticleResponse,
} from '../typings';
import {Article} from '../classes';

/**
 * Manages API methods for network-related things and structures.
 * @extends {BaseManager}
 */
export class NetworkManager
  extends BaseManager
  implements NetworkManagerInterface
{
  public constructor(client: Client) {
    super(client);
  }

  public async getArticles(): Promise<Article[]> {
    return await fetch(this.client.BASE_URL + '/blog/articles', {
      method: 'GET',
    })
      .then(res => res.json() as Promise<ArticlesResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result.map(article => new Article(this.client, article));
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('An internal error has occurred');
        }

        return [];
      })
      .catch(error => {
        throw error;
      });
  }

  public async getArticle(slug: string): Promise<Article> {
    return await fetch(this.client.BASE_URL + '/blog/articles/' + slug, {
      method: 'GET',
    })
      .then(res => res.json() as Promise<ArticleResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return new Article(this.client, value.result);
        } else if (value.status === ResponseStatus.ENDPOINT_NOT_FOUND) {
          throw new Error('Article not found');
        }

        throw new Error('Unknown error');
      })
      .catch(error => {
        throw error;
      });
  }
}
