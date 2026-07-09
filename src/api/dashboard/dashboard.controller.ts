import type { DashboardStats } from './dashboard-stats.service';
import { DashboardStatsService } from './dashboard-stats.service';
import { STATS_CACHE_KEY } from './constants';
import { BaseContoller } from '../base.controller';

export class DashboardController extends BaseContoller {
  public constructor() {
    super();
  }

  public async execute() {
    const cached = this.cache.get<DashboardStats>(STATS_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const stats = await new DashboardStatsService().execute();
    this.cache.set(STATS_CACHE_KEY, stats);

    return stats;
  }
}
