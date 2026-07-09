import { RepositoryStatsFetcher } from './repository-stats.fetcher';
import { TeamFetcher } from './team.fetcher';
import { LazyDaysCalculator } from './lazy-days.calculator';
import { ORGANIZATION, SINCE_ISO, UNTIL_ISO } from './constants';
import { RepositorySummary } from './types';

/** Интерфейс итоговой статистики дашборда. */
export interface DashboardStats {
  organization: string;
  period: { from: string; to: string };
  commits: number;
  pullRequests: number;
  issues: number;
  stars: number;
  forks: number;
  repositories: number;
  teamMembers: number;
  coffeeCups: number;
  lazyDays: number;
  topTag: string;
}

/** Фасад для сбора всей статистики и формирования ответа. */
export class DashboardStatsService {
  public readonly teamFetcher: TeamFetcher;
  public readonly lazyCalculator: LazyDaysCalculator;
  public readonly repositoriesFetcher: RepositoryStatsFetcher;

  public constructor() {
    this.repositoriesFetcher = new RepositoryStatsFetcher();
    this.teamFetcher = new TeamFetcher();
    this.lazyCalculator = new LazyDaysCalculator();
  }

  /**
   * Собирает статистику по всем репозиториям и участникам за указанный период.
   * @returns объект DashboardStats
   */
  public async execute(): Promise<DashboardStats> {
    const [repositories, teamMembers] = await Promise.all([
      this.repositoriesFetcher.fetchRepositories(),
      this.teamFetcher.execute(),
    ]);

    const lazyDays = await this.lazyCalculator.execute();
    const repositoriesData = await this.formatRepositoriesData(repositories);

    return {
      ...repositoriesData,
      organization: ORGANIZATION,
      period: {
        from: SINCE_ISO.split('T')[0],
        to: UNTIL_ISO.split('T')[0],
      },
      teamMembers: teamMembers.length,
      lazyDays,
      topTag: '#дедлайн_горит',
    };
  }

  public async formatRepositoriesData(repositories: RepositorySummary[]) {
    let pullRequests = 0;
    let commits = 0;
    let issues = 0;
    let stars = 0;
    let forks = 0;

    for (const repository of repositories) {
      try {
        const [fetchedCommits, fetchedPullRequests, fetchedIssues] = await Promise.all([
          this.repositoriesFetcher.countCommits(repository.name),
          this.repositoriesFetcher.countPullRequests(repository.name),
          this.repositoriesFetcher.countIssues(repository.name),
        ]);

        commits += fetchedCommits;
        pullRequests += fetchedPullRequests;
        issues += fetchedIssues;
        stars += repository.stargazers_count || 0;
        forks += repository.forks_count || 0;
      } catch (error) {
        console.error(`Failed to fetch stats for repo ${repository.name}:`, error);
      }
    }

    return {
      repositories: repositories.length,
      coffeeCups: commits * 0.15,
      pullRequests,
      commits,
      issues,
      stars,
      forks,
    };
  }
}
