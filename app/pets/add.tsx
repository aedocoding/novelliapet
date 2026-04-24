import DatePickerInput from "@/components/form/DatePicker";
import Dropdown from "@/components/form/Dropdown";
import FormInput from "@/components/form/FormInput";
import PhotoUploader from "@/components/form/PhotoUploader";
import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { usePet } from "@/context/PetContext";
import { useUser } from "@/context/UserContext";
import { AnimalType, AnimalTypeList } from "@/types/models";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface AddFirstPetForm {
  name: string;
  animalType: AnimalType;
  breed: string;
  dateOfBirth: string;
  photo?: string;
}

export default function AddPetScreen() {
  const { control, handleSubmit } = useForm<AddFirstPetForm>();
  const { user } = useUser();
  const { createPet } = usePet();

  const onSubmit = async (data: AddFirstPetForm) => {
    await createPet(user!.id, { ...data, records: [] });
    router.replace("/pets");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Add Pet</Text>
        <View style={styles.divider} />
        <FormInput control={control} name="name" label="Pet Name" />
        <Dropdown
          control={control}
          name="animalType"
          label="Type"
          options={AnimalTypeList}
        />
        <FormInput control={control} name="breed" label="Breed" />
        <DatePickerInput
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
        />
        <PhotoUploader control={control} name="photo" />
      </ScrollView>
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
          <CTAButton label="Save Pet" onPress={handleSubmit(onSubmit)} />
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
    marginTop: 20,
    justifyContent: "space-between",
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
    gap: Layout.formFieldGap,
    alignItems: "flex-end",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
