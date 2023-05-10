import tw from 'twrnc';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  text: string,
  onPress(): void
}

export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={tw`w-1/3 rounded-md bg-blue-700 flex justify-center items-center p-3`}
    >
      <Text
        style={tw`text-slate-50 font-medium`}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
