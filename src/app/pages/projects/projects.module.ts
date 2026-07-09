import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Projects } from './projects.component';

const routes: Routes = [
  {
    path: 'projects',
    component: Projects,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class DashboardModule {}
