import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Quiz } from './quiz.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: Quiz,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class QuizModule {}
