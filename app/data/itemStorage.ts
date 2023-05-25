import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../types/item';

const ITEMS_KEY = '@items';

const getAll = async (): Promise<Item[]> => {
  const data = await AsyncStorage.getItem(ITEMS_KEY);
  const items = JSON.parse(data) as Item[];
  
  return items ?? new Array<Item>();
}

const add = async (item: Item) => {
  const items = JSON.parse(await AsyncStorage.getItem(ITEMS_KEY)) as Item[] ?? new Array<Item>();
  const newItems = [...items, item];
  const data = JSON.stringify(newItems);

  await AsyncStorage.setItem(ITEMS_KEY, data);
}

const remove = async (barcode: string) => {
  const items = JSON.parse(await AsyncStorage.getItem(ITEMS_KEY)) as Item[] ?? new Array<Item>();
  const newItems = items.filter(item => item.barcode !== barcode);
  const data = JSON.stringify(newItems);

  await AsyncStorage.setItem(ITEMS_KEY, data);
}

const getByBarcode = async (barcode: string): Promise<Item> => {
  const items = await getAll();
  return items.find(item => item.barcode === barcode);
}

export const itemStorage = {
  getAll,
  add,
  remove,
  getByBarcode
}
