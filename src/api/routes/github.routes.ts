import { Router } from "express";
import { LightweightRepository, RepositoryStatsFetcher } from "../dashboard";
import { GithubContoller } from "../github/github.controller";
import { EXCLUDED_REPOSITORIES } from "../github/constants";

export const router = Router();

const controller = new GithubContoller();
const repositoriesFetcher = new RepositoryStatsFetcher();

router.get("/api/github/repositories", async (_req, res) => {
  const data = await controller.handle(async () => {
    const repositories = await repositoriesFetcher.fetchRepositories();
    const lightweightRepositories = repositories.map(({
      name, full_name, description, archived, homepage, created_at, disabled, updated_at, html_url
    }): LightweightRepository => ({
      disabled, created_at, name, full_name, description, archived, homepage, updated_at, html_url
    })).filter(({ name }) => !EXCLUDED_REPOSITORIES.includes(name));

    return lightweightRepositories.sort((a, b) => {
      if (a.archived && !b.archived) return 1;
      if (!a.archived && b.archived) return -1;

      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  });

  res.json({ data });
})
