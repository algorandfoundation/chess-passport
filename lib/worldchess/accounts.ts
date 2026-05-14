import { WorldChessBase } from './base';
import type { LoginResponse } from './types';

export class WorldChessAccounts extends WorldChessBase {
  async login(email: string, password: string): Promise<LoginResponse> {
    const data = await this.request<LoginResponse>('accounts/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.token = data.access_token;
    return data;
  }
}
