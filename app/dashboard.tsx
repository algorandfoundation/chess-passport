import ActivityTabs, { Event } from '@/components/world-chess/ActivityTabs';
import MenuSheet from '@/components/world-chess/MenuSheet';
import ProfileOverview from '@/components/world-chess/ProfileOverview';
import ScanCheckInSheet from '@/components/world-chess/ScanCheckInSheet';
import { useActivities } from '@/hooks/useActivities';
import { useInvalidateSession, useSession } from '@/hooks/useSession';
import { useWorldChessPlayer } from '@/hooks/useWorldChess';
import { chessGateway } from '@/lib/chess-gateway';
import theme from '@/theme/theme';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CheckInQrPayload {
  name: string;
  address: string;
  assetId: number;
  amount: number;
  banner: string;
}

interface CheckInQrData {
  slug: 'chess-passport';
  version: 1;
  payload: CheckInQrPayload;
}

function parseCheckInQrData(raw: string): CheckInQrData | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;

    const data = parsed as {
      slug?: unknown;
      version?: unknown;
      payload?: {
        name?: unknown;
        address?: unknown;
        assetId?: unknown;
        amount?: unknown;
        banner?: unknown;
      };
    };

    if (data.slug !== 'chess-passport' || data.version !== 1) return null;
    if (!data.payload || typeof data.payload !== 'object') return null;

    const { name, address, assetId, amount, banner } = data.payload;
    if (typeof name !== 'string' || name.length === 0) return null;
    if (typeof address !== 'string' || address.length === 0) return null;
    if (typeof assetId !== 'number' || !Number.isFinite(assetId)) return null;
    if (typeof amount !== 'number' || !Number.isFinite(amount)) return null;
    if (typeof banner !== 'string' || banner.length === 0) return null;

    return {
      slug: 'chess-passport',
      version: 1,
      payload: { name, address, assetId, amount, banner },
    };
  } catch {
    return null;
  }
}

const events: Event[] = [
  {
    id: '1',
    name: 'FIDE Grand Prix 2026',
    location: 'Berlin · May 1, 2026',
    position: '# 1st',
    points: 50,
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '2',
    name: 'Norway Chess 2026',
    location: 'Stavanger · Apr 12, 2026',
    position: '# 2nd',
    points: 35,
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '3',
    name: 'Tata Steel Chess 2026',
    location: 'Wijk aan Zee · Jan 18, 2026',
    position: '# 3rd',
    points: 50,
    logo: require('../assets/images/layer2.png'),
  },
];

const profile = {
  avatar: require('../assets/images/magnus-pfp.png'),
  name: 'Magnus Carlsen',
  elo: 2830,
  progressPoints: 1240n,
};

function SkeletonBlock({
  width = '100%',
  height,
  borderRadius = theme.primitives.radius['4'],
}: {
  width?: number | `${number}%`;
  height: number;
  borderRadius?: number;
}) {
  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: theme.semantic.stroke['low-emphasis'] as string,
      }}
    />
  );
}

function ProfileOverviewSkeleton() {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: theme.primitives.spacing['16'],
          paddingVertical: theme.primitives.spacing['16'],
          backgroundColor: theme.semantic.bg['surface-1'] as string,
          borderRadius: theme.primitives.radius['4'],
          gap: theme.primitives.spacing['8'],
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: theme.primitives.radius['32'],
            backgroundColor: theme.semantic.stroke['low-emphasis'] as string,
          }}
        />
        <SkeletonBlock width="52%" height={26} />
        <SkeletonBlock width={120} height={30} borderRadius={theme.primitives.radius['6']} />
      </View>

      <View style={{ height: theme.primitives.spacing['8'] }} />

      <View style={{ flexDirection: 'row', gap: theme.primitives.spacing['8'] }}>
        <SkeletonBlock width="49%" height={88} />
        <SkeletonBlock width="49%" height={88} />
      </View>
    </View>
  );
}

function ActivityTabsSkeleton() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          gap: theme.primitives.spacing['16'],
          marginBottom: theme.primitives.spacing['12'],
        }}
      >
        <SkeletonBlock width={88} height={28} />
        <SkeletonBlock width={64} height={28} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: theme.primitives.spacing['16'] }}>
          <SkeletonBlock height={80} />
          <View
            style={{
              height: 1,
              backgroundColor: theme.semantic.stroke['lowest-emphasis'] as string,
            }}
          />
          <SkeletonBlock height={80} />
          <View
            style={{
              height: 1,
              backgroundColor: theme.semantic.stroke['lowest-emphasis'] as string,
            }}
          />
          <SkeletonBlock height={80} />
        </View>
        <SkeletonBlock height={48} borderRadius={theme.primitives.radius['6']} />
      </View>
    </View>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const invalidateSession = useInvalidateSession();
  const menuSheetRef = useRef<BottomSheetModal>(null);
  const scanSheetRef = useRef<BottomSheetModal>(null);
  const hasHandledScanRef = useRef(false);
  const session = useSession();

  const { activities, isLoading: activitiesLoading } = useActivities();

  const { profile: wcProfile, ratings, isLoading: worldChessLoading } = useWorldChessPlayer();
  console.log('wcProfile', wcProfile);
  const isDashboardLoading = activitiesLoading || worldChessLoading;

  const profileName = wcProfile?.full_name ?? wcProfile?.player?.full_name ?? profile.name;
  const eloRating = ratings?.worldchess?.blitz?.curr_rating ?? profile.elo;
  const profileAvatar = wcProfile?.avatar?.medium
    ? { uri: wcProfile.avatar.medium }
    : profile.avatar;

  const onScanPress = useCallback(() => {
    hasHandledScanRef.current = false;
    scanSheetRef.current?.present();
  }, []);

  const onMenuPress = useCallback(() => {
    menuSheetRef.current?.present();
  }, []);

  const onMenuDismiss = useCallback(() => {
    menuSheetRef.current?.dismiss();
  }, []);

  const onScanDismiss = useCallback(() => {
    hasHandledScanRef.current = false;
    scanSheetRef.current?.dismiss();
  }, []);

  const onQrCodeScanned = useCallback(
    (data: string) => {
      if (hasHandledScanRef.current) return;

      const checkInData = parseCheckInQrData(data);
      if (!checkInData) {
        console.warn('[dashboard] invalid QR format', data);
        return;
      }

      hasHandledScanRef.current = true;
      scanSheetRef.current?.dismiss();
      router.push({
        pathname: '/purchase-entry',
        params: {
          slug: checkInData.slug,
          version: String(checkInData.version),
          name: checkInData.payload.name,
          address: checkInData.payload.address,
          assetId: String(checkInData.payload.assetId),
          amount: String(checkInData.payload.amount),
          banner: checkInData.payload.banner,
        },
      } as never);
    },
    [router],
  );

  const onLogoutPress = useCallback(async () => {
    menuSheetRef.current?.dismiss();
    try {
      chessGateway.clearCookie();
      await invalidateSession();
    } catch (error) {
      console.error('[dashboard] logout error', error);
    } finally {
      router.replace('/auth/login');
    }
  }, [invalidateSession, router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.semantic.bg['app-bg'] as string,
      }}
    >
      {/* Header */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: theme.primitives.spacing['8'],
          paddingHorizontal: theme.primitives.spacing['16'],
        }}
      >
        <Text
          style={{
            color: theme.semantic.fg['high-emphasis'] as string,
            fontSize: theme.primitives.font.size['h4'],
            fontFamily: theme.primitives.font.family.header,
          }}
        >
          Vault
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.primitives.spacing['12'],
          }}
        >
          <Pressable onPress={onScanPress} hitSlop={8}>
            <Ionicons name="scan-outline" size={24} color={theme.semantic.fg['high-emphasis']} />
          </Pressable>
          <Pressable onPress={onMenuPress} hitSlop={8}>
            <Ionicons name="menu-outline" size={32} color={theme.semantic.fg['high-emphasis']} />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingHorizontal: theme.primitives.spacing['8'],
          paddingTop: theme.primitives.spacing['16'],
        }}
      >
        {isDashboardLoading ? (
          <View style={{ position: 'relative' }}>
            <View style={{ opacity: 0 }} pointerEvents="none">
              <ProfileOverview
                name={profileName}
                eloRating={eloRating}
                progressPoints={profile.progressPoints}
                avatar={profileAvatar}
              />
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <ProfileOverviewSkeleton />
            </View>
          </View>
        ) : (
          <ProfileOverview
            name={profileName}
            eloRating={eloRating}
            progressPoints={profile.progressPoints}
            avatar={profileAvatar}
          />
        )}

        {isDashboardLoading ? (
          <View style={{ flex: 1, position: 'relative' }}>
            <View style={{ flex: 1, opacity: 0 }} pointerEvents="none">
              <ActivityTabs activities={activities.slice(0, 3)} events={events.slice(0, 3)} />
            </View>
            <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
              <ActivityTabsSkeleton />
            </View>
          </View>
        ) : (
          <ActivityTabs activities={activities.slice(0, 3)} events={events.slice(0, 3)} />
        )}
      </View>

      <ScanCheckInSheet
        ref={scanSheetRef}
        onDismiss={onScanDismiss}
        onQrCodeScanned={onQrCodeScanned}
      />
      <MenuSheet
        ref={menuSheetRef}
        onDismiss={onMenuDismiss}
        onLogout={onLogoutPress}
        session={session}
      />
    </SafeAreaView>
  );
}
