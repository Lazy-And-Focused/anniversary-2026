import { LightweightRepository } from '@/api/dashboard';
import { GithubService } from '@/app/services/github.service';
import { Component, inject, signal } from '@angular/core';
import { SINCE, UNTIL } from '@/api/dashboard/constants';
import { ProjectsList } from "@/app/components/projects-list/projects-list.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsList],
  styleUrl: '../../styles/base-host.style.css',
  templateUrl: './projects.html',
})
export class Projects {
  private readonly service = inject(GithubService);

  public readonly sorted = signal<Record<"created"|"updated", LightweightRepository[]>>({
    created: [],
    updated: []
  })

  public constructor() {}

  public ngOnInit() {
    this.service.getRepositories().subscribe((repositories) => {
      this.sorted.set({
        created: this.filterByDate(repositories, "created_at"),
        updated: this.filterByDate(repositories, "updated_at")
      });
    });
  }

  private filterByDate(repositories: LightweightRepository[], selector: "created_at"|"updated_at") {
    return repositories.filter((repository) => {
      const time = new Date(repository[selector]).getTime();
      return SINCE.getTime() < time && time < UNTIL.getTime();
    });
  }
}
