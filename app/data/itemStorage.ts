import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../types/item';

const getAll = async (): Promise<Item[]> => {
  const data = await AsyncStorage.getItem('@items');
  const items = JSON.parse(data) as Item[];
  
  return items ?? new Array<Item>();
}

const add = async (item: Item) => {
  const items = JSON.parse(await AsyncStorage.getItem('@items')) as Item[] ?? new Array<Item>();
  const newItems = [...items, item];
  const data = JSON.stringify(newItems);

  await AsyncStorage.setItem('@items', data);
}

const remove = async (barcode: string) => {
  const items = JSON.parse(await AsyncStorage.getItem('@items')) as Item[] ?? new Array<Item>();
  const newItems = items.filter(item => item.barcode !== barcode);
  const data = JSON.stringify(newItems);

  await AsyncStorage.setItem('@items', data);
}

export const itemStorage = {
  getAll,
  add,
  remove
}
