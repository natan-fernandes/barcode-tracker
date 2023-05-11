import tw from 'twrnc';
import { BarCodeScanner } from "expo-barcode-scanner"
import { SafeAreaView } from "react-native/types"

export const Scanner = () => {
  const handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <SafeAreaView style={tw`relative w-full h-full`}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={tw`w-full h-1/3`}
      />
    </SafeAreaView>
  )
}