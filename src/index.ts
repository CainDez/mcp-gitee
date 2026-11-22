#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GiteeClient } from './client.js';
import { registerTools } from './register.js';
import { repoTools } from './tools/repos.js';
import { issueTools } from './tools/issues.js';
import { pullTools } from './tools/pulls.js';
import { milestoneTools } from './tools/milestones.js';
import { labelTools } from './tools/labels.js';
import { webhookTools } from './tools/webhooks.js';
import { userTools } from './tools/users.js';
import { orgTools } from './tools/orgs.js';
import { activityTools } from './tools/activity.js';
import { gistTools } from './tools/gists.js';
import { gitTools } from './tools/git.js';
import { searchTools } from './tools/search.js';
import { enterpriseTools } from './tools/enterprises.js';
import { checkTools } from './tools/checks.js';
import { miscTools } from './tools/misc.js';

const token = process.env['GITEE_ACCESS_TOKEN'];
if (!token) {
    process.stderr.write('Error: GITEE_ACCESS_TOKEN environment variable is required\n');
    process.exit(1);
}

const baseUrl = process.env['GITEE_API_URL'] ?? 'https://gitee.com/api/v5';
const client = new GiteeClient(token, baseUrl);

const server = new McpServer({
    name: 'mcp-gitee',
    version: '1.1.0',
});

const allTools = [
    ...repoTools,
    ...issueTools,
    ...pullTools,
    ...milestoneTools,
    ...labelTools,
    ...webhookTools,
    ...userTools,
    ...orgTools,
    ...activityTools,
    ...gistTools,
    ...gitTools,
    ...searchTools,
    ...enterpriseTools,
    ...checkTools,
    ...miscTools,
];

// Blank or unset preserves the default catalog. Once a nonblank selection is
// requested, malformed input cannot fall back to registering the full catalog.
const requested = process.env['GITEE_TOOLS']?.trim();
let tools = allTools;
if (requested) {
    const names = new Set(requested.split(',').map(name => name.trim()).filter(Boolean));
    const known = new Set(allTools.map(tool => tool.name));
    const unknown = [...names].filter(name => !known.has(name));
    tools = allTools.filter(tool => names.has(tool.name));
    if (unknown.length) {
        process.stderr.write(`mcp-gitee: unknown GITEE_TOOLS names: ${unknown.map(name => JSON.stringify(name)).join(', ')}\n`);
    }
    if (tools.length === 0) {
        process.stderr.write('mcp-gitee: GITEE_TOOLS must name at least one available tool. Unset it to use the full catalog.\n');
        process.exit(1);
    }
}

registerTools(server, client, tools);

const subset = requested ? ` (of ${allTools.length}, GITEE_TOOLS)` : '';
process.stderr.write(`mcp-gitee: registered ${tools.length} tools${subset}\n`);

const transport = new StdioServerTransport();
await server.connect(transport);
