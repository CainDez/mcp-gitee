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

## Tool subset (optional)

Set `GITEE_TOOLS` to a comma-separated list of exact, case-sensitive tool names
to register only those tools in this MCP server:

```bash
export GITEE_TOOLS="gitee_get_repo,gitee_list_repo_issues,gitee_list_pulls"
```

If your MCP client launches the server, set the same key in the client's
server environment (`env` in the Claude Desktop example below).

- Unset, empty, or whitespace-only: register the full catalog.
- Surrounding whitespace and duplicate names are ignored. Unknown names are
  reported on stderr; recognized names still register.
- A nonblank setting with no recognized names (including just commas) is a
  startup error; it does not fall back to the full catalog.

Advertising fewer tools can reduce the tool definitions sent by a client.
This setting does not change the permissions of your Gitee access token.

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
