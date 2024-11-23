import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
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
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="albuns" options={{ headerTitle: "" }} />
      <Stack.Screen name="album" options={{ headerTitle: "" }} />
      <Stack.Screen name="photo" options={{ headerTitle: "" }} />
    </Stack>
  );
}
