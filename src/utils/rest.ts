import axios from "axios";
import { IPullRequest } from "../types/GithubPull";
import { repoRegex, pullAPIRegex } from "./regex";

export const getPulls = (url: string, page: number) => {
  const match = repoRegex.exec(url);
  if (match === null) {
    throw Error;
  }
  const owner = match[match.length - 2];
  const repo = match[match.length - 1];
  return axios.get<IPullRequest[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls`,
    {
      params: {
        page: page,
      },
    }
  );
};

export const getPull = (url: string) => {
  if (!pullAPIRegex.test(url)) {
    throw new Error("");
  }
  return axios.get<IPullRequest>(url);
};
