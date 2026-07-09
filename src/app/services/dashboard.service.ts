import type { DashboardStats, RepositoriesData } from "@/api/dashboard";

import { Injectable, TransferState } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class DashboardService extends BaseService {
  public constructor(
    transferState: TransferState,
    http: HttpClient
  ) {
    super(transferState, http);
  }

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
}
