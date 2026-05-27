import type { ToolDef } from '../types.js';

const page = { description: 'Page number', type: 'number' as const };
const per_page = { description: 'Items per page (max 100)', type: 'number' as const };

export const searchTools: ToolDef[] = [
    {
        name: 'gitee_search_repos',
        description: 'Search repositories',
        method: 'GET',
        path: '/search/repositories',
        required: { q: 'Search query' },
        optional: {
            sort: { description: 'Sort: stars, forks, updated', enum: ['stars', 'forks', 'updated'] },
            order: { description: 'asc or desc', enum: ['asc', 'desc'] },
            page, per_page,
        },
    },
    {
        name: 'gitee_search_issues',
        description: 'Search issues across repositories',
        method: 'GET',
        path: '/search/issues',
        required: { q: 'Search query' },
        optional: {
            sort: { description: 'Sort: comments, created, updated', enum: ['comments', 'created', 'updated'] },
            order: { description: 'asc or desc', enum: ['asc', 'desc'] },
            page, per_page,
        },
    },
    {
        name: 'gitee_search_users',
        description: 'Search users',
        method: 'GET',
        path: '/search/users',
        required: { q: 'Search query' },
        optional: {
            sort: { description: 'Sort: followers, repositories, joined', enum: ['followers', 'repositories', 'joined'] },
            order: { description: 'asc or desc', enum: ['asc', 'desc'] },
            page, per_page,
        },
    },
];
