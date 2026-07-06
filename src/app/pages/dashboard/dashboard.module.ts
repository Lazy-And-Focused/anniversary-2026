import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Dashboard } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class DashboardModule {}
