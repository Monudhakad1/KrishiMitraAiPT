import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Card,
  RadioButton,
  Chip,
  SegmentedButtons,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

export default function ProductManagement() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Form mode: 'add' or 'edit'
  const mode = params.mode || "add";
  const productId = params.productId;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    status: "In Stock",
    supplier: "",
    category: "Grains",
    description: "",
    minimumStock: "",
    unit: "quintal",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Categories and units
  const categories = [
    { label: "Grains / अनाज", value: "Grains" },
    { label: "Vegetables / सब्जियां", value: "Vegetables" },
    { label: "Fruits / फल", value: "Fruits" },
    { label: "Pulses / दाल", value: "Pulses" },
    { label: "Spices / मसाले", value: "Spices" },
    { label: "Oil Seeds / तिलहन", value: "Oil Seeds" },
  ];

  const units = [
    { label: "Quintal (क्विंटल)", value: "quintal" },
    { label: "Kg (किलो)", value: "kg" },
    { label: "Ton (टन)", value: "ton" },
    { label: "Bags (बोरे)", value: "bags" },
  ];

  const statusOptions = [
    { label: "In Stock", value: "In Stock", color: COLORS.success },
    { label: "Low Stock", value: "Low Stock", color: COLORS.warning },
    { label: "Out of Stock", value: "Out of Stock", color: COLORS.error },
  ];

  useEffect(() => {
    if (mode === "edit" && productId) {
      // Load existing product data
      loadProductData(productId);
    }
  }, [mode, productId]);

  const loadProductData = (id) => {
    // Mock data loading - in real app, this would fetch from API
    const mockProduct = {
      id: 1,
      name: "Wheat",
      quantity: "500",
      price: "2100",
      status: "In Stock",
      supplier: "राम कृष्णा फार्म",
      category: "Grains",
      description:
        "High quality wheat from Punjab farms, suitable for flour production",
      minimumStock: "50",
      unit: "quintal",
    };

    setFormData(mockProduct);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(Number(formData.quantity))) {
      newErrors.quantity = "Quantity must be a number";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = "Supplier name is required";
    }

    if (!formData.minimumStock.trim()) {
      newErrors.minimumStock = "Minimum stock is required";
    } else if (isNaN(Number(formData.minimumStock))) {
      newErrors.minimumStock = "Minimum stock must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors and try again.");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const successMessage =
        mode === "add"
          ? `Product "${formData.name}" added successfully!`
          : `Product "${formData.name}" updated successfully!`;

      Alert.alert("Success", successMessage, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${formData.name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              Alert.alert(
                "Deleted",
                `Product "${formData.name}" has been deleted.`,
                [{ text: "OK", onPress: () => router.back() }]
              );
            } catch (error) {
              Alert.alert("Error", "Failed to delete product.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => router.back()}
            textColor="white"
          >
            Back
          </Button>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>
              {mode === "add" ? "Add New Product" : "Edit Product"}
            </Text>
            <Text style={styles.headerSubtitle}>
              {mode === "add" ? "नया उत्पाद जोड़ें" : "उत्पाद संपादित करें"}
            </Text>
          </View>
          {mode === "edit" && (
            <Button
              icon="delete"
              mode="text"
              onPress={handleDelete}
              textColor="#FF5252"
            >
              Delete
            </Button>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <Card style={styles.formSection}>
          <Card.Content>
            <Text style={styles.sectionTitle}>
              Basic Information / बुनियादी जानकारी
            </Text>

            <TextInput
              label="Product Name / उत्पाद का नाम"
              value={formData.name}
              onChangeText={(text) => updateFormData("name", text)}
              mode="outlined"
              style={styles.input}
              error={!!errors.name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.inputLabel}>Category / श्रेणी</Text>
            <SegmentedButtons
              value={formData.category}
              onValueChange={(value) => updateFormData("category", value)}
              buttons={categories.slice(0, 3).map((cat) => ({
                value: cat.value,
                label: cat.label.split(" / ")[0],
              }))}
              style={styles.segmentedButtons}
            />
            <SegmentedButtons
              value={formData.category}
              onValueChange={(value) => updateFormData("category", value)}
              buttons={categories.slice(3).map((cat) => ({
                value: cat.value,
                label: cat.label.split(" / ")[0],
              }))}
              style={styles.segmentedButtons}
            />

            <TextInput
              label="Supplier Name / आपूर्तिकर्ता का नाम"
              value={formData.supplier}
              onChangeText={(text) => updateFormData("supplier", text)}
              mode="outlined"
              style={styles.input}
              error={!!errors.supplier}
            />
            {errors.supplier && (
              <Text style={styles.errorText}>{errors.supplier}</Text>
            )}

            <TextInput
              label="Description / विवरण"
              value={formData.description}
              onChangeText={(text) => updateFormData("description", text)}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
            />
          </Card.Content>
        </Card>

        {/* Quantity & Pricing */}
        <Card style={styles.formSection}>
          <Card.Content>
            <Text style={styles.sectionTitle}>
              Quantity & Pricing / मात्रा और मूल्य
            </Text>

            <View style={styles.row}>
              <TextInput
                label="Quantity / मात्रा"
                value={formData.quantity}
                onChangeText={(text) => updateFormData("quantity", text)}
                mode="outlined"
                style={[styles.input, styles.halfInput]}
                keyboardType="numeric"
                error={!!errors.quantity}
              />

              <Text style={styles.inputLabel}>Unit / इकाई</Text>
              <View style={styles.unitContainer}>
                {units.map((unit) => (
                  <Chip
                    key={unit.value}
                    selected={formData.unit === unit.value}
                    onPress={() => updateFormData("unit", unit.value)}
                    style={styles.unitChip}
                    textStyle={styles.unitChipText}
                  >
                    {unit.label.split(" (")[0]}
                  </Chip>
                ))}
              </View>
            </View>
            {errors.quantity && (
              <Text style={styles.errorText}>{errors.quantity}</Text>
            )}

            <TextInput
              label="Price per Unit / प्रति इकाई मूल्य"
              value={formData.price}
              onChangeText={(text) => updateFormData("price", text)}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              left={<TextInput.Icon icon="currency-inr" />}
              error={!!errors.price}
            />
            {errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}

            <TextInput
              label="Minimum Stock Alert / न्यूनतम स्टॉक अलर्ट"
              value={formData.minimumStock}
              onChangeText={(text) => updateFormData("minimumStock", text)}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              error={!!errors.minimumStock}
            />
            {errors.minimumStock && (
              <Text style={styles.errorText}>{errors.minimumStock}</Text>
            )}
          </Card.Content>
        </Card>

        {/* Status */}
        <Card style={styles.formSection}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Stock Status / स्टॉक स्थिति</Text>

            <RadioButton.Group
              onValueChange={(value) => updateFormData("status", value)}
              value={formData.status}
            >
              {statusOptions.map((option) => (
                <View key={option.value} style={styles.radioItem}>
                  <RadioButton value={option.value} color={option.color} />
                  <Text style={[styles.radioLabel, { color: option.color }]}>
                    {option.label}
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.cancelButton}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            loading={loading}
            disabled={loading}
          >
            {mode === "add" ? "Add Product" : "Update Product"}
          </Button>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.accent,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
  },
  headerTitle: {
    flex: 1,
    alignItems: "center",
  },
  headerTitleText: {
    color: "white",
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: FONTS.sizes.small,
  },
  content: {
    flex: 1,
  },
  formSection: {
    margin: SPACING.md,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  input: {
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  inputLabel: {
    fontSize: FONTS.sizes.small,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  unitContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  unitChip: {
    backgroundColor: COLORS.surface,
  },
  unitChipText: {
    fontSize: FONTS.sizes.small,
  },
  segmentedButtons: {
    marginBottom: SPACING.sm,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.xs,
  },
  radioLabel: {
    fontSize: FONTS.sizes.medium,
    marginLeft: SPACING.sm,
    fontWeight: "500",
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.small,
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    borderColor: COLORS.textSecondary,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
  },
});
