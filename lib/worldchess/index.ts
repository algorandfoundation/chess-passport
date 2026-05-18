import { WorldChessAccounts } from './accounts';
import { WorldChessMe } from './me';
import { WorldChessOnline } from './online';
import { WorldChessGaming } from './gaming';
import type {
  PlayerProfile,
  GameStats,
  PlayerRatings,
  PlayerTotals,
  RatingsOverview,
  LeaderboardResponse,
  PlayerOnlineStatus,
  TitleProgress,
  StrikeInfo,
  UserRatings,
} from './types';

export class WorldChessAPI {
  public accounts: WorldChessAccounts;
  public me: WorldChessMe;
  public online: WorldChessOnline;
  public gaming: WorldChessGaming;

  constructor(token?: string) {
    this.accounts = new WorldChessAccounts(token);
    this.me = new WorldChessMe(token);
    this.online = new WorldChessOnline(token);
    this.gaming = new WorldChessGaming(token);
  }

  setToken(token: string) {
    this.accounts.setToken(token);
    this.me.setToken(token);
    this.online.setToken(token);
    this.gaming.setToken(token);
  }

  // Proxied methods for backward compatibility
  async login(email: string, password: string) {
    const response = await this.accounts.login(email, password);
    this.setToken(response.access_token);
    return response;
  }

  async getMe(): Promise<PlayerProfile> {
    return this.me.getMe();
  }

  async getUserRatings(): Promise<UserRatings> {
    return this.me.getUserRatings();
  }

  async getTitleProgress(): Promise<TitleProgress> {
    return this.me.getTitleProgress();
  }

  async getPlayerStats(
    playerId: number,
    ratingType?: 'worldchess' | 'fide' | 'otb',
  ): Promise<GameStats> {
    return this.online.getPlayerStats(playerId, ratingType);
  }

  async getPlayerProfile(playerId: number): Promise<PlayerProfile> {
    return this.online.getPlayerProfile(playerId);
  }

  async getGameHistory(playerId: number, limit?: number, offset?: number) {
    return this.online.getGameHistory(playerId, limit, offset);
  }

  async getChallenges() {
    return this.online.getChallenges();
  }

  async getStrikeInfo() {
    return this.me.getStrikeInfo();
  }

  async getOnlineLeaderboard(ratingType?: 'worldchess' | 'fide', limit?: number, offset?: number) {
    return this.online.getOnlineLeaderboard(ratingType, limit, offset);
  }

  async getPlayerIsOnline(playerId: number) {
    return this.online.getPlayerIsOnline(playerId);
  }

  async getPlayerTournaments(playerId: number, limit?: number, offset?: number) {
    return this.gaming.getPlayerTournaments(playerId, limit, offset);
  }

  async getPlayerTopOpponents(playerId: number) {
    return this.gaming.getPlayerTopOpponents(playerId);
  }

  async getPlayerRecentGames(playerId: number, limit?: number, offset?: number) {
    return this.gaming.getPlayerRecentGames(playerId, limit, offset);
  }

  async getPlayerStatsByBoardType(playerId: number) {
    return this.gaming.getPlayerStatsByBoardType(playerId);
  }

  async getPlayerStatsByDate(playerId: number) {
    return this.gaming.getPlayerStatsByDate(playerId);
  }

  async getPlayerRatingsOverview(playerId: number): Promise<RatingsOverview> {
    return this.gaming.getPlayerRatingsOverview(playerId);
  }

  async getPlayerGamingTitleProgress(playerId: number): Promise<any> {
    return this.gaming.getPlayerGamingTitleProgress(playerId);
  }

  async getPlayerTotals(playerId: number): Promise<PlayerTotals> {
    return this.gaming.getPlayerTotals(playerId);
  }

  async getPlayerCurrentRatings(playerId: number): Promise<PlayerRatings> {
    return this.gaming.getPlayerCurrentRatings(playerId);
  }
}

/**
 * Default singleton instance of the World Chess API.
 */
export const worldChessApi = new WorldChessAPI();

export * from './types';
export { WorldChessAccounts } from './accounts';
export { WorldChessMe } from './me';
export { WorldChessOnline } from './online';
export { WorldChessGaming } from './gaming';
