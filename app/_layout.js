import React,{ useEffect } from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext';
import "../global.css"
import { MenuProvider } from 'react-native-popup-menu';
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(app)';

    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated === false) {
      router.replace('/signIn');
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>

  );
}
