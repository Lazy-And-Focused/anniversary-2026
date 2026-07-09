/**
 * Представляет участника организации, возвращаемого эндпоинтом:
 * `GET /orgs/{org}/members`
 *
 * @see {@link https://docs.github.com/en/rest/orgs/members#list-organization-members}
 */
export type OrganizationMember = {
  login: string;
  /** Уникальный идентификатор пользователя */
  id: number;
  /** URL аватара пользователя */
  avatar_url: string;
  /** ID Gravatar (может быть пустой строкой) */
  gravatar_id: string;
  /** API URL пользователя */
  url: string;
  /** URL профиля на GitHub */
  html_url: string;
  /** API URL для подписчиков */
  followers_url: string;
  /** API URL для подписок */
  following_url: string;
  /** API URL для Gist'ов */
  gists_url: string;
  /** API URL для звёзд */
  starred_url: string;
  /** API URL для подписок на уведомления */
  subscriptions_url: string;
  /** API URL для организаций пользователя */
  organizations_url: string;
  /** API URL для репозиториев пользователя */
  repos_url: string;
  /** API URL для событий */
  events_url: string;
  /** API URL для полученных событий */
  received_events_url: string;
  /** Тип аккаунта (например, "User" или "Organization") */
  type: string;
  /** Является ли пользователь администратором сайта */
  site_admin: boolean;
};

/**
 * Сокращённая информация о репозитории для статистики.
 */
export interface RepositorySummary {
  name: string;
  stargazers_count: number;
  forks_count: number;
}

export type RepositoriesData = {
  repositories: number;
  coffeeCups: number;
  pullRequests: number;
  commits: number;
  issues: number;
  stars: number;
  forks: number;
}
