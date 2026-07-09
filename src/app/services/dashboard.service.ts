import type { DashboardStats, RepositoriesData } from "@/api/dashboard";

import { Injectable, makeStateKey, TransferState } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { from, map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class DashboardService {
  public constructor(
    private readonly transferState: TransferState,
    private readonly http: HttpClient
  ) {}

  public execute() {
    return this.getDashboard();
  }

  public getDashboard() {
    return this.get<DashboardStats>("/api/dashboard");
  }

  public getRepositories() {
    return this.get<RepositoriesData>("/api/dashboard/repositories");
  }

  public getLazyDays() {
    return this.get<number>("/api/dashboard/lazy-days");
  }

  private get<T>(path: string) {
    const key = this.makeStateKey<T>(path);
    const observale = this.getFromState<T>(path);
    if (observale) {
      return observale;
    }

    const json = this.http.get<{ data: T }>(path, { responseType: "json" });
    json.subscribe(({ data }) => {
      this.transferState.set(key, data);
    });

    const data = from(json).pipe(map(({ data }) => data));
    return data;
  }

  private getFromState<T>(path: string) {
    const key = this.makeStateKey<T>(path);
    const state = this.transferState.get<T | null>(key, null);
    if (!state) {
      return null;
    }

    this.transferState.remove(key);
    return of(state);
  }

  private makeStateKey<T>(path: string) {
    return makeStateKey<T>(path);
  }
}
