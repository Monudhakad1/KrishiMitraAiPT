import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function WeatherWidget({ currentWeather, forecast, onPress }) {
  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: "wb-sunny",
      "partly-cloudy": "wb-cloudy",
      cloudy: "cloud",
      rainy: "grain",
      stormy: "thunderstorm",
    };
    return icons[condition] || "wb-sunny";
  };

  const getWeatherColor = (condition) => {
    const colors = {
      sunny: ["#FFD54F", "#FF8F00"],
      "partly-cloudy": ["#90CAF9", "#1976D2"],
      cloudy: ["#B0BEC5", "#546E7A"],
      rainy: ["#81C784", "#388E3C"],
      stormy: ["#9575CD", "#5E35B1"],
    };
    return colors[condition] || ["#FFD54F", "#FF8F00"];
  };

  return (
    <View style={styles.container}>
      {/* Current Weather */}
      <Card style={styles.currentWeatherCard} onPress={onPress}>
        <LinearGradient
          colors={getWeatherColor(currentWeather.condition)}
          style={styles.currentWeatherGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.currentWeatherContent}>
            <View style={styles.mainWeatherInfo}>
              <MaterialIcons
                name={currentWeather.icon}
                size={50}
                color="white"
              />
              <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>
                  {currentWeather.temperature}°C
                </Text>
                <Text style={styles.condition}>
                  {currentWeather.conditionText}
                </Text>
                <Text style={styles.conditionHindi}>
                  {currentWeather.conditionHindi}
                </Text>
              </View>
            </View>

            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="water-drop"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.infoText}>{currentWeather.humidity}%</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="air"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.infoText}>
                  {currentWeather.windSpeed} km/h
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons
                  name="thermostat"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.infoText}>
                  Feels {currentWeather.feelsLike}°
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Card>

      {/* 7-Day Forecast */}
      <View style={styles.forecastSection}>
        <Text style={styles.forecastTitle}>
          7-Day Forecast / 7 दिन का पूर्वानुमान
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecastScroll}
        >
          {forecast.map((day, index) => (
            <Card key={index} style={styles.forecastCard}>
              <View style={styles.forecastCardContent}>
                <Text style={styles.forecastDay}>{day.day}</Text>
                <Text style={styles.forecastDate}>{day.date}</Text>
                <MaterialIcons
                  name={getWeatherIcon(day.condition)}
                  size={32}
                  color={COLORS.primary}
                  style={styles.forecastIcon}
                />
                <Text style={styles.forecastTemp}>{day.temp}</Text>
                {day.rainfall > 0 && (
                  <View style={styles.rainfallInfo}>
                    <MaterialIcons
                      name="water-drop"
                      size={12}
                      color="#2196F3"
                    />
                    <Text style={styles.rainfallText}>{day.rainfall}%</Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Weather Advisory */}
      <Card style={styles.advisoryCard}>
        <View style={styles.advisoryContent}>
          <MaterialIcons name="lightbulb" size={20} color={COLORS.accent} />
          <Text style={styles.advisoryText}>{currentWeather.description}</Text>
        </View>
        <Text style={styles.advisoryTextHindi}>
          {currentWeather.descriptionHindi}
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  currentWeatherCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: SPACING.md,
    overflow: "hidden",
  },
  currentWeatherGradient: {
    padding: SPACING.lg,
  },
  currentWeatherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainWeatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  temperatureContainer: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  condition: {
    fontSize: FONTS.sizes.medium,
    color: "rgba(255,255,255,0.9)",
    marginTop: SPACING.xs,
  },
  conditionHindi: {
    fontSize: FONTS.sizes.small,
    color: "rgba(255,255,255,0.8)",
    marginTop: SPACING.xs,
  },
  additionalInfo: {
    alignItems: "flex-end",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  infoText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
    marginLeft: SPACING.xs,
  },
  forecastSection: {
    marginBottom: SPACING.md,
  },
  forecastTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  forecastScroll: {
    marginHorizontal: -SPACING.xs,
  },
  forecastCard: {
    width: 80,
    marginHorizontal: SPACING.xs,
    borderRadius: 12,
    elevation: 2,
  },
  forecastCardContent: {
    padding: SPACING.sm,
    alignItems: "center",
  },
  forecastDay: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.text,
  },
  forecastDate: {
    fontSize: FONTS.sizes.small - 2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  forecastIcon: {
    marginVertical: SPACING.xs,
  },
  forecastTemp: {
    fontSize: FONTS.sizes.small,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
  rainfallInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  rainfallText: {
    fontSize: FONTS.sizes.small - 2,
    color: "#2196F3",
    marginLeft: 2,
  },
  advisoryCard: {
    borderRadius: 12,
    backgroundColor: "#FFF8E1",
    elevation: 1,
  },
  advisoryContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  advisoryText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
    fontWeight: "500",
  },
  advisoryTextHindi: {
    fontSize: FONTS.sizes.small - 1,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    fontStyle: "italic",
  },
});
