import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Button,
  Chip,
  ProgressBar,
  Divider,
  FAB,
  Avatar,
  Timeline,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { SupplyChainService } from "../../data/enhancedServices";

const { width, height } = Dimensions.get("window");

export default function SupplyChainLog() {
  const router = useRouter();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    setLoading(true);
    try {
      const shipmentData = await SupplyChainService.getShipments();
      setShipments(shipmentData);
    } catch (error) {
      Alert.alert("Error", "Failed to load shipment data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadShipments();
    setRefreshing(false);
  };

  const handleShipmentPress = async (shipmentId) => {
    try {
      const details = await SupplyChainService.getShipmentDetails(shipmentId);
      setSelectedShipment(details);
      setDetailsVisible(true);
    } catch (error) {
      Alert.alert("Error", "Failed to load shipment details");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#4CAF50";
      case "in transit":
        return "#FF9800";
      case "pending":
        return "#2196F3";
      case "delayed":
        return "#F44336";
      case "processing":
        return "#9C27B0";
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "check-circle";
      case "in transit":
        return "local-shipping";
      case "pending":
        return "schedule";
      case "delayed":
        return "warning";
      case "processing":
        return "hourglass-empty";
      default:
        return "help";
    }
  };

  const getProgressValue = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return 1.0;
      case "in transit":
        return 0.7;
      case "processing":
        return 0.4;
      case "pending":
        return 0.2;
      case "delayed":
        return 0.5;
      default:
        return 0.0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const filterShipments = () => {
    if (filterStatus === "all") return shipments;
    return shipments.filter(
      (shipment) => shipment.status.toLowerCase() === filterStatus.toLowerCase()
    );
  };

  const renderShipmentCard = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleShipmentPress(item.id)}>
        <Card style={styles.shipmentCard}>
          <Card.Content>
            {/* Header */}
            <View style={styles.shipmentHeader}>
              <View style={styles.shipmentInfo}>
                <Text style={styles.shipmentId}>#{item.id}</Text>
                <Text style={styles.shipmentTitle}>{item.title}</Text>
                <Text style={styles.shipmentSubtitle}>{item.buyer}</Text>
              </View>

              <View style={styles.shipmentStatus}>
                <Chip
                  icon={() => (
                    <MaterialIcons
                      name={getStatusIcon(item.status)}
                      size={16}
                      color={getStatusColor(item.status)}
                    />
                  )}
                  style={[
                    styles.statusChip,
                    { borderColor: getStatusColor(item.status) },
                  ]}
                  textStyle={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                  mode="outlined"
                >
                  {item.status}
                </Chip>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={getProgressValue(item.status)}
                color={getStatusColor(item.status)}
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>
                {Math.round(getProgressValue(item.status) * 100)}% Complete
              </Text>
            </View>

            <Divider style={styles.divider} />

            {/* Details */}
            <View style={styles.shipmentDetails}>
              <View style={styles.detailRow}>
                <MaterialIcons
                  name="inventory"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>
                  {item.quantity} {item.unit} of {item.commodity}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialIcons
                  name="location-on"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>
                  {item.from} → {item.to}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialIcons
                  name="calendar-today"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>
                  Shipped: {formatDate(item.shipDate)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialIcons
                  name="currency-rupee"
                  size={18}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.detailText}>
                  Value: {formatCurrency(item.value)}
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.shipmentFooter}>
              <Text style={styles.estimatedDelivery}>
                Est. Delivery: {formatDate(item.estimatedDelivery)}
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={COLORS.textSecondary}
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderDetailModal = () => {
    if (!selectedShipment) return null;

    return (
      <Modal
        visible={detailsVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setDetailsVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.modalHeader}
          >
            <Button
              mode="text"
              onPress={() => setDetailsVisible(false)}
              icon="arrow-left"
              textColor="white"
            >
              Back
            </Button>
            <Text style={styles.modalTitle}>Shipment Details</Text>
            <Button
              mode="text"
              onPress={() => Alert.alert("Track", "Live tracking coming soon!")}
              icon="my-location"
              textColor="white"
            ></Button>
          </LinearGradient>

          <FlatList
            data={[selectedShipment]}
            renderItem={({ item }) => (
              <View style={styles.detailContent}>
                {/* Shipment Overview */}
                <Card style={styles.overviewCard}>
                  <Card.Content>
                    <View style={styles.overviewHeader}>
                      <Avatar.Icon
                        size={50}
                        icon="local-shipping"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      />
                      <View style={styles.overviewInfo}>
                        <Text style={styles.overviewTitle}>#{item.id}</Text>
                        <Text style={styles.overviewSubtitle}>
                          {item.title}
                        </Text>
                        <Chip
                          mode="flat"
                          style={[
                            styles.detailStatusChip,
                            {
                              backgroundColor:
                                getStatusColor(item.status) + "20",
                            },
                          ]}
                          textStyle={[
                            styles.detailStatusText,
                            { color: getStatusColor(item.status) },
                          ]}
                        >
                          {item.status}
                        </Chip>
                      </View>
                    </View>
                  </Card.Content>
                </Card>

                {/* Tracking Timeline */}
                <Card style={styles.timelineCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Tracking Timeline</Text>
                    {item.timeline &&
                      item.timeline.map((event, index) => (
                        <View key={index} style={styles.timelineItem}>
                          <View style={styles.timelineMarker}>
                            <View
                              style={[
                                styles.timelineDot,
                                {
                                  backgroundColor: event.completed
                                    ? getStatusColor(item.status)
                                    : "#E0E0E0",
                                },
                              ]}
                            />
                            {index < item.timeline.length - 1 && (
                              <View
                                style={[
                                  styles.timelineLine,
                                  {
                                    backgroundColor: event.completed
                                      ? getStatusColor(item.status)
                                      : "#E0E0E0",
                                  },
                                ]}
                              />
                            )}
                          </View>
                          <View style={styles.timelineContent}>
                            <Text
                              style={[
                                styles.timelineTitle,
                                {
                                  color: event.completed
                                    ? COLORS.text
                                    : COLORS.textSecondary,
                                },
                              ]}
                            >
                              {event.title}
                            </Text>
                            <Text style={styles.timelineDate}>
                              {event.date}
                            </Text>
                            <Text style={styles.timelineDescription}>
                              {event.description}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </Card.Content>
                </Card>

                {/* Shipment Information */}
                <Card style={styles.infoCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>
                      Shipment Information
                    </Text>

                    <View style={styles.infoGrid}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Commodity</Text>
                        <Text style={styles.infoValue}>{item.commodity}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Quantity</Text>
                        <Text style={styles.infoValue}>
                          {item.quantity} {item.unit}
                        </Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Value</Text>
                        <Text style={styles.infoValue}>
                          {formatCurrency(item.value)}
                        </Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Weight</Text>
                        <Text style={styles.infoValue}>{item.weight} kg</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>

                {/* Contact Information */}
                <Card style={styles.contactCard}>
                  <Card.Content>
                    <Text style={styles.sectionTitle}>Contact Information</Text>

                    <View style={styles.contactRow}>
                      <MaterialIcons
                        name="business"
                        size={24}
                        color={COLORS.primary}
                      />
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Buyer</Text>
                        <Text style={styles.contactValue}>{item.buyer}</Text>
                        <Text style={styles.contactSubtext}>
                          {item.buyerContact}
                        </Text>
                      </View>
                      <Button
                        mode="outlined"
                        icon="phone"
                        onPress={() =>
                          Alert.alert("Call", `Call ${item.buyer}?`)
                        }
                        style={styles.contactButton}
                      >
                        Call
                      </Button>
                    </View>

                    <Divider style={styles.contactDivider} />

                    <View style={styles.contactRow}>
                      <MaterialIcons
                        name="local-shipping"
                        size={24}
                        color={COLORS.secondary}
                      />
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Transporter</Text>
                        <Text style={styles.contactValue}>
                          {item.transporter}
                        </Text>
                        <Text style={styles.contactSubtext}>
                          {item.transporterContact}
                        </Text>
                      </View>
                      <Button
                        mode="outlined"
                        icon="message"
                        onPress={() =>
                          Alert.alert("Message", `Message ${item.transporter}?`)
                        }
                        style={styles.contactButton}
                      >
                        SMS
                      </Button>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Status Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Status:</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { key: "all", label: "All", count: shipments.length },
            {
              key: "in transit",
              label: "In Transit",
              count: shipments.filter(
                (s) => s.status.toLowerCase() === "in transit"
              ).length,
            },
            {
              key: "delivered",
              label: "Delivered",
              count: shipments.filter(
                (s) => s.status.toLowerCase() === "delivered"
              ).length,
            },
            {
              key: "pending",
              label: "Pending",
              count: shipments.filter(
                (s) => s.status.toLowerCase() === "pending"
              ).length,
            },
          ]}
          renderItem={({ item }) => (
            <Chip
              mode={filterStatus === item.key ? "flat" : "outlined"}
              selected={filterStatus === item.key}
              onPress={() => setFilterStatus(item.key)}
              style={[
                styles.filterChip,
                filterStatus === item.key && {
                  backgroundColor: COLORS.primary,
                },
              ]}
              textStyle={filterStatus === item.key ? { color: "white" } : {}}
            >
              {item.label} ({item.count})
            </Chip>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="local-shipping" size={60} color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Supply Chain...</Text>
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
        <Text style={styles.headerTitle}>Supply Chain Log 🚛</Text>
        <Button
          mode="text"
          onPress={handleRefresh}
          icon="refresh"
          textColor="white"
          style={styles.refreshButton}
        ></Button>
      </LinearGradient>

      <FlatList
        data={filterShipments()}
        renderItem={renderShipmentCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.shipmentsList}
        contentContainerStyle={styles.shipmentsContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="inventory"
              size={80}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyText}>No shipments found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
      />

      {/* Detail Modal */}
      {renderDetailModal()}

      {/* Floating Action Button */}
      <FAB
        icon="add"
        style={styles.fab}
        color="white"
        onPress={() =>
          Alert.alert(
            "New Shipment",
            "Create new shipment feature coming soon!"
          )
        }
        label="New Shipment"
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
  refreshButton: {
    marginRight: -SPACING.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerContainer: {
    backgroundColor: "white",
    marginBottom: SPACING.sm,
  },
  filterContainer: {
    padding: SPACING.lg,
  },
  filterTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  filterChip: {
    marginRight: SPACING.sm,
  },
  shipmentsList: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  shipmentsContent: {
    paddingBottom: 100,
  },
  shipmentCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    elevation: 3,
    borderRadius: 12,
  },
  shipmentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  shipmentInfo: {
    flex: 1,
  },
  shipmentId: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontWeight: "bold",
  },
  shipmentTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  shipmentSubtitle: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  shipmentStatus: {
    alignItems: "flex-end",
  },
  statusChip: {
    backgroundColor: "transparent",
  },
  statusText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
  },
  progressContainer: {
    marginBottom: SPACING.md,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  progressText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "right",
    marginTop: SPACING.xs,
  },
  divider: {
    marginVertical: SPACING.md,
  },
  shipmentDetails: {
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  detailText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  shipmentFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  estimatedDelivery: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.textSecondary,
    marginTop: SPACING.lg,
  },
  emptySubtext: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  // Modal Styles
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
  },
  modalTitle: {
    flex: 1,
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  detailContent: {
    padding: SPACING.lg,
  },
  overviewCard: {
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  overviewInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  overviewTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
  },
  overviewSubtitle: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  detailStatusChip: {
    alignSelf: "flex-start",
    marginTop: SPACING.sm,
  },
  detailStatusText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
  },
  timelineCard: {
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  timelineMarker: {
    alignItems: "center",
    marginRight: SPACING.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    height: 40,
    marginTop: SPACING.xs,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
  },
  timelineDate: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  timelineDescription: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  infoCard: {
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: "48%",
    marginBottom: SPACING.md,
  },
  infoLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  contactCard: {
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  contactInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  contactLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    fontWeight: "bold",
  },
  contactValue: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  contactSubtext: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  contactButton: {
    borderColor: COLORS.primary,
  },
  contactDivider: {
    marginVertical: SPACING.md,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: COLORS.primary,
  },
});
