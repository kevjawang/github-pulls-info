import axios from "axios";
import { IPullRequest } from "../types/GithubPulls";

const repoRegex =
  /https:\/\/(www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/;
const pullAPIRegex =
  /https:\/\/api.github\.com\/repos\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/pulls\/[0-9]+/;

export const getPulls = (url: string) => {
  const match = repoRegex.exec(url);
  if (match === null) {
    throw Error;
  }
  const owner = match[match.length - 1];
  const repo = match[match.length - 2];
  return axios.get<IPullRequest[]>(
    `https://api.github.com"/repos/${owner}/${repo}/pulls`
  );
};

export const getPull = (url: string) => {
  if (!pullAPIRegex.test(url)) {
    throw Error;
  }
  return axios.get<IPullRequest>(url);
};
