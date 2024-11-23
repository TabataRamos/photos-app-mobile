import { Stack } from "expo-router";

export default function AlbunsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#262626",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#262626",
          // paddingTop: 30,
          // paddingHorizontal: 30,
        },
      }}
    >
      {/* <Stack.Screen name="albuns" options={{ headerShown: true }} /> */}
      {/* <Stack.Screen name="album" options={{ headerTitle: "" }} /> */}
    </Stack>
  );
}
