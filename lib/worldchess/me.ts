import { WorldChessBase } from './base';
import type { PlayerProfile, UserRatings, TitleProgress, StrikeInfo } from './types';

export class WorldChessMe extends WorldChessBase {
  async getMe(): Promise<PlayerProfile> {
    return this.request<PlayerProfile>('me/');
  }

  async getUserRatings(): Promise<UserRatings> {
    return this.request<UserRatings>('me/ratings/');
  }

  async getTitleProgress(): Promise<TitleProgress> {
    return this.request<TitleProgress>('me/title-progress/');
  }

  async getStrikeInfo(): Promise<StrikeInfo> {
    return this.request<StrikeInfo>('me/strike-info/');
  }
}
