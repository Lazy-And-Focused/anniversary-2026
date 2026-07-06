const STATS_PERIOD_YEARS = 1;

export const ORGANIZATION = "Lazy-And-Focused";
export const STATS_CACHE_KEY = 'dashboard-stats';

export const UNTIL = new Date();
export const SINCE = new Date(
  UNTIL.getFullYear() - STATS_PERIOD_YEARS,
);

export const UNTIL_ISO = UNTIL.toISOString();
export const SINCE_ISO = SINCE.toISOString();
