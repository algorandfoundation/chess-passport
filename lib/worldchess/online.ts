import { WorldChessBase } from './base';
import type { GameStats, LeaderboardResponse, PlayerOnlineStatus, PlayerProfile } from './types';

export class WorldChessOnline extends WorldChessBase {
  async getPlayerStats(
    playerId: number,
    ratingType: 'worldchess' | 'fide' | 'otb' = 'worldchess',
  ): Promise<GameStats> {
    return this.request<GameStats>(`online/players/${playerId}/stats?rating_type=${ratingType}`);
  }

  async getPlayerProfile(playerId: number): Promise<PlayerProfile> {
    return this.request<PlayerProfile>(`online/players/${playerId}/profile/`);
  }

  async getGameHistory(playerId: number, limit = 20, offset = 0): Promise<any> {
    return this.request(`online/players/${playerId}/game-history/?limit=${limit}&offset=${offset}`);
  }

  async getChallenges(): Promise<any> {
    return this.request('online/challenges/');
  }

  async getOnlineLeaderboard(
    ratingType: 'worldchess' | 'fide' = 'worldchess',
    limit = 10,
    offset = 0,
  ): Promise<LeaderboardResponse> {
    return this.request<LeaderboardResponse>(
      `online/ratings/?rating_type=${ratingType}&limit=${limit}&offset=${offset}`,
    );
  }

  async getPlayerIsOnline(playerId: number): Promise<PlayerOnlineStatus> {
    return this.request<PlayerOnlineStatus>(`online/players/${playerId}/is_online/`);
  }
}
