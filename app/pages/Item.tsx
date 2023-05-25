import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { Item as ItemType } from '../types/item';
import { itemStorage } from '../data/itemStorage';
import { useState, useEffect } from 'react';

export default function Item() {
  const router = useRouter();
  const params = useLocalSearchParams(); 
  const barcode = params.barcode as string;
  const name = params.name as string;
  const { control, handleSubmit} = useForm();

  const [images, setImages] = useState<string[]>([]);
  const [item, setItem] = useState<ItemType>(undefined);
  useEffect(() => {
    const getItem = async (): Promise<ItemType> => {
      return await itemStorage.getByBarcode(barcode);
    } 
    getItem().then(item => {
      setItem(item);
      if (item) setImages(item.images);
    });
  }, []);

  const onSubmit = async (data: ItemType) => {
    data.images = images;
    await itemStorage.add(data);
    router.replace('/');
  }

  const onDelete = async () => {
    await itemStorage.remove(barcode);
    router.replace('/');
  }

  const takePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync() && await MediaLibrary.requestPermissionsAsync();
    if (permissionResult.granted === false) return;
    
    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled) return;

    const localUri = result.assets[0].uri;
    const { uri } = await MediaLibrary.createAssetAsync(localUri);

    setImages([...images, uri]);
  }

  return (
    <SafeAreaView style={tw`w-full h-full px-4`}>
      <View style={tw`flex items-center justify-center mb-4 mt-4`}>
        <Text style={tw`text-xl`}>Cadastro de produto</Text>
      </View>
      <View style={tw`flex flex-col mb-4`}>
        <Text style={tw`text-xs`}>Código de barras</Text>
        <Input name='barcode' control={control} defaultValue={barcode}/>

        <Text style={tw`text-xs mt-4`}>Nome</Text>
        <Input name='name' control={control} defaultValue={name ?? '-'}/>
      </View>
      <Text style={tw`text-xs`}>Imagens</Text>
      <View style={tw`flex h-1/4 w-full`}>
        {
          images.map((image, index) => 
            <Image
              key={index}
              source={image}
              style={tw`w-1/3 h-1/2`}
            />
          )
        }
      </View>
      <View style={tw`flex items-center mt-5 mb-4`}>
        <Button
          text='Adicionar imagens'
          onPress={takePicture}
        />
      </View>
      <View style={tw`flex items-center mb-4`}>
        {
          !item?.barcode && <Button 
            text='Cadastrar'
            onPress={handleSubmit(onSubmit)}
          />
        }
      </View>
      <View style={tw`flex items-center mb-4`}>
        {
          item?.barcode && <Button 
            text='Deletar'
            onPress={onDelete}
          />
        }
      </View>
    </SafeAreaView>
  )
}
