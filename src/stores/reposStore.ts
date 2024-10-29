import { makeAutoObservable } from "mobx";
import { Repo } from "../schemas/getRepoSchema";
import { getRepos as fetchRepos } from "../API/getRepos";
import { ZodError } from "zod";

class ReposStore {
  repos: Repo[] = [];

  totalCount = 0;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getRepos = async (query: string, page: number, perPage: number) => {
    try {
      this.isLoading = true;

      const { items, total_count } = await fetchRepos(query, page, perPage);

      this.repos = [...this.repos, ...items];

      this.totalCount = total_count;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(
          `An error while parsing the response occured: ${error.message}`
        );
      } else {
        console.log(error);
      }
    } finally {
      this.isLoading = false;
    }
  };
}

const repoStore = new ReposStore();

export { repoStore };
