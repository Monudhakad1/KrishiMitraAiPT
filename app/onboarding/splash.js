import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.3));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start animation sequence
    Animated.sequence([
      // Fade in logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Wait a bit
      Animated.delay(500),
    ]).start(() => {
      setShowContent(true);
    });
  }, []);

  const handleGetStarted = () => {
    router.push("/onboarding/language");
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <MaterialIcons name="agriculture" size={80} color={COLORS.primary} />
          <Text style={styles.appName}>KrishiMitra AI</Text>
          <Text style={styles.subtitle}>कृषि मित्र एआई</Text>
          <Text style={styles.tagline}>Your Smart Farming Companion</Text>
        </Animated.View>
      </View>

      {/* Content Section */}
      {showContent && (
        <Animated.View
          style={[
            styles.contentSection,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <MaterialIcons
                name="smart-toy"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.featureText}>AI-Powered Insights</Text>
            </View>
            <View style={styles.feature}>
              <MaterialIcons
                name="trending-up"
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.featureText}>Market Intelligence</Text>
            </View>
            <View style={styles.feature}>
              <MaterialIcons name="eco" size={24} color={COLORS.primary} />
              <Text style={styles.featureText}>Sustainable Farming</Text>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            Get Started / शुरू करें
          </Button>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    paddingVertical: SPACING.xxl,
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  logoContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: FONTS.sizes.xxlarge,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONTS.sizes.large,
    color: COLORS.primary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  tagline: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: "center",
    fontStyle: "italic",
  },
  contentSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  featuresContainer: {
    marginBottom: SPACING.xl,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  featureText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    marginLeft: SPACING.md,
    fontWeight: "500",
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContent: {
    paddingVertical: SPACING.sm,
  },
  buttonLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
