import { HttpClient } from "@angular/common/http";
import { Injectable, TransferState } from "@angular/core";
import { BaseService } from "./base.service";
import { LightweightRepository } from "@/api/dashboard";

@Injectable({ providedIn: "root" })
export class GithubService extends BaseService {
  public constructor(
    transferState: TransferState,
    http: HttpClient
  ) {
    super(transferState, http);
  }

  public getRepositories() {
    return this.get<LightweightRepository[]>("/api/github/repositories");
  }
}
