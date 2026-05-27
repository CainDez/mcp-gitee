export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ParamDef {
  description: string;
  type?: 'string' | 'number' | 'boolean';
  enum?: string[];
}

export interface ToolDef {
  name: string;
  description: string;
  method: HttpMethod;
  path: string;
  required?: Record<string, ParamDef | string>;
  optional?: Record<string, ParamDef | string>;
}
