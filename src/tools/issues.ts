import { getOctokit, owner } from "../github.js";

export async function listIssues(repo: string) {
  const octokit = getOctokit();

  const res = await octokit.issues.listForRepo({
    owner,
    repo,
  });

  return res.data.map((i: any) => ({
    title: i.title,
    state: i.state,
  }));
}