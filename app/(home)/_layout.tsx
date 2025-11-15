import { useAuthProvider } from '@/providers/AuthProvider';
import { Redirect, Slot } from 'expo-router';

export default function HomeLayout() {
  const { isAuthenticated } = useAuthProvider();

  if (!isAuthenticated) {
    return <Redirect href={'/auth'} />;
  }

  return (
    <>
      <Slot />
    </>
  );
}
