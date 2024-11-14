declare module 'ldapjs' {
  export interface SearchOptions {
    filter: string;
    scope: string;
    attributes?: string[];
  }

  export interface SearchEntry {
    objectName: string;
    attributes: Array<{
      type: string;
      values: string[];
    }>;
  }

  export interface ClientOptions {
    url: string;
    timeout?: number;
    connectTimeout?: number;
    tlsOptions?: {
      rejectUnauthorized?: boolean;
    };
  }

  export class Client {
    constructor(options: ClientOptions);
    bind(dn: string, password: string, callback: (error: Error | null) => void): void;
    unbind(callback: (error: Error | null) => void): void;
    search(base: string, options: SearchOptions, callback: (error: Error | null, res: EventEmitter) => void): void;
  }
}