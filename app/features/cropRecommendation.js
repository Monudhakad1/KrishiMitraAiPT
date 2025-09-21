import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import {
  Card,
  Button,
  TextInput,
  RadioButton,
  ActivityIndicator,
  Chip,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { CropRecommendationService } from "../../data/enhancedServices";

const { width } = Dimensions.get("window");

export default function CropRecommendation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [formData, setFormData] = useState({
    location: "Punjab",
    soilType: "Loamy",
    season: "Kharif",
    landSize: "5",
    previousCrop: "",
    budget: "",
  });

  const soilTypes = [
    { label: "Loamy / दोमट", value: "Loamy" },
    { label: "Clay / चिकनी", value: "Clay" },
    { label: "Sandy / रेतीली", value: "Sandy" },
    { label: "Black Cotton / काली कपास", value: "BlackCotton" },
  ];

  const seasons = [
    { label: "Kharif / खरीफ", value: "Kharif" },
    { label: "Rabi / रबी", value: "Rabi" },
    { label: "Zaid / जायद", value: "Zaid" },
  ];

  const handleGetRecommendation = async () => {
    if (
      !formData.location ||
      !formData.soilType ||
      !formData.season ||
      !formData.landSize
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await CropRecommendationService.getCropRecommendations(
        formData.location,
        formData.soilType,
        formData.season,
        formData.landSize
      );
      setRecommendation(result);
    } catch (error) {
      Alert.alert("Error", "Failed to get recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setRecommendation(null);
    setFormData({
      location: "Punjab",
      soilType: "Loamy",
      season: "Kharif",
      landSize: "5",
      previousCrop: "",
      budget: "",
    });
  };

  if (recommendation && !loading) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            mode="text"
            onPress={() => router.back()}
            icon="arrow-left"
            textColor="white"
            style={styles.backButton}
          >
            Back
          </Button>
          <Text style={styles.headerTitle}>Crop Recommendation</Text>
          <Button
            mode="text"
            onPress={resetForm}
            textColor="white"
            style={styles.resetButton}
          >
            New Search
          </Button>
        </View>

        {/* Recommendation Result */}
        <View style={styles.content}>
          {/* Main Recommendation Card */}
          <Card style={styles.recommendationCard}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.recommendationGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.recommendationHeader}>
                <View style={styles.cropInfo}>
                  <Text style={styles.recommendedCrop}>
                    {recommendation.crop}
                  </Text>
                  <Text style={styles.recommendedCropHindi}>
                    {recommendation.cropHindi}
                  </Text>
                  <View style={styles.confidenceContainer}>
                    <MaterialIcons name="verified" size={16} color="white" />
                    <Text style={styles.confidence}>
                      {recommendation.confidence}% Match
                    </Text>
                  </View>
                </View>
                <View style={styles.cropIcon}>
                  <MaterialIcons name="eco" size={60} color="white" />
                </View>
              </View>
            </LinearGradient>
          </Card>

          {/* Key Metrics */}
          <View style={styles.metricsContainer}>
            <Card style={styles.metricCard}>
              <View style={styles.metricContent}>
                <MaterialIcons
                  name="trending-up"
                  size={24}
                  color={COLORS.primary}
                />
                <View style={styles.metricInfo}>
                  <Text style={styles.metricValue}>
                    {recommendation.expectedYield}
                  </Text>
                  <Text style={styles.metricLabel}>Expected Yield</Text>
                  <Text style={styles.metricLabelHindi}>
                    {recommendation.expectedYieldHindi}
                  </Text>
                </View>
              </View>
            </Card>

            <Card style={styles.metricCard}>
              <View style={styles.metricContent}>
                <MaterialIcons name="water-drop" size={24} color="#2196F3" />
                <View style={styles.metricInfo}>
                  <Text style={styles.metricValue}>
                    {recommendation.waterRequirement}
                  </Text>
                  <Text style={styles.metricLabel}>Water Needed</Text>
                  <Text style={styles.metricLabelHindi}>
                    {recommendation.waterRequirementHindi}
                  </Text>
                </View>
              </View>
            </Card>

            <Card style={styles.metricCard}>
              <View style={styles.metricContent}>
                <MaterialIcons
                  name="schedule"
                  size={24}
                  color={COLORS.accent}
                />
                <View style={styles.metricInfo}>
                  <Text style={styles.metricValue}>
                    {recommendation.sowingTime}
                  </Text>
                  <Text style={styles.metricLabel}>Sowing Time</Text>
                  <Text style={styles.metricLabelHindi}>
                    {recommendation.sowingTimeHindi}
                  </Text>
                </View>
              </View>
            </Card>

            <Card style={styles.metricCard}>
              <View style={styles.metricContent}>
                <MaterialIcons
                  name="currency-rupee"
                  size={24}
                  color="#4CAF50"
                />
                <View style={styles.metricInfo}>
                  <Text style={styles.metricValue}>
                    {recommendation.profitMargin}
                  </Text>
                  <Text style={styles.metricLabel}>Expected Profit</Text>
                  <Text style={styles.metricLabelHindi}>अपेक्षित लाभ</Text>
                </View>
              </View>
            </Card>
          </View>

          {/* Detailed Information */}
          <Card style={styles.detailCard}>
            <Card.Content>
              <Text style={styles.detailTitle}>
                Market Information / बाजार जानकारी
              </Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Market Price:</Text>
                <Text style={styles.detailValue}>
                  {recommendation.marketPrice}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Growth Period:</Text>
                <Text style={styles.detailValue}>
                  {recommendation.growthPeriod}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Advantages */}
          <Card style={styles.detailCard}>
            <Card.Content>
              <Text style={styles.detailTitle}>Advantages / फायदे</Text>
              {recommendation.advantages.map((advantage, index) => (
                <View key={index} style={styles.listItem}>
                  <MaterialIcons
                    name="check-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.listText}>{advantage}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Tips */}
          <Card style={styles.detailCard}>
            <Card.Content>
              <Text style={styles.detailTitle}>
                Expert Tips / विशेषज्ञ सुझाव
              </Text>
              {recommendation.tips.map((tip, index) => (
                <View key={index} style={styles.listItem}>
                  <MaterialIcons
                    name="lightbulb"
                    size={16}
                    color={COLORS.accent}
                  />
                  <Text style={styles.listText}>{tip}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
              labelStyle={styles.actionButtonLabel}
              onPress={() =>
                Alert.alert(
                  "Feature Coming Soon",
                  "Seed purchasing feature will be available soon!"
                )
              }
            >
              Buy Seeds
            </Button>
            <Button
              mode="outlined"
              style={[styles.actionButton, { borderColor: COLORS.primary }]}
              labelStyle={[styles.actionButtonLabel, { color: COLORS.primary }]}
              onPress={() =>
                Alert.alert("Saved!", "Recommendation saved to your profile.")
              }
            >
              Save Plan
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.headerGradient}
      >
        <Button
          mode="text"
          onPress={() => router.back()}
          icon="arrow-left"
          textColor="white"
          style={styles.backButton}
        >
          Back
        </Button>
        <Text style={styles.headerTitle}>Crop Recommendation</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Crop Selection</Text>
      </LinearGradient>

      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Form */}
        <Card style={styles.formCard}>
          <Card.Content style={styles.formContent}>
            <Text style={styles.formTitle}>
              Tell us about your farm / अपने खेत के बारे में बताएं
            </Text>

            {/* Location */}
            <TextInput
              label="Location / स्थान"
              value={formData.location}
              onChangeText={(value) => updateFormData("location", value)}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="map-marker" />}
            />

            {/* Soil Type */}
            <View style={styles.radioSection}>
              <Text style={styles.radioTitle}>
                Soil Type / मिट्टी का प्रकार
              </Text>
              <RadioButton.Group
                onValueChange={(value) => updateFormData("soilType", value)}
                value={formData.soilType}
              >
                {soilTypes.map((type) => (
                  <View key={type.value} style={styles.radioItem}>
                    <RadioButton value={type.value} color={COLORS.primary} />
                    <Text style={styles.radioLabel}>{type.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>

            {/* Season */}
            <View style={styles.radioSection}>
              <Text style={styles.radioTitle}>Season / मौसम</Text>
              <RadioButton.Group
                onValueChange={(value) => updateFormData("season", value)}
                value={formData.season}
              >
                {seasons.map((season) => (
                  <View key={season.value} style={styles.radioItem}>
                    <RadioButton value={season.value} color={COLORS.primary} />
                    <Text style={styles.radioLabel}>{season.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>

            {/* Land Size */}
            <TextInput
              label="Land Size (in acres) / भूमि का आकार (एकड़ में)"
              value={formData.landSize}
              onChangeText={(value) => updateFormData("landSize", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              left={<TextInput.Icon icon="crop-landscape" />}
            />

            {/* Optional Fields */}
            <TextInput
              label="Previous Crop (Optional) / पिछली फसल"
              value={formData.previousCrop}
              onChangeText={(value) => updateFormData("previousCrop", value)}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="history" />}
            />

            <TextInput
              label="Budget (Optional) / बजट"
              value={formData.budget}
              onChangeText={(value) => updateFormData("budget", value)}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              left={<TextInput.Icon icon="currency-rupee" />}
            />
          </Card.Content>
        </Card>

        {/* Submit Button */}
        <Button
          mode="contained"
          onPress={handleGetRecommendation}
          loading={loading}
          disabled={loading}
          style={styles.submitButton}
          labelStyle={styles.submitButtonLabel}
          contentStyle={styles.submitButtonContent}
        >
          {loading
            ? "Getting AI Recommendation..."
            : "Get AI Recommendation 🤖"}
        </Button>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>
              Analyzing your farm conditions...
            </Text>
            <Text style={styles.loadingSubtext}>
              AI is processing optimal crop suggestions
            </Text>
          </View>
        )}

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    marginLeft: -SPACING.sm,
  },
  resetButton: {
    marginRight: -SPACING.sm,
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.small,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  formCard: {
    marginTop: SPACING.lg,
    borderRadius: 16,
    elevation: 3,
  },
  formContent: {
    padding: SPACING.lg,
  },
  formTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  radioSection: {
    marginBottom: SPACING.lg,
  },
  radioTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  radioLabel: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
    borderRadius: 25,
    elevation: 3,
  },
  submitButtonContent: {
    paddingVertical: SPACING.sm,
  },
  submitButtonLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  loadingText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  loadingSubtext: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  recommendationCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: SPACING.lg,
    overflow: "hidden",
  },
  recommendationGradient: {
    padding: SPACING.lg,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cropInfo: {
    flex: 1,
  },
  recommendedCrop: {
    fontSize: FONTS.sizes.xxlarge,
    fontWeight: "bold",
    color: "white",
  },
  recommendedCropHindi: {
    fontSize: FONTS.sizes.large,
    color: "rgba(255,255,255,0.9)",
    marginTop: SPACING.xs,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  confidence: {
    fontSize: FONTS.sizes.medium,
    color: "white",
    fontWeight: "bold",
    marginLeft: SPACING.xs,
  },
  cropIcon: {
    opacity: 0.7,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  metricCard: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderRadius: 12,
    elevation: 2,
  },
  metricContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  metricInfo: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  metricValue: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.text,
  },
  metricLabel: {
    fontSize: FONTS.sizes.small - 2,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  metricLabelHindi: {
    fontSize: FONTS.sizes.small - 3,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  detailCard: {
    marginBottom: SPACING.md,
    borderRadius: 12,
    elevation: 2,
  },
  detailTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.text,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  listText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  actionButton: {
    width: "48%",
    borderRadius: 25,
  },
  actionButtonLabel: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
  },
});
