import { getOctokit, owner } from "../github.js";
export async function getRepoContent(repo, path = "") {
    const octokit = getOctokit();
    const res = await octokit.repos.getContent({
        owner,
        repo,
        path,
    });
    return res.data;
}
