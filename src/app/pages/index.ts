import type { Routes } from '@angular/router';

import { HomeRoute } from './home';
import { ProjectsRoute } from './projects';
import { QuizRoute } from './quiz';

export const PagesRoutes: Routes = [HomeRoute, ProjectsRoute, QuizRoute];
