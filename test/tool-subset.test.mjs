import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const entry = process.env.MCP_GITEE_TEST_ENTRY
    ? resolve(process.env.MCP_GITEE_TEST_ENTRY)
    : fileURLToPath(new URL('../dist/index.js', import.meta.url));
const mockToken = 'offline-test-token';
const expectedSubset = [
    'gitee_create_issue',
    'gitee_get_repo',
    'gitee_list_pulls',
    'gitee_list_repo_issues',
];
const offlineBaseUrl = 'http://127.0.0.1:1/api/v5';

function serverEnv(selected, baseUrl) {
    return {
        GITEE_ACCESS_TOKEN: mockToken,
        GITEE_API_URL: baseUrl,
        GITEE_TOOLS: selected ?? '',
        NO_PROXY: '127.0.0.1',
    };
}

async function connect(t, selected, baseUrl = offlineBaseUrl) {
    const env = serverEnv(selected, baseUrl);
    if (selected === undefined) delete env.GITEE_TOOLS;
    const transport = new StdioClientTransport({
        command: process.execPath,
        args: [entry],
        env,
        stderr: 'pipe',
    });
    let stderr = '';
    transport.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk; });
    const client = new Client({ name: 'mcp-gitee-offline-test', version: '1.0.0' });
    t.after(() => client.close());
    await client.connect(transport, { timeout: 5_000 });
    return { client, stderr: () => stderr };
}

test('unset, empty and whitespace-only settings advertise the same full catalog', { timeout: 15_000 }, async t => {
    const lists = [];
    for (const selected of [undefined, '', '  \t']) {
        const { client } = await connect(t, selected);
        assert.ok(client.getServerCapabilities()?.tools);
        lists.push((await client.listTools()).tools.map(tool => tool.name));
    }
    assert.equal(lists[0].length, 273);
    assert.equal(new Set(lists[0]).size, 273);
    assert.ok(expectedSubset.every(name => lists[0].includes(name)));
    assert.ok(lists[0].includes('gitee_delete_repo'));
    assert.deepEqual(lists[1], lists[0]);
    assert.deepEqual(lists[2], lists[0]);
});

test('stdio exposes and dispatches only the named tools', { timeout: 10_000 }, async t => {
    const calls = [];
    const mock = createServer((req, res) => {
        const url = new URL(req.url, 'http://localhost');
        calls.push([req.method, url.pathname, url.searchParams.get('access_token')]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ name: 'fixture', ok: true }));
    });
    mock.listen(0, '127.0.0.1');
    t.after(() => new Promise((done, fail) => mock.close(error => error ? fail(error) : done())));
    await once(mock, 'listening');
    const { client } = await connect(t, expectedSubset.join(','), `http://127.0.0.1:${mock.address().port}/api/v5`);
    assert.ok(client.getServerCapabilities()?.tools);
    assert.deepEqual((await client.listTools()).tools.map(tool => tool.name).sort(), expectedSubset);
    const args = { owner: 'fixture-org', repo: 'fixture-repo' };
    const refused = await client.callTool({ name: 'gitee_delete_repo', arguments: args });
    assert.equal(refused.isError, true);
    assert.match(refused.content[0].text, /not found/i);
    assert.deepEqual(calls, []);
    const result = await client.callTool({ name: 'gitee_get_repo', arguments: args });
    assert.notEqual(result.isError, true);
    assert.deepEqual(JSON.parse(result.content[0].text), { name: 'fixture', ok: true });
    assert.deepEqual(calls, [['GET', '/api/v5/repos/fixture-org/fixture-repo', mockToken]]);
});

test('trims, deduplicates, and warns about unknown and case-mismatched names', { timeout: 10_000 }, async t => {
    const { client, stderr } = await connect(
        t,
        '  gitee_get_repo, gitee_get_repo , GITEE_GET_REPO,does_not_exist, , ',
    );
    assert.deepEqual((await client.listTools()).tools.map(tool => tool.name), ['gitee_get_repo']);
    // The stderr stream is independent of stdout. Allow the event loop to receive it.
    const deadline = Date.now() + 2_000;
    while (!stderr().includes('does_not_exist') && Date.now() < deadline) {
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    assert.match(stderr(), /unknown GITEE_TOOLS names: "GITEE_GET_REPO", "does_not_exist"/);
});

test('nonblank settings resolving to no tools fail without a protocol connection', { timeout: 15_000 }, async () => {
    for (const selected of ['does_not_exist', ' , , ']) {
        const child = spawn(process.execPath, [entry], {
            env: serverEnv(selected, offlineBaseUrl),
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: 5_000,
        });
        let stdout = '';
        let stderr = '';
        child.stdout.setEncoding('utf8').on('data', chunk => { stdout += chunk; });
        child.stderr.setEncoding('utf8').on('data', chunk => { stderr += chunk; });
        const [code, signal] = await once(child, 'close');
        assert.equal(signal, null);
        assert.equal(code, 1);
        assert.equal(stdout, '');
        assert.match(stderr, /GITEE_TOOLS must name at least one available tool/);
        assert.doesNotMatch(stderr, /registered \d+ tools/);
    }
});
