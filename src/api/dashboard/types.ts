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

// ========== Вложенные типы ==========

/** Владелец репозитория (пользователь или организация) */
export interface RepositoryOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User' | 'Organization';
  site_admin: boolean;
}

/** Права доступа текущего пользователя к репозиторию */
export interface RepositoryPermissions {
  admin: boolean;
  push: boolean;
  pull: boolean;
}

/** Настройки безопасности и анализа кода */
export interface RepositorySecurityAndAnalysis {
  advanced_security?: {
    status: 'enabled' | 'disabled';
  };
  secret_scanning?: {
    status: 'enabled' | 'disabled';
  };
  secret_scanning_push_protection?: {
    status: 'enabled' | 'disabled';
  };
  secret_scanning_non_provider_patterns?: {
    status: 'enabled' | 'disabled';
  };
  secret_scanning_delegated_alert_dismissal?: {
    status: 'enabled' | 'disabled';
  };
}

// ========== Основной интерфейс репозитория ==========

/** Полный объект репозитория, возвращаемый GitHub REST API */
export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: RepositoryOwner;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  has_discussions: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: 'public' | 'private' | 'internal';
  pushed_at: string; // ISO 8601 дата
  created_at: string;
  updated_at: string;
  permissions?: RepositoryPermissions; // опционально, может отсутствовать
  security_and_analysis?: RepositorySecurityAndAnalysis; // опционально
}

export type LightweightRepository = Pick<Repository, "disabled"|"created_at"|"updated_at"|"name"|"full_name"|"description"|"archived"|"homepage"|"html_url">;

/**
 * Минимальный набор полей, который вы используете для статистики.
 * Можно оставить как есть, либо использовать Pick из Repository.
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
