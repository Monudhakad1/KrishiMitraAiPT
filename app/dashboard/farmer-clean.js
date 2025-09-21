import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {
  Card,
  Avatar,
  Menu,
  Provider,
  IconButton,
  Surface,
  Divider,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Modern Design System
const COLORS = {
  primary: '#00C853',
  primaryLight: '#4CAF50',
  primaryDark: '#388E3C',
  secondary: '#FF6F00',
  accent: '#00BCD4',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#2C2C2C',
  textSecondary: '#7C7C7C',
  textLight: '#FFFFFF',
  border: '#E8E8E8',
  shadow: '#000000',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  gradient: ['#00C853', '#4CAF50'],
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const FONTS = {
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
  },
};

// Modern Weather Card Component
const WeatherCard = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <TouchableOpacity 
      style={styles.weatherCard}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#42A5F5', '#1E88E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.weatherGradient}
      >
        <View style={styles.weatherContent}>
          <View style={styles.weatherMain}>
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>28°</Text>
              <Text style={styles.weatherCondition}>Sunny</Text>
              <Text style={styles.weatherLocation}>Bharatpur, Rajasthan</Text>
            </View>
            <Ionicons name="sunny" size={64} color="white" />
          </View>
          
          {expanded && (
            <View style={styles.weatherDetails}>
              <Divider style={styles.weatherDivider} />
              <View style={styles.weatherDetailsGrid}>
                <View style={styles.weatherDetailItem}>
                  <Ionicons name="water" size={20} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.weatherDetailLabel}>Humidity</Text>
                  <Text style={styles.weatherDetailValue}>65%</Text>
                </View>
                <View style={styles.weatherDetailItem}>
                  <Ionicons name="leaf" size={20} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.weatherDetailLabel}>Wind</Text>
                  <Text style={styles.weatherDetailValue}>12 km/h</Text>
                </View>
                <View style={styles.weatherDetailItem}>
                  <Ionicons name="eye" size={20} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.weatherDetailLabel}>Visibility</Text>
                  <Text style={styles.weatherDetailValue}>10 km</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Modern Stats Card Component
const StatsCard = ({ title, value, icon, color }) => {
  return (
    <Surface style={[styles.statsCard, { borderLeftColor: color }]}>
      <View style={styles.statsContent}>
        <View style={[styles.statsIcon, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.statsText}>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
        </View>
      </View>
    </Surface>
  );
};

// Modern Quick Action Card
const QuickActionCard = ({ title, description, icon, color, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.actionCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Surface style={styles.actionCardSurface}>
        <View style={[styles.actionIcon, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={28} color={color} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </Surface>
    </TouchableOpacity>
  );
};

export default function FarmerDashboard() {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [menuVisible, setMenuVisible] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const farmerData = {
    name: currentLanguage === 'hindi' ? 'राजेश कुमार शर्मा' : 'Rajesh Kumar Sharma',
    location: currentLanguage === 'hindi' ? 'गांव-भरतपुर, राजस्थान' : 'Village-Bharatpur, Rajasthan',
    farmSize: '5.2 acres',
    totalCrops: 4,
    monthlyIncome: '₹45,000',
    crops: ['Wheat', 'Barley', 'Mustard', 'Peas'],
  };

  const statsData = [
    { title: 'Farm Size', value: '5.2 acres', icon: 'leaf-outline', color: COLORS.success },
    { title: 'Total Crops', value: '4', icon: 'flower-outline', color: COLORS.info },
    { title: 'Monthly Income', value: '₹45,000', icon: 'wallet-outline', color: COLORS.warning },
  ];

  const quickActions = [
    {
      title: currentLanguage === 'hindi' ? 'फसल की स्थिति' : 'Crop Status',
      description: currentLanguage === 'hindi' ? 'अपनी फसल देखें' : 'Check your crops',
      icon: 'leaf-outline',
      color: COLORS.success,
    },
    {
      title: currentLanguage === 'hindi' ? 'बाजार की कीमत' : 'Market Prices',
      description: currentLanguage === 'hindi' ? 'आज की दरें' : 'Today\'s rates',
      icon: 'trending-up-outline',
      color: COLORS.warning,
    },
    {
      title: currentLanguage === 'hindi' ? 'मौसम अलर्ट' : 'Weather Alert',
      description: currentLanguage === 'hindi' ? 'मौसम की जानकारी' : 'Weather updates',
      icon: 'cloud-outline',
      color: COLORS.info,
    },
    {
      title: currentLanguage === 'hindi' ? 'विशेषज्ञ सलाह' : 'Expert Advice',
      description: currentLanguage === 'hindi' ? 'सलाह लें' : 'Get consultation',
      icon: 'people-outline',
      color: COLORS.accent,
    },
  ];

  const sideMenuItems = [
    { title: 'Profile', icon: 'person-outline', color: COLORS.primary },
    { title: 'Analytics', icon: 'analytics-outline', color: COLORS.info },
    { title: 'Settings', icon: 'settings-outline', color: COLORS.textSecondary },
    { title: 'Help', icon: 'help-circle-outline', color: COLORS.warning },
    { title: 'Logout', icon: 'log-out-outline', color: COLORS.error },
  ];

  const handleQuickAction = (action) => {
    console.log('Pressed:', action.title);
  };

  const toggleLanguage = (language) => {
    setCurrentLanguage(language);
    setMenuVisible(false);
  };

  const handleSideMenuPress = (item) => {
    setSideMenuVisible(false);
    console.log('Menu item pressed:', item.title);
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        
        {/* Modern Header */}
        <LinearGradient
          colors={COLORS.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setSideMenuVisible(true)}
            >
              <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={styles.profileSection}>
              <Avatar.Image
                size={45}
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.welcomeText}>
                  {currentLanguage === 'hindi' ? 'नमस्ते' : 'Welcome'}
                </Text>
                <Text style={styles.farmerName}>{farmerData.name}</Text>
                <Text style={styles.location}>{farmerData.location}</Text>
              </View>
            </View>

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <IconButton
                  icon="translate"
                  iconColor="white"
                  size={20}
                  onPress={() => setMenuVisible(true)}
                />
              }
            >
              <Menu.Item onPress={() => toggleLanguage('english')} title="English" />
              <Menu.Item onPress={() => toggleLanguage('hindi')} title="हिंदी" />
            </Menu>
          </View>
        </LinearGradient>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Weather Card */}
          <WeatherCard />

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </View>

          {/* Quick Actions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'hindi' ? 'त्वरित कार्य' : 'Quick Actions'}
            </Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  color={action.color}
                  onPress={() => handleQuickAction(action)}
                />
              ))}
            </View>
          </View>

          {/* Crops Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'hindi' ? 'वर्तमान फसलें' : 'Current Crops'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.cropsContainer}>
                {farmerData.crops.map((crop, index) => (
                  <Surface key={index} style={styles.cropChip}>
                    <Text style={styles.cropChipText}>{crop}</Text>
                  </Surface>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Side Menu Modal */}
        {sideMenuVisible && (
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setSideMenuVisible(false)}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              style={styles.sideMenu}
              onPress={() => {}}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.sideMenuContent}
              >
                <View style={styles.sideMenuHeader}>
                  <Avatar.Image
                    size={60}
                    source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                  />
                  <Text style={styles.sideMenuName}>{farmerData.name}</Text>
                  <Text style={styles.sideMenuLocation}>{farmerData.location}</Text>
                </View>
                
                <View style={styles.sideMenuItems}>
                  {sideMenuItems.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.sideMenuItem}
                      onPress={() => handleSideMenuPress(item)}
                    >
                      <Ionicons name={item.icon} size={22} color={item.color} />
                      <Text style={[styles.sideMenuItemText, { color: item.color }]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 0,
    paddingBottom: SPACING.lg,
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  profileSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  welcomeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FONTS.sizes.sm,
    fontWeight: '400',
  },
  farmerName: {
    color: COLORS.textLight,
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    marginTop: 2,
  },
  location: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  weatherCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  weatherGradient: {
    padding: SPACING.xl,
  },
  weatherContent: {
    // Additional styling can go here
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherInfo: {
    flex: 1,
  },
  weatherTemp: {
    color: COLORS.textLight,
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: -2,
  },
  weatherCondition: {
    color: COLORS.textLight,
    fontSize: FONTS.sizes.lg,
    fontWeight: '500',
    marginTop: SPACING.xs,
  },
  weatherLocation: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FONTS.sizes.sm,
    marginTop: SPACING.xs,
  },
  weatherDetails: {
    marginTop: SPACING.xl,
  },
  weatherDivider: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: SPACING.lg,
  },
  weatherDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  weatherDetailLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FONTS.sizes.xs,
    marginTop: SPACING.xs,
  },
  weatherDetailValue: {
    color: COLORS.textLight,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  statsCard: {
    flex: 1,
    borderRadius: 16,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
  },
  statsContent: {
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  statsText: {
    flex: 1,
  },
  statsValue: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 22,
  },
  statsTitle: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    marginBottom: SPACING.md,
  },
  actionCardSurface: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    padding: SPACING.lg,
    alignItems: 'center',
    minHeight: 130,
    justifyContent: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  actionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  actionDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  cropsContainer: {
    flexDirection: 'row',
    paddingLeft: SPACING.lg,
    gap: SPACING.sm,
  },
  cropChip: {
    borderRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginRight: SPACING.sm,
  },
  cropChipText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
  },
  sideMenuContent: {
    flex: 1,
    paddingTop: SPACING.xxl,
  },
  sideMenuHeader: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sideMenuName: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  sideMenuLocation: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  sideMenuItems: {
    flex: 1,
    padding: SPACING.lg,
  },
  sideMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.xs,
  },
  sideMenuItemText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    marginLeft: SPACING.lg,
  },
});