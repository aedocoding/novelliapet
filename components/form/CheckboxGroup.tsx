import { Colors, FontSizes } from "@/constants/theme";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckboxGroupProps {
  name: string;
  label: string;
  control: Control<any>;
  options: any[];
}

export default function CheckboxGroup({
  name,
  label,
  control,
  options,
}: CheckboxGroupProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.row}>
            {options.map((option) => {
              const selected: boolean = value?.includes(option);
              const toggleCheckbox = () =>
                onChange(
                  selected
                    ? (value ?? []).filter((checked: any) => checked !== option)
                    : [...(value ?? []), option],
                );
              return (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={toggleCheckbox}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, selected && styles.checked]} />
                  <Text style={[styles.optionLabel]}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    ></Controller>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: FontSizes.md,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 3,
  },
  checked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionLabel: {
    textTransform: "capitalize",
  },
});
