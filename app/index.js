import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants/theme";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to splash screen
    const timer = setTimeout(() => {
      router.replace("/onboarding/splash");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}
