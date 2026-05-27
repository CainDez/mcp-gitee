# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build      # Compile TypeScript → dist/
npm run dev        # Watch mode (tsc --watch)
npm start          # Run compiled server (node dist/index.js)
```

No test framework is configured. Type-check only via `npm run build`.

## Environment

The server requires `GITEE_ACCESS_TOKEN` at runtime. Optional: `GITEE_API_URL` (defaults to `https://gitee.com/api/v5`).

## Architecture

This is a **Model Context Protocol (MCP) server** that exposes Gitee API v5 as MCP tools, communicating over stdio.

### Core flow

`index.ts` → instantiates `GiteeClient` and `McpServer`, collects all `ToolDef[]` arrays from `src/tools/`, calls `registerTools()`, then connects via `StdioServerTransport`.

### Key abstractions

- **`ToolDef`** (`src/types.ts`): a plain-data descriptor — `name`, `description`, `method`, `path`, and `required`/`optional` param maps. No logic, just metadata.
- **`GiteeClient`** (`src/client.ts`): thin axios wrapper. `request(method, pathTemplate, args)` resolves `{param}` placeholders from args into the URL, puts remaining args into query params (GET/DELETE) or request body (POST/PUT/PATCH).
- **`registerTools`** (`src/register.ts`): iterates `ToolDef[]`, converts each `ParamDef` to a Zod schema, and registers an MCP tool handler that calls `client.request()`.

### Adding a new tool

1. Add a `ToolDef` entry to the appropriate file in `src/tools/`.
2. If it's a new domain, create `src/tools/<domain>.ts`, export a `ToolDef[]`, import and spread it in `src/index.ts`.
3. `required` params become mandatory Zod fields; `optional` params become `.optional()`. Path params (e.g. `{owner}`) are extracted from `path` automatically.

### Tool file conventions

Each `src/tools/*.ts` exports one named array (e.g. `repoTools`, `issueTools`). Common param shapes (`owner`, `repo`, `page`, `per_page`) are defined as local constants at the top of each file and reused across tool entries.
