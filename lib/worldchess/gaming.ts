import { WorldChessBase } from './base';
import type { PlayerRatings, PlayerTotals, RatingsOverview } from './types';

export class WorldChessGaming extends WorldChessBase {
  async getPlayerTournaments(playerId: number, limit = 6, offset = 0): Promise<any> {
    return this.request(`gaming/players/${playerId}/tournaments?limit=${limit}&offset=${offset}`);
  }

  async getPlayerTopOpponents(playerId: number): Promise<any> {
    return this.request(`gaming/players/${playerId}/top-opponents`);
  }

  async getPlayerRecentGames(playerId: number, limit = 4, offset = 0): Promise<any> {
    return this.request(`gaming/players/${playerId}/games?limit=${limit}&offset=${offset}`);
  }

  async getPlayerStatsByBoardType(playerId: number): Promise<any> {
    return this.request(`gaming/players/${playerId}/stats/games-by-board-type`);
  }

  async getPlayerStatsByDate(playerId: number): Promise<any> {
    return this.request(`gaming/players/${playerId}/stats/games-by-date`);
  }

  async getPlayerRatingsOverview(playerId: number): Promise<RatingsOverview> {
    return this.request<RatingsOverview>(`gaming/players/${playerId}/ratings/overview`);
  }

  async getPlayerGamingTitleProgress(playerId: number): Promise<any> {
    return this.request(`gaming/players/${playerId}/title-progress`);
  }

  async getPlayerTotals(playerId: number): Promise<PlayerTotals> {
    return this.request<PlayerTotals>(`gaming/players/${playerId}/totals`);
  }

  async getPlayerCurrentRatings(playerId: number): Promise<PlayerRatings> {
    return this.request<PlayerRatings>(`gaming/players/${playerId}/ratings/current`);
  }
}
