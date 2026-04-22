import CheckboxGroup from "@/components/form/CheckboxGroup";
import DatePickerInput from "@/components/form/DatePicker";
import Dropdown from "@/components/form/Dropdown";
import FormInput from "@/components/form/FormInput";
import RadioGroup from "@/components/form/RadioGroup";
import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { usePet } from "@/context/PetContext";
import { useUser } from "@/context/UserContext";
import { AllergyOptions, AllergyReaction } from "@/types/models";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface RecordForm {
  type: string;
  name: string;
  dateAdministered?: string;
  reactions?: string[];
  severity?: string;
  dosage?: string;
  instructions?: string;
}

export default function AddRecordScreen() {
  const { petId, type } = useLocalSearchParams<{
    petId: string;
    type: string;
  }>();
  const { user } = useUser();
  const { createRecord } = usePet();

  const { control, handleSubmit } = useForm<RecordForm>({
    defaultValues: { type },
  });

  const selectedType = useWatch({ control, name: "type" });

  const onSubmit = async (data: RecordForm) => {
    await createRecord(user!.id, petId, data as any);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Record Form</Text>
        <View style={styles.divider} />

        <Dropdown
          control={control}
          name="type"
          label="Record Type"
          options={["Vaccine", "Allergy", "Medication"]}
        />

        {selectedType === "Vaccine" && (
          <>
            <FormInput control={control} name="name" label="Vaccine Name" />
            <DatePickerInput
              control={control}
              name="dateAdministered"
              label="Date"
            />
          </>
        )}

        {selectedType === "Allergy" && (
          <>
            <FormInput control={control} name="name" label="Allergy Name" />
            <CheckboxGroup
              control={control}
              name="reactions"
              label="Reactions"
              options={AllergyOptions}
            />
            <RadioGroup
              control={control}
              name="severity"
              label="Severity"
              options={["mild", "severe"]}
            />
          </>
        )}

        {selectedType === "Medication" && (
          <>
            <FormInput control={control} name="name" label="Medication Name" />
            <FormInput
              control={control}
              name="dosage"
              label="Dosage"
              placeholder="e.g., 3.35 mg"
            />
            <FormInput
              control={control}
              name="instructions"
              label="Instructions"
              multiline
            />
          </>
        )}
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.divider} />
        <View style={styles.bottomRow}>
          <CTAButton
            label="Back"
            width={100}
            variant="secondary"
            onPress={() => router.back()}
          />
          <CTAButton label="Save Record" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Layout.screenPadding,
    justifyContent: "space-between",
    marginTop: 20,
  },
  form: {
    gap: Layout.formFieldGap,
    paddingBottom: Spacing.lg,
  },
  header: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    alignSelf: "center",
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.border,
  },
  bottom: {
    gap: Spacing.sm,
    alignItems: "flex-end",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
