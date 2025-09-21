import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/theme";

const theme = {
  colors: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    surface: COLORS.surface,
    background: COLORS.background,
    text: COLORS.text,
    accent: COLORS.accent,
    error: COLORS.error,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Authentication Routes */}
        <Stack.Screen
          name="auth/login"
          options={{ title: "Login", headerShown: false }}
        />

        {/* Onboarding Routes */}
        <Stack.Screen
          name="onboarding/splash"
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="onboarding/language"
          options={{ title: "Language", headerShown: false }}
        />
        <Stack.Screen
          name="onboarding/userType"
          options={{ title: "User Type", headerShown: false }}
        />

        {/* Dashboard Routes */}
        <Stack.Screen
          name="dashboard/farmer"
          options={{ title: "Farmer Dashboard", headerShown: false }}
        />
        <Stack.Screen
          name="dashboard/consumer"
          options={{ title: "Consumer Dashboard", headerShown: false }}
        />
        <Stack.Screen
          name="dashboard/dealer"
          options={{ title: "Dealer Dashboard", headerShown: false }}
        />

        {/* Feature Routes - Only existing ones */}
        <Stack.Screen
          name="features/diseaseDetection"
          options={{ title: "Disease Detection", headerShown: false }}
        />
        <Stack.Screen
          name="features/cropRecommendation"
          options={{ title: "Crop Recommendation", headerShown: false }}
        />
        <Stack.Screen
          name="features/aiAssistant"
          options={{ title: "AI Assistant", headerShown: false }}
        />
        <Stack.Screen
          name="features/farmAnalytics"
          options={{ title: "Farm Analytics", headerShown: false }}
        />

        {/* Phase 3 Routes */}
        <Stack.Screen
          name="community/feed"
          options={{ title: "Community Feed", headerShown: false }}
        />
        <Stack.Screen
          name="finance/expenseTracker"
          options={{ title: "Expense Tracker", headerShown: false }}
        />
        <Stack.Screen
          name="supply/chainLog"
          options={{ title: "Supply Chain Log", headerShown: false }}
        />

        {/* Phase 4 Routes - Chat */}
        <Stack.Screen
          name="chat/farmer-chat"
          options={{ title: "Chat with Farmer", headerShown: false }}
        />

        {/* Phase 4 Routes - Dealer */}
        <Stack.Screen
          name="dealer/product-management"
          options={{ title: "Product Management", headerShown: false }}
        />
      </Stack>
    </PaperProvider>
  );
}
