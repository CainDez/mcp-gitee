import type { ToolDef } from '../types.js';

export const miscTools: ToolDef[] = [
    {
        name: 'gitee_list_emojis',
        description: 'List all available emojis',
        method: 'GET',
        path: '/emojis',
    },
    {
        name: 'gitee_list_gitignore_templates',
        description: 'List available .gitignore templates',
        method: 'GET',
        path: '/gitignore/templates',
    },
    {
        name: 'gitee_get_gitignore_template',
        description: 'Get a .gitignore template',
        method: 'GET',
        path: '/gitignore/templates/{name}',
        required: { name: 'Template name (e.g. Go, Python, Node)' },
    },
    {
        name: 'gitee_get_gitignore_template_raw',
        description: 'Get the raw content of a .gitignore template',
        method: 'GET',
        path: '/gitignore/templates/{name}/raw',
        required: { name: 'Template name' },
    },
    {
        name: 'gitee_list_licenses',
        description: 'List available open source licenses',
        method: 'GET',
        path: '/licenses',
    },
    {
        name: 'gitee_get_license',
        description: 'Get a license',
        method: 'GET',
        path: '/licenses/{license}',
        required: { license: 'License key (e.g. mit, apache-2.0)' },
    },
    {
        name: 'gitee_get_license_raw',
        description: 'Get the raw license text',
        method: 'GET',
        path: '/licenses/{license}/raw',
        required: { license: 'License key' },
    },
    {
        name: 'gitee_render_markdown',
        description: 'Render a markdown string as HTML',
        method: 'POST',
        path: '/markdown',
        required: { text: 'Markdown text to render' },
        optional: {
            mode: { description: 'markdown or gfm', enum: ['markdown', 'gfm'] },
            context: 'Repository context for GFM mode (owner/repo)',
        },
    },
];
