import { Router } from 'express';
import { DashboardController, DashboardStatsService } from '../dashboard';

export const router = Router();

const dashboardController = new DashboardController();
const dashboardStatsService = new DashboardStatsService();

router.get('/api/dashboard', async (_req, res) => {
  const data = await dashboardController.execute();
  res.json({ data });
});

router.get('/api/dashboard/repositories', async (_req, res) => {
  const repositoriesData = dashboardController.handle(async () => {
    const repositories = await dashboardStatsService.repositoriesFetcher.fetchRepositories();
    const repositoriesData = await dashboardStatsService.formatRepositoriesData(repositories);
    return repositoriesData;
  }, 'repositories-data');

  res.json({ data: repositoriesData });
});

router.get('/api/dashboard/lazy-days', async (_req, res) => {
  const lazyDays = await dashboardController.handle(
    () => dashboardStatsService.lazyCalculator.execute(),
    'lazy-days',
  );

  res.json({ data: lazyDays });
});
