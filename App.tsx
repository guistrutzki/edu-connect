import { StatusBar } from 'expo-status-bar';
import { useFonts } from '@/hooks/useFonts';
import { Router } from '@/navigation/Router';

export default function App() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <>
      <Router />
      <StatusBar style="auto" />
    </>
  );
}
