import { Colors, FontSizes, Layout } from "@/constants/theme";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  multiline = false,
}: FormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      render={({ field: { value, onChange, onBlur } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, multiline && styles.multiline]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={Colors.textMuted}
            multiline={multiline}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSizes.md,
    marginBottom: 8,
  },
  input: {
    height: Layout.inputHeight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    paddingHorizontal: 12,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  multiline: {
    height: 100,
    paddingTop: 10,
    textAlignVertical: "top",
  },
});
