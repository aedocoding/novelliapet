import { Colors, FontSizes, Layout } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

interface DatePickerInputProps {
  control: Control;
  name: string;
  label: string;
}

export default function DatePickerInput({
  control,
  name,
  label,
}: DatePickerInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View>
          <Text style={styles.label}>{label}</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={value ? styles.valueText : styles.placeholder}>
              {value
                ? new Date(value).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "mm/dd/yyyy"}
            </Text>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>

          <Modal transparent animationType="fade" visible={showCalendar}>
            <TouchableOpacity
              onPress={() => {
                setShowCalendar(false);
              }}
              activeOpacity={1}
              style={styles.overlay}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={styles.calendarContainer}
                onPress={() => {}}
              >
                <CalendarPicker
                  initialDate={value ? new Date(value) : new Date()}
                  selectedDayColor={Colors.primary}
                  selectedDayTextColor="#fff"
                  selectedStartDate={value ? new Date(value) : new Date()}
                  onDateChange={(date) => {
                    onChange(date.toISOString());
                    setShowCalendar(false);
                  }}
                />
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
    paddingHorizontal: 8,
  },
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: Layout.borderRadius,
    padding: 16,
    width: "100%",
  },
});
