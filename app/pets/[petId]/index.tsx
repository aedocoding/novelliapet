import CTAButton from "@/components/ui/CTAButton";
import RecordCard from "@/components/ui/RecordCard";
import { Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { usePet } from "@/context/PetContext";
import { useUser } from "@/context/UserContext";
import { MedicalRecord } from "@/types/models";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PetDetailScreen() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const { user } = useUser();
  const { pets, removePet, removeRecord, fetchPet } = usePet();

  const pet = pets?.find((p) => p.id === petId);

  const allergies = pet?.records?.filter((r) => r.type === "Allergy") ?? [];
  const medications =
    pet?.records?.filter((r) => r.type === "Medication") ?? [];

  const handleDeletePet = () => {
    Alert.alert("Delete Pet", `Are you sure you want to delete ${pet?.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await removePet(user!.id, petId);
          router.replace("/pets");
        },
      },
    ]);
  };

  const handleDeleteRecord = (record: MedicalRecord) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeRecord(user!.id, petId, record),
        },
      ],
    );
  };

  useEffect(() => {
    if (user && petId) fetchPet(user.id, petId);
  }, [petId]);

  if (!pet) return null;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Pet Details & Medical Records</Text>
        <View style={styles.divider} />
        <View style={styles.spacer} />
        <View style={styles.petInfoRow}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.petActions}>
            <CTAButton
              label="Edit Pet"
              width={100}
              fontSize={FontSizes.sm}
              onPress={() => router.push(`/pets/${petId}/edit`)}
            />
            <CTAButton
              label="Delete Pet"
              width={100}
              fontSize={FontSizes.sm}
              variant="destructive"
              onPress={handleDeletePet}
            />
          </View>
        </View>
        <Text style={styles.petMeta}>Type: {pet.animalType}</Text>
        <Text style={styles.petMeta}>Breed: {pet.breed}</Text>
        <Text style={styles.petMeta}>
          Date of Birth:{" "}
          {new Date(pet.dateOfBirth).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </Text>
        <View style={styles.divider} />
        <View style={styles.spacer} />
        {(allergies.length > 0 || medications.length > 0) && (
          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyTitle}>⚠ Emergency Info</Text>
            {allergies.length > 0 && (
              <Text style={styles.emergencyText}>
                Allergies: {allergies.map((a) => a.name).join(", ")}
              </Text>
            )}
            {medications.length > 0 && (
              <Text style={styles.emergencyText}>
                Medications: {medications.map((m) => m.name).join(", ")}
              </Text>
            )}
          </View>
        )}
        <View style={styles.spacer} />

        <View style={styles.divider} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Records</Text>
        </View>
        {pet.records?.map((record) => (
          <View key={record.id}>
            <View style={styles.spacer} />
            <RecordCard
              medicalRecord={record}
              onPressEdit={() =>
                router.push(`/pets/${petId}/records/${record.id}`)
              }
              onPressDelete={() => handleDeleteRecord(record)}
            />
            <View style={styles.spacer} />
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomRow}>
        <CTAButton
          label="Back"
          width={100}
          variant="secondary"
          onPress={() => router.back()}
        />
        <CTAButton
          label="Add Record"
          width={120}
          onPress={() => router.push(`/pets/${petId}/records/add`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Layout.screenPadding,
    gap: Spacing.md,
    marginTop: 20,
  },
  header: {
    fontSize: FontSizes.xl,
    fontWeight: "bold",
    alignSelf: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  petInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  petActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  petMeta: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "bold",
  },
  emergencyBox: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    padding: Layout.cardPadding,
    gap: Spacing.xs,
  },
  emergencyTitle: {
    fontWeight: "bold",
    fontSize: FontSizes.md,
  },
  emergencyText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  spacer: { height: 10 },
});
