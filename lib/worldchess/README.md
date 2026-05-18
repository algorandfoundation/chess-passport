# World Chess RPC Library

This library provides a typed interface to interact with World Chess services. It covers authentication, player profiles, online gaming statistics, and tournament data.

## Structure

The library is organized into several modules, each targeting specific World Chess API endpoints:

- **Accounts (`accounts.ts`)**: Handles authentication and session management (e.g., login).
- **Me (`me.ts`)**: Provides access to the authenticated user's own data, including profiles, ratings, and title progress.
- **Online (`online.ts`)**: Interfaces with the World Chess Online platform, offering player stats, game history, and leaderboards.
- **Gaming (`gaming.ts`)**: Manages competitive data such as tournament history, opponent statistics, and overall ratings overviews.
- **Types (`types.ts`)**: Contains TypeScript interfaces for all major entities returned by the API (e.g., `PlayerProfile`, `PlayerRatings`, `PlayerTotals`).

## Usage

The primary way to interact with the library is through the `WorldChessAPI` class or its default singleton instance.

### Singleton Instance (Recommended)

```typescript
import { worldChessApi } from '@/lib/worldchess';

// Fetch a player's profile (e.g., Magnus Carlsen)
const profile = await worldChessApi.getPlayerProfile(218782);
console.log(profile.full_name);
```

### Manual Instance

If you need to manage multiple sessions or tokens manually:

```typescript
import { WorldChessAPI } from '@/lib/worldchess';

const api = new WorldChessAPI('your_auth_token');
const me = await api.getMe();
```

## Available Methods

The `WorldChessAPI` class proxies many common methods for ease of use:

- `login(email, password)`: Authenticates and sets the internal token.
- `getPlayerProfile(playerId)`: Retrieves detailed profile information.
- `getPlayerStats(playerId, ratingType?)`: Gets gaming statistics.
- `getPlayerCurrentRatings(playerId)`: Retrieves ELO ratings across different formats.
- `getPlayerTotals(playerId)`: Gets aggregate statistics (total games, winrate, etc.).
- `getPlayerRatingsOverview(playerId)`: Provides a historical overview of ratings.
- `getOnlineLeaderboard(ratingType?, limit?, offset?)`: Fetches the current leaderboard.

## Implementation Details

- **Base Class**: All modules inherit from a `WorldChessBase` class which handles the underlying `fetch` calls, headers, and token management.
- **Trailing Slashes**: The API is sensitive to trailing slashes on certain endpoints (especially in the gaming module). The library handles this by ensuring correct URL formatting.
- **Types**: All methods are strongly typed to match the actual JSON responses from the World Chess API.
