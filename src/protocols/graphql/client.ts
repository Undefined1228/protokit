import { createClient, Client } from 'graphql-ws';
import WebSocket from 'ws';

export type GqlOperationType = 'query' | 'mutation' | 'subscription';

export type GqlClientEvent =
  | { type: 'data'; data: unknown; timestamp: number }
  | { type: 'error'; message: string; timestamp: number }
  | { type: 'complete'; timestamp: number }
  | { type: 'subscriptionStatus'; active: boolean };

export interface GqlRequestOptions {
  url: string;
  query: string;
  variables?: Record<string, unknown>;
  headers?: Record<string, string>;
  operationType: GqlOperationType;
}

export class GqlClient {
  private wsClient: Client | null = null;
  private unsubscribe: (() => void) | null = null;

  constructor(private readonly onEvent: (event: GqlClientEvent) => void) {}

  async execute(options: GqlRequestOptions): Promise<void> {
    if (options.operationType === 'subscription') {
      this.startSubscription(options);
    } else {
      await this.executeHttp(options);
    }
  }

  private async executeHttp(options: GqlRequestOptions): Promise<void> {
    const { url, query, variables, headers } = options;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(headers ?? {}),
        },
        body: JSON.stringify({ query, variables: variables ?? {} }),
      });
      const data = await res.json();
      this.onEvent({ type: 'data', data, timestamp: Date.now() });
    } catch (err) {
      this.onEvent({ type: 'error', message: String(err), timestamp: Date.now() });
    }
  }

  private startSubscription(options: GqlRequestOptions): void {
    this.stopSubscription();
    const { url, query, variables, headers } = options;

    const wsUrl = url.replace(/^http/, 'ws');

    this.wsClient = createClient({
      url: wsUrl,
      webSocketImpl: WebSocket,
      connectionParams: headers ?? {},
    });

    let active = true;
    this.onEvent({ type: 'subscriptionStatus', active: true });

    const unsub = this.wsClient.subscribe(
      { query, variables: variables ?? {} },
      {
        next: (data) => {
          this.onEvent({ type: 'data', data, timestamp: Date.now() });
        },
        error: (err) => {
          this.onEvent({ type: 'error', message: String(err), timestamp: Date.now() });
          if (active) {
            active = false;
            this.onEvent({ type: 'subscriptionStatus', active: false });
          }
        },
        complete: () => {
          this.onEvent({ type: 'complete', timestamp: Date.now() });
          if (active) {
            active = false;
            this.onEvent({ type: 'subscriptionStatus', active: false });
          }
        },
      },
    );

    this.unsubscribe = () => {
      unsub();
      if (active) {
        active = false;
        this.onEvent({ type: 'subscriptionStatus', active: false });
      }
    };
  }

  stopSubscription(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    if (this.wsClient) {
      this.wsClient.dispose();
      this.wsClient = null;
    }
  }

  async introspect(url: string, headers?: Record<string, string>): Promise<unknown> {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
            fields { name type { name kind ofType { name kind } } }
            inputFields { name type { name kind ofType { name kind } } }
            enumValues { name }
          }
          queryType { name }
          mutationType { name }
          subscriptionType { name }
        }
      }
    `;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(headers ?? {}),
      },
      body: JSON.stringify({ query: introspectionQuery }),
    });
    return res.json();
  }

  dispose(): void {
    this.stopSubscription();
  }
}
