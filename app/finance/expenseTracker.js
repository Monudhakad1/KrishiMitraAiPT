import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import {
  Card,
  Button,
  TextInput,
  SegmentedButtons,
  FAB,
  DataTable,
  Chip,
} from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { ExpenseTrackerService } from "../../data/enhancedServices";

const { width } = Dimensions.get("window");
const chartWidth = width - 40;

export default function ExpenseTracker() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    profit: 0,
  });
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showAddForm, setShowAddForm] = useState(false);
  const [transactionType, setTransactionType] = useState("expense");
  const [loading, setLoading] = useState(true);

  // Form states
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    loadExpenseData();
  }, [selectedPeriod]);

  const loadExpenseData = async () => {
    setLoading(true);
    try {
      const data = await ExpenseTrackerService.getExpenseData(selectedPeriod);
      setTransactions(data.transactions);
      setChartData(data.chartData);
      setSummary(data.summary);
    } catch (error) {
      Alert.alert("Error", "Failed to load expense data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async () => {
    if (!amount || !category || !description) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      const newTransaction = {
        type: transactionType,
        amount: parseFloat(amount),
        category,
        description,
        date,
      };

      const updatedData = await ExpenseTrackerService.addTransaction(
        newTransaction
      );

      setTransactions(updatedData.transactions);
      setChartData(updatedData.chartData);
      setSummary(updatedData.summary);

      // Reset form
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      setShowAddForm(false);

      Alert.alert(
        "Success",
        `${
          transactionType === "income" ? "Income" : "Expense"
        } added successfully!`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to add transaction");
    }
  };

  const periodButtons = [
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const expenseCategories = [
    "Seeds",
    "Fertilizers",
    "Pesticides",
    "Equipment",
    "Fuel",
    "Labor",
    "Irrigation",
    "Transportation",
    "Storage",
    "Insurance",
    "Maintenance",
    "Other",
  ];

  const incomeCategories = [
    "Crop Sales",
    "Livestock",
    "Dairy",
    "Government Subsidy",
    "Contract Farming",
    "Equipment Rental",
    "Consulting",
    "Other",
  ];

  const getCurrentCategories = () => {
    return transactionType === "income" ? incomeCategories : expenseCategories;
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getTransactionColor = (type) => {
    return type === "income" ? "#4CAF50" : "#F44336";
  };

  const renderSummaryCards = () => (
    <View style={styles.summaryContainer}>
      <Card style={[styles.summaryCard, styles.incomeCard]}>
        <Card.Content style={styles.summaryContent}>
          <MaterialIcons name="trending-up" size={32} color="#4CAF50" />
          <View style={styles.summaryText}>
            <Text style={styles.summaryValue}>
              {formatCurrency(summary.totalIncome)}
            </Text>
            <Text style={styles.summaryLabel}>Total Income</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.summaryCard, styles.expenseCard]}>
        <Card.Content style={styles.summaryContent}>
          <MaterialIcons name="trending-down" size={32} color="#F44336" />
          <View style={styles.summaryText}>
            <Text style={styles.summaryValue}>
              {formatCurrency(summary.totalExpenses)}
            </Text>
            <Text style={styles.summaryLabel}>Total Expenses</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.summaryCard, styles.profitCard]}>
        <Card.Content style={styles.summaryContent}>
          <MaterialIcons
            name={summary.profit >= 0 ? "account-balance-wallet" : "money-off"}
            size={32}
            color={summary.profit >= 0 ? "#2196F3" : "#FF9800"}
          />
          <View style={styles.summaryText}>
            <Text
              style={[
                styles.summaryValue,
                { color: summary.profit >= 0 ? "#2196F3" : "#FF9800" },
              ]}
            >
              {formatCurrency(Math.abs(summary.profit))}
            </Text>
            <Text style={styles.summaryLabel}>
              {summary.profit >= 0 ? "Net Profit" : "Net Loss"}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderPieChart = () => {
    if (!chartData || chartData.length === 0) {
      return (
        <Card style={styles.chartCard}>
          <Card.Content>
            <Text style={styles.chartTitle}>Expense Breakdown</Text>
            <View style={styles.noDataContainer}>
              <MaterialIcons
                name="pie-chart"
                size={60}
                color={COLORS.textSecondary}
              />
              <Text style={styles.noDataText}>No expense data available</Text>
            </View>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Expense Breakdown</Text>
          <PieChart
            data={chartData}
            width={chartWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.primary,
              backgroundGradientFrom: COLORS.primary,
              backgroundGradientTo: COLORS.secondary,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            style={styles.chart}
          />

          {/* Legend */}
          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.name}: {formatCurrency(item.amount)} ({item.percentage}
                  %)
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderAddTransactionForm = () => {
    if (!showAddForm) return null;

    return (
      <Card style={styles.formCard}>
        <Card.Content>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Add New Transaction</Text>
            <Button
              mode="text"
              onPress={() => setShowAddForm(false)}
              icon="close"
              textColor={COLORS.textSecondary}
            >
              Cancel
            </Button>
          </View>

          {/* Transaction Type Toggle */}
          <SegmentedButtons
            value={transactionType}
            onValueChange={setTransactionType}
            buttons={[
              { value: "expense", label: "Expense", icon: "trending-down" },
              { value: "income", label: "Income", icon: "trending-up" },
            ]}
            style={styles.typeToggle}
          />

          {/* Amount Input */}
          <TextInput
            label="Amount (₹)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="currency-inr" />}
          />

          {/* Category Selection */}
          <View style={styles.categoryContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categoryChips}>
              {getCurrentCategories().map((cat, index) => (
                <Chip
                  key={index}
                  mode={category === cat ? "flat" : "outlined"}
                  selected={category === cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryChip,
                    category === cat && { backgroundColor: COLORS.primary },
                  ]}
                  textStyle={category === cat ? { color: "white" } : {}}
                >
                  {cat}
                </Chip>
              ))}
            </View>
          </View>

          {/* Description Input */}
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            placeholder="Brief description of the transaction"
            multiline
            numberOfLines={3}
          />

          {/* Date Input */}
          <TextInput
            label="Date"
            value={date}
            onChangeText={setDate}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="calendar" />}
          />

          <Button
            mode="contained"
            onPress={handleAddTransaction}
            style={styles.submitButton}
            icon="check"
            disabled={!amount || !category || !description}
          >
            Add {transactionType === "income" ? "Income" : "Expense"}
          </Button>
        </Card.Content>
      </Card>
    );
  };

  const renderTransactionTable = () => (
    <Card style={styles.tableCard}>
      <Card.Content>
        <Text style={styles.tableTitle}>Recent Transactions</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>

          {transactions.slice(0, 10).map((transaction, index) => (
            <DataTable.Row key={index} style={styles.tableRow}>
              <DataTable.Cell>
                <View style={styles.dateCell}>
                  <Text style={styles.dateText}>
                    {formatDate(transaction.date)}
                  </Text>
                  <Text style={styles.descriptionText} numberOfLines={1}>
                    {transaction.description}
                  </Text>
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <Chip
                  mode="outlined"
                  style={[
                    styles.typeChip,
                    { borderColor: getTransactionColor(transaction.type) },
                  ]}
                  textStyle={{
                    color: getTransactionColor(transaction.type),
                    fontSize: FONTS.sizes.small,
                  }}
                >
                  {transaction.category}
                </Chip>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  style={[
                    styles.amountText,
                    { color: getTransactionColor(transaction.type) },
                  ]}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        {transactions.length > 10 && (
          <View style={styles.showMoreContainer}>
            <Button
              mode="outlined"
              onPress={() => Alert.alert("Show More", "Feature coming soon!")}
              style={styles.showMoreButton}
            >
              Show More Transactions
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons
          name="account-balance-wallet"
          size={60}
          color={COLORS.primary}
        />
        <Text style={styles.loadingText}>Loading Expense Data...</Text>
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
        <Text style={styles.headerTitle}>Expense Tracker 📊</Text>
        <Button
          mode="text"
          onPress={() => Alert.alert("Export", "Export feature coming soon!")}
          icon="download"
          textColor="white"
          style={styles.exportButton}
        ></Button>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <View style={styles.controlsContainer}>
          <SegmentedButtons
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            buttons={periodButtons}
            style={styles.periodButtons}
          />
        </View>

        {/* Summary Cards */}
        {renderSummaryCards()}

        {/* Add Transaction Form */}
        {renderAddTransactionForm()}

        {/* Pie Chart */}
        {renderPieChart()}

        {/* Transactions Table */}
        {renderTransactionTable()}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => setShowAddForm(!showAddForm)}
        label={showAddForm ? "Cancel" : "Add"}
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
  exportButton: {
    marginRight: -SPACING.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  controlsContainer: {
    padding: SPACING.lg,
    backgroundColor: "white",
    elevation: 2,
  },
  periodButtons: {
    marginBottom: SPACING.sm,
  },
  summaryContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  summaryCard: {
    marginBottom: SPACING.md,
    elevation: 3,
  },
  summaryContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  summaryText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  summaryValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: "bold",
    color: COLORS.text,
  },
  summaryLabel: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  incomeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  profitCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  formCard: {
    margin: SPACING.lg,
    elevation: 3,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  formTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
  },
  typeToggle: {
    marginBottom: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: "white",
  },
  inputLabel: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  categoryContainer: {
    marginBottom: SPACING.lg,
  },
  categoryChips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryChip: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
  chartCard: {
    margin: SPACING.lg,
    elevation: 3,
  },
  chartTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataContainer: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  noDataText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
  legendContainer: {
    marginTop: SPACING.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.sm,
  },
  legendText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
  },
  tableCard: {
    margin: SPACING.lg,
    elevation: 3,
  },
  tableTitle: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dateCell: {
    flex: 1,
  },
  dateText: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  descriptionText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  typeChip: {
    height: 28,
  },
  amountText: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
  },
  showMoreContainer: {
    alignItems: "center",
    marginTop: SPACING.md,
  },
  showMoreButton: {
    borderColor: COLORS.primary,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: COLORS.primary,
  },
  bottomPadding: {
    height: 100,
  },
});
