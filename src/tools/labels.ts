import type { ToolDef } from '../types.js';

const owner = { description: 'Repository owner' };
const repo = { description: 'Repository path name' };
const page = { description: 'Page number', type: 'number' as const };
const per_page = { description: 'Items per page (max 100)', type: 'number' as const };

export const labelTools: ToolDef[] = [
    {
        name: 'gitee_list_repo_labels',
        description: 'List all labels for a repository',
        method: 'GET',
        path: '/repos/{owner}/{repo}/labels',
        required: { owner, repo },
        optional: { page, per_page },
    },
    {
        name: 'gitee_get_label',
        description: 'Get a single label',
        method: 'GET',
        path: '/repos/{owner}/{repo}/labels/{name}',
        required: { owner, repo, name: 'Label name' },
    },
    {
        name: 'gitee_create_label',
        description: 'Create a label',
        method: 'POST',
        path: '/repos/{owner}/{repo}/labels',
        required: { owner, repo, name: 'Label name', color: 'Hex color (e.g. #ff0000)' },
    },
    {
        name: 'gitee_update_label',
        description: 'Update a label',
        method: 'PATCH',
        path: '/repos/{owner}/{repo}/labels/{original_name}',
        required: { owner, repo, original_name: 'Current label name' },
        optional: { name: 'New name', color: 'New hex color' },
    },
    {
        name: 'gitee_delete_label',
        description: 'Delete a label',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/labels/{name}',
        required: { owner, repo, name: 'Label name' },
    },
    {
        name: 'gitee_list_issue_labels',
        description: 'List labels on an issue',
        method: 'GET',
        path: '/repos/{owner}/{repo}/issues/{number}/labels',
        required: { owner, repo, number: 'Issue number' },
        optional: { page, per_page },
    },
    {
        name: 'gitee_add_issue_labels',
        description: 'Add labels to an issue',
        method: 'POST',
        path: '/repos/{owner}/{repo}/issues/{number}/labels',
        required: { owner, repo, number: 'Issue number', labels: 'JSON array of label names or IDs' },
    },
    {
        name: 'gitee_replace_issue_labels',
        description: 'Replace all labels on an issue',
        method: 'PUT',
        path: '/repos/{owner}/{repo}/issues/{number}/labels',
        required: { owner, repo, number: 'Issue number', labels: 'JSON array of label names or IDs' },
    },
    {
        name: 'gitee_delete_issue_label',
        description: 'Remove a specific label from an issue',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/issues/{number}/labels/{name}',
        required: { owner, repo, number: 'Issue number', name: 'Label name' },
    },
    {
        name: 'gitee_delete_all_issue_labels',
        description: 'Remove all labels from an issue',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/issues/{number}/labels',
        required: { owner, repo, number: 'Issue number' },
    },
    {
        name: 'gitee_list_project_labels',
        description: 'List project-level labels',
        method: 'GET',
        path: '/repos/{owner}/{repo}/project_labels',
        required: { owner, repo },
        optional: { page, per_page },
    },
    {
        name: 'gitee_add_project_labels',
        description: 'Add project-level labels',
        method: 'POST',
        path: '/repos/{owner}/{repo}/project_labels',
        required: { owner, repo, labels: 'JSON array of label names' },
    },
    {
        name: 'gitee_replace_project_labels',
        description: 'Replace project-level labels',
        method: 'PUT',
        path: '/repos/{owner}/{repo}/project_labels',
        required: { owner, repo, labels: 'JSON array of label names' },
    },
    {
        name: 'gitee_delete_project_labels',
        description: 'Delete project-level labels',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/project_labels',
        required: { owner, repo, labels: 'JSON array of label names' },
    },
    {
        name: 'gitee_get_enterprise_labels',
        description: 'List enterprise-level labels',
        method: 'GET',
        path: '/enterprises/{enterprise}/labels',
        required: { enterprise: 'Enterprise path' },
        optional: { page, per_page },
    },
    {
        name: 'gitee_get_enterprise_label',
        description: 'Get a single enterprise label',
        method: 'GET',
        path: '/enterprises/{enterprise}/labels/{name}',
        required: { enterprise: 'Enterprise path', name: 'Label name' },
    },
];
