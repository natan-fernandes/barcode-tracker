import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { Item } from '../types/item';
import { itemStorage } from '../data/itemStorage';

export default function Item() {
  const { barcode } = useLocalSearchParams();
  const { control, handleSubmit} = useForm();

  const onSubmit = (data: Item) => {
    Alert.alert(JSON.stringify(data));
    itemStorage.add(data);
  }

  return (
    <SafeAreaView style={tw`w-full h-full px-4`}>
      <View style={tw`flex items-center justify-center mb-4 mt-4`}>
        <Text style={tw`text-xl`}>Cadastro de produto</Text>
      </View>
      <View style={tw`flex flex-col`}>
        <Text style={tw`text-xs`}>Código de barras</Text>
        <Text style={tw`font-bold text-xl`}>{barcode}</Text>

        <Text style={tw`text-xs`}>Nome</Text>
        <Input name='name' control={control}/>
      </View>
      <View>
        <Button 
          text='Cadastrar'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </SafeAreaView>
  )
}
