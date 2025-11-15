import { useAuthProvider } from '@/providers/AuthProvider';
import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuthProvider();

  if (isAuthenticated) {
    return <Redirect href={'/(home)'} />;
  }

  return (
    <>
      <Slot />
    </>
  );
}
