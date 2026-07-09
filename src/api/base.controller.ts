import NodeCache from "node-cache";
import { cache as globalCache } from "./cache";

export class BaseContoller {
  public constructor(protected readonly cache: NodeCache = globalCache) {}

  public async handle<T>(fetch: () => Promise<T>, cacheKey?: string) {
    if (cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const data = await fetch();
    if (cacheKey) {
      this.cache.set(cacheKey, data);
    }

    return data;
  }
}
