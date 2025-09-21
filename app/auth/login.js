import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Card, Switch } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { authenticateUser, DUMMY_USERS } from "../../data/dummyData";

export default function LoginScreen() {
  const router = useRouter();
  const { userType } = useLocalSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get user type info for display
  const userTypeInfo = {
    farmers: { name: "Farmer", nameHindi: "किसान", icon: "agriculture" },
    consumers: {
      name: "Consumer",
      nameHindi: "उपभोक्ता",
      icon: "shopping-cart",
    },
    dealers: { name: "Dealer", nameHindi: "व्यापारी", icon: "store" },
  };

  const currentUserType = userTypeInfo[userType] || userTypeInfo.farmers;

  // Pre-fill with demo credentials for testing
  useEffect(() => {
    if (userType && DUMMY_USERS[userType] && DUMMY_USERS[userType].length > 0) {
      const firstUser = DUMMY_USERS[userType][0];
      setFormData({
        username: firstUser.username,
        password: firstUser.password,
        name: "",
        phone: "",
        location: "",
      });
    }
  }, [userType]);

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = authenticateUser(formData.username, formData.password);

      if (user) {
        // Navigate to appropriate dashboard based on user type
        let dashboardRoute;
        if (user.userType === "farmers") {
          dashboardRoute = "/dashboard/farmer";
        } else if (user.userType === "consumers") {
          dashboardRoute = "/dashboard/consumer";
        } else if (user.userType === "dealers") {
          dashboardRoute = "/dashboard/dealer";
        } else {
          // Default to farmer dashboard
          dashboardRoute = "/dashboard/farmer";
        }

        console.log("Navigating to:", dashboardRoute);
        router.replace(dashboardRoute);
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (
      !formData.username ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would register the user here
      Alert.alert(
        "Registration Successful",
        "Your account has been created successfully!",
        [
          {
            text: "Login",
            onPress: () => setIsLogin(true),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDemoCredentials = () => {
    if (userType && DUMMY_USERS[userType]) {
      return DUMMY_USERS[userType].map((user) => ({
        username: user.username,
        password: user.password,
        name: user.nameEn,
      }));
    }
    return [];
  };

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons
            name={currentUserType.icon}
            size={50}
            color={COLORS.primary}
          />
          <Text style={styles.title}>
            {isLogin ? "Welcome Back!" : "Create Account"}
          </Text>
          <Text style={styles.subtitle}>
            {currentUserType.name} • {currentUserType.nameHindi}
          </Text>
        </View>

        {/* Form Card */}
        <Card style={styles.formCard}>
          <Card.Content style={styles.formContent}>
            {/* Toggle Login/Register */}
            <View style={styles.toggleContainer}>
              <Button
                mode={isLogin ? "contained" : "outlined"}
                onPress={() => setIsLogin(true)}
                style={[styles.toggleButton, isLogin && styles.activeToggle]}
                labelStyle={[
                  styles.toggleLabel,
                  isLogin && styles.activeToggleLabel,
                ]}
              >
                Login
              </Button>
              <Button
                mode={!isLogin ? "contained" : "outlined"}
                onPress={() => setIsLogin(false)}
                style={[styles.toggleButton, !isLogin && styles.activeToggle]}
                labelStyle={[
                  styles.toggleLabel,
                  !isLogin && styles.activeToggleLabel,
                ]}
              >
                Register
              </Button>
            </View>

            {/* Form Fields */}
            <View style={styles.formFields}>
              {!isLogin && (
                <TextInput
                  label="Full Name / पूरा नाम"
                  value={formData.name}
                  onChangeText={(value) => updateFormData("name", value)}
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="account" />}
                />
              )}

              <TextInput
                label="Username / उपयोगकर्ता नाम"
                value={formData.username}
                onChangeText={(value) => updateFormData("username", value)}
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="account-outline" />}
                autoCapitalize="none"
              />

              <TextInput
                label="Password / पासवर्ड"
                value={formData.password}
                onChangeText={(value) => updateFormData("password", value)}
                style={styles.input}
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />

              {!isLogin && (
                <>
                  <TextInput
                    label="Phone Number / फ़ोन नंबर"
                    value={formData.phone}
                    onChangeText={(value) => updateFormData("phone", value)}
                    style={styles.input}
                    mode="outlined"
                    keyboardType="phone-pad"
                    left={<TextInput.Icon icon="phone" />}
                  />

                  <TextInput
                    label="Location / स्थान"
                    value={formData.location}
                    onChangeText={(value) => updateFormData("location", value)}
                    style={styles.input}
                    mode="outlined"
                    left={<TextInput.Icon icon="map-marker" />}
                  />
                </>
              )}
            </View>

            {/* Action Button */}
            <Button
              mode="contained"
              onPress={isLogin ? handleLogin : handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
              contentStyle={styles.actionButtonContent}
            >
              {isLogin ? "Login / लॉगिन" : "Register / रजिस्टर"}
            </Button>

            {/* Demo Credentials */}
            {isLogin && (
              <View style={styles.demoSection}>
                <Text style={styles.demoTitle}>Demo Credentials:</Text>
                {getDemoCredentials()
                  .slice(0, 2)
                  .map((cred, index) => (
                    <View key={index} style={styles.demoCredential}>
                      <Text style={styles.demoText}>
                        {cred.name}: {cred.username} / {cred.password}
                      </Text>
                    </View>
                  ))}
              </View>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  formContent: {
    padding: SPACING.lg,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: COLORS.primary,
  },
  toggleLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.small,
  },
  activeToggleLabel: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  formFields: {
    marginBottom: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginBottom: SPACING.md,
  },
  actionButtonContent: {
    paddingVertical: SPACING.sm,
  },
  actionButtonLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  demoSection: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  demoTitle: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  demoCredential: {
    marginBottom: SPACING.xs,
  },
  demoText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontFamily: "monospace",
  },
});
