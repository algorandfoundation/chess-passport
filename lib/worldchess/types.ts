export interface LoginResponse {
  access_token: string;
}

export interface PlayerProfile {
  full_name: string;
  avatar: {
    full: string | null;
    medium: string | null;
    small: string | null;
  } | null;
  uid: string;
  player: {
    player_id: number;
    foa_title: string | null;
    fide_title?: string | null;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface RatingInfo {
  curr_rating: number;
  unrated_games?: number;
  has_any_games?: boolean;
}

export interface PlayerRatings {
  fide?: {
    bullet?: RatingInfo;
    blitz?: RatingInfo;
    rapid?: RatingInfo;
  };
  otb?: {
    classic?: { curr_rating: number };
    blitz?: { curr_rating: number };
    rapid?: { curr_rating: number };
  };
  worldchess?: {
    bullet?: RatingInfo;
    blitz?: RatingInfo;
    rapid?: RatingInfo;
    classic?: RatingInfo;
    daily?: RatingInfo;
    puzzle?: RatingInfo;
  };
  latest_played_rating?: string;
  latest_played_control?: string;
}

export interface UserRatings {
  worldchess_rating: number;
  fide_rating: number;
  worldchess_blitz: number;
  worldchess_rapid: number;
  worldchess_bullet: number;
  fide_blitz: number;
  fide_rapid: number;
  fide_standard: number;
  [key: string]: any;
}

export interface PlayerTotals {
  total_games: number;
  total_puzzles: number;
  total_tournaments: number;
  average_accuracy: number;
  winrate: number;
  seconds_spent_total: number;
}

export interface RatingOverviewEntry {
  rating_type: string;
  games_count: number;
  curr_rating: number;
  board_type_name: string;
  elo_delta_last_month: number | null;
  [key: string]: any;
}

export interface RatingsOverview {
  ratings: RatingOverviewEntry[];
}

export interface TitleProgress {
  title: string;
  progress: number;
  requirements: any[];
  [key: string]: any;
}

export interface GameStats {
  rating_type: string;
  games_count: number;
  wins_count: number;
  losses_count: number;
  draws_count: number;
  avg_rating: number;
  [key: string]: any;
}

export interface StrikeInfo {
  strikes_count: number;
  [key: string]: any;
}

export interface PlayerOnlineStatus {
  is_online: boolean;
  [key: string]: any;
}

export interface LeaderboardEntry {
  player: {
    player_id: number;
    full_name: string;
    foa_title: string | null;
    country: string;
    avatar: string | null;
  };
  rating: number;
  rank: number;
}

export interface LeaderboardResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LeaderboardEntry[];
}
