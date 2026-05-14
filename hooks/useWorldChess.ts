import { useQuery } from '@tanstack/react-query';
import { worldChessApi } from '@/lib/worldchess';
import type {
  PlayerProfile,
  PlayerRatings,
  PlayerTotals,
  RatingsOverview,
} from '@/lib/worldchess/types';

/**
 * Hardcoded playerId for Magnus Carlsen as requested.
 */
export const MAGNUS_CARLSEN_PLAYER_ID = 218782;

export const worldChessPlayerQueryKey = (playerId: number) =>
  ['worldchess', 'player', playerId] as const;
export const worldChessPlayerStatsQueryKey = (playerId: number) =>
  ['worldchess', 'player-stats', playerId] as const;
export const worldChessPlayerRatingsQueryKey = (playerId: number) =>
  ['worldchess', 'player-ratings', playerId] as const;
export const worldChessPlayerTotalsQueryKey = (playerId: number) =>
  ['worldchess', 'player-totals', playerId] as const;
export const worldChessPlayerRatingsOverviewQueryKey = (playerId: number) =>
  ['worldchess', 'player-ratings-overview', playerId] as const;

/**
 * Hook to fetch full data from World Chess services for a specific player.
 * Wraps the necessary API calls and hydrates the app with ELO and other metrics.
 *
 * @param playerId The player's ID on World Chess (defaults to Magnus Carlsen: 218782).
 */
export function useWorldChessPlayer(playerId: number = MAGNUS_CARLSEN_PLAYER_ID) {
  const profileQuery = useQuery({
    queryKey: worldChessPlayerQueryKey(playerId),
    queryFn: () => worldChessApi.getPlayerProfile(playerId),
    staleTime: 60_000, // 1 minute
  });

  const statsQuery = useQuery({
    queryKey: worldChessPlayerStatsQueryKey(playerId),
    queryFn: () => worldChessApi.getPlayerStats(playerId),
    staleTime: 60_000,
  });

  const ratingsQuery = useQuery({
    queryKey: worldChessPlayerRatingsQueryKey(playerId),
    queryFn: () => worldChessApi.getPlayerCurrentRatings(playerId),
    staleTime: 60_000,
  });

  const totalsQuery = useQuery({
    queryKey: worldChessPlayerTotalsQueryKey(playerId),
    queryFn: () => worldChessApi.getPlayerTotals(playerId),
    staleTime: 60_000,
  });

  const ratingsOverviewQuery = useQuery({
    queryKey: worldChessPlayerRatingsOverviewQueryKey(playerId),
    queryFn: () => worldChessApi.getPlayerRatingsOverview(playerId),
    staleTime: 60_000,
  });

  return {
    profile: profileQuery.data as PlayerProfile | undefined,
    stats: statsQuery.data,
    ratings: ratingsQuery.data as PlayerRatings | undefined,
    totals: totalsQuery.data as PlayerTotals | undefined,
    ratingsOverview: ratingsOverviewQuery.data as RatingsOverview | undefined,
    isLoading:
      profileQuery.isLoading ||
      statsQuery.isLoading ||
      ratingsQuery.isLoading ||
      totalsQuery.isLoading ||
      ratingsOverviewQuery.isLoading,
    isError:
      profileQuery.isError ||
      statsQuery.isError ||
      ratingsQuery.isError ||
      totalsQuery.isError ||
      ratingsOverviewQuery.isError,
    error:
      profileQuery.error ||
      statsQuery.error ||
      ratingsQuery.error ||
      totalsQuery.error ||
      ratingsOverviewQuery.error,
    refetch: async () => {
      await Promise.all([
        profileQuery.refetch(),
        statsQuery.refetch(),
        ratingsQuery.refetch(),
        totalsQuery.refetch(),
        ratingsOverviewQuery.refetch(),
      ]);
    },
  };
}
