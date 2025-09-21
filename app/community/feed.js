import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  Modal,
  Image,
} from "react-native";
import {
  Card,
  Button,
  FAB,
  Avatar,
  TextInput,
  Chip,
  IconButton,
  Divider,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SPACING } from "../../constants/theme";
import { CommunityService } from "../../data/enhancedServices";

const { width, height } = Dimensions.get("window");

export default function CommunityFeed() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newPostVisible, setNewPostVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadCommunityPosts();
  }, []);

  const loadCommunityPosts = async () => {
    try {
      setLoading(true);
      const communityPosts = await CommunityService.getCommunityPosts();
      setPosts(communityPosts);
    } catch (error) {
      Alert.alert("Error", "Failed to load community posts");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCommunityPosts();
    setRefreshing(false);
  };

  const handleLike = async (postId) => {
    try {
      const updatedPost = await CommunityService.toggleLike(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update like");
    }
  };

  const handleComment = (postId) => {
    Alert.alert("Comments", "Comment feature coming soon!", [{ text: "OK" }]);
  };

  const handleShare = (post) => {
    Alert.alert("Share Post", `Share "${post.content.substring(0, 50)}..."`, [
      { text: "Cancel", style: "cancel" },
      { text: "Share", onPress: () => Alert.alert("Success", "Post shared!") },
    ]);
  };

  const handleImageUpload = () => {
    const mockImages = [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300", // Farm field
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300", // Crop growing
      "https://images.unsplash.com/photo-1592982375373-264a04c3d984?w=300", // Tractor
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300", // Harvest
    ];

    const randomImage =
      mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImage(randomImage);
    Alert.alert("Image Selected", "Mock image uploaded successfully!");
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) {
      Alert.alert("Error", "Please enter some text for your post");
      return;
    }

    try {
      const newPost = await CommunityService.createPost({
        content: newPostText,
        image: selectedImage,
      });

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewPostText("");
      setSelectedImage(null);
      setNewPostVisible(false);

      Alert.alert("Success", "Post created successfully!");

      // Scroll to top to show new post
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    } catch (error) {
      Alert.alert("Error", "Failed to create post");
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const renderPost = ({ item, index }) => {
    return (
      <Card style={styles.postCard}>
        <Card.Content>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <Avatar.Text
              size={45}
              label={item.farmer.name.charAt(0)}
              style={[
                styles.avatar,
                { backgroundColor: item.farmer.avatarColor },
              ]}
            />
            <View style={styles.postInfo}>
              <Text style={styles.farmerName}>{item.farmer.name}</Text>
              <Text style={styles.farmerLocation}>
                📍 {item.farmer.location}
              </Text>
              <Text style={styles.postTime}>{formatTime(item.timestamp)}</Text>
            </View>
            {item.farmer.verified && (
              <MaterialIcons name="verified" size={20} color={COLORS.primary} />
            )}
          </View>

          {/* Post Content */}
          <Text style={styles.postContent}>{item.content}</Text>

          {/* Post Tags */}
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  style={styles.tag}
                  textStyle={styles.tagText}
                  mode="outlined"
                >
                  #{tag}
                </Chip>
              ))}
            </View>
          )}

          {/* Post Image */}
          {item.image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.postImage}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Post Stats */}
          <View style={styles.postStats}>
            <Text style={styles.statText}>{item.likes} likes</Text>
            <Text style={styles.statText}>•</Text>
            <Text style={styles.statText}>{item.comments} comments</Text>
            <Text style={styles.statText}>•</Text>
            <Text style={styles.statText}>{item.shares} shares</Text>
          </View>

          <Divider style={styles.divider} />

          {/* Post Actions */}
          <View style={styles.postActions}>
            <Button
              mode="text"
              icon={item.isLiked ? "thumb-up" : "thumb-up-outline"}
              onPress={() => handleLike(item.id)}
              textColor={item.isLiked ? COLORS.primary : COLORS.textSecondary}
              labelStyle={styles.actionLabel}
            >
              Like
            </Button>
            <Button
              mode="text"
              icon="comment-outline"
              onPress={() => handleComment(item.id)}
              textColor={COLORS.textSecondary}
              labelStyle={styles.actionLabel}
            >
              Comment
            </Button>
            <Button
              mode="text"
              icon="share-outline"
              onPress={() => handleShare(item)}
              textColor={COLORS.textSecondary}
              labelStyle={styles.actionLabel}
            >
              Share
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
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
        <Text style={styles.headerTitle}>Community Feed 🌾</Text>
        <Button
          mode="text"
          onPress={handleRefresh}
          icon="refresh"
          textColor="white"
          style={styles.refreshButton}
        ></Button>
      </LinearGradient>

      {/* Community Stats */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2.5K</Text>
          <Text style={styles.statLabel}>Members</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Posts Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="people" size={60} color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Community...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        style={styles.feedList}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {/* New Post Modal */}
      <Modal
        visible={newPostVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setNewPostVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.modalHeader}
          >
            <Button
              mode="text"
              onPress={() => setNewPostVisible(false)}
              icon="close"
              textColor="white"
            >
              Cancel
            </Button>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <Button
              mode="text"
              onPress={handleCreatePost}
              textColor="white"
              disabled={!newPostText.trim()}
            >
              Post
            </Button>
          </LinearGradient>

          <View style={styles.newPostContainer}>
            <View style={styles.userInfo}>
              <Avatar.Text size={40} label="RK" style={styles.userAvatar} />
              <View>
                <Text style={styles.userName}>राज कुमार (Raj Kumar)</Text>
                <Text style={styles.userLocation}>📍 Punjab</Text>
              </View>
            </View>

            <TextInput
              value={newPostText}
              onChangeText={setNewPostText}
              placeholder="Share your farming experience, ask questions, or give advice to fellow farmers..."
              multiline
              numberOfLines={6}
              style={styles.postInput}
              mode="outlined"
              maxLength={500}
            />

            <Text style={styles.characterCount}>
              {newPostText.length}/500 characters
            </Text>

            {selectedImage && (
              <View style={styles.selectedImageContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                  resizeMode="cover"
                />
                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => setSelectedImage(null)}
                  style={styles.removeImageButton}
                />
              </View>
            )}

            <View style={styles.postOptions}>
              <Button
                mode="outlined"
                onPress={handleImageUpload}
                icon="camera"
                style={styles.optionButton}
              >
                Add Photo
              </Button>
              <Button
                mode="outlined"
                onPress={() =>
                  Alert.alert("Location", "Location tagging coming soon!")
                }
                icon="location-on"
                style={styles.optionButton}
              >
                Add Location
              </Button>
            </View>

            <View style={styles.suggestedTags}>
              <Text style={styles.suggestedTagsTitle}>Suggested Tags:</Text>
              <View style={styles.tagsList}>
                {[
                  "farming",
                  "crops",
                  "harvest",
                  "irrigation",
                  "organic",
                  "advice",
                ].map((tag, idx) => (
                  <Chip
                    key={idx}
                    style={styles.suggestedTag}
                    onPress={() => setNewPostText((prev) => prev + ` #${tag}`)}
                  >
                    #{tag}
                  </Chip>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="white"
        onPress={() => setNewPostVisible(true)}
        label="New Post"
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
  headerContainer: {
    backgroundColor: "white",
    marginBottom: SPACING.sm,
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
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: SPACING.md,
    backgroundColor: "#F8F9FA",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: FONTS.sizes.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  feedList: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 100,
  },
  postCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatar: {
    marginRight: SPACING.sm,
  },
  postInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  farmerLocation: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  postTime: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  postContent: {
    fontSize: FONTS.sizes.medium,
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING.md,
  },
  tag: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
    height: 28,
  },
  tagText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.primary,
  },
  imageContainer: {
    marginBottom: SPACING.md,
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  statText: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  divider: {
    marginVertical: SPACING.sm,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionLabel: {
    fontSize: FONTS.sizes.small,
  },
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
  newPostContainer: {
    flex: 1,
    padding: SPACING.lg,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  userAvatar: {
    backgroundColor: COLORS.primary,
    marginRight: SPACING.sm,
  },
  userName: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
  },
  userLocation: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  postInput: {
    marginBottom: SPACING.sm,
    backgroundColor: "white",
  },
  characterCount: {
    fontSize: FONTS.sizes.small,
    color: COLORS.textSecondary,
    textAlign: "right",
    marginBottom: SPACING.lg,
  },
  selectedImageContainer: {
    position: "relative",
    marginBottom: SPACING.lg,
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  postOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: SPACING.lg,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: SPACING.sm,
  },
  suggestedTags: {
    marginBottom: SPACING.lg,
  },
  suggestedTagsTitle: {
    fontSize: FONTS.sizes.medium,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestedTag: {
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    backgroundColor: "#F0F8FF",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: COLORS.primary,
  },
});
