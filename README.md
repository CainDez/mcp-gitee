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
