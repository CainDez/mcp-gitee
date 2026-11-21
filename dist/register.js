import { z } from 'zod';
function toZod(def, optional = false) {
    const pd = typeof def === 'string' ? { description: def } : def;
    const desc = pd.description;
    let schema;
    if (pd.type === 'number') {
        schema = z.number().describe(desc);
    }
    else if (pd.type === 'boolean') {
        schema = z.boolean().describe(desc);
    }
    else if (pd.enum) {
        schema = z.enum(pd.enum).describe(desc);
    }
    else {
        schema = z.string().describe(desc);
    }
    return optional ? schema.optional() : schema;
}
export function registerTools(server, client, tools) {
    for (const def of tools) {
        const schema = {};
        for (const [k, v] of Object.entries(def.required ?? {}))
            schema[k] = toZod(v);
        for (const [k, v] of Object.entries(def.optional ?? {}))
            schema[k] = toZod(v, true);
        server.tool(def.name, def.description, schema, async (args) => {
            try {
                const result = await client.request(def.method, def.path, args, def.multipart);
                return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
            }
            catch (err) {
                const e = err;
                const msg = [
                    `Error: ${e.message ?? 'unknown'}`,
                    e.response?.data ? JSON.stringify(e.response.data, null, 2) : '',
                ].filter(Boolean).join('\n');
                return { content: [{ type: 'text', text: msg }], isError: true };
            }
        });
    }
}
