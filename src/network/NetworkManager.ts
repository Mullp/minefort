import {BaseManager} from '../base';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {Article} from './article';
import {ArticleReply} from '../reply';
import {AbstractReply} from '../reply';
import {INetworkManager} from './INetworkManager';

/**
 * Manages API methods for network-related things and structures.
 * @extends {BaseManager}
 */
export class NetworkManager extends BaseManager implements INetworkManager {
  public constructor(client: Client) {
    super(client);
  }

  public async getArticles(): Promise<Article[]> {
    return await fetch(this.client.BASE_URL + '/blog/articles', {
      method: 'GET',
    })
      .then(res => res.json() as Promise<AbstractReply<ArticleReply[]>>)
      .then(this.client.checkResponse)
      .then(value =>
        value.result.map(article => new Article(this.client, article))
      )
      .catch(error => {
        throw error;
      });
  }

  public async getArticle(slug: string): Promise<Article> {
    return await fetch(this.client.BASE_URL + '/blog/articles/' + slug, {
      method: 'GET',
    })
      .then(res => res.json() as Promise<AbstractReply<ArticleReply>>)
      .then(this.client.checkResponse)
      .then(value => new Article(this.client, value.result))
      .catch(error => {
        throw error;
      });
  }
}
