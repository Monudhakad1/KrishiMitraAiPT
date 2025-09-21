import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { TextInput, Button, Card, FAB, Avatar, Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { AIAssistantService } from "../../data/enhancedServices";

const { width, height } = Dimensions.get("window");

export default function AIAssistant() {
  const router = useRouter();
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Animation refs
  const micPulseAnim = useRef(new Animated.Value(1)).current;
  const typingDotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Welcome message
    setMessages([
      {
        id: "1",
        text: "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं मौसम, फसल, और कृषि के बारे में आपकी मदद कर सकता हूं।",
        textEn:
          "Hello! I'm your AI farming assistant. I can help you with weather, crops, and agriculture.",
        type: "ai_response",
        timestamp: new Date().toISOString(),
        suggestions: [
          "Weather forecast",
          "Crop recommendations",
          "Disease detection",
          "Farm analytics",
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    // Microphone pulse animation
    if (isListening) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(micPulseAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(micPulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      return () => pulseAnimation.stop();
    }
  }, [isListening, micPulseAnim]);

  useEffect(() => {
    // Typing dots animation
    if (isTyping) {
      const dotsAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(typingDotsAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(typingDotsAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      dotsAnimation.start();

      return () => dotsAnimation.stop();
    }
  }, [isTyping, typingDotsAnim]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      type: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await AIAssistantService.generateResponse(messageText);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.textHindi || aiResponse.text,
        textEn: aiResponse.text,
        type: "ai_response",
        timestamp: aiResponse.timestamp,
        suggestions: aiResponse.suggestions || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "माफ करें, मुझे समझने में समस्या हो रही है। कृपया दोबारा कोशिश करें।",
        textEn: "Sorry, I'm having trouble understanding. Please try again.",
        type: "ai_response",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleVoiceInput = () => {
    setIsListening(true);

    // Simulate voice input
    const voiceMessages = [
      "What is the weather forecast for this week?",
      "Which crop should I plant in my field?",
      "How to treat plant diseases?",
      "Show me my farm analytics",
      "Tell me about soil health",
    ];

    const randomMessage =
      voiceMessages[Math.floor(Math.random() * voiceMessages.length)];

    setTimeout(() => {
      setIsListening(false);
      sendMessage(randomMessage);
    }, 2000);
  };

  const handleSuggestionPress = (suggestion) => {
    sendMessage(suggestion);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.type === "user";
    const isLastMessage = index === messages.length - 1;

    return (
      <View
        style={[styles.messageContainer, isUser && styles.userMessageContainer]}
      >
        {!isUser && (
          <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} />
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userText]}>
            {item.text}
          </Text>
          {item.textEn && item.textEn !== item.text && (
            <Text style={[styles.messageTextEn, isUser && styles.userTextEn]}>
              {item.textEn}
            </Text>
          )}
          <Text style={[styles.messageTime, isUser && styles.userTime]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>

        {isUser && (
          <Avatar.Icon size={32} icon="account" style={styles.userAvatar} />
        )}

        {/* Suggestions */}
        {item.suggestions && item.suggestions.length > 0 && isLastMessage && (
          <View style={styles.suggestionsContainer}>
            {item.suggestions.map((suggestion, idx) => (
              <Chip
                key={idx}
                mode="outlined"
                onPress={() => handleSuggestionPress(suggestion)}
                style={styles.suggestionChip}
                textStyle={styles.suggestionText}
              >
                {suggestion}
              </Chip>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={styles.messageContainer}>
        <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} />
        <View
          style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}
        >
          <Animated.View
            style={[
              styles.typingDotsContainer,
              {
                opacity: typingDotsAnim,
              },
            ]}
          >
            <Text style={styles.typingDots}>●●●</Text>
          </Animated.View>
          <Text style={styles.typingText}>AI is thinking...</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
        <View style={styles.headerCenter}>
          <Avatar.Icon size={40} icon="robot" style={styles.headerAvatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>KrishiMitra AI</Text>
            <Text style={styles.headerSubtitle}>
              {isTyping ? "AI is typing..." : "Online • Ready to help"}
            </Text>
          </View>
        </View>
        <Button
          mode="text"
          onPress={() => setMessages([])}
          icon="delete"
          textColor="white"
          style={styles.clearButton}
        ></Button>
      </LinearGradient>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderTypingIndicator}
      />

      {/* Voice Listening Overlay */}
      {isListening && (
        <View style={styles.listeningOverlay}>
          <Card style={styles.listeningCard}>
            <Card.Content style={styles.listeningContent}>
              <Animated.View
                style={[
                  styles.micContainer,
                  { transform: [{ scale: micPulseAnim }] },
                ]}
              >
                <MaterialIcons name="mic" size={60} color={COLORS.primary} />
              </Animated.View>
              <Text style={styles.listeningText}>Listening...</Text>
              <Text style={styles.listeningSubtext}>Speak now</Text>
              <Button
                mode="outlined"
                onPress={() => setIsListening(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <Card style={styles.inputCard}>
          <View style={styles.inputRow}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about farming, weather, crops..."
              style={styles.textInput}
              mode="outlined"
              multiline
              maxLength={500}
              disabled={isTyping || isListening}
            />

            <FAB
              icon="microphone"
              size="small"
              style={[styles.micButton, isListening && styles.micButtonActive]}
              color={isListening ? "white" : COLORS.primary}
              onPress={handleVoiceInput}
              disabled={isTyping}
            />

            <FAB
              icon="send"
              size="small"
              style={styles.sendButton}
              color="white"
              onPress={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isTyping || isListening}
            />
          </View>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="text"
          icon="wb-sunny"
          onPress={() => sendMessage("What is the weather forecast?")}
          textColor={COLORS.primary}
          style={styles.quickButton}
        >
          Weather
        </Button>
        <Button
          mode="text"
          icon="eco"
          onPress={() => sendMessage("Recommend crops for my farm")}
          textColor={COLORS.primary}
          style={styles.quickButton}
        >
          Crops
        </Button>
        <Button
          mode="text"
          icon="biotech"
          onPress={() => sendMessage("Help with plant diseases")}
          textColor={COLORS.primary}
          style={styles.quickButton}
        >
          Diseases
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
    paddingTop: 50,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    marginLeft: -SPACING.sm,
  },
  clearButton: {
    marginRight: -SPACING.sm,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: SPACING.md,
  },
  headerAvatar: {
    backgroundColor: "rgba(255,255,255,0.2)",
    marginRight: SPACING.sm,
  },
  headerInfo: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: FONTS.sizes.small,
    color: "rgba(255,255,255,0.8)",
    marginTop: SPACING.xs,
  },
  messagesList: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  messagesContent: {
    paddingVertical: SPACING.md,
  },
  messageContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: "flex-end",
  },
  userMessageContainer: {
    flexDirection: "row-reverse",
  },
  aiAvatar: {
    backgroundColor: COLORS.primary,
    marginRight: SPACING.sm,
  },
  userAvatar: {
    backgroundColor: COLORS.accent,
    marginLeft: SPACING.sm,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: SPACING.md,
    borderRadius: 16,
    elevation: 1,
  },
  aiBubble: {
    backgroundColor: "white",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  typingBubble: {
    paddingVertical: SPACING.sm,
  },
  messageText: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    lineHeight: 22,
  },
  userText: {
    color: "white",
  },
  messageTextEn: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    fontStyle: "italic",
  },
  userTextEn: {
    color: "rgba(255,255,255,0.8)",
  },
  messageTime: {
    fontSize: FONTS.sizes.small - 2,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: "right",
  },
  userTime: {
    color: "rgba(255,255,255,0.7)",
  },
  typingDotsContainer: {
    alignItems: "center",
  },
  typingDots: {
    fontSize: 24,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  typingText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  suggestionsContainer: {
    position: "absolute",
    bottom: -40,
    left: 44,
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: width - 100,
  },
  suggestionChip: {
    margin: 2,
    backgroundColor: "white",
    borderColor: COLORS.primary,
  },
  suggestionText: {
    fontSize: FONTS.sizes.small - 1,
    color: COLORS.primary,
  },
  listeningOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  listeningCard: {
    width: 250,
    borderRadius: 20,
  },
  listeningContent: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
  },
  micContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  listeningText: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  listeningSubtext: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  cancelButton: {
    borderColor: COLORS.textSecondary,
  },
  inputContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  inputCard: {
    borderRadius: 25,
    elevation: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: SPACING.sm,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    marginRight: SPACING.sm,
    backgroundColor: "transparent",
  },
  micButton: {
    backgroundColor: "white",
    marginRight: SPACING.sm,
  },
  micButtonActive: {
    backgroundColor: COLORS.primary,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: "white",
    elevation: 8,
  },
  quickButton: {
    flex: 1,
  },
});
