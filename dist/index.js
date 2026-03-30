// import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import {
//   ListToolsRequestSchema,
//   CallToolRequestSchema,
// } from "@modelcontextprotocol/sdk/types.js";
// import { listRepos } from "./tools/repos.js";
// import { listWorkflows, triggerWorkflow } from "./tools/workflows.js";
// import { listIssues } from "./tools/issues.js";
// import { listPRs } from "./tools/pullRequests.js";
// const server = new Server(
//   {
//     name: "github-mcp",
//     version: "1.0.0",
//   },
//   {
//     capabilities: {
//       tools: {},
//     },
//   }
// );
// // ✅ LIST ALL TOOLS
// server.setRequestHandler(ListToolsRequestSchema, async () => {
//   return {
//     tools: [
//       {
//         name: "list_repos",
//         description: "List all GitHub repositories",
//         inputSchema: {
//           type: "object",
//           properties: {},
//         },
//       },
//       {
//         name: "list_workflows",
//         description: "List workflows of a repo",
//         inputSchema: {
//           type: "object",
//           properties: {
//             repo: { type: "string" },
//           },
//           required: ["repo"],
//         },
//       },
//       {
//         name: "trigger_pipeline",
//         description: "Trigger GitHub Actions workflow",
//         inputSchema: {
//           type: "object",
//           properties: {
//             repo: { type: "string" },
//             workflow_id: { type: "number" },
//             branch: { type: "string" },
//           },
//           required: ["repo", "workflow_id"],
//         },
//       },
//       {
//         name: "list_issues",
//         description: "List issues of a repo",
//         inputSchema: {
//           type: "object",
//           properties: {
//             repo: { type: "string" },
//           },
//           required: ["repo"],
//         },
//       },
//       {
//         name: "list_prs",
//         description: "List pull requests",
//         inputSchema: {
//           type: "object",
//           properties: {
//             repo: { type: "string" },
//           },
//           required: ["repo"],
//         },
//       },
//     ],
//   };
// });
// // ✅ HANDLE TOOL CALLS
// server.setRequestHandler(CallToolRequestSchema, async (request) => {
//     const { name, arguments: args } = request.params as {
//       name: string;
//       arguments: any;
//     };
//     try {
//       if (name === "list_repos") {
//         const data = await listRepos();
//         return {
//           content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
//         };
//       }
//       if (name === "list_workflows") {
//         const data = await listWorkflows(args.repo);
//         return {
//           content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
//         };
//       }
//       if (name === "trigger_pipeline") {
//         const data = await triggerWorkflow(
//           args.repo,
//           args.workflow_id,
//           args.branch || "main"
//         );
//         return {
//           content: [{ type: "text", text: JSON.stringify(data) }],
//         };
//       }
//       if (name === "list_issues") {
//         const data = await listIssues(args.repo);
//         return {
//           content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
//         };
//       }
//       if (name === "list_prs") {
//         const data = await listPRs(args.repo);
//         return {
//           content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
//         };
//       }
//       return {
//         content: [{ type: "text", text: "Unknown tool" }],
//       };
//     } catch (err: any) {
//       return {
//         content: [{ type: "text", text: "Error: " + err.message }],
//       };
//     }
//   });
// // ✅ START SERVER
// async function main() {
//   console.log("🚀 Starting MCP server...");
//   const transport = new StdioServerTransport();
//   await server.connect(transport);
//   console.log("✅ MCP running...");
// }
// main();
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import { listRepos } from "./tools/repos.js";
import { listWorkflows, triggerWorkflow } from "./tools/workflows.js";
// ❌ IMPORTANT: OAuth import hata do yahan se
// import { startOAuthServer } from "./oauth.js";
const server = new Server({ name: "github-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });
// 🧰 LIST TOOLS
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "connect_github",
                description: "Connect GitHub account",
                inputSchema: { type: "object", properties: {} },
            },
            {
                name: "list_repos",
                description: "List repos",
                inputSchema: { type: "object", properties: {} },
            },
            {
                name: "list_workflows",
                description: "List workflows",
                inputSchema: {
                    type: "object",
                    properties: {
                        repo: { type: "string" },
                    },
                    required: ["repo"],
                },
            },
            {
                name: "trigger_workflow",
                description: "Trigger workflow",
                inputSchema: {
                    type: "object",
                    properties: {
                        repo: { type: "string" },
                        workflow_id: { type: "number" },
                    },
                    required: ["repo", "workflow_id"],
                },
            },
        ],
    };
});
// ⚡ TOOL CALL
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        if (name === "connect_github") {
            return {
                content: [
                    {
                        type: "text",
                        text: "👉 Open this link in browser:\nhttp://localhost:3000/login",
                    },
                ],
            };
        }
        if (name === "list_repos") {
            const data = await listRepos();
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
        if (name === "list_workflows") {
            const data = await listWorkflows(args.repo);
            return { content: [{ type: "text", text: JSON.stringify(data) }] };
        }
        if (name === "trigger_workflow") {
            const data = await triggerWorkflow(args.repo, args.workflow_id);
            return { content: [{ type: "text", text: data }] };
        }
        return { content: [{ type: "text", text: "Unknown tool" }] };
    }
    catch (err) {
        return {
            content: [{ type: "text", text: "❌ " + err.message }],
        };
    }
});
// 🚀 START MCP (STDIO MODE ONLY)
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main();
