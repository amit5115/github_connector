import { getOctokit, owner } from "../github.js";

export async function listPRs(repo: string) {
  const octokit = getOctokit();

  const res = await octokit.pulls.list({
    owner,
    repo,
  });

  return res.data.map((pr: any) => ({
    title: pr.title,
    state: pr.state,
  }));
}