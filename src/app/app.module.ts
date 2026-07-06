import { useLayout } from '@/utils/use-layout';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutes } from './pages';
import { Layouts } from './layouts';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  useLayout({
    layout: Layouts.DefaultLayout,
    routes: PagesRoutes,
  }),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppModule {}
