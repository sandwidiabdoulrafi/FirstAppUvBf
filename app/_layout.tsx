import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Stack >
      <Stack.Screen name="Accueil" 
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#137C8B',
          },
          headerTintColor: 'white',
          contentStyle:{backgroundColor: '#137C8B'}
        }}
      />
      </Stack>
    </GestureHandlerRootView>
  );
}
