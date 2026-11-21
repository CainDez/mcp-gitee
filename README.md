# mcp-gitee

Full-featured [Gitee](https://gitee.com) MCP server exposing 200+ Gitee API v5 endpoints as [Model Context Protocol](https://modelcontextprotocol.io) tools.

## Installation

```bash
npm install -g mcp-gitee
```

Or run directly without installing:

```bash
npx mcp-gitee
```

## Requirements

Set the `GITEE_ACCESS_TOKEN` environment variable to your Gitee personal access token.

```bash
export GITEE_ACCESS_TOKEN=your_token_here
```

Optionally override the API base URL (defaults to `https://gitee.com/api/v5`):

```bash
export GITEE_API_URL=https://gitee.com/api/v5
```

## Tool Subset (optional)

By default every Gitee endpoint is exposed — 273 tools, roughly 146 KB of JSON
schema that every request carries. Set `GITEE_TOOLS` to a comma-separated list
of tool names to publish only those:

```bash
export GITEE_TOOLS="gitee_get_repo,gitee_list_repo_issues,gitee_create_issue,gitee_list_pulls"
```

Names that the server does not offer are reported on stderr and skipped; an
empty or unset value keeps the full surface. The startup line says what was
registered: `mcp-gitee: registered 4 tools (of 273, GITEE_TOOLS)`.

## Gitee API Compatibility

Tool coverage is checked against the official Gitee API v5 documentation:

- Swagger UI: https://gitee.com/api/v5/swagger
- Machine-readable spec: https://gitee.com/api/v5/doc_json
- Last checked documentation version: `5.4.92`

## MCP Client Configuration

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gitee": {
      "command": "npx",
      "args": ["mcp-gitee"],
      "env": {
        "GITEE_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Available Tools

Covers all major Gitee API v5 domains:

- **Repositories** - create, update, delete, list, file operations, branches, tags, commits
- **Issues** - create, update, comment, labels, milestones
- **Pull Requests** - create, merge, review, test, labels
- **Users & Organizations** - profile, followers, SSH keys, memberships
- **Enterprises** - members, repos, issues
- **Gists** - create, fork, star, comment
- **Activity** - notifications, starring, watching
- **Search** - repos, users, issues
- **Git Data** - blobs, trees, commits, refs
- **Webhooks**, **Labels**, **Milestones**, **Checks**, and more

## License

MIT
