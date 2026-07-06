import { SINCE, UNTIL } from './constants';
import { RepositoryStatsFetcher } from './repository-stats.fetcher';

/** Класс для расчёта количества «ленивых» дней (дней без коммитов). */
export class LazyDaysCalculator {
  public constructor(
    private readonly repoStatsFetcher: RepositoryStatsFetcher,
  ) {}

  /**
   * Вычисляет количество дней в указанном промежутке, когда не было ни одного коммита.
   * @returns число ленивых дней
   */
  public async execute(): Promise<number> {
    const activeDays = await this.repoStatsFetcher.fetchAllCommitDates();
    const totalDays = Math.ceil((UNTIL.getTime() - SINCE.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const lazyDays = totalDays - activeDays.size;
    return Math.max(lazyDays, 0);
  }
}
