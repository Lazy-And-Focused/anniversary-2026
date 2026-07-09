import { Router } from 'express';

import { router as dashboardRouter } from './dashboard.routes';
import { router as githubRouter } from './github.routes';

export const router = Router();

router.use(dashboardRouter);
router.use(githubRouter);
