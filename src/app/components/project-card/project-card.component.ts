import { LightweightRepository } from '@/api/dashboard';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'project-card',
  imports: [],
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input({ required: true })
  public repository!: LightweightRepository;

  public constructor() {}

  public formatDate(date: string) {
    return new Date(date).toLocaleString("ru-ru");
  }
}
