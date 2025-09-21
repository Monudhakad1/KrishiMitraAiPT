import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
} from "react-native";
import { Card, Button, FAB, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { DiseaseDetectionService } from "../../data/enhancedServices";

const { width, height } = Dimensions.get("window");

export default function DiseaseDetection() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanStage, setScanStage] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [imageScanned, setImageScanned] = useState(false);

  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for scan button
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (!scanning && !diagnosis) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [scanning, diagnosis, pulseAnim]);

  const startScanAnimation = () => {
    // Scan line animation
    Animated.loop(
      Animated.timing(scanLineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleImageScan = async () => {
    setScanning(true);
    setProgress(0);
    setScanStage("Initializing camera...");
    setImageScanned(true);
    startScanAnimation();

    // Simulate image scanning process
    const stages = [
      { stage: "Capturing image...", progress: 10, delay: 500 },
      { stage: "Preprocessing image...", progress: 25, delay: 800 },
      { stage: "Analyzing leaf structure...", progress: 40, delay: 1000 },
      { stage: "Detecting patterns...", progress: 60, delay: 1200 },
      {
        stage: "Comparing with disease database...",
        progress: 80,
        delay: 1000,
      },
      { stage: "Generating diagnosis...", progress: 100, delay: 800 },
    ];

    for (const stageInfo of stages) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setScanStage(stageInfo.stage);
          setProgress(stageInfo.progress / 100);
          resolve();
        }, stageInfo.delay);
      });
    }

    // Get diagnosis result
    try {
      const result = await DiseaseDetectionService.analyzeImage(
        "dummy-image-uri"
      );
      setDiagnosis(result.result);
    } catch (error) {
      Alert.alert("Error", "Failed to analyze image. Please try again.");
    } finally {
      setScanning(false);
      setScanStage("");
      setProgress(0);
    }
  };

  const resetScanner = () => {
    setDiagnosis(null);
    setImageScanned(false);
    setScanning(false);
    setProgress(0);
    setScanStage("");
    scanLineAnim.setValue(0);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Mild: "#4CAF50",
      Moderate: "#FF9800",
      Severe: "#F44336",
    };
    return colors[severity] || "#4CAF50";
  };

  if (diagnosis) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.header}
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
          <Text style={styles.headerTitle}>Disease Diagnosis</Text>
          <Button
            mode="text"
            onPress={resetScanner}
            textColor="white"
            style={styles.resetButton}
          >
            Scan Again
          </Button>
        </LinearGradient>

        <View style={styles.content}>
          {/* Diagnosis Result */}
          <Card style={styles.diagnosisCard}>
            <LinearGradient
              colors={["#FFF3E0", "#FFFFFF"]}
              style={styles.diagnosisGradient}
            >
              <View style={styles.diagnosisHeader}>
                <MaterialIcons name="biotech" size={50} color={COLORS.accent} />
                <View style={styles.diagnosisInfo}>
                  <Text style={styles.diseaseName}>{diagnosis.name}</Text>
                  <Text style={styles.diseaseNameHindi}>
                    {diagnosis.nameHindi}
                  </Text>
                  <View style={styles.severityContainer}>
                    <View
                      style={[
                        styles.severityIndicator,
                        {
                          backgroundColor: getSeverityColor(diagnosis.severity),
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.severity,
                        { color: getSeverityColor(diagnosis.severity) },
                      ]}
                    >
                      {diagnosis.severity} • {diagnosis.severityHindi}
                    </Text>
                  </View>
                  <View style={styles.confidenceContainer}>
                    <MaterialIcons
                      name="verified"
                      size={16}
                      color={COLORS.primary}
                    />
                    <Text style={styles.confidence}>
                      {diagnosis.confidence}% Confidence
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Card>

          {/* Description */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>
                Disease Description / रोग विवरण
              </Text>
              <Text style={styles.description}>{diagnosis.description}</Text>
              <Text style={styles.descriptionHindi}>
                {diagnosis.descriptionHindi}
              </Text>
            </Card.Content>
          </Card>

          {/* Symptoms */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Symptoms / लक्षण</Text>
              {diagnosis.symptoms.map((symptom, index) => (
                <View key={index} style={styles.listItem}>
                  <MaterialIcons
                    name="fiber-manual-record"
                    size={12}
                    color={COLORS.accent}
                  />
                  <Text style={styles.listText}>{symptom}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Treatment Steps */}
          <Card style={[styles.infoCard, styles.treatmentCard]}>
            <Card.Content>
              <Text style={styles.sectionTitle}>
                Treatment Steps / उपचार के चरण
              </Text>
              <Text style={styles.treatmentSubtitle}>
                Follow these steps immediately:
              </Text>

              {diagnosis.treatments.map((treatment, index) => (
                <View key={index} style={styles.treatmentStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.treatmentText}>{treatment}</Text>
                    <Text style={styles.treatmentTextHindi}>
                      {diagnosis.treatmentsHindi[index]}
                    </Text>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Preventive Measures */}
          <Card style={styles.infoCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>
                Prevention Tips / रोकथाम युक्तियाँ
              </Text>
              {diagnosis.preventiveMeasures.map((measure, index) => (
                <View key={index} style={styles.listItem}>
                  <MaterialIcons
                    name="shield"
                    size={16}
                    color={COLORS.primary}
                  />
                  <Text style={styles.listText}>{measure}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              style={[styles.actionButton, { backgroundColor: COLORS.accent }]}
              labelStyle={styles.actionButtonLabel}
              icon="phone"
              onPress={() =>
                Alert.alert(
                  "Expert Support",
                  "Connecting you with agricultural experts..."
                )
              }
            >
              Call Expert
            </Button>
            <Button
              mode="outlined"
              style={[styles.actionButton, { borderColor: COLORS.primary }]}
              labelStyle={[styles.actionButtonLabel, { color: COLORS.primary }]}
              icon="bookmark"
              onPress={() =>
                Alert.alert("Saved!", "Diagnosis saved to your records.")
              }
            >
              Save Report
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
        style={styles.header}
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
        <Text style={styles.headerTitle}>Disease Detection</Text>
        <Text style={styles.headerSubtitle}>
          AI-Powered Plant Health Scanner
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scannerContainer}
        contentContainerStyle={styles.scannerContent}
      >
        {/* Scanner Area */}
        <Card style={styles.scannerCard}>
          <View style={styles.scannerArea}>
            {!imageScanned ? (
              // Initial state - camera placeholder
              <View style={styles.cameraPlaceholder}>
                <Animated.View
                  style={[
                    styles.cameraIcon,
                    { transform: [{ scale: pulseAnim }] },
                  ]}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={80}
                    color={COLORS.primary}
                  />
                </Animated.View>
                <Text style={styles.scannerText}>Tap to scan plant leaf</Text>
                <Text style={styles.scannerTextHindi}>
                  पत्ती स्कैन करने के लिए टैप करें
                </Text>
              </View>
            ) : (
              // Scanning state - image with overlay
              <View style={styles.imageContainer}>
                <View style={styles.mockImage}>
                  <MaterialIcons name="eco" size={120} color="#8BC34A" />
                </View>

                {scanning && (
                  <View style={styles.scanOverlay}>
                    <Animated.View
                      style={[
                        styles.scanLine,
                        {
                          transform: [
                            {
                              translateY: scanLineAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-200, 200],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                    <View style={styles.scanCorners}>
                      <View style={[styles.corner, styles.topLeft]} />
                      <View style={[styles.corner, styles.topRight]} />
                      <View style={[styles.corner, styles.bottomLeft]} />
                      <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </Card>

        {/* Progress Section */}
        {scanning && (
          <Card style={styles.progressCard}>
            <Card.Content>
              <View style={styles.progressHeader}>
                <MaterialIcons name="biotech" size={24} color={COLORS.accent} />
                <Text style={styles.progressTitle}>Analyzing Image</Text>
              </View>
              <ProgressBar
                progress={progress}
                color={COLORS.primary}
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>{scanStage}</Text>
              <Text style={styles.progressPercentage}>
                {Math.round(progress * 100)}%
              </Text>
            </Card.Content>
          </Card>
        )}

        {/* Instructions */}
        {!imageScanned && !scanning && (
          <Card style={styles.instructionsCard}>
            <Card.Content>
              <Text style={styles.instructionsTitle}>
                How to get best results:
              </Text>
              <View style={styles.instructionList}>
                <View style={styles.instructionItem}>
                  <MaterialIcons
                    name="wb-sunny"
                    size={20}
                    color={COLORS.accent}
                  />
                  <Text style={styles.instructionText}>
                    Ensure good lighting
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <MaterialIcons
                    name="center-focus-strong"
                    size={20}
                    color={COLORS.accent}
                  />
                  <Text style={styles.instructionText}>
                    Focus on affected leaf area
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <MaterialIcons
                    name="straighten"
                    size={20}
                    color={COLORS.accent}
                  />
                  <Text style={styles.instructionText}>
                    Keep the leaf flat and stable
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <MaterialIcons
                    name="crop_free"
                    size={20}
                    color={COLORS.accent}
                  />
                  <Text style={styles.instructionText}>
                    Fill the frame with the leaf
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Recent Scans */}
        <Card style={styles.recentScansCard}>
          <Card.Content>
            <Text style={styles.recentTitle}>
              Recent Diagnoses / हाल का निदान
            </Text>
            <Text style={styles.recentSubtitle}>
              Your scanning history will appear here
            </Text>
            <View style={styles.emptyState}>
              <MaterialIcons
                name="history"
                size={40}
                color={COLORS.textSecondary}
              />
              <Text style={styles.emptyText}>No previous scans</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      {!scanning && (
        <FAB
          icon={imageScanned ? "refresh" : "camera"}
          style={[styles.fab, { backgroundColor: COLORS.primary }]}
          color="white"
          onPress={imageScanned ? resetScanner : handleImageScan}
          label={imageScanned ? "Scan Again" : "Scan Leaf"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: SPACING.sm,
    top: 50,
  },
  resetButton: {
    position: "absolute",
    right: SPACING.sm,
    top: 50,
  },
  headerTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    marginTop: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.small,
    color: "rgba(255,255,255,0.8)",
    marginTop: SPACING.xs,
  },
  scannerContainer: {
    flex: 1,
  },
  scannerContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  scannerCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: SPACING.lg,
    overflow: "hidden",
  },
  scannerArea: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  cameraPlaceholder: {
    alignItems: "center",
  },
  cameraIcon: {
    marginBottom: SPACING.lg,
  },
  scannerText: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  scannerTextHindi: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mockImage: {
    width: 200,
    height: 200,
    backgroundColor: "#E8F5E8",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C8E6C9",
  },
  scanOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanLine: {
    width: "80%",
    height: 3,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  scanCorners: {
    position: "absolute",
    top: "25%",
    left: "25%",
    right: "25%",
    bottom: "25%",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  progressCard: {
    borderRadius: 12,
    elevation: 3,
    marginBottom: SPACING.lg,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  progressTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: SPACING.md,
  },
  progressText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  progressPercentage: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  instructionsCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: SPACING.lg,
  },
  instructionsTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  instructionList: {
    marginLeft: SPACING.sm,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  instructionText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  recentScansCard: {
    borderRadius: 12,
    elevation: 2,
  },
  recentTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  recentSubtitle: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  emptyText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
  },
  diagnosisCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: SPACING.lg,
    overflow: "hidden",
  },
  diagnosisGradient: {
    padding: SPACING.lg,
  },
  diagnosisHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  diagnosisInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  diseaseName: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: "bold",
    color: COLORS.text,
  },
  diseaseNameHindi: {
    fontSize: FONTS.sizes.large,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  severityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  severity: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  confidence: {
    fontSize: FONTS.sizes.small,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: SPACING.xs,
  },
  infoCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: SPACING.md,
  },
  treatmentCard: {
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  descriptionHindi: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    lineHeight: 18,
    fontStyle: "italic",
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
  treatmentSubtitle: {
    fontSize: FONTS.sizes.small,
    color: COLORS.accent,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  treatmentStep: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  stepNumberText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: "white",
  },
  stepContent: {
    flex: 1,
  },
  treatmentText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  treatmentTextHindi: {
    fontSize: FONTS.sizes.small - 1,
    color: COLORS.textSecondary,
    lineHeight: 18,
    fontStyle: "italic",
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
