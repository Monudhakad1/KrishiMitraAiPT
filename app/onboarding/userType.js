import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

export default function UserTypeScreen() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState(null);

  const userTypes = [
    {
      id: "farmers",
      name: "Farmer",
      nameHindi: "किसान",
      icon: "agriculture",
      description: "Grow crops, manage farm operations, get AI insights",
      descriptionHindi:
        "फसलें उगाएं, कृषि कार्यों का प्रबंधन करें, AI की जानकारी पाएं",
      color: "#4CAF50",
      features: [
        "Crop Management",
        "Weather Insights",
        "Market Prices",
        "AI Recommendations",
      ],
    },
    {
      id: "consumers",
      name: "Consumer",
      nameHindi: "उपभोक्ता",
      icon: "shopping-cart",
      description: "Buy fresh produce, connect with local farmers",
      descriptionHindi: "ताजी उपज खरीदें, स्थानीय किसानों से जुड़ें",
      color: "#2196F3",
      features: [
        "Fresh Produce",
        "Direct from Farmers",
        "Quality Assured",
        "Fair Prices",
      ],
    },
    {
      id: "dealers",
      name: "Dealer",
      nameHindi: "व्यापारी",
      icon: "store",
      description: "Trade agricultural products, manage inventory",
      descriptionHindi:
        "कृषि उत्पादों का व्यापार करें, इन्वेंटरी प्रबंधित करें",
      color: "#FF9800",
      features: [
        "Bulk Trading",
        "Inventory Management",
        "Market Analytics",
        "Supply Chain",
      ],
    },
  ];

  const handleUserTypeSelect = (userTypeId) => {
    setSelectedUserType(userTypeId);
  };

  const handleContinue = () => {
    if (selectedUserType) {
      // Navigate to login with user type parameter
      router.push(`/auth/login?userType=${selectedUserType}`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="person-outline" size={60} color={COLORS.primary} />
        <Text style={styles.title}>Who Are You?</Text>
        <Text style={styles.subtitle}>आप कौन हैं?</Text>
        <Text style={styles.description}>
          Select your role to get personalized experience
        </Text>
      </View>

      {/* User Type Options */}
      <View style={styles.userTypeContainer}>
        {userTypes.map((userType) => (
          <Card
            key={userType.id}
            style={[
              styles.card,
              selectedUserType === userType.id && styles.selectedCard,
            ]}
            onPress={() => handleUserTypeSelect(userType.id)}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: userType.color + "20" },
                  ]}
                >
                  <MaterialIcons
                    name={userType.icon}
                    size={32}
                    color={userType.color}
                  />
                </View>

                <View style={styles.userTypeInfo}>
                  <Text
                    style={[
                      styles.userTypeName,
                      selectedUserType === userType.id && {
                        color: userType.color,
                      },
                    ]}
                  >
                    {userType.name}
                  </Text>
                  <Text
                    style={[
                      styles.userTypeNameHindi,
                      selectedUserType === userType.id && {
                        color: userType.color,
                      },
                    ]}
                  >
                    {userType.nameHindi}
                  </Text>
                </View>

                {selectedUserType === userType.id && (
                  <MaterialIcons
                    name="check-circle"
                    size={24}
                    color={userType.color}
                  />
                )}
              </View>

              <Text style={styles.userTypeDescription}>
                {userType.description}
              </Text>
              <Text style={styles.userTypeDescriptionHindi}>
                {userType.descriptionHindi}
              </Text>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {userType.features.map((feature, index) => (
                  <View key={index} style={styles.feature}>
                    <MaterialIcons
                      name="check"
                      size={16}
                      color={userType.color}
                    />
                    <Text
                      style={[styles.featureText, { color: userType.color }]}
                    >
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!selectedUserType}
          style={[
            styles.continueButton,
            !selectedUserType && styles.disabledButton,
          ]}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Continue / आगे बढ़ें
        </Button>

        <Text style={styles.helpText}>
          You can change your role later in settings
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    paddingTop: SPACING.xxl,
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
  description: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: "center",
    fontStyle: "italic",
  },
  userTypeContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    elevation: 2,
    borderRadius: 16,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    elevation: 4,
    backgroundColor: "#F8FFF8",
  },
  cardContent: {
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  userTypeInfo: {
    flex: 1,
  },
  userTypeName: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
  },
  userTypeNameHindi: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  userTypeDescription: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  userTypeDescriptionHindi: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.sm,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
    width: "48%",
  },
  featureText: {
    fontSize: FONTS.sizes.small,
    marginLeft: SPACING.xs,
    fontWeight: "500",
  },
  bottomContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
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
