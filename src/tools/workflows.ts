// import { octokit, owner } from "../github.js";

// export async function listWorkflows(repo: string) {
//   const res = await octokit.actions.listRepoWorkflows({
//     owner,
//     repo,
//   });

//   return res.data.workflows;
// }

// export async function triggerWorkflow(
//   repo: string,
//   workflow_id: string,
//   ref: string = "main"
// ) {
//   await octokit.actions.createWorkflowDispatch({
//     owner,
//     repo,
//     workflow_id,
//     ref,
//   });

//   return { message: "Workflow triggered successfully 🚀" };
// }


import { getOctokit, owner } from "../github.js";

export async function listWorkflows(repo: string) {
  const octokit = getOctokit();

  const res = await octokit.actions.listRepoWorkflows({
    owner,
    repo,
  });

  return res.data.workflows.map((w: any) => ({
    id: w.id,
    name: w.name,
  }));
}

export async function triggerWorkflow(
  repo: string,
  workflow_id: number
) {
  const octokit = getOctokit();

  await octokit.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id,
    ref: "main",
  });

  return "🚀 Workflow triggered";
}