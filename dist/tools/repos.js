// import { octokit } from "../github.js";
// export async function listRepos() {
//   const res = await octokit.repos.listForAuthenticatedUser();
//   return res.data.map((repo) => ({
//     name: repo.name,
//     private: repo.private,
//   }));
// }
import { getOctokit } from "../github.js";
import fs from "fs";
const TOKEN_FILE = "./token.json";
export async function listRepos() {
    // ❌ if token missing
    if (!fs.existsSync(TOKEN_FILE)) {
        return {
            content: [
                {
                    type: "text",
                    text: "❌ Please connect GitHub first: http://localhost:3000/login",
                },
            ],
        };
    }
    const octokit = getOctokit();
    const res = await octokit.repos.listForAuthenticatedUser();
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(res.data.map(r => r.name), null, 2),
            },
        ],
    };
}
