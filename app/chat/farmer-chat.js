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
  Avatar,
  Card,
  IconButton,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS, SPACING } from "../../constants/theme";

export default function FarmerChat() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Get farmer details from params or use default
  const farmerData = {
    id: params.farmerId || "1",
    name: params.farmerName || "राज कुमार",
    nameEn: params.farmerNameEn || "Raj Kumar",
    location: params.location || "Punjab",
    avatar: params.avatar || "👨‍🌾",
    product: params.productName || "Fresh Tomatoes",
    isOnline: true,
  };

  // Mock messages data
  const initialMessages = [
    {
      id: 1,
      text: "नमस्ते! आपको मेरे टमाटर कैसे लगे?",
      textEn: "Hello! How did you find my tomatoes?",
      sender: "farmer",
      timestamp: "10:30 AM",
      isRead: true,
    },
    {
      id: 2,
      text: "Hello! They look very fresh and organic. What's the price for 10kg?",
      textHindi:
        "नमस्ते! वे बहुत ताजे और जैविक लगते हैं। 10 किलो का क्या दाम है?",
      sender: "consumer",
      timestamp: "10:32 AM",
      isRead: true,
    },
    {
      id: 3,
      text: "10 किलो के लिए ₹380 होगा। ये बिल्कुल ऑर्गेनिक हैं।",
      textEn: "It will be ₹380 for 10kg. These are completely organic.",
      sender: "farmer",
      timestamp: "10:35 AM",
      isRead: true,
    },
    {
      id: 4,
      text: "Great! Can you deliver to Delhi? Also, do you have quality certificates?",
      textHindi:
        "बढ़िया! क्या आप दिल्ली तक डिलीवर कर सकते हैं? और क्या आपके पास गुणवत्ता प्रमाण पत्र हैं?",
      sender: "consumer",
      timestamp: "10:37 AM",
      isRead: true,
    },
    {
      id: 5,
      text: "हाँ, मैं दिल्ली डिलीवर करता हूं। सभी ऑर्गेनिक सर्टिफिकेट हैं।",
      textEn: "Yes, I deliver to Delhi. I have all organic certificates.",
      sender: "farmer",
      timestamp: "10:40 AM",
      isRead: false,
    },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "consumer",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isRead: false,
      };

      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate farmer response after 2 seconds
      setTimeout(() => {
        const farmerResponse = {
          id: messages.length + 2,
          text: getAutoReply(message),
          textEn: getAutoReplyEn(message),
          sender: "farmer",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isRead: false,
        };
        setMessages((prev) => [...prev, farmerResponse]);
      }, 2000);
    }
  };

  const getAutoReply = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "मूल्य की जानकारी के लिए धन्यवाद! मैं आपको बेहतरीन दर दूंगा।";
    } else if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("deliver")
    ) {
      return "डिलीवरी 2-3 दिन में हो जाएगी। पैकिंग बहुत अच्छी होगी।";
    } else if (
      lowerMessage.includes("quality") ||
      lowerMessage.includes("organic")
    ) {
      return "गुणवत्ता की गारंटी है! सभी प्रमाण पत्र उपलब्ध हैं।";
    } else {
      return "धन्यवाद आपके संदेश के लिए! मैं जल्दी ही जवाब दूंगा।";
    }
  };

  const getAutoReplyEn = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Thank you for asking about price! I'll give you the best rate.";
    } else if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("deliver")
    ) {
      return "Delivery will be done in 2-3 days. Packaging will be very good.";
    } else if (
      lowerMessage.includes("quality") ||
      lowerMessage.includes("organic")
    ) {
      return "Quality is guaranteed! All certificates are available.";
    } else {
      return "Thank you for your message! I'll respond soon.";
    }
  };

  const MessageBubble = ({ message, isOwn }) => (
    <View
      style={[
        styles.messageBubble,
        isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <Text
        style={[styles.messageText, { color: isOwn ? "white" : COLORS.text }]}
      >
        {message.text}
      </Text>
      {message.textEn && !isOwn && (
        <Text style={styles.translatedText}>{message.textEn}</Text>
      )}
      {message.textHindi && isOwn && (
        <Text style={styles.translatedText}>{message.textHindi}</Text>
      )}
      <View style={styles.messageFooter}>
        <Text
          style={[
            styles.timestamp,
            { color: isOwn ? "rgba(255,255,255,0.8)" : COLORS.textSecondary },
          ]}
        >
          {message.timestamp}
        </Text>
        {isOwn && (
          <MaterialIcons
            name={message.isRead ? "done-all" : "done"}
            size={16}
            color={message.isRead ? "#4CAF50" : "rgba(255,255,255,0.6)"}
          />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Chat Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="white"
          onPress={() => router.back()}
        />
        <View style={styles.headerInfo}>
          <Avatar.Text
            size={40}
            label={farmerData.avatar}
            style={styles.avatar}
          />
          <View style={styles.farmerDetails}>
            <Text style={styles.farmerName}>{farmerData.name}</Text>
            <Text style={styles.farmerNameEn}>{farmerData.nameEn}</Text>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.onlineIndicator,
                  {
                    backgroundColor: farmerData.isOnline
                      ? "#4CAF50"
                      : "#757575",
                  },
                ]}
              />
              <Text style={styles.status}>
                {farmerData.isOnline ? "Online" : "Last seen recently"} •{" "}
                {farmerData.location}
              </Text>
            </View>
          </View>
        </View>
        <IconButton
          icon="phone"
          size={20}
          iconColor="white"
          onPress={() => Alert.alert("Call", `Calling ${farmerData.nameEn}...`)}
        />
      </View>

      {/* Product Info Banner */}
      <Card style={styles.productBanner}>
        <Card.Content style={styles.productInfo}>
          <MaterialIcons name="shopping-bag" size={20} color={COLORS.primary} />
          <Text style={styles.productText}>
            Discussing: {farmerData.product}
          </Text>
          <Button
            mode="outlined"
            compact
            style={styles.orderButton}
            labelStyle={styles.orderButtonLabel}
            onPress={() =>
              Alert.alert("Order", "Order functionality coming soon!")
            }
          >
            Quick Order
          </Button>
        </Card.Content>
      </Card>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.sender === "consumer"}
          />
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message... / संदेश लिखें..."
          value={message}
          onChangeText={setMessage}
          multiline
          mode="outlined"
          outlineColor={COLORS.primary}
          activeOutlineColor={COLORS.primary}
          right={
            <TextInput.Icon
              icon="send"
              onPress={sendMessage}
              iconColor={message.trim() ? COLORS.primary : COLORS.textSecondary}
            />
          }
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="outlined"
          icon="image"
          compact
          style={styles.quickActionButton}
          onPress={() => Alert.alert("Gallery", "Image sharing coming soon!")}
        >
          Photo
        </Button>
        <Button
          mode="outlined"
          icon="location-on"
          compact
          style={styles.quickActionButton}
          onPress={() =>
            Alert.alert("Location", "Location sharing coming soon!")
          }
        >
          Location
        </Button>
        <Button
          mode="outlined"
          icon="mic"
          compact
          style={styles.quickActionButton}
          onPress={() => Alert.alert("Voice", "Voice message coming soon!")}
        >
          Voice
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
    elevation: 4,
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: SPACING.sm,
  },
  avatar: {
    backgroundColor: COLORS.secondary,
  },
  farmerDetails: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  farmerName: {
    color: "white",
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
  },
  farmerNameEn: {
    color: "rgba(255,255,255,0.9)",
    fontSize: FONTS.sizes.small,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.xs,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  status: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONTS.sizes.small,
  },
  productBanner: {
    margin: SPACING.sm,
    borderRadius: 8,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  productText: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
  },
  orderButton: {
    borderColor: COLORS.primary,
  },
  orderButtonLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.primary,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: SPACING.md,
    borderRadius: 16,
    marginVertical: SPACING.xs,
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  messageText: {
    fontSize: FONTS.sizes.medium,
    lineHeight: 20,
  },
  translatedText: {
    fontSize: FONTS.sizes.small,
    color: "rgba(255,255,255,0.8)",
    fontStyle: "italic",
    marginTop: SPACING.xs,
  },
  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: SPACING.xs,
  },
  timestamp: {
    fontSize: 10,
    marginRight: SPACING.xs,
  },
  inputContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  textInput: {
    backgroundColor: COLORS.surface,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  quickActionButton: {
    borderColor: COLORS.primary,
  },
});
