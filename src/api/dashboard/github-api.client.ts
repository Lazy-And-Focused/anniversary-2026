import 'dotenv/config';

/**
 * Базовый клиент для работы с GitHub API.
 * Содержит общие методы для формирования запросов и обработки заголовков.
 */
export abstract class GitHubApiClient {
  protected readonly apiVersion = '2022-11-28';
  protected readonly baseUrl = 'https://api.github.com';

  /**
   * Формирует заголовки для запросов к GitHub API.
   * @throws {Error} Если переменная GITHUB_TOKEN не установлена.
   */
  protected getHeaders(): HeadersInit {
    const token = process.env['GITHUB_TOKEN'];
    if (!token) {
      throw new Error('GITHUB_TOKEN not set in environment');
    }

    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': this.apiVersion,
    };
  }

  /**
   * Выполняет GET-запрос к GitHub API и возвращает результат.
   * @param url - полный URL запроса.
   * @throws {Error} Если ответ не OK.
   */
  protected async fetch<T>(url: string): Promise<T> {
    const response = await fetch(url, { headers: this.getHeaders() });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  }

  /**
   * Извлекает общее количество элементов из заголовка Link.
   * Используется для пагинации.
   */
  protected extractTotalCountFromLinkHeader(linkHeader: string | null): number {
    if (!linkHeader) {
      return 0;
    }

    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
    if (!match) {
      return 0;
    }

    return parseInt(match[1], 10);
  }
}
