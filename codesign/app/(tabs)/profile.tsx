import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 16,
  },
});

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Profile</ThemedText>
    </ThemedView>
  );
}