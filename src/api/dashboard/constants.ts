const STATS_PERIOD_YEARS = 1;

export const ORGANIZATION = 'Lazy-And-Focused';
export const STATS_CACHE_KEY = 'dashboard-stats';

export const UNTIL = new Date();
export const SINCE = (() => {
  const since = new Date();
  since.setFullYear(UNTIL.getFullYear() - STATS_PERIOD_YEARS);
  return since;
})();

export const UNTIL_ISO = UNTIL.toISOString();
export const SINCE_ISO = SINCE.toISOString();
