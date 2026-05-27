import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GiteeClient } from './client.js';
import type { ToolDef, ParamDef } from './types.js';

function toZod(def: ParamDef | string, optional = false): z.ZodTypeAny {
    const pd = typeof def === 'string' ? { description: def } : def;
    const desc = pd.description;
    let schema: z.ZodTypeAny;

    if (pd.type === 'number') {
        schema = z.number().describe(desc);
    } else if (pd.type === 'boolean') {
        schema = z.boolean().describe(desc);
    } else if (pd.enum) {
        schema = z.enum(pd.enum as [string, ...string[]]).describe(desc);
    } else {
        schema = z.string().describe(desc);
    }

    return optional ? schema.optional() : schema;
}

export function registerTools(server: McpServer, client: GiteeClient, tools: ToolDef[]): void {
    for (const def of tools) {
        const schema: Record<string, z.ZodTypeAny> = {};
        for (const [k, v] of Object.entries(def.required ?? {})) schema[k] = toZod(v);
        for (const [k, v] of Object.entries(def.optional ?? {})) schema[k] = toZod(v, true);

        server.tool(def.name, def.description, schema, async (args: Record<string, unknown>) => {
            try {
                const result = await client.request(def.method, def.path, args);
                return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
            } catch (err: unknown) {
                const e = err as { message?: string; response?: { data?: unknown } };
                const msg = [
                    `Error: ${e.message ?? 'unknown'}`,
                    e.response?.data ? JSON.stringify(e.response.data, null, 2) : '',
                ].filter(Boolean).join('\n');
                return { content: [{ type: 'text' as const, text: msg }], isError: true };
            }
        });
    }
}
