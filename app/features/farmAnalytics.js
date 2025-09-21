import { useState, useEffect, useRef } from "react";
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
  SegmentedButtons,
  Switch,
  FAB,
  Chip,
} from "react-native-paper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { FarmAnalyticsService } from "../../data/enhancedServices";

const { width } = Dimensions.get("window");
const chartWidth = width - 40;

export default function FarmAnalytics() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("all");

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedPeriod]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      const data = await FarmAnalyticsService.getAnalyticsData(selectedPeriod);
      setAnalyticsData(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    backgroundColor: COLORS.primary,
    backgroundGradientFrom: COLORS.primary,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: COLORS.accent,
    },
  };

  const chartConfigLight = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#f8f9fa",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(67, 155, 72, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: COLORS.primary,
    },
  };

  const periodButtons = [
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const metricButtons = [
    { value: "all", label: "All" },
    { value: "soil", label: "Soil" },
    { value: "crop", label: "Crops" },
    { value: "yield", label: "Yield" },
  ];

  const renderOverviewCards = () => {
    if (!analyticsData.overview) return null;

    return (
      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Farm Overview</Text>
        <View style={styles.overviewGrid}>
          {analyticsData.overview.map((item, index) => (
            <Card key={index} style={styles.overviewCard}>
              <Card.Content style={styles.overviewContent}>
                <MaterialIcons
                  name={item.icon}
                  size={32}
                  color={item.color || COLORS.primary}
                />
                <Text style={styles.overviewValue}>{item.value}</Text>
                <Text style={styles.overviewLabel}>{item.label}</Text>
                {item.trend && (
                  <View style={styles.trendContainer}>
                    <MaterialIcons
                      name={item.trend > 0 ? "trending-up" : "trending-down"}
                      size={16}
                      color={item.trend > 0 ? "#4CAF50" : "#F44336"}
                    />
                    <Text
                      style={[
                        styles.trendText,
                        { color: item.trend > 0 ? "#4CAF50" : "#F44336" },
                      ]}
                    >
                      {Math.abs(item.trend)}%
                    </Text>
                  </View>
                )}
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>
    );
  };

  const renderSoilMoistureChart = () => {
    if (!analyticsData.soilMoisture) return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons name="water-drop" size={24} color={COLORS.primary} />
            <Text style={styles.chartTitle}>Soil Moisture Levels</Text>
          </View>
          <LineChart
            data={analyticsData.soilMoisture}
            width={chartWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={false}
          />
          <View style={styles.chartInsights}>
            <Chip icon="info" style={styles.insightChip}>
              Optimal range: 60-80%
            </Chip>
            <Text style={styles.insightText}>
              Current average:{" "}
              {analyticsData.soilMoisture.datasets[0].data.slice(-1)[0]}%
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderCropGrowthChart = () => {
    if (
      !analyticsData.cropGrowth ||
      (selectedMetric !== "all" && selectedMetric !== "crop")
    )
      return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons name="eco" size={24} color={COLORS.secondary} />
            <Text style={styles.chartTitle}>Crop Growth Rates</Text>
          </View>
          <BarChart
            data={analyticsData.cropGrowth}
            width={chartWidth - 40}
            height={220}
            chartConfig={chartConfigLight}
            style={styles.chart}
            showValuesOnTopOfBars
            fromZero
          />
          <View style={styles.chartInsights}>
            <Chip
              icon="trending-up"
              style={[styles.insightChip, { backgroundColor: "#E8F5E8" }]}
            >
              Growth rate: +12% this {selectedPeriod}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderYieldPredictionChart = () => {
    if (
      !analyticsData.yieldPrediction ||
      (selectedMetric !== "all" && selectedMetric !== "yield")
    )
      return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons name="analytics" size={24} color={COLORS.accent} />
            <Text style={styles.chartTitle}>Yield Predictions</Text>
            <Switch
              value={showPredictions}
              onValueChange={setShowPredictions}
              color={COLORS.primary}
            />
          </View>
          {showPredictions && (
            <LineChart
              data={analyticsData.yieldPrediction}
              width={chartWidth - 40}
              height={220}
              chartConfig={{
                ...chartConfig,
                backgroundGradientFrom: COLORS.accent,
                backgroundGradientTo: COLORS.secondary,
              }}
              style={styles.chart}
              withDots
              withShadow
            />
          )}
          <View style={styles.predictionInsights}>
            <Text style={styles.predictionTitle}>AI Predictions</Text>
            <Text style={styles.predictionText}>
              • Expected harvest:{" "}
              <Text style={styles.predictionValue}>2.3 tons/acre</Text>
            </Text>
            <Text style={styles.predictionText}>
              • Confidence level:{" "}
              <Text style={styles.predictionValue}>87%</Text>
            </Text>
            <Text style={styles.predictionText}>
              • Best harvest time:{" "}
              <Text style={styles.predictionValue}>Next 2 weeks</Text>
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderCropDistribution = () => {
    if (!analyticsData.cropDistribution) return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons name="pie-chart" size={24} color={COLORS.primary} />
            <Text style={styles.chartTitle}>Crop Distribution</Text>
          </View>
          <PieChart
            data={analyticsData.cropDistribution}
            width={chartWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            style={styles.chart}
          />
          <View style={styles.legendContainer}>
            {analyticsData.cropDistribution.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.name}: {item.population}%
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderProgressMetrics = () => {
    if (!analyticsData.progressMetrics) return null;

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons
              name="track-changes"
              size={24}
              color={COLORS.accent}
            />
            <Text style={styles.chartTitle}>Progress Metrics</Text>
          </View>
          <ProgressChart
            data={analyticsData.progressMetrics}
            width={chartWidth - 40}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
            style={styles.chart}
          />
          <View style={styles.progressLabels}>
            {analyticsData.progressMetrics.labels.map((label, index) => (
              <View key={index} style={styles.progressItem}>
                <Text style={styles.progressLabel}>{label}</Text>
                <Text style={styles.progressValue}>
                  {Math.round(analyticsData.progressMetrics.data[index] * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderRecommendations = () => {
    if (!analyticsData.recommendations) return null;

    return (
      <Card style={styles.recommendationsCard}>
        <Card.Content>
          <View style={styles.chartHeader}>
            <MaterialIcons name="lightbulb" size={24} color={COLORS.accent} />
            <Text style={styles.chartTitle}>AI Recommendations</Text>
          </View>
          {analyticsData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <MaterialIcons
                name={rec.priority === "high" ? "priority-high" : "info"}
                size={20}
                color={rec.priority === "high" ? "#FF5722" : COLORS.primary}
              />
              <View style={styles.recommendationContent}>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <Text style={styles.recommendationText}>{rec.description}</Text>
                <Text style={styles.recommendationImpact}>
                  Expected impact: {rec.impact}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="analytics" size={60} color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Analytics...</Text>
      </View>
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
        <Text style={styles.headerTitle}>Farm Analytics 📊</Text>
        <Button
          mode="text"
          onPress={() =>
            Alert.alert("Export", "Analytics export feature coming soon!")
          }
          icon="download"
          textColor="white"
          style={styles.exportButton}
        ></Button>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <View style={styles.controlsContainer}>
          <SegmentedButtons
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            buttons={periodButtons}
            style={styles.periodButtons}
          />
        </View>

        {/* Metric Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.metricsScroll}
        >
          {metricButtons.map((button) => (
            <Chip
              key={button.value}
              mode={selectedMetric === button.value ? "flat" : "outlined"}
              selected={selectedMetric === button.value}
              onPress={() => setSelectedMetric(button.value)}
              style={[
                styles.metricChip,
                selectedMetric === button.value && styles.selectedMetricChip,
              ]}
              textStyle={
                selectedMetric === button.value ? { color: "white" } : {}
              }
            >
              {button.label}
            </Chip>
          ))}
        </ScrollView>

        {/* Overview Cards */}
        {renderOverviewCards()}

        {/* Charts */}
        {(selectedMetric === "all" || selectedMetric === "soil") &&
          renderSoilMoistureChart()}
        {renderCropGrowthChart()}
        {renderYieldPredictionChart()}

        {selectedMetric === "all" && (
          <>
            {renderCropDistribution()}
            {renderProgressMetrics()}
          </>
        )}

        {/* Recommendations */}
        {renderRecommendations()}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="refresh"
        style={styles.fab}
        color="white"
        onPress={loadAnalyticsData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: FONTS.sizes.large,
    color: COLORS.text,
    marginTop: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    marginLeft: -SPACING.sm,
  },
  exportButton: {
    marginRight: -SPACING.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  controlsContainer: {
    padding: SPACING.lg,
    backgroundColor: "white",
    elevation: 2,
  },
  periodButtons: {
    marginBottom: SPACING.md,
  },
  metricsScroll: {
    paddingVertical: SPACING.md,
    paddingLeft: SPACING.lg,
  },
  metricChip: {
    marginRight: SPACING.sm,
    backgroundColor: "white",
  },
  selectedMetricChip: {
    backgroundColor: COLORS.primary,
  },
  overviewContainer: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  overviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  overviewCard: {
    width: "48%",
    marginBottom: SPACING.md,
    elevation: 3,
  },
  overviewContent: {
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  overviewValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginVertical: SPACING.xs,
  },
  overviewLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  trendText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    marginLeft: SPACING.xs,
  },
  chartCard: {
    margin: SPACING.lg,
    marginTop: 0,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  chartTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartInsights: {
    marginTop: SPACING.md,
    alignItems: "center",
  },
  insightChip: {
    backgroundColor: "#E3F2FD",
    marginBottom: SPACING.sm,
  },
  insightText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  predictionInsights: {
    backgroundColor: "#F8F9FA",
    padding: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.md,
  },
  predictionTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  predictionText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  predictionValue: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  legendContainer: {
    marginTop: SPACING.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  legendText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: SPACING.md,
  },
  progressItem: {
    alignItems: "center",
  },
  progressLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  progressValue: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  recommendationsCard: {
    margin: SPACING.lg,
    marginTop: 0,
    elevation: 3,
    backgroundColor: "#FFF3E0",
  },
  recommendationItem: {
    flexDirection: "row",
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  recommendationContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  recommendationTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  recommendationText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  recommendationImpact: {
    fontSize: FONTS.sizes.small,
    color: COLORS.accent,
    fontStyle: "italic",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: COLORS.primary,
  },
  bottomPadding: {
    height: 100,
  },
});
