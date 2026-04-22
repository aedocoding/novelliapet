import DatePickerInput from "@/components/form/DatePicker";
import Dropdown from "@/components/form/Dropdown";
import FormInput from "@/components/form/FormInput";
import PhotoUploader from "@/components/form/PhotoUploader";
import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { usePet } from "@/context/PetContext";
import { useUser } from "@/context/UserContext";
import { AnimalType } from "@/types/models";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface EditPetForm {
  name: string;
  animalType: AnimalType;
  breed: string;
  dateOfBirth: string;
  photo?: string;
}

export default function EditPetScreen() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const { user } = useUser();
  const { pets, updatePet } = usePet();

  const pet = pets?.find((p) => p.id === petId);

  const { control, handleSubmit } = useForm<EditPetForm>({
    defaultValues: {
      name: pet?.name,
      animalType: pet?.animalType,
      breed: pet?.breed,
      dateOfBirth: pet?.dateOfBirth,
      photo: pet?.photo,
    },
  });

  const onSubmit = async (data: EditPetForm) => {
    await updatePet(user!.id, { ...data, id: petId, records: pet!.records });
    router.back();
  };

  if (!pet) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.form}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Edit Pet</Text>
        <View style={styles.divider} />
        <FormInput control={control} name="name" label="Pet Name" />
        <Dropdown
          control={control}
          name="animalType"
          label="Type"
          options={["Dog", "Cat", "Bird", "Capybara"]}
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
