import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Card, Button, FAB, Avatar, Chip, SearchBar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

export default function ConsumerDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTraceabilityModalVisible, setIsTraceabilityModalVisible] =
    useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Mock data for consumer dashboard
  const consumerData = {
    name: "अमित शर्मा",
    nameEn: "Amit Sharma",
    location: "Delhi",
    preferences: ["organic", "local"],
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      nameHindi: "ताजे टमाटर",
      price: "₹40/kg",
      farmer: "राज कुमार",
      farmerEn: "Raj Kumar",
      location: "Punjab",
      rating: 4.5,
      image: "🍅",
      category: "vegetables",
      traceability: {
        harvested: "2024-03-15",
        harvestLocation: "Green Valley Farm, Punjab",
        transportedBy: "Fresh Express Logistics",
        truckId: "PB-45-AB-1234",
        warehouseLocation: "Delhi Central Warehouse",
        arrivedAt: "2024-03-17",
        qualityCheck: "Premium Grade A",
        certifications: ["Organic", "FSSAI Approved"],
      },
    },
    {
      id: 2,
      name: "Organic Rice",
      nameHindi: "जैविक चावल",
      price: "₹80/kg",
      farmer: "सुनीता देवी",
      farmerEn: "Sunita Devi",
      location: "Haryana",
      rating: 4.8,
      image: "🌾",
      category: "grains",
      traceability: {
        harvested: "2024-02-28",
        harvestLocation: "Organic Fields, Haryana",
        transportedBy: "Green Transport Co.",
        truckId: "HR-12-XY-5678",
        warehouseLocation: "NCR Distribution Center",
        arrivedAt: "2024-03-02",
        qualityCheck: "Premium Organic",
        certifications: ["100% Organic", "Zero Pesticides"],
      },
    },
    {
      id: 3,
      name: "Fresh Spinach",
      nameHindi: "ताजा पालक",
      price: "₹30/bunch",
      farmer: "गोपाल सिंह",
      farmerEn: "Gopal Singh",
      location: "UP",
      rating: 4.3,
      image: "🥬",
      category: "vegetables",
      traceability: {
        harvested: "2024-03-18",
        harvestLocation: "Fresh Green Farm, UP",
        transportedBy: "Quick Fresh Delivery",
        truckId: "UP-78-CD-9012",
        warehouseLocation: "Ghaziabad Fresh Hub",
        arrivedAt: "2024-03-19",
        qualityCheck: "Fresh Grade A+",
        certifications: ["Farm Fresh", "Pesticide Free"],
      },
    },
    {
      id: 4,
      name: "Sweet Mangoes",
      nameHindi: "मीठे आम",
      price: "₹120/kg",
      farmer: "रमेश पटेल",
      farmerEn: "Ramesh Patel",
      location: "Gujarat",
      rating: 4.9,
      image: "🥭",
      category: "fruits",
      traceability: {
        harvested: "2024-03-20",
        harvestLocation: "Alphonso Orchards, Gujarat",
        transportedBy: "Fruit Express",
        truckId: "GJ-24-MN-3456",
        warehouseLocation: "Mumbai Fruit Market",
        arrivedAt: "2024-03-21",
        qualityCheck: "Export Quality",
        certifications: ["Alphonso Certified", "Premium Export Grade"],
      },
    },
  ];

  // Filter products based on search query
  const filteredProducts = featuredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameHindi.includes(searchQuery) ||
      product.farmer.includes(searchQuery) ||
      product.farmerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    // Show product details modal/screen
  };

  const showProductTraceability = (product) => {
    setSelectedProduct(product);
    setIsTraceabilityModalVisible(true);
  };

  const chatWithFarmer = (product) => {
    router.push({
      pathname: "/chat/farmer-chat",
      params: {
        farmerId: product.id,
        farmerName: product.farmer,
        farmerNameEn: product.farmerEn,
        location: product.location,
        productName: product.name,
        avatar: "👨‍🌾",
      },
    });
  };

  const categories = [
    {
      name: "Vegetables",
      nameHindi: "सब्जियां",
      icon: "eco",
      color: "#4CAF50",
    },
    { name: "Fruits", nameHindi: "फल", icon: "apple", color: "#FF5722" },
    { name: "Grains", nameHindi: "अनाज", icon: "grass", color: "#FF9800" },
    {
      name: "Dairy",
      nameHindi: "डेयरी",
      icon: "local-drink",
      color: "#2196F3",
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
              icon="shopping-cart"
              style={{ backgroundColor: COLORS.secondary }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.consumerName}>{consumerData.name}</Text>
              <Text style={styles.consumerNameEn}>{consumerData.nameEn}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.location}>{consumerData.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search fresh produce / ताजी उपज खोजें"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor={COLORS.primary}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Shop by Category / श्रेणी अनुसार खरीदें
          </Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <Card key={index} style={styles.categoryCard}>
                <Card.Content style={styles.categoryContent}>
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: category.color + "20" },
                    ]}
                  >
                    <MaterialIcons
                      name={category.icon}
                      size={30}
                      color={category.color}
                    />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryNameHindi}>
                    {category.nameHindi}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Preferences / आपकी पसंद</Text>
          <View style={styles.preferencesContainer}>
            {consumerData.preferences.map((pref, index) => (
              <Chip
                key={index}
                style={styles.preferenceChip}
                textStyle={styles.preferenceChipText}
                icon="check"
              >
                {pref.charAt(0).toUpperCase() + pref.slice(1)}
              </Chip>
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery
              ? `Search Results (${filteredProducts.length})`
              : "Featured Products"}{" "}
            / विशेष उत्पाद
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredProducts.map((product) => (
              <Card key={product.id} style={styles.productCard}>
                <Pressable onPress={() => handleProductPress(product)}>
                  <Card.Content style={styles.productContent}>
                    <Text style={styles.productImage}>{product.image}</Text>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productNameHindi}>
                      {product.nameHindi}
                    </Text>
                    <Text style={styles.productPrice}>{product.price}</Text>

                    <View style={styles.farmerInfo}>
                      <MaterialIcons
                        name="person"
                        size={16}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.farmerName}>{product.farmer}</Text>
                    </View>

                    <View style={styles.locationInfo}>
                      <MaterialIcons
                        name="location-on"
                        size={16}
                        color={COLORS.textSecondary}
                      />
                      <Text style={styles.productLocation}>
                        {product.location}
                      </Text>
                    </View>

                    <View style={styles.ratingContainer}>
                      <MaterialIcons name="star" size={16} color="#FFD700" />
                      <Text style={styles.rating}>{product.rating}</Text>
                    </View>

                    <View style={styles.productActions}>
                      <Button
                        mode="contained"
                        style={styles.addToCartButton}
                        labelStyle={styles.addToCartLabel}
                        compact
                      >
                        Add to Cart
                      </Button>
                      <Button
                        mode="outlined"
                        style={styles.traceabilityButton}
                        labelStyle={styles.traceabilityLabel}
                        compact
                        onPress={() => showProductTraceability(product)}
                      >
                        Trace
                      </Button>
                      <Button
                        mode="text"
                        style={styles.chatButton}
                        labelStyle={styles.chatLabel}
                        compact
                        onPress={() => chatWithFarmer(product)}
                        icon="chat"
                      >
                        Chat
                      </Button>
                    </View>
                  </Card.Content>
                </Pressable>
              </Card>
            ))}
          </ScrollView>
          {filteredProducts.length === 0 && searchQuery && (
            <View style={styles.noResults}>
              <MaterialIcons
                name="search-off"
                size={48}
                color={COLORS.textSecondary}
              />
              <Text style={styles.noResultsText}>
                No products found for "{searchQuery}"
              </Text>
              <Text style={styles.noResultsSubtext}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions / त्वरित कार्य</Text>
          <View style={styles.actionsContainer}>
            <Button
              mode="outlined"
              icon="map"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Nearby Farms
            </Button>
            <Button
              mode="outlined"
              icon="history"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Order History
            </Button>
            <Button
              mode="outlined"
              icon="favorite"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Favorites
            </Button>
            <Button
              mode="outlined"
              icon="support-agent"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Support
            </Button>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="shopping-cart"
        style={styles.fab}
        color="white"
        onPress={() => {}}
      />

      {/* Traceability Modal */}
      <Modal
        visible={isTraceabilityModalVisible}
        onDismiss={hideTraceabilityModal}
        contentContainerStyle={styles.modalContainer}
      >
        {selectedProduct && (
          <ScrollView>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Product Traceability</Text>
              <Text style={styles.modalSubtitle}>{selectedProduct.name}</Text>
            </View>

            <Card style={styles.traceabilityCard}>
              <Card.Content>
                <View style={styles.traceabilityHeader}>
                  <MaterialIcons
                    name="verified"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.traceabilityTitle}>
                    Blockchain Verified
                  </Text>
                </View>

                {selectedProduct.traceability &&
                  selectedProduct.traceability.map((stage, index) => (
                    <View key={index} style={styles.traceabilityStage}>
                      <View style={styles.stageIndicator}>
                        <View
                          style={[
                            styles.stageDot,
                            {
                              backgroundColor: stage.completed
                                ? COLORS.success
                                : COLORS.textSecondary,
                            },
                          ]}
                        />
                        {index < selectedProduct.traceability.length - 1 && (
                          <View
                            style={[
                              styles.stageLine,
                              {
                                backgroundColor: stage.completed
                                  ? COLORS.success
                                  : COLORS.textSecondary,
                              },
                            ]}
                          />
                        )}
                      </View>

                      <View style={styles.stageContent}>
                        <View style={styles.stageHeader}>
                          <MaterialIcons
                            name={stage.icon}
                            size={20}
                            color={
                              stage.completed
                                ? COLORS.success
                                : COLORS.textSecondary
                            }
                          />
                          <Text
                            style={[
                              styles.stageName,
                              {
                                color: stage.completed
                                  ? COLORS.textPrimary
                                  : COLORS.textSecondary,
                              },
                            ]}
                          >
                            {stage.stage}
                          </Text>
                        </View>

                        <Text style={styles.stageDate}>{stage.date}</Text>
                        <Text style={styles.stageLocation}>
                          {stage.location}
                        </Text>

                        {stage.details && (
                          <View style={styles.stageDetails}>
                            {stage.details.map((detail, detailIndex) => (
                              <Text
                                key={detailIndex}
                                style={styles.stageDetail}
                              >
                                • {detail}
                              </Text>
                            ))}
                          </View>
                        )}

                        {stage.certifications &&
                          stage.certifications.length > 0 && (
                            <View style={styles.certificationsContainer}>
                              {stage.certifications.map((cert, certIndex) => (
                                <View
                                  key={certIndex}
                                  style={styles.certificationTag}
                                >
                                  <MaterialIcons
                                    name="verified"
                                    size={12}
                                    color={COLORS.success}
                                  />
                                  <Text style={styles.certificationText}>
                                    {cert}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          )}
                      </View>
                    </View>
                  ))}
              </Card.Content>
            </Card>

            <View style={styles.modalActions}>
              <Button mode="outlined" onPress={hideTraceabilityModal}>
                Close
              </Button>
              <Button mode="contained" style={styles.shareButton}>
                Share Trace
              </Button>
            </View>
          </ScrollView>
        )}
      </Modal>
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
    backgroundColor: COLORS.secondary,
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
  },
  consumerName: {
    color: "white",
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  consumerNameEn: {
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
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  searchBar: {
    backgroundColor: COLORS.surface,
    borderRadius: 25,
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
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderRadius: 12,
    elevation: 2,
  },
  categoryContent: {
    alignItems: "center",
    padding: SPACING.md,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  categoryName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  categoryNameHindi: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  preferencesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  preferenceChip: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.secondary + "20",
  },
  preferenceChipText: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
  productCard: {
    width: 200,
    marginRight: SPACING.md,
    borderRadius: 12,
    elevation: 2,
  },
  productContent: {
    padding: SPACING.md,
    alignItems: "center",
  },
  productImage: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  productName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
  },
  productNameHindi: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  productPrice: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  farmerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  farmerName: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  productLocation: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  rating: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
    width: "100%",
  },
  addToCartButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    flex: 0.4,
  },
  addToCartLabel: {
    fontSize: FONTS.sizes.small,
    color: "white",
  },
  traceabilityButton: {
    borderColor: COLORS.primary,
    borderRadius: 20,
    flex: 0.3,
  },
  traceabilityLabel: {
    fontSize: 10,
    color: COLORS.primary,
  },
  chatButton: {
    flex: 0.25,
  },
  chatLabel: {
    fontSize: 10,
    color: COLORS.secondary,
  },
  noResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl,
  },
  noResultsText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontWeight: "600",
  },
  noResultsSubtext: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  traceabilityCard: {
    margin: SPACING.lg,
    borderRadius: 12,
  },
  traceabilityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  traceabilityTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  traceabilityStage: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  stageIndicator: {
    alignItems: "center",
    marginRight: SPACING.md,
  },
  stageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stageLine: {
    width: 2,
    height: 30,
    marginTop: SPACING.xs,
  },
  stageContent: {
    flex: 1,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  stageName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "600",
    marginLeft: SPACING.xs,
  },
  stageDate: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  stageLocation: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  stageDetails: {
    marginTop: SPACING.xs,
  },
  stageDetail: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  certificationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.xs,
  },
  certificationTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 12,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs / 2,
  },
  certificationText: {
    fontSize: 10,
    color: COLORS.success,
    marginLeft: 2,
    fontWeight: "600",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.lg,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderColor: COLORS.secondary,
  },
  actionButtonLabel: {
    color: COLORS.secondary,
    fontSize: FONTS.sizes.small,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: COLORS.secondary,
  },
});
