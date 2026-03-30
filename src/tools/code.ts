import { getOctokit, owner } from "../github.js";

export async function getRepoContent(repo: string, path: string = "") {
  const octokit = getOctokit();

  const res = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });

  return res.data;
}