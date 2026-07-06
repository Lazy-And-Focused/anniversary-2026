import type { DashboardStats } from './dashboard-stats.service';
import { DashboardStatsService } from './dashboard-stats.service';
import { STATS_CACHE_KEY } from './constants';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export class DashboardController {
  public constructor() {}

  public async execute() {
    const cached = cache.get<DashboardStats>(STATS_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const stats = await new DashboardStatsService().execute();
    cache.set(STATS_CACHE_KEY, stats);

    return stats;
  }

  public async handle<T>(fetch: () => Promise<T>, cacheKey?: string) {
    if (cacheKey) {
      const cached = cache.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const data = await fetch();
    if (cacheKey) {
      cache.set(cacheKey, data);
    }

    return data;
  }
}
