import { useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

const { width } = Dimensions.get("window");

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const languages = [
    {
      id: "en",
      name: "English",
      nativeName: "English",
      icon: "language",
      flag: "🇬🇧",
    },
    {
      id: "hi",
      name: "Hindi",
      nativeName: "हिंदी",
      icon: "language",
      flag: "🇮🇳",
    },
  ];

  const handleLanguageSelect = (languageId) => {
    setSelectedLanguage(languageId);

    // Add a subtle animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      // Here you would typically store the language preference
      router.push("/onboarding/userType");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="translate" size={60} color={COLORS.primary} />
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.subtitle}>अपनी भाषा चुनें</Text>
      </View>

      {/* Language Options */}
      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <Animated.View
            key={language.id}
            style={[styles.languageCard, { transform: [{ scale: scaleAnim }] }]}
          >
            <Card
              style={[
                styles.card,
                selectedLanguage === language.id && styles.selectedCard,
              ]}
              onPress={() => handleLanguageSelect(language.id)}
            >
              <Card.Content style={styles.cardContent}>
                <View style={styles.languageInfo}>
                  <Text style={styles.flag}>{language.flag}</Text>
                  <View style={styles.languageText}>
                    <Text
                      style={[
                        styles.languageName,
                        selectedLanguage === language.id && styles.selectedText,
                      ]}
                    >
                      {language.name}
                    </Text>
                    <Text
                      style={[
                        styles.languageNative,
                        selectedLanguage === language.id &&
                          styles.selectedNativeText,
                      ]}
                    >
                      {language.nativeName}
                    </Text>
                  </View>
                </View>

                {selectedLanguage === language.id && (
                  <MaterialIcons
                    name="check-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                )}
              </Card.Content>
            </Card>
          </Animated.View>
        ))}
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!selectedLanguage}
          style={[
            styles.continueButton,
            !selectedLanguage && styles.disabledButton,
          ]}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          {selectedLanguage === "hi" ? "आगे बढ़ें" : "Continue"}
        </Button>

        <Text style={styles.helpText}>
          {selectedLanguage === "hi"
            ? "आप बाद में भाषा बदल सकते हैं"
            : "You can change the language later"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xxl,
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONTS.sizes.large,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  languageContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: SPACING.lg,
  },
  languageCard: {
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    elevation: 4,
    backgroundColor: "#E8F5E8",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  languageInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  selectedText: {
    color: COLORS.primary,
  },
  languageNative: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
  },
  selectedNativeText: {
    color: COLORS.primary,
  },
  bottomContainer: {
    paddingTop: SPACING.lg,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginBottom: SPACING.md,
  },
  disabledButton: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonContent: {
    paddingVertical: SPACING.sm,
  },
  buttonLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  helpText: {
    textAlign: "center",
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
});
