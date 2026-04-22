import { Colors, FontSizes, Spacing } from "@/constants/theme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface CTAButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "destructive" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  width?: number;
  fontSize?: number;
}
export default function CTAButton({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  width = 150,
  fontSize = FontSizes.md,
}: CTAButtonProps) {
  const buttonColor = disabled
    ? Colors.disabled
    : variant === "primary"
      ? Colors.primary
      : variant === "destructive"
        ? Colors.destructive
        : variant === "secondary"
          ? Colors.secondary
          : Colors.background;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        { backgroundColor: buttonColor, width: width },
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ color: Colors.buttonText, fontSize: fontSize }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.xs,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: FontSizes.md,
  },
  disabled: {
    opacity: 0.5,
  },
});
