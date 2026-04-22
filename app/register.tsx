import FormInput from "@/components/form/FormInput";
import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout } from "@/constants/theme";
import { useUser } from "@/context/UserContext";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface RegisterForm {
  username: string;
}

export default function RegisterScreen() {
  const { control, handleSubmit } = useForm<RegisterForm>();
  const { register } = useUser();

  const onSubmit = async ({ username }: RegisterForm) => {
    await register(username);
    router.replace("/add-first-pet");
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Create Account</Text>
        <View style={styles.divider} />
        <View style={styles.form}>
          <FormInput control={control} name="username" label="Username" />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.divider} />
        <View style={styles.bottomRow}>
          <CTAButton
            label="Back"
            variant="secondary"
            onPress={() => {
              router.back();
            }}
          />
          <CTAButton label="Create Account" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Layout.screenPadding,
  },
  top: {
    alignItems: "center",
    gap: Layout.formFieldGap,
    marginTop: 20,
  },
  bottom: {
    gap: Layout.formFieldGap,
    alignItems: "flex-end",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  header: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.border,
  },
  form: {
    width: "100%",
    gap: Layout.formFieldGap,
  },
});
