import 'dotenv/config';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { DashboardController, DashboardStatsService } from './api/dashboard';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

const dashboardController = new DashboardController();
const dashboardStatsService = new DashboardStatsService();

app.get('/api/dashboard', async (_req, res) => {
  const data = await dashboardController.execute();
  res.json({ data });
});

app.get('/api/dashboard/repositories', async (_req, res) => {
  const repositoriesData = dashboardController.handle(async () => {
    const repositories = await dashboardStatsService.repositoriesFetcher.fetchRepositories();
    const repositoriesData = await dashboardStatsService.formatRepositoriesData(repositories);
    return repositoriesData;
  }, 'repositories-data');

  res.json({ data: repositoriesData });
});

app.get('/api/dashboard/lazy-days', async (_req, res) => {
  const lazyDays = await dashboardController.handle(
    () => dashboardStatsService.lazyCalculator.execute(),
    'lazy-days',
  );

  res.json({ data: lazyDays });
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
