import { Colors, FontSizes, Layout } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { Control, Controller } from "react-hook-form";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface PhotoUploaderProps {
  control: Control<any>;
  name: string;
}

export default function PhotoUploader({ control, name }: PhotoUploaderProps) {
  async function pickImage(onChange: (uri: string) => void) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to photo library.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  }

  async function takePhoto(onChange: (uri: string) => void) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to your camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  }
  function promptUpload(onChange: (uri: string) => void) {
    Alert.alert("Upload Photo", "Choose a source", [
      { text: "Camera", onPress: () => takePhoto(onChange) },
      { text: "Photo Library", onPress: () => pickImage(onChange) },
      { text: "Cancel", style: "cancel" },
    ]);
  }
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { value, onChange } }) => (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => promptUpload(onChange)}
          >
            <MaterialIcons
              name="photo-camera"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableOpacity>
          {value ? (
            <Image source={{ uri: value }} style={styles.preview} />
          ) : (
            <View style={styles.placeholder}>
              <MaterialIcons name="photo" size={40} color={Colors.border} />
            </View>
          )}
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: Layout.inputHeight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  preview: {
    marginTop: 12,
    width: "100%",
    height: 200,
    borderRadius: Layout.borderRadius,
  },
  placeholder: {
    marginTop: 12,
    width: "100%",
    height: 200,
    borderRadius: Layout.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});
