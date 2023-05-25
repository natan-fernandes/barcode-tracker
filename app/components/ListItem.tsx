import tw from 'twrnc';
import { View, Text, TouchableOpacity } from "react-native";
import { Item } from "../types/item";
import { useRouter } from 'expo-router';

export const ListItem = (item: Item) => {
  const router = useRouter();
  
  const onPress = () => {
    router.replace({ pathname: '/pages/Item', params: { barcode: item.barcode, name: item.name }});
  }

  return (
    <View style={tw`bg-blue-700 flex justify-center items-center p-4 mx-4 rounded-md mb-2`}>
      <TouchableOpacity onPress={onPress}>
        <Text style={tw`text-white text-lg`}>
          {item.name} ({item.barcode})
        </Text>
      </TouchableOpacity>
    </View>
  );
}