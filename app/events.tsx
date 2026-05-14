import { Divider } from '@/components/world-chess/ActivityItem';
import AddProofSheet from '@/components/world-chess/AddProofSheet';
import EventItem from '@/components/world-chess/EventItem';
import theme from '@/theme/theme';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';

const initialEvents: {
  id: string;
  name: string;
  location: string;
  points?: number;
  position?: string;
  logo: ImageSourcePropType;
}[] = [
  {
    id: '1',
    name: 'FIDE Grand Prix 2026',
    location: 'Berlin · May 1, 2026',
    points: 50,
    position: '# 1st',
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '2',
    name: 'Norway Chess 2026',
    location: 'Stavanger · Apr 12, 2026',
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '3',
    name: 'Tata Steel Chess 2026',
    location: 'Wijk aan Zee · Jan 18, 2026',
    points: 50,
    position: '# 3rd',
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '4',
    name: 'Sinquefield Cup 2025',
    location: 'St. Louis · Sep 3, 2025',
    points: 20,
    position: '# 4th',
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '5',
    name: 'Grand Chess Tour 2025',
    location: 'Paris · Jul 20, 2025',
    logo: require('../assets/images/layer2.png'),
  },
  {
    id: '6',
    name: 'Candidates Tournament 2025',
    location: 'Toronto · Apr 5, 2025',
    points: 35,
    position: '# 2nd',
    logo: require('../assets/images/layer2.png'),
  },
];

export default function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const proofSheetRef = useRef<BottomSheetModal>(null);

  const onAddProofPress = useCallback((eventId: string) => {
    setActiveEventId(eventId);
    proofSheetRef.current?.present();
  }, []);

  const onProofSheetDismiss = useCallback(() => {
    setActiveEventId(null);
    proofSheetRef.current?.dismiss();
  }, []);

  const handleProofUploaded = useCallback(() => {
    if (!activeEventId) return;
    setEvents((prev) =>
      prev.map((ev) => (ev.id === activeEventId ? { ...ev, points: 10, position: '# 5th' } : ev)),
    );
    onProofSheetDismiss();
  }, [activeEventId, onProofSheetDismiss]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.semantic.bg['app-bg'] as string }}
      contentContainerStyle={{
        paddingHorizontal: theme.primitives.spacing['8'],
        paddingVertical: theme.primitives.spacing['8'],
      }}
    >
      {events.map((event) => (
        <View key={event.id}>
          <EventItem
            logo={event.logo}
            name={event.name}
            location={event.location}
            points={event.points}
            position={event.position}
            onAddProof={
              event.points === undefined && event.position === undefined
                ? () => onAddProofPress(event.id)
                : undefined
            }
          />
          <Divider />
        </View>
      ))}
      <AddProofSheet
        ref={proofSheetRef}
        onDismiss={onProofSheetDismiss}
        onUploadProof={handleProofUploaded}
      />
    </ScrollView>
  );
}
