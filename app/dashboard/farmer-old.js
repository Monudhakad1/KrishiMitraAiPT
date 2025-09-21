import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Card, Button, FAB, Avatar, Chip, IconButton, Menu } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

const { width } = Dimensions.get('window');

export default function FarmerDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hindi');
  const [weatherExpanded, setWeatherExpanded] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'hindi' ? 'english' : 'hindi');
    setLanguageMenuVisible(false);
  };

  // Mock data with translations
  const farmerData = {
    name: currentLanguage === 'hindi' ? "राज कुमार" : "Raj Kumar",
    location: "Punjab, India",
    landSize: "5 acres / 2 हेक्टेयर",
    crops: currentLanguage === 'hindi' ? ["गेहूं", "धान", "गन्ना"] : ["Wheat", "Rice", "Sugarcane"],
    totalIncome: "₹2,45,000",
    monthlyProfit: "₹18,500",
  };

  const weatherData = {
    current: {
      temperature: 28,
      condition: currentLanguage === 'hindi' ? "धूप" : "Sunny",
      icon: "wb-sunny",
      humidity: 65,
      windSpeed: 12,
      uvIndex: 6,
    },
    forecast: [
      { day: currentLanguage === 'hindi' ? "आज" : "Today", temp: "28°/18°", icon: "wb-sunny", condition: currentLanguage === 'hindi' ? "धूप" : "Sunny" },
      { day: currentLanguage === 'hindi' ? "कल" : "Tomorrow", temp: "30°/20°", icon: "wb-cloudy", condition: currentLanguage === 'hindi' ? "बादल" : "Cloudy" },
      { day: currentLanguage === 'hindi' ? "परसों" : "Day 3", temp: "26°/16°", icon: "grain", condition: currentLanguage === 'hindi' ? "बारिश" : "Rain" },
    ]
  };

  const cropRecommendations = [
    {
      crop: currentLanguage === 'hindi' ? "सरसों" : "Mustard",
      profit: "₹25,000/acre",
      season: currentLanguage === 'hindi' ? "रबी" : "Rabi",
      suitability: 95,
      reason: currentLanguage === 'hindi' ? "मिट्टी और जलवायु के लिए उपयुक्त" : "Perfect soil & climate conditions"
    },
    {
      crop: currentLanguage === 'hindi' ? "आलू" : "Potato",
      profit: "₹35,000/acre",
      season: currentLanguage === 'hindi' ? "रबी" : "Rabi",
      suitability: 88,
      reason: currentLanguage === 'hindi' ? "अच्छी मांग और मूल्य" : "High demand & good prices"
    },
    {
      crop: currentLanguage === 'hindi' ? "चना" : "Chickpea",
      profit: "₹20,000/acre",
      season: currentLanguage === 'hindi' ? "रबी" : "Rabi",
      suitability: 82,
      reason: currentLanguage === 'hindi' ? "कम पानी की आवश्यकता" : "Low water requirement"
    }
  ];

  const quickMenuItems = [
    {
      title: currentLanguage === 'hindi' ? "बीमारी पहचान" : "Disease Detection",
      icon: "biotech",
      color: "#E91E63",
      route: "features/diseaseDetection",
      description: currentLanguage === 'hindi' ? "AI से पौधे की बीमारी पहचानें" : "AI-powered disease detection",
    },
    {
      title: currentLanguage === 'hindi' ? "AI सहायक" : "AI Assistant",
      icon: "psychology",
      color: "#9C27B0",
      route: "features/aiAssistant",
      description: currentLanguage === 'hindi' ? "खेती की सलाह लें" : "Get farming advice",
    },
    {
      title: currentLanguage === 'hindi' ? "बाजार भाव" : "Market Prices",
      icon: "trending-up",
      color: "#FF5722",
      route: null,
      description: currentLanguage === 'hindi' ? "आज के भाव देखें" : "Today's commodity prices",
      onPress: () => Alert.alert(currentLanguage === 'hindi' ? "बाजार भाव" : "Market Prices", "Feature coming soon!"),
    },
    {
      title: currentLanguage === 'hindi' ? "खेत विश्लेषण" : "Farm Analytics",
      icon: "analytics",
      color: "#2196F3",
      route: "features/farmAnalytics",
      description: currentLanguage === 'hindi' ? "उत्पादन देखें" : "View crop analytics",
    },
    {
      title: currentLanguage === 'hindi' ? "समुदाय" : "Community",
      icon: "people",
      color: "#4CAF50",
      route: "community/feed",
      description: currentLanguage === 'hindi' ? "किसानों से जुड़ें" : "Connect with farmers",
    },
    {
      title: currentLanguage === 'hindi' ? "खर्च ट्रैकर" : "Expense Tracker",
      icon: "account-balance-wallet",
      color: "#FF9800",
      route: "finance/expenseTracker",
      description: currentLanguage === 'hindi' ? "खर्च का हिसाब" : "Track farm expenses",
    }
  ];

  const handleQuickAction = (action) => {
    if (action.onPress) {
      action.onPress();
    } else if (action.route) {
      router.push(action.route);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Header with Gradient */}
        <LinearGradient
          colors={['#4CAF50', '#8BC34A', '#CDDC39']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.profileSection}>
              <Avatar.Text
                size={65}
                label="🌾"
                style={styles.avatarFarmer}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.welcomeText}>
                  {currentLanguage === 'hindi' ? 'नमस्कार!' : 'Welcome back!'}
                </Text>
                <Text style={styles.farmerName}>{farmerData.name}</Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="location-on" size={16} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.location}>{farmerData.location}</Text>
                </View>
              </View>
            </View>

            {/* Language Toggle Button */}
            <Menu
              visible={languageMenuVisible}
              onDismiss={() => setLanguageMenuVisible(false)}
              anchor={
                <IconButton
                  icon="translate"
                  iconColor="white"
                  size={24}
                  onPress={() => setLanguageMenuVisible(true)}
                  style={styles.languageButton}
                />
              }
            >
              <Menu.Item
                onPress={toggleLanguage}
                title={currentLanguage === 'hindi' ? 'English' : 'हिन्दी'}
                leadingIcon="language"
              />
            </Menu>
          </View>

          {/* Farm Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{farmerData.landSize}</Text>
              <Text style={styles.statLabel}>
                {currentLanguage === 'hindi' ? 'कुल जमीन' : 'Total Land'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{farmerData.crops.length}</Text>
              <Text style={styles.statLabel}>
                {currentLanguage === 'hindi' ? 'फसलें' : 'Crops'}
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{farmerData.totalIncome}</Text>
              <Text style={styles.statLabel}>
                {currentLanguage === 'hindi' ? 'कुल आय' : 'Total Income'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Professional Weather Widget */}
        <View style={styles.section}>
          <Card style={styles.weatherWidget} elevation={8}>
            <LinearGradient
              colors={['#FF9800', '#FFC107', '#FFEB3B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.weatherGradient}
            >
              <View style={styles.weatherHeader}>
                <View style={styles.weatherMain}>
                  <MaterialIcons name={weatherData.current.icon} size={48} color="white" />
                  <View style={styles.weatherInfo}>
                    <Text style={styles.weatherTemp}>{weatherData.current.temperature}°C</Text>
                    <Text style={styles.weatherCondition}>{weatherData.current.condition}</Text>
                    <Text style={styles.weatherLocation}>
                      {currentLanguage === 'hindi' ? 'आज का मौसम' : 'Today\'s Weather'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setWeatherExpanded(!weatherExpanded)}
                  style={styles.weatherExpandButton}
                >
                  <MaterialIcons
                    name={weatherExpanded ? "expand-less" : "expand-more"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>

              {weatherExpanded && (
                <View style={styles.weatherDetails}>
                  <View style={styles.weatherStats}>
                    <View style={styles.weatherStat}>
                      <MaterialIcons name="opacity" size={20} color="white" />
                      <Text style={styles.weatherStatText}>{weatherData.current.humidity}%</Text>
                      <Text style={styles.weatherStatLabel}>
                        {currentLanguage === 'hindi' ? 'नमी' : 'Humidity'}
                      </Text>
                    </View>
                    <View style={styles.weatherStat}>
                      <MaterialIcons name="air" size={20} color="white" />
                      <Text style={styles.weatherStatText}>{weatherData.current.windSpeed} km/h</Text>
                      <Text style={styles.weatherStatLabel}>
                        {currentLanguage === 'hindi' ? 'हवा' : 'Wind'}
                      </Text>
                    </View>
                    <View style={styles.weatherStat}>
                      <MaterialIcons name="wb-sunny" size={20} color="white" />
                      <Text style={styles.weatherStatText}>{weatherData.current.uvIndex}</Text>
                      <Text style={styles.weatherStatLabel}>UV Index</Text>
                    </View>
                  </View>

                  <View style={styles.forecastContainer}>
                    <Text style={styles.forecastTitle}>
                      {currentLanguage === 'hindi' ? '3-दिन का पूर्वानुमान' : '3-Day Forecast'}
                    </Text>
                    <View style={styles.forecastItems}>
                      {weatherData.forecast.map((day, index) => (
                        <View key={index} style={styles.forecastItem}>
                          <Text style={styles.forecastDay}>{day.day}</Text>
                          <MaterialIcons name={day.icon} size={24} color="white" />
                          <Text style={styles.forecastTemp}>{day.temp}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </LinearGradient>
          </Card>
        </View>

        {/* AI Crop Recommendation System */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? '🤖 AI फसल सिफारिश' : '🤖 AI Crop Recommendations'}
          </Text>
          <Card style={styles.recommendationCard} elevation={6}>
            <Card.Content style={styles.recommendationContent}>
              <View style={styles.recommendationHeader}>
                <MaterialIcons name="auto-awesome" size={24} color={COLORS.primary} />
                <Text style={styles.recommendationTitle}>
                  {currentLanguage === 'hindi' ? 'आपके लिए सुझाई गई फसलें' : 'Recommended Crops for You'}
                </Text>
              </View>
              
              {cropRecommendations.map((crop, index) => (
                <View key={index} style={styles.cropRecommendation}>
                  <View style={styles.cropHeader}>
                    <View style={styles.cropInfo}>
                      <Text style={styles.cropName}>{crop.crop}</Text>
                      <Text style={styles.cropProfit}>{crop.profit}</Text>
                      <Chip
                        style={[styles.seasonChip, { backgroundColor: COLORS.primary + '20' }]}
                        textStyle={styles.seasonChipText}
                        compact
                      >
                        {crop.season}
                      </Chip>
                    </View>
                    <View style={styles.suitabilityContainer}>
                      <Text style={styles.suitabilityScore}>{crop.suitability}%</Text>
                      <Text style={styles.suitabilityLabel}>
                        {currentLanguage === 'hindi' ? 'उपयुक्त' : 'Suitable'}
                      </Text>
                      <View style={styles.suitabilityBar}>
                        <View
                          style={[
                            styles.suitabilityFill,
                            { width: `${crop.suitability}%`, backgroundColor: crop.suitability >= 90 ? '#4CAF50' : crop.suitability >= 80 ? '#FF9800' : '#F44336' }
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  <Text style={styles.cropReason}>💡 {crop.reason}</Text>
                </View>
              ))}
              
              <Button
                mode="contained"
                style={styles.viewMoreButton}
                onPress={() => router.push("features/cropRecommendation")}
              >
                {currentLanguage === 'hindi' ? 'और देखें' : 'View More Recommendations'}
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Action Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? '⚡ त्वरित मेनू' : '⚡ Quick Menu'}
          </Text>
          <View style={styles.quickMenuGrid}>
            {quickMenuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickMenuItem}
                onPress={() => handleQuickAction(item)}
                activeOpacity={0.8}
              >
                <Card style={[styles.quickMenuCard, { borderLeftColor: item.color }]} elevation={4}>
                  <Card.Content style={styles.quickMenuContent}>
                    <View style={[styles.quickMenuIcon, { backgroundColor: item.color + '15' }]}>
                      <MaterialIcons name={item.icon} size={28} color={item.color} />
                    </View>
                    <View style={styles.quickMenuText}>
                      <Text style={styles.quickMenuTitle}>{item.title}</Text>
                      <Text style={styles.quickMenuDescription}>{item.description}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={20} color={COLORS.textSecondary} />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Crops Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? '🌱 वर्तमान फसलें' : '🌱 Current Crops'}
          </Text>
          <View style={styles.cropsContainer}>
            {farmerData.crops.map((crop, index) => (
              <Card key={index} style={styles.cropCard} elevation={3}>
                <Card.Content style={styles.cropCardContent}>
                  <Text style={styles.cropCardIcon}>🌾</Text>
                  <Text style={styles.cropCardName}>{crop}</Text>
                  <View style={styles.cropCardStatus}>
                    <View style={[styles.cropStatusIndicator, { backgroundColor: '#4CAF50' }]} />
                    <Text style={styles.cropStatusText}>
                      {currentLanguage === 'hindi' ? 'स्वस्थ' : 'Healthy'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="add"
        style={styles.fab}
        color="white"
        onPress={() => Alert.alert(
          currentLanguage === 'hindi' ? 'नई फसल जोड़ें' : 'Add New Crop',
          currentLanguage === 'hindi' ? 'यह सुविधा जल्द आएगी!' : 'Feature coming soon!'
        )}
      />
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
