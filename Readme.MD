# 🚀 GitHub MCP Server with OAuth (Claude Integration)

A fully functional **Model Context Protocol (MCP) server** that connects **Claude AI** with **GitHub**, enabling natural language DevOps automation like:

* 📦 Listing repositories
* ⚙️ Viewing workflows
* 🚀 Triggering GitHub Actions
* 🐛 Managing issues & PRs

This project uses **OAuth authentication**, making it secure and scalable for real-world usage.

---

# 🧠 What Problem This Solves

Normally, interacting with GitHub requires:

* Manual UI usage
* Writing scripts
* Using CLI tools

👉 With this MCP server, you can simply say:

```
"list all repos"
"trigger pipeline for repo xyz"
```

And Claude will execute it via GitHub API.

---

# 🏗️ Architecture

```
Claude (AI)
    ↓
MCP Server (Node.js)
    ↓
OAuth Server (Express)
    ↓
GitHub API
```

---

# ⚙️ Tech Stack

* Node.js + TypeScript
* MCP SDK
* GitHub REST API (@octokit/rest)
* Express (OAuth server)
* OAuth 2.0 (GitHub)
* Claude Desktop MCP integration

---

# 🔐 Authentication Flow (OAuth)

1. User runs command in Claude:

   ```
   connect github
   ```

2. MCP provides login link:

   ```
   http://localhost:3000/login
   ```

3. User logs into GitHub

4. GitHub redirects to:

   ```
   /callback
   ```

5. Access token is generated and saved locally:

   ```
   token.json
   ```

6. MCP server reads token and authenticates API calls

---

# 📁 Project Structure

```
github_connector/
│
├── src/
│   ├── index.ts            # MCP server entry
│   ├── github.ts           # Octokit + token handling
│   ├── oauth.ts            # OAuth server
│   ├── tools/
│   │   ├── repos.ts
│   │   ├── workflows.ts
│   │   ├── issues.ts
│   │   ├── pullRequests.ts
│   │   └── code.ts
│
├── dist/                   # Compiled JS
├── token.json              # Stored OAuth token
├── .env                    # Secrets
├── package.json
├── tsconfig.json
```

---

# 🔧 Setup Instructions

## 1️⃣ Clone Repo

```
git clone <your-repo-url>
cd github_connector
```

---

## 2️⃣ Install Dependencies

```
npm install
```

---

## 3️⃣ Setup Environment Variables

Create `.env` file:

```
CLIENT_ID=your_github_client_id
CLIENT_SECRET=your_github_client_secret
GITHUB_OWNER=your_github_username
```

---

## 4️⃣ Register GitHub OAuth App

Go to:

👉 https://github.com/settings/developers

Create new OAuth App:

* Homepage URL:

```
http://localhost:3000
```

* Callback URL:

```
http://localhost:3000/callback
```

---

## 5️⃣ Build Project

```
npm run build
```

---

## 6️⃣ Start Servers

### Start OAuth server:

```
node dist/oauth.js
```

### Start MCP server:

```
node dist/index.js
```

---

## 7️⃣ Connect in Claude

In Claude:

```
connect github
```

Then open:

```
http://localhost:3000/login
```

Login and authorize.

---

# ✅ Available Commands (Claude)

### 📦 Repositories

```
list all repos
```

### ⚙️ Workflows

```
list workflows for repo github_connector
```

### 🚀 Trigger Pipeline

```
trigger workflow Test Pipeline for repo github_connector
```

### 🐛 Issues

```
list issues for repo github_connector
```

### 🔀 Pull Requests

```
list pull requests for repo github_connector
```

---

# 🔑 Token Handling

* Token is stored locally in:

```
token.json
```

* MCP reads token dynamically using:

```ts
getOctokit()
```

---

# 🧠 Key Design Decisions

### ✅ getOctokit() instead of static client

* Always reads latest token
* Supports multi-user in future
* Avoids stale auth issues

### ✅ OAuth over Personal Access Token

* More secure
* Better user experience
* Scalable for SaaS

---

# ⚠️ Security Notes

* Do NOT commit:

```
.env
token.json
```

Add to `.gitignore`:

```
.env
token.json
dist/
```

---

# 🚀 Future Enhancements

* Multi-user OAuth (store tokens per user)
* Database integration (Redis / MongoDB)
* UI dashboard
* Deployment (AWS / Azure)
* Role-based access control
* CI/CD automation via AI

---

# 🎯 Use Cases

* DevOps automation
* GitHub workflow management
* AI-powered engineering assistant
* Infrastructure orchestration

---

# 💡 Example

```
User: trigger pipeline for repo github_connector
Claude: ✅ Pipeline triggered successfully 🚀
```

---

# 🙌 Author

**Amit**
Cloud AI / DevOps Engineer

---

# ⭐ If you like this project

Give it a star ⭐ and share it!

---
