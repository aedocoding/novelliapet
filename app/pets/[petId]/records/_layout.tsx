import { Stack } from "expo-router";

export default function RecordLayout() {
  return (
    <Stack>
      <Stack.Screen name="add" options={{ headerShown: false }} />
      <Stack.Screen name="[recordId]" options={{ headerShown: false }} />
    </Stack>
  );
}
