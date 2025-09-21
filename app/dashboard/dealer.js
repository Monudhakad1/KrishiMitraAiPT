import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import {
  Card,
  Button,
  FAB,
  Avatar,
  Chip,
  DataTable,
  IconButton,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

export default function DealerDashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Wheat",
      quantity: "500 quintal",
      price: "₹2,100/qt",
      status: "In Stock",
      lastUpdated: "2024-03-15",
      supplier: "राम कृष्णा फार्म",
    },
    {
      id: 2,
      name: "Rice",
      quantity: "300 quintal",
      price: "₹1,800/qt",
      status: "In Stock",
      lastUpdated: "2024-03-14",
      supplier: "गोविंद एग्री",
    },
    {
      id: 3,
      name: "Cotton",
      quantity: "150 quintal",
      price: "₹5,500/qt",
      status: "Low Stock",
      lastUpdated: "2024-03-13",
      supplier: "सुनीता कॉटन",
    },
    {
      id: 4,
      name: "Mustard",
      quantity: "0 quintal",
      price: "₹4,200/qt",
      status: "Out of Stock",
      lastUpdated: "2024-03-12",
      supplier: "अजय ऑयल मिल",
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Mock data for dealer dashboard
  const dealerData = {
    name: "गोपाल अग्रवाल",
    nameEn: "Gopal Agarwal",
    location: "Mandi, HP",
    specialization: "Grains",
    licenseNo: "DL12345",
  };

  const recentTransactions = [
    {
      id: "001",
      farmer: "राज कुमार",
      product: "Wheat",
      quantity: "50 qt",
      amount: "₹1,05,000",
      date: "Today",
    },
    {
      id: "002",
      farmer: "सुनीता देवी",
      product: "Rice",
      quantity: "30 qt",
      amount: "₹54,000",
      date: "Yesterday",
    },
    {
      id: "003",
      farmer: "रमेश सिंह",
      product: "Cotton",
      quantity: "20 qt",
      amount: "₹1,10,000",
      date: "2 days ago",
    },
  ];

  const statsData = [
    {
      title: "Today's Revenue",
      value: "₹2,15,000",
      icon: "currency-inr",
      color: "#4CAF50",
    },
    {
      title: "Monthly Revenue",
      value: "₹45,50,000",
      icon: "trending-up",
      color: "#2196F3",
    },
    { title: "Active Farmers", value: "127", icon: "people", color: "#FF9800" },
    { title: "Pending Orders", value: "12", icon: "pending", color: "#F44336" },
  ];

  const myOrders = [
    {
      id: "ORD001",
      customerName: "राम प्रसाद",
      customerNameEn: "Ram Prasad",
      customerType: "Retailer",
      orderDate: "2024-03-15",
      deliveryDate: "2024-03-18",
      status: "Processing",
      totalAmount: "₹75,000",
      items: [
        {
          product: "Wheat",
          quantity: "20 qt",
          rate: "₹2,100/qt",
          amount: "₹42,000",
        },
        {
          product: "Rice",
          quantity: "15 qt",
          rate: "₹1,800/qt",
          amount: "₹27,000",
        },
        {
          product: "Dal",
          quantity: "10 qt",
          rate: "₹600/qt",
          amount: "₹6,000",
        },
      ],
      shippingAddress: "123 Main Market, Delhi",
      paymentMethod: "Bank Transfer",
      notes: "Urgent delivery required for festival season",
    },
    {
      id: "ORD002",
      customerName: "सुनीता देवी",
      customerNameEn: "Sunita Devi",
      customerType: "Wholesaler",
      orderDate: "2024-03-14",
      deliveryDate: "2024-03-17",
      status: "Shipped",
      totalAmount: "₹1,25,000",
      items: [
        {
          product: "Cotton",
          quantity: "15 qt",
          rate: "₹5,500/qt",
          amount: "₹82,500",
        },
        {
          product: "Mustard",
          quantity: "10 qt",
          rate: "₹4,200/qt",
          amount: "₹42,000",
        },
      ],
      shippingAddress: "456 Trading Complex, Mumbai",
      paymentMethod: "Cash on Delivery",
      notes: "Quality check completed, ready for dispatch",
    },
    {
      id: "ORD003",
      customerName: "अजय कुमार",
      customerNameEn: "Ajay Kumar",
      customerType: "Direct Consumer",
      orderDate: "2024-03-13",
      deliveryDate: "2024-03-16",
      status: "Delivered",
      totalAmount: "₹45,000",
      items: [
        {
          product: "Rice",
          quantity: "20 qt",
          rate: "₹1,800/qt",
          amount: "₹36,000",
        },
        {
          product: "Wheat",
          quantity: "5 qt",
          rate: "₹2,100/qt",
          amount: "₹10,500",
        },
      ],
      shippingAddress: "789 Residential Area, Chandigarh",
      paymentMethod: "UPI",
      notes: "Customer satisfied with quality",
    },
    {
      id: "ORD004",
      customerName: "गीता शर्मा",
      customerNameEn: "Geeta Sharma",
      customerType: "Retailer",
      orderDate: "2024-03-12",
      deliveryDate: "2024-03-15",
      status: "Cancelled",
      totalAmount: "₹30,000",
      items: [
        {
          product: "Dal",
          quantity: "25 qt",
          rate: "₹600/qt",
          amount: "₹15,000",
        },
        {
          product: "Rice",
          quantity: "10 qt",
          rate: "₹1,800/qt",
          amount: "₹18,000",
        },
      ],
      shippingAddress: "321 Shop Street, Ludhiana",
      paymentMethod: "Bank Transfer",
      notes: "Cancelled due to payment issues",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return COLORS.success;
      case "Low Stock":
        return COLORS.warning;
      case "Out of Stock":
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "#FF9800";
      case "Shipped":
        return "#2196F3";
      case "Delivered":
        return "#4CAF50";
      case "Cancelled":
        return "#F44336";
      default:
        return COLORS.textSecondary;
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleEditProduct = (productId) => {
    router.push({
      pathname: "/dealer/product-management",
      params: {
        mode: "edit",
        productId: productId,
      },
    });
  };

  const handleDeleteProduct = (productId) => {
    const product = inventoryItems.find((item) => item.id === productId);
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete ${product.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setInventoryItems((prev) =>
              prev.filter((item) => item.id !== productId)
            );
          },
        },
      ]
    );
  };

  const handleAddProduct = () => {
    router.push({
      pathname: "/dealer/product-management",
      params: {
        mode: "add",
      },
    });
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
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Avatar.Icon
              size={60}
              icon="store"
              style={{ backgroundColor: COLORS.accent }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.dealerName}>{dealerData.name}</Text>
              <Text style={styles.dealerNameEn}>{dealerData.nameEn}</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.location}>{dealerData.location}</Text>
              </View>
              <Text style={styles.licenseText}>
                License: {dealerData.licenseNo}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {statsData.map((stat, index) => (
            <Card
              key={index}
              style={[styles.statCard, index % 2 === 1 && styles.statCardRight]}
            >
              <Card.Content style={styles.statContent}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: stat.color + "20" },
                  ]}
                >
                  <MaterialIcons
                    name={stat.icon}
                    size={24}
                    color={stat.color}
                  />
                </View>
                <View style={styles.statInfo}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Specialization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialization / विशेषज्ञता</Text>
          <Chip
            style={styles.specializationChip}
            textStyle={styles.specializationChipText}
            icon="star"
          >
            {dealerData.specialization}
          </Chip>
        </View>

        {/* Inventory Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Inventory Overview / इन्वेंटरी अवलोकन
          </Text>
          {inventoryItems.map((item) => (
            <Card key={item.id} style={styles.inventoryItemCard}>
              <View style={styles.inventoryItem}>
                <TouchableOpacity style={styles.inventoryItemFront}>
                  <Card.Content style={styles.inventoryItemContent}>
                    <View style={styles.inventoryItemMain}>
                      <View style={styles.inventoryItemInfo}>
                        <Text style={styles.inventoryItemName}>
                          {item.name}
                        </Text>
                        <Text style={styles.inventoryItemSupplier}>
                          Supplier: {item.supplier}
                        </Text>
                        <View style={styles.inventoryItemDetails}>
                          <View style={styles.inventoryDetailItem}>
                            <MaterialIcons
                              name="inventory"
                              size={16}
                              color={COLORS.textSecondary}
                            />
                            <Text style={styles.inventoryDetailText}>
                              {item.quantity}
                            </Text>
                          </View>
                          <View style={styles.inventoryDetailItem}>
                            <MaterialIcons
                              name="attach-money"
                              size={16}
                              color={COLORS.textSecondary}
                            />
                            <Text style={styles.inventoryDetailText}>
                              {item.price}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.inventoryLastUpdated}>
                          Last updated: {item.lastUpdated}
                        </Text>
                      </View>
                      <View style={styles.inventoryItemRight}>
                        <Chip
                          style={[
                            styles.inventoryStatusChip,
                            {
                              backgroundColor:
                                getStatusColor(item.status) + "20",
                            },
                          ]}
                          textStyle={[
                            styles.inventoryStatusText,
                            { color: getStatusColor(item.status) },
                          ]}
                          compact
                        >
                          {item.status}
                        </Chip>
                        <View style={styles.inventoryActions}>
                          <TouchableOpacity
                            style={[styles.swipeAction, styles.editAction]}
                            onPress={() => handleEditProduct(item.id)}
                          >
                            <MaterialIcons
                              name="edit"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.swipeAction, styles.deleteAction]}
                            onPress={() => handleDeleteProduct(item.id)}
                          >
                            <MaterialIcons
                              name="delete"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                </TouchableOpacity>
              </View>
            </Card>
          ))}

          <Button
            mode="outlined"
            icon="add"
            style={styles.addProductButton}
            labelStyle={styles.addProductLabel}
            onPress={handleAddProduct}
          >
            Add New Product
          </Button>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Transactions / हाल के लेन-देन
          </Text>
          {recentTransactions.map((transaction, index) => (
            <Card key={index} style={styles.transactionCard}>
              <Card.Content style={styles.transactionContent}>
                <View style={styles.transactionHeader}>
                  <Text style={styles.transactionId}>#{transaction.id}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.farmerName}>{transaction.farmer}</Text>
                    <Text style={styles.productInfo}>
                      {transaction.product} • {transaction.quantity}
                    </Text>
                  </View>
                  <Text style={styles.transactionAmount}>
                    {transaction.amount}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* My Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Orders / मेरे ऑर्डर</Text>
          {myOrders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <TouchableOpacity onPress={() => toggleOrderExpansion(order.id)}>
                <Card.Content style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <View style={styles.orderTitleRow}>
                      <Text style={styles.orderId}>#{order.id}</Text>
                      <Chip
                        style={[
                          styles.orderStatusChip,
                          {
                            backgroundColor:
                              getOrderStatusColor(order.status) + "20",
                          },
                        ]}
                        textStyle={[
                          styles.orderStatusText,
                          { color: getOrderStatusColor(order.status) },
                        ]}
                        compact
                      >
                        {order.status}
                      </Chip>
                    </View>
                    <Text style={styles.customerName}>
                      {order.customerName}
                    </Text>
                    <Text style={styles.customerNameEn}>
                      {order.customerNameEn} • {order.customerType}
                    </Text>
                    <View style={styles.orderMetaRow}>
                      <View style={styles.orderMeta}>
                        <MaterialIcons
                          name="calendar-today"
                          size={14}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.orderMetaText}>
                          {order.orderDate}
                        </Text>
                      </View>
                      <View style={styles.orderMeta}>
                        <MaterialIcons
                          name="local-shipping"
                          size={14}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.orderMetaText}>
                          {order.deliveryDate}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.orderHeaderRight}>
                    <Text style={styles.orderAmount}>{order.totalAmount}</Text>
                    <MaterialIcons
                      name={
                        expandedOrders[order.id] ? "expand-less" : "expand-more"
                      }
                      size={24}
                      color={COLORS.textSecondary}
                    />
                  </View>
                </Card.Content>
              </TouchableOpacity>

              {expandedOrders[order.id] && (
                <Card.Content style={styles.orderDetails}>
                  <View style={styles.orderItemsSection}>
                    <Text style={styles.orderSectionTitle}>Order Items:</Text>
                    {order.items.map((item, index) => (
                      <View key={index} style={styles.orderItem}>
                        <Text style={styles.orderItemProduct}>
                          {item.product}
                        </Text>
                        <Text style={styles.orderItemDetails}>
                          {item.quantity} @ {item.rate} = {item.amount}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.orderInfoSection}>
                    <View style={styles.orderInfoRow}>
                      <MaterialIcons
                        name="location-on"
                        size={16}
                        color={COLORS.textSecondary}
                      />
                      <View style={styles.orderInfoContent}>
                        <Text style={styles.orderInfoLabel}>
                          Shipping Address:
                        </Text>
                        <Text style={styles.orderInfoValue}>
                          {order.shippingAddress}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.orderInfoRow}>
                      <MaterialIcons
                        name="payment"
                        size={16}
                        color={COLORS.textSecondary}
                      />
                      <View style={styles.orderInfoContent}>
                        <Text style={styles.orderInfoLabel}>
                          Payment Method:
                        </Text>
                        <Text style={styles.orderInfoValue}>
                          {order.paymentMethod}
                        </Text>
                      </View>
                    </View>

                    {order.notes && (
                      <View style={styles.orderInfoRow}>
                        <MaterialIcons
                          name="note"
                          size={16}
                          color={COLORS.textSecondary}
                        />
                        <View style={styles.orderInfoContent}>
                          <Text style={styles.orderInfoLabel}>Notes:</Text>
                          <Text style={styles.orderInfoValue}>
                            {order.notes}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={styles.orderActions}>
                    {order.status === "Processing" && (
                      <>
                        <Button
                          mode="outlined"
                          icon="local-shipping"
                          style={styles.orderActionButton}
                          labelStyle={styles.orderActionLabel}
                          compact
                        >
                          Ship Order
                        </Button>
                        <Button
                          mode="outlined"
                          icon="cancel"
                          style={[
                            styles.orderActionButton,
                            { borderColor: COLORS.error },
                          ]}
                          labelStyle={[
                            styles.orderActionLabel,
                            { color: COLORS.error },
                          ]}
                          compact
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {order.status === "Shipped" && (
                      <Button
                        mode="outlined"
                        icon="track-changes"
                        style={styles.orderActionButton}
                        labelStyle={styles.orderActionLabel}
                        compact
                      >
                        Track Order
                      </Button>
                    )}
                    <Button
                      mode="outlined"
                      icon="receipt"
                      style={styles.orderActionButton}
                      labelStyle={styles.orderActionLabel}
                      compact
                    >
                      View Invoice
                    </Button>
                  </View>
                </Card.Content>
              )}
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions / त्वरित कार्य</Text>
          <View style={styles.actionsContainer}>
            <Button
              mode="outlined"
              icon="add-shopping-cart"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              New Purchase
            </Button>
            <Button
              mode="outlined"
              icon="receipt"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Generate Invoice
            </Button>
            <Button
              mode="outlined"
              icon="inventory"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              Manage Stock
            </Button>
            <Button
              mode="outlined"
              icon="analytics"
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
            >
              View Reports
            </Button>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="add"
        style={styles.fab}
        color="white"
        onPress={handleAddProduct}
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
    backgroundColor: COLORS.accent,
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
  dealerName: {
    color: "white",
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  dealerNameEn: {
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
  licenseText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: FONTS.sizes.small,
    marginTop: SPACING.xs,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  statCard: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderRadius: 12,
    elevation: 2,
  },
  statCardRight: {
    marginLeft: "4%",
  },
  statContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
  },
  statTitle: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
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
  specializationChip: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.accent + "20",
  },
  specializationChipText: {
    color: COLORS.accent,
    fontWeight: "600",
  },
  inventoryCard: {
    borderRadius: 12,
    elevation: 2,
  },
  inventoryItemCard: {
    marginBottom: SPACING.sm,
    borderRadius: 12,
    elevation: 2,
  },
  inventoryItem: {
    position: "relative",
  },
  inventoryItemFront: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
  inventoryItemContent: {
    padding: SPACING.md,
  },
  inventoryItemMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inventoryItemInfo: {
    flex: 1,
  },
  inventoryItemName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inventoryItemSupplier: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  inventoryItemDetails: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.xs,
  },
  inventoryDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inventoryDetailText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  inventoryLastUpdated: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  inventoryItemRight: {
    alignItems: "flex-end",
  },
  inventoryStatusChip: {
    height: 24,
    marginBottom: SPACING.sm,
  },
  inventoryStatusText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "600",
  },
  inventoryActions: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  swipeAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editAction: {
    backgroundColor: "#2196F3",
  },
  deleteAction: {
    backgroundColor: "#F44336",
  },
  addProductButton: {
    marginTop: SPACING.md,
    borderColor: COLORS.accent,
    borderStyle: "dashed",
  },
  addProductLabel: {
    color: COLORS.accent,
  },
  statusChip: {
    height: 24,
  },
  statusChipText: {
    fontSize: FONTS.sizes.small,
    fontWeight: "600",
  },
  transactionCard: {
    marginBottom: SPACING.sm,
    borderRadius: 12,
    elevation: 2,
  },
  transactionContent: {
    padding: SPACING.md,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  transactionId: {
    fontSize: FONTS.sizes.small,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  transactionDate: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  productInfo: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  transactionAmount: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    marginBottom: SPACING.sm,
    borderColor: COLORS.accent,
  },
  actionButtonLabel: {
    color: COLORS.accent,
    fontSize: FONTS.sizes.small,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: COLORS.accent,
  },
  orderCard: {
    marginBottom: SPACING.md,
    borderRadius: 12,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 0,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderHeaderRight: {
    alignItems: "flex-end",
  },
  orderTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  orderId: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.accent,
    marginRight: SPACING.md,
  },
  orderStatusChip: {
    height: 24,
  },
  orderStatusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  customerName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  customerNameEn: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  orderMetaRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderMetaText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  orderAmount: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  orderItemsSection: {
    marginBottom: SPACING.md,
  },
  orderSectionTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderItemProduct: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    fontWeight: "500",
  },
  orderItemDetails: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  orderInfoSection: {
    marginBottom: SPACING.md,
  },
  orderInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  orderInfoContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  orderInfoLabel: {
    fontSize: FONTS.sizes.small,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  orderInfoValue: {
    fontSize: FONTS.sizes.small,
    color: COLORS.text,
    marginTop: 2,
  },
  orderActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  orderActionButton: {
    borderColor: COLORS.accent,
    borderRadius: 20,
  },
  orderActionLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.accent,
  },
});
