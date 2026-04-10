import { useProvider } from '@/hooks/useProvider';
import { Redirect } from 'expo-router';

export default function Index() {
  const { keys, status } = useProvider();
  if (status === 'loading') return null;
  return <Redirect href="/chess-passport/landing" />;
}
