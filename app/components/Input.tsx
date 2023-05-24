import { Control, FieldValues, useController } from "react-hook-form";
import { TextInput } from "react-native/types";

interface InputProps {
  name: string;
  control: Control<FieldValues>;
}

export const Input = (props: InputProps) => {
  const { field } = useController({
    control: props.control,
    defaultValue: '',
    name: props.name,
  });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
    />
  );
}
