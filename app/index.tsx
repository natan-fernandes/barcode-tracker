import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import tw, { useDeviceContext } from 'twrnc';

export default function Page() {
  useDeviceContext(tw);
  return (
    <View style={tw`relative flex h-full w-full bg-black items-center justify-center`}>
      <StatusBar style='light' />
      <Text style={tw`text-white`}>Hello world!</Text>
    </View>
  );
}
