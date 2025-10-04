import { StatusBar } from 'expo-status-bar';
import { Router } from './src/navigation/Router';

export default function App() {
  return (
    <>
      <Router />
      <StatusBar style="auto" />
    </>
  );
}
