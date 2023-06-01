import {Article} from '../../../classes';

export interface NetworkManagerInterface {
  /**
   * Gets all articles.
   * @returns A promise that resolves to an array of {@link Article} instances.
   * @throws {Error} - Will throw an error if an internal error occurs.
   * @example
   * // Get all articles.
   * const articles = await client.network.getArticles();
   * console.log(articles);
   */
  getArticles(): Promise<Article[]>;

  /**
   * Gets an article by its slug.
   * @param slug - The slug of the article to get.
   * @returns An {@link Article} instance.
   * @throws {Error} - Will throw an error if no article with the specified slug exists or if an internal error occurs.
   * @example
   * // Get an article by its slug.
   * const article = await client.network.getArticle('article slug');
   * console.log(article);
   */
  getArticle(slug: string): Promise<Article>;
}
