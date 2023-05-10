import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';
import { Main } from './pages/Main';

export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full bg-slate-50 items-center justify-center`}>
      <StatusBar style='light' />
      <Main/>
    </View>
  );
}
