export abstract class WorldChessBase {
  protected token: string | null = null;
  protected baseUrl = 'https://api.worldchess.com/api';

  constructor(token?: string) {
    if (token) {
      this.token = token;
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}/${endpoint}`;

    // Ensure trailing slash if the endpoint was provided with one
    // Some endpoints specifically fail with a trailing slash
    if (!url.includes('?') && !url.endsWith('/') && endpoint.endsWith('/')) {
      url += '/';
    }

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ...(options.headers as Record<string, string>),
    };

    // Only send Authorization header for /me/ endpoints
    const isMeEndpoint = endpoint === 'me/' || endpoint.startsWith('me/');
    if (this.token && isMeEndpoint) {
      headers['Authorization'] = `JWT ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`,
      );
    }

    return response.json() as Promise<T>;
  }
}
