import { FontSizes, Layout } from "@/constants/theme";
import { MedicalRecord } from "@/types/models";
import { StyleSheet, Text, View } from "react-native";
import CTAButton from "./CTAButton";

interface RecordCardProps {
  medicalRecord: MedicalRecord;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

export default function RecordCard({
  medicalRecord,
  onPressEdit,
  onPressDelete,
}: RecordCardProps) {
  return (
    <View style={{ paddingHorizontal: Layout.screenPadding }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "75%" }}>
          <Text style={styles.recordTitle}>{medicalRecord.name}</Text>
          {medicalRecord.type === "Vaccine" ? (
            <Text style={styles.recordSubtitle}>
              Date Administered:{" "}
              {new Date(medicalRecord.dateAdministered).toLocaleDateString(
                "en-US",
                {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                },
              )}
            </Text>
          ) : medicalRecord.type === "Medication" ? (
            <View>
              <Text style={styles.recordSubtitle}>
                Dosage: {medicalRecord.dosage}
              </Text>
              <Text style={styles.recordSubtitle}>
                Instructions: {medicalRecord.instructions}
              </Text>
            </View>
          ) : medicalRecord.type === "Allergy" ? (
            <Text style={styles.recordSubtitle}>
              Reactions: {medicalRecord.reactions.join(", ")}{" "}
            </Text>
          ) : (
            <View />
          )}
        </View>
        <View style={{ width: "25%" }}>
          <CTAButton
            width={80}
            fontSize={FontSizes.sm}
            label="Edit"
            onPress={onPressEdit}
          />
          <View style={{ height: 5 }} />
          <CTAButton
            width={80}
            fontSize={FontSizes.sm}
            label="Delete"
            variant="destructive"
            onPress={onPressDelete}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recordTitle: { fontWeight: "bold", fontSize: FontSizes.lg },
  recordSubtitle: { fontSize: FontSizes.sm },
});
