import CTAButton from "@/components/ui/CTAButton";
import { Colors, FontSizes, Layout, Spacing } from "@/constants/theme";
import { usePet } from "@/context/PetContext";
import { useUser } from "@/context/UserContext";
import { Pet } from "@/types/models";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PetListScreen() {
  const { user, logout } = useUser();
  const { pets, fetchPets } = usePet();

  useEffect(() => {
    if (user) fetchPets(user.id);
  }, [user]);

  const handleSignOut = async () => {
    if (user) {
      await logout(user?.id);
      router.replace("/");
    }
  };

  const renderPet = ({ item }: { item: Pet }) => (
    <TouchableOpacity
      style={styles.petRow}
      onPress={() => router.push(`/pets/${item.id}`)}
    >
      <Text style={styles.petName}>{item.name}</Text>
      <Text style={styles.petType}>{item.animalType}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Pet List</Text>
        <View style={styles.divider} />
      </View>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={renderPet}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      <View style={styles.bottom}>
        <View style={styles.divider} />
        <View style={styles.actions}>
          <CTAButton
            label="Sign Out"
            variant="destructive"
            onPress={handleSignOut}
          />
          <CTAButton label="Add Pet" onPress={() => router.push("/pets/add")} />
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
  },
  top: {
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    marginTop: 20,
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
  list: {
    flexGrow: 1,
  },
  petRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Layout.cardPadding,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  petName: {
    fontSize: FontSizes.md,
    fontWeight: "bold",
  },
  petType: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textTransform: "capitalize",
  },
  bottom: {
    gap: Spacing.sm,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
