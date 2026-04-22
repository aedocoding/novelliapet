import { Colors, FontSizes } from "@/constants/theme";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RadioGroupProps {
  control: Control<any>;
  name: string;
  label: string;
  options: string[];
}

export default function RadioGroup({
  control,
  name,
  label,
  options,
}: RadioGroupProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.row}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => onChange(option)}
              >
                <View style={styles.radio}>
                  {value === option && <View style={styles.selected} />}
                </View>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSizes.md,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.text,
  },
  optionLabel: {
    fontSize: FontSizes.md,
    color: Colors.text,
    textTransform: "capitalize",
  },
});
