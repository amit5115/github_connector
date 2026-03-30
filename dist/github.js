// import { Octokit } from "@octokit/rest";
// export const octokit = new Octokit({
//   auth: process.env.GITHUB_TOKEN,
// });
// export const owner = process.env.GITHUB_OWNER || "amit5115";
import { Octokit } from "@octokit/rest";
import fs from "fs";
const TOKEN_FILE = "./token.json";
export const owner = "amit5115";
// ✅ dynamic getter
export function getOctokit() {
    let token = "";
    if (fs.existsSync(TOKEN_FILE)) {
        const data = JSON.parse(fs.readFileSync(TOKEN_FILE, "utf-8"));
        token = data.token;
    }
    return new Octokit({
        auth: token,
    });
}
