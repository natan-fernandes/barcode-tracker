import tw from 'twrnc';
import { useEffect, useState } from 'react';
import { View } from 'react-native'
import { itemStorage } from '../data/itemStorage';
import { Item } from '../types/item';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const Main = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getItems = async () => {
      return await itemStorage.getAll();
    }

    const getBarCodeScannerPermissions = async () => {
      await BarCodeScanner.requestPermissionsAsync();
    };

    getItems().then(setItems);
    getBarCodeScannerPermissions();
  });

  const onStartScan = () => {
    console.log('aqui');
  }

  return (
    <SafeAreaView style={tw`relative w-full h-full`}>
      <View style={tw`absolute w-full bottom-10 flex items-center`}>
        <Button
          text='Escanear item'
          onPress={onStartScan}
        />
      </View>
    </SafeAreaView>
  )
}
