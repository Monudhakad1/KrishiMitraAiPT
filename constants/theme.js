// Color constants for KrishiMitra AI
export const COLORS = {
  primary: "#4CAF50", // Green for agriculture theme
  secondary: "#8BC34A", // Light green
  accent: "#FF9800", // Orange for highlights
  background: "#F5F5F5", // Light gray background
  surface: "#FFFFFF", // White surface
  text: "#212121", // Dark gray text
  textPrimary: "#212121", // Dark gray text (alias)
  textSecondary: "#757575", // Medium gray text
  error: "#F44336", // Red for errors
  success: "#4CAF50", // Green for success
  warning: "#FF9800", // Orange for warnings
  info: "#2196F3", // Blue for info
  border: "#E0E0E0", // Light gray for borders

  // Gradients
  primaryGradient: ["#4CAF50", "#8BC34A"],
  backgroundGradient: ["#E8F5E8", "#F5F5F5"],
};

// Typography
export const FONTS = {
  regular: "System",
  medium: "System",
  bold: "System",
  sizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Screen dimensions helpers
export const SCREEN = {
  padding: SPACING.md,
  borderRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
};
