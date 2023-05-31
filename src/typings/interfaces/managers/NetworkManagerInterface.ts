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
   * Gets an article by its ID.
   * @param articleId - The ID of the article to get.
   * @returns An {@link Article} instance or `null` if no article was found.
   * @throws {Error} - Will throw an error if an internal error occurs.
   * @example
   * // Get an article by its ID.
   * const article = await client.network.getArticle('article ID');
   * console.log(article);
   */
  getArticle(articleId: string): Promise<Article | null>;
}
