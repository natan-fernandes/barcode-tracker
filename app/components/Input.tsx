import tw from 'twrnc';
import { Control, FieldValues, useController } from 'react-hook-form';
import { TextInput } from 'react-native';

interface InputProps {
  name: string;
  control: Control<FieldValues>;
  defaultValue?: string;
}

export const Input = (props: InputProps) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue ?? '',
    name: props.name,
  });

  return (
    <TextInput
      style={tw`text-xl`}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
}
