import tw from 'twrnc';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native'
import { itemStorage } from '../data/itemStorage';
import { Item } from '../types/item';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';

export const Main = () => {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

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
    router.push('/pages/Scanner');
  }

  return (
    <SafeAreaView style={tw`relative w-full h-full`}>
      <FlatList
        data={items}
        renderItem={({item}) => 
          <View>
            {item.name} ({item.barcode})
          </View>
        }
        keyExtractor={item => item.barcode}
      />
      <View style={tw`absolute w-full bottom-10 flex items-center`}>
          <Button
            text='Escanear item'
            onPress={onStartScan}
          />
      </View>
    </SafeAreaView>
  )
}
