import {BaseManager} from './BaseManager';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {ResponseStatus} from '../typings';
import {ArticlesResponse} from '../typings/responses/NetworkResponse';
import {Article} from '../classes/Article';

/**
 * Manages API methods for network-related things and structures.
 * @extends {BaseManager}
 */
export class NetworkManager extends BaseManager {
  public constructor(client: Client) {
    super(client);
  }

  /**
   * Gets all articles.
   * @returns A promise that resolves to an array of {@link Article} instances.
   * @throws {Error} - Will throw an error if an internal error occurs.
   * @example
   * // Get all articles.
   * const articles = await client.networkManager.getArticles();
   * console.log(articles);
   */
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

  /**
   * Gets an article by its ID.
   * @param articleId - The ID of the article to get.
   * @returns An {@link Article} instance or `null` if no article was found.
   * @throws {Error} - Will throw an error if an internal error occurs.
   * @example
   * // Get an article by its ID.
   * const article = await client.networkManager.getArticle('article ID');
   * console.log(article);
   */
  public async getArticle(articleId: string): Promise<Article | null> {
    return await this.getArticles()
      .then(articles => {
        return articles.find(article => article.id === articleId) ?? null;
      })
      .catch(error => {
        throw error;
      });
  }
}
