import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={({ route }) => ({
        headerRight: () => (
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              {route.params?.userName?.[0]?.toUpperCase() ?? "?"}
            </Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: "#262626",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#262626",
          paddingTop: 30,
          paddingHorizontal: 30,
        },
        headerTitle: "",
      })}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[userId]/index" />
      <Stack.Screen name="[userId]/[albumId]/index" />
      <Stack.Screen name="[userId]/[albumId]/[photo]/index" options={{}} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  circleText: {
    color: "#262626",
    fontSize: 22,
  },
});
