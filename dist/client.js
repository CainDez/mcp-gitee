import axios from 'axios';
import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
export class GiteeClient {
    http;
    token;
    constructor(token, baseUrl = 'https://gitee.com/api/v5') {
        this.token = token;
        this.http = axios.create({ baseURL: baseUrl });
    }
    async request(method, pathTemplate, args = {}, multipart = false) {
        let url = pathTemplate;
        const remaining = {};
        const consumedPathParams = new Set();
        url = url.replace(/\(\/\{(\w+)\}\)/g, (_segment, key) => {
            const value = args[key];
            if (value === undefined || value === null || value === '')
                return '';
            consumedPathParams.add(key);
            return `/${encodeURIComponent(String(value))}`;
        });
        const pathParams = (url.match(/\{(\w+)\}/g) ?? []).map(p => p.slice(1, -1));
        for (const [k, v] of Object.entries(args)) {
            if (v === undefined || v === null || v === '')
                continue;
            if (consumedPathParams.has(k)) {
                continue;
            }
            else if (pathParams.includes(k)) {
                url = url.replace(`{${k}}`, encodeURIComponent(String(v)));
            }
            else {
                remaining[k] = v;
            }
        }
        const isReadOnly = method === 'GET' || method === 'DELETE';
        const saveAs = typeof remaining['save_as'] === 'string' ? remaining['save_as'] : undefined;
        delete remaining['save_as'];
        const config = { method, url };
        if (isReadOnly) {
            config['params'] = { access_token: this.token, ...remaining };
            if (method === 'GET' && saveAs) {
                config['responseType'] = 'arraybuffer';
            }
        }
        else {
            config['params'] = { access_token: this.token };
            if (multipart) {
                const form = new FormData();
                for (const [k, v] of Object.entries(remaining)) {
                    if (k === 'file' && typeof v === 'string') {
                        const bytes = await readFile(v);
                        form.append(k, new Blob([new Uint8Array(bytes)]), basename(v));
                    }
                    else {
                        form.append(k, String(v));
                    }
                }
                config['data'] = form;
            }
            else {
                config['data'] = remaining;
                config['headers'] = { 'Content-Type': 'application/json' };
            }
        }
        const response = await this.http.request(config);
        if (method === 'GET' && saveAs) {
            await writeFile(saveAs, Buffer.from(response.data));
            return { saved_to: saveAs };
        }
        return response.data;
    }
}
