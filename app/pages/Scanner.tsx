import tw from 'twrnc';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Scanner() {
  const router = useRouter();

  const handleBarCodeScanned = ({ data }) => {
    router.push({ pathname: '/pages/Item', params: { barcode: data }});
  };

  return (
    <SafeAreaView style={tw`bg-slate-950 relative w-full h-full flex justify-center items-center`}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={tw`w-full h-full bg-slate-950`}
      />
      <View style={tw`h-1 w-full absolute top-1/2 bg-red-600 z-10`}></View>
    </SafeAreaView>
  )
}
