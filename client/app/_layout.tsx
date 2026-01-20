import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="class-details"
          options={{
            headerShown: true,
            title: "Class Name",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "transparent",
            },
            contentStyle: {
              flex: 1,
            },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
