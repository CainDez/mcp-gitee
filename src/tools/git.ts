import type { ToolDef } from '../types.js';

const owner = { description: 'Repository owner' };
const repo = { description: 'Repository path name' };

export const gitTools: ToolDef[] = [
    {
        name: 'gitee_get_blob',
        description: 'Get a file blob by SHA',
        method: 'GET',
        path: '/repos/{owner}/{repo}/git/blobs/{sha}',
        required: { owner, repo, sha: 'Blob SHA' },
    },
    {
        name: 'gitee_get_tree',
        description: 'Get a git tree by SHA',
        method: 'GET',
        path: '/repos/{owner}/{repo}/git/trees/{sha}',
        required: { owner, repo, sha: 'Tree SHA' },
        optional: { recursive: { description: 'Recursive tree listing', type: 'number' } },
    },
    {
        name: 'gitee_get_gitee_metrics',
        description: 'Get Gitee-specific repository metrics',
        method: 'GET',
        path: '/repos/{owner}/{repo}/git/gitee_metrics',
        required: { owner, repo },
    },
];
