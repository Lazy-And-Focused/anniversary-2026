import type { OrganizationMember } from './types';
import { GitHubApiClient } from './github-api.client';
import { ORGANIZATION } from './constants';

/** Сервис для получения списка участников организации. */
export class TeamFetcher extends GitHubApiClient {
  public constructor() {
    super();
  }

  /** Возвращает список участников организации (публичных). */
  public async execute(): Promise<OrganizationMember[]> {
    const url = `${this.baseUrl}/orgs/${ORGANIZATION}/members?per_page=100`;
    return this.fetch(url);
  }
}
