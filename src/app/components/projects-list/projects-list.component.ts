import { LightweightRepository } from '@/api/dashboard';
import { Component, Input } from '@angular/core';
import { ProjectCard } from '../project-card/project-card.component';

@Component({
  selector: 'projects-list',
  imports: [ProjectCard],
  templateUrl: './projects-list.html',
})
export class ProjectsList {
  @Input({ required: true })
  public repositories!: LightweightRepository[];

  public constructor() {}
}
