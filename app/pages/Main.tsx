import tw from 'twrnc';
import { useEffect, useState } from 'react';
import { View } from 'react-native'
import { itemStorage } from '../data/itemStorage';
import { Item } from '../types/item';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';

export const Main = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getItems = async () => {
      return await itemStorage.getAll();
    }
    getItems().then(setItems);
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
