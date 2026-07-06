import type { RepositorySummary } from './types';
import { GitHubApiClient } from './github-api.client';
import { ORGANIZATION, SINCE_ISO, UNTIL_ISO } from './constants';

/** Сервис для получения статистики по репозиториям организации. */
export class RepositoryStatsFetcher extends GitHubApiClient {
  private readonly headers: HeadersInit;

  public constructor() {
    super();

    this.headers = this.getHeaders();
  }

  /** Возвращает список репозиториев с количеством звёзд и форков. */
  public async fetchRepositories(): Promise<RepositorySummary[]> {
    const url = `${this.baseUrl}/orgs/${ORGANIZATION}/repos?per_page=100`;
    return this.fetch(url);
  }

  /** Подсчитывает количество коммитов в репозитории за указанный период. */
  public async countCommits(repositoryName: string): Promise<number> {
    const url = `${this.baseUrl}/repos/${ORGANIZATION}/${repositoryName}/commits?since=${SINCE_ISO}&per_page=1`;
    const response = await fetch(url, { headers: this.headers });
    const linkHeader = response.headers.get('link');

    return this.extractTotalCountFromLinkHeader(linkHeader);
  }

  /** Подсчитывает количество Pull Request'ов в репозитории за период. */
  public async countPullRequests(repositoryName: string): Promise<number> {
    const url = `${this.baseUrl}/repos/${ORGANIZATION}/${repositoryName}/pulls?state=all&per_page=1&since=${SINCE_ISO}`;
    const response = await fetch(url, { headers: this.headers });
    const linkHeader = response.headers.get('link');

    return this.extractTotalCountFromLinkHeader(linkHeader);
  }

  /** Подсчитывает количество Issues в репозитории за период. */
  public async countIssues(repositoryName: string): Promise<number> {
    const url = `${this.baseUrl}/repos/${ORGANIZATION}/${repositoryName}/issues?state=all&per_page=1&since=${SINCE_ISO}`;
    const response = await fetch(url, { headers: this.headers });
    const linkHeader = response.headers.get('link');

    return this.extractTotalCountFromLinkHeader(linkHeader);
  }

  /**
   * Собирает все уникальные даты (YYYY-MM-DD), в которые были коммиты
   * во всех репозиториях организации за указанный период.
   */
  public async fetchAllCommitDates(): Promise<Set<string>> {
    const repositories = await this.fetchRepositories();
    const dates = new Set<string>();

    for (const repository of repositories) {
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const url =
          `${this.baseUrl}/repos/${ORGANIZATION}/${repository.name}/commits` +
          `?since=${SINCE_ISO}&until=${UNTIL_ISO}&per_page=100&page=${page}`;

        const response = await fetch(url, { headers: this.headers });
        if (!response.ok) {
          console.warn(`Skipping ${repository.name}: ${response.status}`);
          break;
        }

        const commits = await response.json() as { commit: { committer: { date: string } } }[];
        if (commits.length === 0) {
          break;
        }

        for (const commit of commits) {
          const datePart = commit.commit.committer.date.split('T')[0];
          dates.add(datePart);
        }

        const linkHeader = response.headers.get('link');
        hasMore = Boolean(linkHeader && linkHeader.includes('rel="next"'));

        if (hasMore) {
          page++;
        }
      }
    }

    return dates;
  }
}
