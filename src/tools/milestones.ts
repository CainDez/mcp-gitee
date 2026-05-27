import type { ToolDef } from '../types.js';

const owner = { description: 'Repository owner' };
const repo = { description: 'Repository path name' };
const page = { description: 'Page number', type: 'number' as const };
const per_page = { description: 'Items per page (max 100)', type: 'number' as const };

export const milestoneTools: ToolDef[] = [
    {
        name: 'gitee_list_milestones',
        description: 'List repository milestones',
        method: 'GET',
        path: '/repos/{owner}/{repo}/milestones',
        required: { owner, repo },
        optional: {
            state: { description: 'open, closed, all', enum: ['open', 'closed', 'all'] },
            sort: { description: 'Sort: due_on or completeness', enum: ['due_on', 'completeness'] },
            direction: { description: 'asc or desc', enum: ['asc', 'desc'] },
            page, per_page,
        },
    },
    {
        name: 'gitee_get_milestone',
        description: 'Get a single milestone',
        method: 'GET',
        path: '/repos/{owner}/{repo}/milestones/{number}',
        required: { owner, repo, number: { description: 'Milestone number', type: 'number' } },
    },
    {
        name: 'gitee_create_milestone',
        description: 'Create a milestone',
        method: 'POST',
        path: '/repos/{owner}/{repo}/milestones',
        required: { owner, repo, title: 'Milestone title', due_on: 'Due date (YYYY-MM-DDTHH:MM:SS+HH:MM)' },
        optional: {
            state: { description: 'open or closed', enum: ['open', 'closed'] },
            description: 'Milestone description',
        },
    },
    {
        name: 'gitee_update_milestone',
        description: 'Update a milestone',
        method: 'PATCH',
        path: '/repos/{owner}/{repo}/milestones/{number}',
        required: { owner, repo, number: { description: 'Milestone number', type: 'number' } },
        optional: {
            title: 'New title',
            state: { description: 'open or closed', enum: ['open', 'closed'] },
            description: 'New description',
            due_on: 'New due date (YYYY-MM-DDTHH:MM:SS+HH:MM)',
        },
    },
    {
        name: 'gitee_delete_milestone',
        description: 'Delete a milestone',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/milestones/{number}',
        required: { owner, repo, number: { description: 'Milestone number', type: 'number' } },
    },
];
