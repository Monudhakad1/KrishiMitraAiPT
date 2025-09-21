import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import { Card, Button, FAB, Avatar, Chip } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import WeatherWidget from "../../components/WeatherWidget";

export default function FarmerDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [weatherVisible, setWeatherVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Mock data for farmer dashboard
  const farmerData = {
    name: "राज कुमार",
    nameEn: "Raj Kumar",
    location: "Punjab",
    landSize: "5 acres",
    crops: ["Wheat", "Rice", "Sugarcane"],
  };

  const quickActions = [
    {
      title: "Weather",
      icon: "wb-sunny",
      color: "#FF9800",
      description: "Current & 7-day forecast",
      route: null,
      onPress: () => setWeatherVisible(true),
    },
    {
      title: "Crop Recommendation",
      icon: "eco",
      color: "#4CAF50",
      description: "AI-powered crop suggestions",
      route: "features/cropRecommendation",
      onPress: null,
    },
    {
      title: "Disease Detection",
      icon: "biotech",
      color: "#F44336",
      description: "Scan & identify plant diseases",
      route: "features/diseaseDetection",
      onPress: null,
    },
    {
      title: "AI Assistant",
      icon: "smart-toy",
      color: "#9C27B0",
      description: "Chat with farming expert",
      route: "features/aiAssistant",
      onPress: null,
    },
    {
      title: "Farm Analytics",
      icon: "analytics",
      color: "#2196F3",
      description: "View growth & yield trends",
      route: "features/farmAnalytics",
      onPress: null,
    },
    {
      title: "Community 🌾",
      icon: "people",
      color: "#8BC34A",
      description: "Connect with farmers",
      route: "community/feed",
      onPress: null,
    },
    {
      title: "Expense Tracker 📊",
      icon: "account-balance-wallet",
      color: "#FF5722",
      description: "Manage farm finances",
      route: "finance/expenseTracker",
      onPress: null,
    },
    {
      title: "Supply Chain 🚛",
      icon: "local-shipping",
      color: "#607D8B",
      description: "Track shipments & orders",
      route: "supply/chainLog",
      onPress: null,
    },
    {
      title: "Market Prices",
      icon: "trending-up",
      color: "#FF5722",
      description: "Live commodity prices",
      route: null,
      onPress: () => Alert.alert("Market Prices", "Feature coming soon!"),
    },
  ];

  const handleQuickAction = (action) => {
    if (action.onPress) {
      action.onPress();
    } else if (action.route) {
      router.push(action.route);
    }
  };

  const dashboardCards = [
    {
      title: "Weather Forecast",
      titleHindi: "मौसम पूर्वानुमान",
      icon: "wb-sunny",
      content: "28°C, Sunny\nPerfect for harvesting",
      color: "#FF9800",
    },
    {
      title: "Market Prices",
      titleHindi: "बाज़ार भाव",
      icon: "trending-up",
      content: "Wheat: ₹2,100/quintal\nRice: ₹1,800/quintal",
      color: "#4CAF50",
    },
    {
      title: "AI Recommendations",
      titleHindi: "AI सुझाव",
      icon: "psychology",
      content: "Apply fertilizer in 2 days\nMonitor for pest activity",
      color: "#2196F3",
    },
    {
      title: "Crop Health",
      titleHindi: "फसल स्वास्थ्य",
      icon: "eco",
      content: "Wheat: Excellent\nRice: Good",
      color: "#4CAF50",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Avatar.Icon
              size={60}
              icon="agriculture"
              style={{ backgroundColor: COLORS.primary }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.farmerName}>{farmerData.name}</Text>
              <Text style={styles.farmerNameEn}>{farmerData.nameEn}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.location}>{farmerData.location}</Text>
              </View>
            </View>
          </View>

          {/* Farm Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmerData.landSize}</Text>
              <Text style={styles.statLabel}>Total Land</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmerData.crops.length}</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹45,000</Text>
              <Text style={styles.statLabel}>Monthly Income</Text>
            </View>
          </View>
        </View>

        {/* Current Crops */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Crops / वर्तमान फसलें</Text>
          <View style={styles.cropsContainer}>
            {farmerData.crops.map((crop, index) => (
              <Chip
                key={index}
                style={styles.cropChip}
                textStyle={styles.cropChipText}
                icon="eco"
              >
                {crop}
              </Chip>
            ))}
          </View>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => (
            <Card key={index} style={styles.dashboardCard}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: card.color + "20" },
                    ]}
                  >
                    <MaterialIcons
                      name={card.icon}
                      size={24}
                      color={card.color}
                    />
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardTitleHindi}>{card.titleHindi}</Text>
                  </View>
                </View>
                <Text style={styles.cardContent}>{card.content}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions / त्वरित कार्य</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}
              >
                <LinearGradient
                  colors={[action.color + "20", action.color + "10"]}
                  style={styles.quickActionGradient}
                >
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: action.color + "30" },
                    ]}
                  >
                    <MaterialIcons
                      name={action.icon}
                      size={28}
                      color={action.color}
                    />
                  </View>
                  <Text style={styles.quickActionTitle}>{action.title}</Text>
                  <Text style={styles.quickActionDescription}>
                    {action.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weather Modal */}
        <Modal
          visible={weatherVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setWeatherVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Button
                mode="text"
                onPress={() => setWeatherVisible(false)}
                icon="close"
                textColor={COLORS.primary}
              >
                Close
              </Button>
              <Text style={styles.modalTitle}>Weather Forecast</Text>
              <View style={{ width: 80 }} />
            </View>
            <WeatherWidget />
          </View>
        </Modal>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB icon="plus" style={styles.fab} color="white" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
  },
  farmerName: {
    color: "white",
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  farmerNameEn: {
    color: "rgba(255,255,255,0.9)",
    fontSize: FONTS.sizes.medium,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  location: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
    marginLeft: SPACING.xs,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
    marginTop: SPACING.xs,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  cropsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cropChip: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.primary + "20",
  },
  cropChipText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  cardsContainer: {
    paddingHorizontal: SPACING.lg,
  },
  dashboardCard: {
    marginBottom: SPACING.md,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    padding: SPACING.md,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  cardTitleHindi: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    marginBottom: SPACING.md,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },
  quickActionGradient: {
    padding: SPACING.md,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  quickActionTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  quickActionDescription: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    flex: 1,
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderColor: COLORS.primary,
  },
  actionButtonLabel: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.small,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: COLORS.primary,
  },
});
