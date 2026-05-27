import type { ToolDef } from '../types.js';

const owner = { description: 'Repository owner' };
const repo = { description: 'Repository path name' };
const page = { description: 'Page number', type: 'number' as const };
const per_page = { description: 'Items per page (max 100)', type: 'number' as const };

export const webhookTools: ToolDef[] = [
    {
        name: 'gitee_list_webhooks',
        description: 'List webhooks for a repository',
        method: 'GET',
        path: '/repos/{owner}/{repo}/hooks',
        required: { owner, repo },
        optional: { page, per_page },
    },
    {
        name: 'gitee_get_webhook',
        description: 'Get a webhook',
        method: 'GET',
        path: '/repos/{owner}/{repo}/hooks/{id}',
        required: { owner, repo, id: { description: 'Webhook ID', type: 'number' } },
    },
    {
        name: 'gitee_create_webhook',
        description: 'Create a webhook',
        method: 'POST',
        path: '/repos/{owner}/{repo}/hooks',
        required: { owner, repo, url: 'Payload URL' },
        optional: {
            encryption_type: { description: 'Encryption: 0=password, 1=secret', type: 'number' },
            password: 'Webhook password or secret',
            push_events: { description: 'Trigger on push', type: 'boolean' },
            tag_push_events: { description: 'Trigger on tag push', type: 'boolean' },
            issues_events: { description: 'Trigger on issues', type: 'boolean' },
            note_events: { description: 'Trigger on comments', type: 'boolean' },
            merge_requests_events: { description: 'Trigger on PRs', type: 'boolean' },
        },
    },
    {
        name: 'gitee_update_webhook',
        description: 'Update a webhook',
        method: 'PATCH',
        path: '/repos/{owner}/{repo}/hooks/{id}',
        required: { owner, repo, id: { description: 'Webhook ID', type: 'number' }, url: 'Payload URL' },
        optional: {
            encryption_type: { description: 'Encryption type', type: 'number' },
            password: 'Password or secret',
            push_events: { description: 'Push events', type: 'boolean' },
            tag_push_events: { description: 'Tag push events', type: 'boolean' },
            issues_events: { description: 'Issues events', type: 'boolean' },
            note_events: { description: 'Comment events', type: 'boolean' },
            merge_requests_events: { description: 'PR events', type: 'boolean' },
        },
    },
    {
        name: 'gitee_delete_webhook',
        description: 'Delete a webhook',
        method: 'DELETE',
        path: '/repos/{owner}/{repo}/hooks/{id}',
        required: { owner, repo, id: { description: 'Webhook ID', type: 'number' } },
    },
    {
        name: 'gitee_test_webhook',
        description: 'Test a webhook by sending a test payload',
        method: 'POST',
        path: '/repos/{owner}/{repo}/hooks/{id}/tests',
        required: { owner, repo, id: { description: 'Webhook ID', type: 'number' } },
    },
];
