import { Colors, FontSizes, Layout } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DropdownProps {
  label: string;
  name: string;
  control: Control<any>;
  options: string[];
  placeholder?: string;
}
export default function Dropdown({
  label,
  name,
  control,
  options,
  placeholder,
}: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { value, onChange } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setShowOptions(true);
            }}
          >
            <Text style={value ? styles.valueText : styles.placeholder}>
              {value ?? placeholder}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>

          <Modal transparent animationType="fade" visible={showOptions}>
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => {
                setShowOptions(false);
              }}
            >
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.optionsContainer}>
                  <ScrollView>
                    {options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.option,
                          value === option && styles.selectedOption,
                        ]}
                        onPress={() => {
                          onChange(option);
                          setShowOptions(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            value === option && styles.selectedOptionText,
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: Layout.inputHeight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    paddingHorizontal: 12,
  },
  placeholder: {
    color: Colors.textMuted,
  },
  valueText: {
    color: Colors.text,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    backgroundColor: Colors.background,
    borderRadius: Layout.borderRadius,
    width: 280,
    maxHeight: 300,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.primary + "15",
  },
  optionText: {
    fontSize: FontSizes.md,
    color: Colors.text,
    textTransform: "capitalize",
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
