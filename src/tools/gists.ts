import type { ToolDef } from '../types.js';

const page = { description: 'Page number', type: 'number' as const };
const per_page = { description: 'Items per page (max 100)', type: 'number' as const };

export const gistTools: ToolDef[] = [
    {
        name: 'gitee_list_gists',
        description: 'List gists for the authenticated user',
        method: 'GET',
        path: '/gists',
        optional: { since: 'ISO 8601 date', page, per_page },
    },
    {
        name: 'gitee_list_starred_gists',
        description: 'List starred gists',
        method: 'GET',
        path: '/gists/starred',
        optional: { since: 'ISO 8601 date', page, per_page },
    },
    {
        name: 'gitee_get_gist',
        description: 'Get a single gist',
        method: 'GET',
        path: '/gists/{id}',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_create_gist',
        description: 'Create a gist',
        method: 'POST',
        path: '/gists',
        required: {
            files: 'JSON object of files: {"filename.ext":{"content":"file content"}}',
            description: 'Gist description',
        },
        optional: {
            public: { description: 'Public gist', type: 'boolean' },
        },
    },
    {
        name: 'gitee_update_gist',
        description: 'Update a gist',
        method: 'PATCH',
        path: '/gists/{id}',
        required: { id: 'Gist ID' },
        optional: {
            description: 'New description',
            files: 'JSON object of files to update (set content to null to delete)',
        },
    },
    {
        name: 'gitee_delete_gist',
        description: 'Delete a gist',
        method: 'DELETE',
        path: '/gists/{id}',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_get_gist_commits',
        description: 'List commits for a gist',
        method: 'GET',
        path: '/gists/{id}/commits',
        required: { id: 'Gist ID' },
        optional: { page, per_page },
    },
    {
        name: 'gitee_list_gist_forks',
        description: 'List forks of a gist',
        method: 'GET',
        path: '/gists/{id}/forks',
        required: { id: 'Gist ID' },
        optional: { page, per_page },
    },
    {
        name: 'gitee_fork_gist',
        description: 'Fork a gist',
        method: 'POST',
        path: '/gists/{id}/forks',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_check_gist_starred',
        description: 'Check if a gist is starred',
        method: 'GET',
        path: '/gists/{id}/star',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_star_gist',
        description: 'Star a gist',
        method: 'PUT',
        path: '/gists/{id}/star',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_unstar_gist',
        description: 'Unstar a gist',
        method: 'DELETE',
        path: '/gists/{id}/star',
        required: { id: 'Gist ID' },
    },
    {
        name: 'gitee_list_gist_comments',
        description: 'List comments on a gist',
        method: 'GET',
        path: '/gists/{gist_id}/comments',
        required: { gist_id: 'Gist ID' },
        optional: { page, per_page },
    },
    {
        name: 'gitee_get_gist_comment',
        description: 'Get a gist comment',
        method: 'GET',
        path: '/gists/{gist_id}/comments/{id}',
        required: { gist_id: 'Gist ID', id: { description: 'Comment ID', type: 'number' } },
    },
    {
        name: 'gitee_create_gist_comment',
        description: 'Create a gist comment',
        method: 'POST',
        path: '/gists/{gist_id}/comments',
        required: { gist_id: 'Gist ID', body: 'Comment body' },
    },
    {
        name: 'gitee_update_gist_comment',
        description: 'Update a gist comment',
        method: 'PATCH',
        path: '/gists/{gist_id}/comments/{id}',
        required: { gist_id: 'Gist ID', id: { description: 'Comment ID', type: 'number' }, body: 'New comment body' },
    },
    {
        name: 'gitee_delete_gist_comment',
        description: 'Delete a gist comment',
        method: 'DELETE',
        path: '/gists/{gist_id}/comments/{id}',
        required: { gist_id: 'Gist ID', id: { description: 'Comment ID', type: 'number' } },
    },
];
