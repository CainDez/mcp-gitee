import axios, { AxiosInstance } from 'axios';

export class GiteeClient {
    private http: AxiosInstance;
    private token: string;

    constructor(token: string, baseUrl = 'https://gitee.com/api/v5') {
        this.token = token;
        this.http = axios.create({ baseURL: baseUrl });
    }

    async request(method: string, pathTemplate: string, args: Record<string, unknown> = {}): Promise<unknown> {
        const pathParams = (pathTemplate.match(/\{(\w+)\}/g) ?? []).map(p => p.slice(1, -1));

        let url = pathTemplate;
        const remaining: Record<string, unknown> = {};

        for (const [k, v] of Object.entries(args)) {
            if (v === undefined || v === null || v === '') continue;
            if (pathParams.includes(k)) {
                url = url.replace(`{${k}}`, encodeURIComponent(String(v)));
            } else {
                remaining[k] = v;
            }
        }

        const isReadOnly = method === 'GET' || method === 'DELETE';

        const config: Record<string, unknown> = { method, url };
        if (isReadOnly) {
            config['params'] = { access_token: this.token, ...remaining };
        } else {
            config['params'] = { access_token: this.token };
            config['data'] = remaining;
            config['headers'] = { 'Content-Type': 'application/json' };
        }

        const response = await this.http.request(config as Parameters<typeof this.http.request>[0]);
        return response.data;
    }
}
