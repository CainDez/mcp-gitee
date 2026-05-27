import type { ToolDef } from '../types.js';

const owner = { description: 'Repository owner' };
const repo = { description: 'Repository path name' };

export const checkTools: ToolDef[] = [
    {
        name: 'gitee_create_check_run',
        description: 'Create a check run',
        method: 'POST',
        path: '/repos/{owner}/{repo}/check-runs',
        required: {
            owner, repo,
            name: 'Check run name',
            head_sha: 'Commit SHA',
        },
        optional: {
            details_url: 'Details URL',
            external_id: 'External ID',
            status: { description: 'queued, in_progress, completed', enum: ['queued', 'in_progress', 'completed'] },
            started_at: 'ISO 8601 start time',
            conclusion: { description: 'success, failure, neutral, cancelled, skipped, timed_out, action_required', enum: ['success', 'failure', 'neutral', 'cancelled', 'skipped', 'timed_out', 'action_required'] },
            completed_at: 'ISO 8601 completion time',
            output_title: 'Output title',
            output_summary: 'Output summary',
            output_text: 'Output text',
        },
    },
    {
        name: 'gitee_get_check_run',
        description: 'Get a check run',
        method: 'GET',
        path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
        required: { owner, repo, check_run_id: { description: 'Check run ID', type: 'number' } },
    },
    {
        name: 'gitee_update_check_run',
        description: 'Update a check run',
        method: 'PATCH',
        path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
        required: { owner, repo, check_run_id: { description: 'Check run ID', type: 'number' }, name: 'Check run name' },
        optional: {
            details_url: 'Details URL',
            status: { description: 'Status: queued, in_progress, completed', enum: ['queued', 'in_progress', 'completed'] },
            conclusion: { description: 'success, failure, neutral, cancelled, skipped, timed_out, action_required', enum: ['success', 'failure', 'neutral', 'cancelled', 'skipped', 'timed_out', 'action_required'] },
            completed_at: 'ISO 8601 completion time',
            output_title: 'Output title',
            output_summary: 'Output summary',
            output_text: 'Output text',
        },
    },
    {
        name: 'gitee_list_check_run_annotations',
        description: 'List annotations for a check run',
        method: 'GET',
        path: '/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations',
        required: { owner, repo, check_run_id: { description: 'Check run ID', type: 'number' } },
    },
    {
        name: 'gitee_list_commit_check_runs',
        description: 'List check runs for a commit',
        method: 'GET',
        path: '/repos/{owner}/{repo}/commits/{ref}/check-runs',
        required: { owner, repo, ref: 'Commit SHA or ref' },
        optional: {
            check_name: 'Filter by check name',
            status: { description: 'Filter by status', enum: ['queued', 'in_progress', 'completed'] },
        },
    },
];
