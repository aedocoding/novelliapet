import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout } from "@/constants/theme";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.centerAlignContainer}>
        <View style={styles.spacer} />
        <Text style={styles.header}>Welcome</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.centerAlignContainer}>
        <Text style={styles.body}>Welcome to Novellia Pet!</Text>
        <Text style={styles.body}>
          Manage your pet's health records with ease
        </Text>
        <View style={{ height: 10 }} />
        <CTAButton
          label={"Create Account"}
          onPress={() => {
            router.push("/register");
          }}
        />
        <View style={{ height: 10 }} />
        <CTAButton
          width={80}
          label={"Log In"}
          variant="secondary"
          onPress={() => {
            router.push("/login");
          }}
        />
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Layout.screenPadding,
  },
  centerAlignContainer: { width: "100%", alignItems: "center" },
  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.border,
  },
  header: {
    fontWeight: "bold",
    fontSize: FontSizes.xl,
  },
  body: {
    fontSize: FontSizes.md,
  },
  spacer: { height: 40 },
});
