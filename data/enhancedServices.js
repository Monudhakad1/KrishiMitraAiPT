// Enhanced data services for KrishiMitra AI Phase 2
// Weather Service with 7-day forecast
export const WeatherService = {
  getCurrentWeather: () => ({
    temperature: 28,
    condition: "sunny",
    conditionText: "Sunny",
    conditionHindi: "धूप",
    humidity: 65,
    windSpeed: 8,
    rainfall: 0,
    feelsLike: 32,
    icon: "wb-sunny",
    description: "Perfect for harvesting",
    descriptionHindi: "फसल काटने के लिए उपयुक्त",
  }),

  getWeeklyForecast: () => [
    {
      day: "Today",
      date: "Sep 20",
      temp: "32°/22°",
      condition: "sunny",
      icon: "wb-sunny",
      rainfall: 0,
    },
    {
      day: "Fri",
      date: "Sep 21",
      temp: "30°/20°",
      condition: "partly-cloudy",
      icon: "wb-cloudy",
      rainfall: 10,
    },
    {
      day: "Sat",
      date: "Sep 22",
      temp: "28°/19°",
      condition: "rainy",
      icon: "grain",
      rainfall: 85,
    },
    {
      day: "Sun",
      date: "Sep 23",
      temp: "26°/18°",
      condition: "rainy",
      icon: "grain",
      rainfall: 70,
    },
    {
      day: "Mon",
      date: "Sep 24",
      temp: "29°/21°",
      condition: "cloudy",
      icon: "cloud",
      rainfall: 20,
    },
    {
      day: "Tue",
      date: "Sep 25",
      temp: "31°/23°",
      condition: "sunny",
      icon: "wb-sunny",
      rainfall: 0,
    },
    {
      day: "Wed",
      date: "Sep 26",
      temp: "33°/24°",
      condition: "sunny",
      icon: "wb-sunny",
      rainfall: 0,
    },
  ],
};

// Crop Recommendation System
export const CropRecommendationService = {
  getCropRecommendations: (location, soilType, season, landSize) => {
    // Simulate AI processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendations = {
          "punjab-loamy-kharif-5": {
            crop: "Basmati Rice",
            cropHindi: "बासमती चावल",
            confidence: 92,
            expectedYield: "45-50 quintal/acre",
            expectedYieldHindi: "45-50 क्विंटल/एकड़",
            waterRequirement: "1200-1500mm per season",
            waterRequirementHindi: "1200-1500मिमी प्रति सीजन",
            sowingTime: "Mid June to Early July",
            sowingTimeHindi: "जून के मध्य से जुलाई की शुरुआत",
            marketPrice: "₹3,500-4,000/quintal",
            profitMargin: "₹85,000-95,000 per acre",
            growthPeriod: "120-130 days",
            advantages: [
              "High market demand for Basmati",
              "Premium pricing in export markets",
              "Well-suited for Punjab climate",
            ],
            disadvantages: [
              "High water requirement",
              "Susceptible to blast disease",
              "Longer growth period",
            ],
            tips: [
              "Maintain 2-3 cm water level",
              "Apply zinc sulfate before sowing",
              "Monitor for blast disease symptoms",
            ],
          },
        };

        const key = `${location.toLowerCase()}-${soilType.toLowerCase()}-${season.toLowerCase()}-${landSize}`;
        const recommendation = recommendations[key] || {
          crop: "Wheat",
          cropHindi: "गेहूं",
          confidence: 88,
          expectedYield: "40-45 quintal/acre",
          expectedYieldHindi: "40-45 क्विंटल/एकड़",
          waterRequirement: "450-650mm per season",
          waterRequirementHindi: "450-650मिमी प्रति सीजन",
          sowingTime: "November to December",
          sowingTimeHindi: "नवंबर से दिसंबर",
          marketPrice: "₹2,000-2,200/quintal",
          profitMargin: "₹60,000-70,000 per acre",
          growthPeriod: "120-150 days",
          advantages: [
            "Stable market demand",
            "Government procurement guarantee",
            "Lower water requirement",
          ],
          disadvantages: [
            "Price fluctuations",
            "Storage challenges",
            "Pest attacks in late stage",
          ],
          tips: [
            "Use certified seeds",
            "Apply fertilizer in 3 splits",
            "Monitor for aphid attacks",
          ],
        };

        resolve(recommendation);
      }, 3000); // 3 second delay to simulate AI processing
    });
  },
};

// Disease Detection Service
export const DiseaseDetectionService = {
  analyzeImage: (imageUri) => {
    return new Promise((resolve) => {
      const diseases = [
        {
          name: "Early Blight",
          nameHindi: "अर्ली ब्लाइट",
          severity: "Mild",
          severityHindi: "हल्का",
          confidence: 89,
          description: "Fungal disease affecting tomato and potato leaves",
          descriptionHindi:
            "टमाटर और आलू की पत्तियों को प्रभावित करने वाला फंगल रोग",
          symptoms: [
            "Dark brown spots with concentric rings",
            "Yellowing around the spots",
            "Premature leaf drop",
          ],
          treatments: [
            "Apply copper-based fungicide every 7-10 days",
            "Remove affected leaves and destroy them",
            "Improve air circulation between plants",
          ],
          treatmentsHindi: [
            "हर 7-10 दिन में कॉपर आधारित फफूंदनाशी लगाएं",
            "प्रभावित पत्तियों को हटाकर नष्ट करें",
            "पौधों के बीच हवा का संचार बेहतर करें",
          ],
          preventiveMeasures: [
            "Crop rotation with non-solanaceous plants",
            "Use drip irrigation instead of overhead watering",
            "Apply balanced fertilization",
          ],
        },
        {
          name: "Powdery Mildew",
          nameHindi: "पाउडरी मिल्ड्यू",
          severity: "Moderate",
          severityHindi: "मध्यम",
          confidence: 94,
          description: "White powdery fungal growth on leaf surfaces",
          descriptionHindi: "पत्तियों की सतह पर सफेद पाउडर जैसी फफूंदी",
          symptoms: [
            "White powdery coating on leaves",
            "Yellowing and curling of leaves",
            "Stunted plant growth",
          ],
          treatments: [
            "Spray neem oil solution twice weekly",
            "Apply potassium bicarbonate solution",
            "Remove heavily infected plant parts",
          ],
          treatmentsHindi: [
            "सप्ताह में दो बार नीम तेल का घोल छिड़कें",
            "पोटेशियम बाइकार्बोनेट का घोल लगाएं",
            "अधिक संक्रमित भागों को हटा दें",
          ],
          preventiveMeasures: [
            "Ensure proper spacing between plants",
            "Avoid overhead irrigation",
            "Plant resistant varieties",
          ],
        },
      ];

      const selectedDisease =
        diseases[Math.floor(Math.random() * diseases.length)];

      // Simulate processing stages
      setTimeout(() => resolve({ stage: "analyzing", progress: 25 }), 500);
      setTimeout(() => resolve({ stage: "detecting", progress: 50 }), 1500);
      setTimeout(() => resolve({ stage: "processing", progress: 75 }), 2500);
      setTimeout(
        () =>
          resolve({
            stage: "complete",
            progress: 100,
            result: selectedDisease,
          }),
        3500
      );
    });
  },
};

// Analytics Data Service
export const AnalyticsService = {
  getSoilMoistureData: () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        data: [65, 70, 55, 45, 40, 35, 60, 75],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    title: "Soil Moisture Levels (%)",
    titleHindi: "मिट्टी की नमी का स्तर (%)",
  }),

  getCropGrowthData: () => ({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        data: [15, 28, 45, 62, 78, 85],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    title: "Crop Growth Rate (%)",
    titleHindi: "फसल वृद्धि दर (%)",
  }),

  getYieldPredictionData: () => ({
    labels: ["2020", "2021", "2022", "2023", "2024", "2025*"],
    datasets: [
      {
        data: [35, 42, 38, 45, 48, 52],
        color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    title: "Yield Predictions (Quintal/Acre)",
    titleHindi: "उपज पूर्वानुमान (क्विंटल/एकड़)",
  }),

  getWeatherImpactData: () => [
    { label: "Rainfall", value: 75, color: "#2196F3" },
    { label: "Temperature", value: 60, color: "#FF9800" },
    { label: "Humidity", value: 85, color: "#4CAF50" },
    { label: "Wind Speed", value: 40, color: "#9C27B0" },
  ],

  getFarmStats: () => ({
    totalArea: "5 acres",
    cropsCount: 3,
    avgYield: "45 quintal/acre",
    waterUsage: "1250mm/season",
    soilHealth: "Good",
    soilHealthScore: 78,
    irrigationEfficiency: 85,
    fertilizerUsage: "Optimal",
  }),
};

// AI Assistant Service
export const AIAssistantService = {
  generateResponse: (userMessage) => {
    return new Promise((resolve) => {
      const responses = {
        weather: {
          text: "Based on the current weather data, today looks perfect for field activities with sunny conditions and 28°C temperature. However, I notice rain is expected this weekend (Saturday-Sunday) with 70-85mm rainfall. I recommend:",
          textHindi:
            "मौजूदा मौसम डेटा के आधार पर, आज धूप और 28°C तापमान के साथ खेत की गतिविधियों के लिए बिल्कुल सही है। हालांकि, मैं देख रहा हूं कि इस सप्ताह के अंत (शनिवार-रविवार) में 70-85मिमी बारिश की उम्मीद है।",
          suggestions: [
            "Complete harvesting activities by Friday",
            "Prepare drainage channels",
            "Store harvested crops in dry places",
          ],
        },
        crop: {
          text: "For your Punjab location with loamy soil, I recommend Basmati Rice for the current Kharif season. This crop has a 92% suitability match for your conditions.",
          textHindi:
            "दोमट मिट्टी के साथ आपके पंजाब स्थान के लिए, मैं वर्तमान खरीफ मौसम के लिए बासमती चावल की सिफारिश करता हूं।",
          suggestions: [
            "Expected yield: 45-50 quintal/acre",
            "Sowing time: Mid June to Early July",
            "Water requirement: 1200-1500mm per season",
          ],
        },
        disease: {
          text: "I can help you identify plant diseases. Please use the Disease Detection feature to scan affected leaves. Common issues in your area include Early Blight and Powdery Mildew.",
          textHindi:
            "मैं पौधों की बीमारियों की पहचान में आपकी मदद कर सकता हूं। प्रभावित पत्तियों को स्कैन करने के लिए कृपया रोग निदान सुविधा का उपयोग करें।",
          suggestions: [
            "Use the camera feature for instant diagnosis",
            "Preventive care is better than treatment",
            "Monitor plants regularly for early detection",
          ],
        },
        general: {
          text: "Hello! I'm your AI farming assistant. I can help you with weather forecasts, crop recommendations, disease detection, and farming analytics. What would you like to know?",
          textHindi:
            "नमस्ते! मैं आपका AI कृषि सहायक हूं। मैं मौसम पूर्वानुमान, फसल सिफारिशें, रोग निदान और कृषि विश्लेषण में आपकी मदद कर सकता हूं।",
          suggestions: [
            "Ask about weather conditions",
            "Get crop recommendations",
            "Learn about plant diseases",
            "View farm analytics",
          ],
        },
      };

      const messageType = this.categorizeMessage(userMessage);
      const response = responses[messageType] || responses.general;

      setTimeout(() => {
        resolve({
          ...response,
          timestamp: new Date().toISOString(),
          type: "ai_response",
        });
      }, 2000); // 2 second delay to simulate AI thinking
    });
  },

  categorizeMessage: (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("weather") || lowerMessage.includes("मौसम"))
      return "weather";
    if (lowerMessage.includes("crop") || lowerMessage.includes("फसल"))
      return "crop";
    if (lowerMessage.includes("disease") || lowerMessage.includes("बीमारी"))
      return "disease";
    return "general";
  },
};

// Farm Analytics Service
export const FarmAnalyticsService = {
  getAnalyticsData: async (period = "month") => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generateTimeLabels = (period) => {
      switch (period) {
        case "week":
          return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        case "month":
          return ["Week 1", "Week 2", "Week 3", "Week 4"];
        case "year":
          return [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
        default:
          return ["W1", "W2", "W3", "W4"];
      }
    };

    const generateRandomData = (length, min, max) => {
      return Array.from(
        { length },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    };

    const labels = generateTimeLabels(period);

    return {
      overview: [
        {
          icon: "terrain",
          value: "25.3 acres",
          label: "Total Farm Area",
          color: "#4CAF50",
          trend: 2.5,
        },
        {
          icon: "eco",
          value: "4 crops",
          label: "Active Crops",
          color: "#FF9800",
          trend: 0,
        },
        {
          icon: "water-drop",
          value: "68%",
          label: "Avg Soil Moisture",
          color: "#2196F3",
          trend: -1.2,
        },
        {
          icon: "wb-sunny",
          value: "24°C",
          label: "Temperature",
          color: "#FFC107",
          trend: 3.1,
        },
      ],

      soilMoisture: {
        labels: labels,
        datasets: [
          {
            data: generateRandomData(labels.length, 45, 85),
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            strokeWidth: 3,
          },
        ],
      },

      cropGrowth: {
        labels: ["Wheat", "Rice", "Corn", "Tomato"],
        datasets: [
          {
            data: [78, 65, 89, 72],
          },
        ],
      },

      yieldPrediction: {
        labels: labels,
        datasets: [
          {
            data: generateRandomData(labels.length, 1.8, 2.8),
            color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
            strokeWidth: 2,
          },
          {
            data: generateRandomData(labels.length, 2.0, 3.2),
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      },

      cropDistribution: [
        {
          name: "Wheat",
          population: 40,
          color: "#FF6384",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Rice",
          population: 30,
          color: "#36A2EB",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Corn",
          population: 20,
          color: "#FFCE56",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Tomato",
          population: 10,
          color: "#4BC0C0",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ],

      progressMetrics: {
        labels: [
          "Soil Health",
          "Water Efficiency",
          "Crop Health",
          "Yield Target",
        ],
        data: [0.78, 0.85, 0.72, 0.91],
      },

      recommendations: [
        {
          title: "Increase Irrigation",
          description:
            "Soil moisture in Field A is below optimal levels. Consider increasing irrigation frequency.",
          impact: "+15% yield improvement",
          priority: "high",
        },
        {
          title: "Fertilizer Application",
          description:
            "Nitrogen levels are optimal. Consider phosphorus supplement for better root development.",
          impact: "+8% crop health",
          priority: "medium",
        },
        {
          title: "Harvest Timing",
          description:
            "Weather forecast shows clear skies. Optimal harvest window is in 10-14 days.",
          impact: "+12% quality retention",
          priority: "medium",
        },
      ],
    };
  },
};

// Community Service
export const CommunityService = {
  getCommunityPosts: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockPosts = [
      {
        id: 1,
        farmer: {
          name: "अमित शर्मा (Amit Sharma)",
          location: "Haryana",
          avatarColor: "#4CAF50",
          verified: true,
        },
        content:
          "Just harvested my wheat crop! 🌾 The yield this season was exceptional thanks to the new irrigation system. Got 52 quintals per acre. Fellow farmers, what has been your experience with drip irrigation?",
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
        tags: ["harvest", "wheat", "irrigation"],
        likes: 45,
        comments: 12,
        shares: 8,
        isLiked: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        id: 2,
        farmer: {
          name: "प्रिया देवी (Priya Devi)",
          location: "Punjab",
          avatarColor: "#FF9800",
          verified: false,
        },
        content:
          "Sharing my organic pest control recipe! 🌿 Mix neem oil (50ml) + dish soap (1 tsp) + water (1L). Spray in evening. Works great for aphids and caterpillars. Zero chemicals, healthy crops! 💚",
        tags: ["organic", "pestcontrol", "neem"],
        likes: 78,
        comments: 23,
        shares: 15,
        isLiked: true,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      },
      {
        id: 3,
        farmer: {
          name: "राज कुमार (Raj Kumar)",
          location: "Punjab",
          avatarColor: "#2196F3",
          verified: true,
        },
        content:
          "Weather forecast shows heavy rain this week ⛈️ Make sure to: 1) Check drainage in fields 2) Store harvested crops safely 3) Prepare for waterlogging. Stay safe everyone!",
        tags: ["weather", "monsoon", "safety"],
        likes: 92,
        comments: 18,
        shares: 25,
        isLiked: false,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      },
      {
        id: 4,
        farmer: {
          name: "सुनील कुमार (Sunil Kumar)",
          location: "Uttar Pradesh",
          avatarColor: "#9C27B0",
          verified: false,
        },
        content:
          "My tomato plants are showing yellow leaves. Has anyone faced this issue? Is it nitrogen deficiency or overwatering? Please help! 🍅😟",
        image:
          "https://images.unsplash.com/photo-1592982375373-264a04c3d984?w=400",
        tags: ["help", "tomatoes", "plantdisease"],
        likes: 34,
        comments: 29,
        shares: 5,
        isLiked: false,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      },
      {
        id: 5,
        farmer: {
          name: "गीता रानी (Geeta Rani)",
          location: "Rajasthan",
          avatarColor: "#F44336",
          verified: true,
        },
        content:
          "Successfully switched to solar-powered water pumps! 🌞💧 Initial cost was high but saving ₹3000/month on electricity. Government subsidy helped a lot. Highly recommend for water-intensive crops.",
        tags: ["solar", "waterpump", "sustainable"],
        likes: 156,
        comments: 41,
        shares: 33,
        isLiked: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        id: 6,
        farmer: {
          name: "विकास यादव (Vikas Yadav)",
          location: "Maharashtra",
          avatarColor: "#607D8B",
          verified: false,
        },
        content:
          "Market update: Onion prices have increased by 20% this week! 🧅📈 Good time to sell if you have stock. Tomato prices are stable. Keep monitoring mandi rates.",
        tags: ["market", "prices", "onion"],
        likes: 67,
        comments: 15,
        shares: 22,
        isLiked: false,
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
      },
    ];

    return mockPosts;
  },

  toggleLike: async (postId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate toggling like status
    return {
      id: postId,
      isLiked: true, // In real app, this would toggle
      likes: Math.floor(Math.random() * 100) + 50, // Random number for demo
    };
  },

  createPost: async (postData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPost = {
      id: Date.now(),
      farmer: {
        name: "राज कुमार (Raj Kumar)",
        location: "Punjab",
        avatarColor: "#2196F3",
        verified: true,
      },
      content: postData.content,
      image: postData.image || null,
      tags: [], // Extract tags from content in real app
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      timestamp: new Date().toISOString(),
    };

    return newPost;
  },
};

// Expense Tracker Service
export const ExpenseTrackerService = {
  getExpenseData: async (period = "month") => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock transaction data
    const generateTransactions = (period) => {
      const transactions = [
        {
          type: "expense",
          amount: 15000,
          category: "Seeds",
          description: "Wheat seeds for 5 acres",
          date: "2025-09-15",
        },
        {
          type: "expense",
          amount: 8500,
          category: "Fertilizers",
          description: "Organic fertilizer",
          date: "2025-09-14",
        },
        {
          type: "income",
          amount: 45000,
          category: "Crop Sales",
          description: "Sold rice harvest",
          date: "2025-09-12",
        },
        {
          type: "expense",
          amount: 3200,
          category: "Fuel",
          description: "Tractor fuel",
          date: "2025-09-10",
        },
        {
          type: "expense",
          amount: 12000,
          category: "Labor",
          description: "Harvesting labor",
          date: "2025-09-08",
        },
        {
          type: "income",
          amount: 28000,
          category: "Crop Sales",
          description: "Sold vegetables",
          date: "2025-09-05",
        },
        {
          type: "expense",
          amount: 5500,
          category: "Pesticides",
          description: "Organic pest control",
          date: "2025-09-03",
        },
        {
          type: "income",
          amount: 15000,
          category: "Government Subsidy",
          description: "Equipment subsidy",
          date: "2025-09-01",
        },
        {
          type: "expense",
          amount: 7800,
          category: "Equipment",
          description: "New irrigation pipes",
          date: "2025-08-28",
        },
        {
          type: "expense",
          amount: 4200,
          category: "Transportation",
          description: "Crop transportation",
          date: "2025-08-25",
        },
        {
          type: "income",
          amount: 22000,
          category: "Contract Farming",
          description: "Contract payment",
          date: "2025-08-20",
        },
        {
          type: "expense",
          amount: 6500,
          category: "Maintenance",
          description: "Tractor maintenance",
          date: "2025-08-18",
        },
      ];

      return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const transactions = generateTransactions(period);

    // Calculate summary
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const profit = totalIncome - totalExpenses;

    // Generate chart data for expenses
    const expensesByCategory = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        expensesByCategory[t.category] =
          (expensesByCategory[t.category] || 0) + t.amount;
      });

    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
      "#4BC0C0",
      "#FF6384",
    ];

    const chartData = Object.entries(expensesByCategory)
      .map(([category, amount], index) => ({
        name: category,
        amount: amount,
        color: colors[index % colors.length],
        percentage: Math.round((amount / totalExpenses) * 100),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      transactions,
      chartData,
      summary: {
        totalIncome,
        totalExpenses,
        profit,
      },
    };
  },

  addTransaction: async (transactionData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In a real app, this would add to database
    // For now, simulate by returning updated data
    const currentData = await ExpenseTrackerService.getExpenseData();

    const newTransaction = {
      ...transactionData,
      id: Date.now(),
      date: transactionData.date || new Date().toISOString().split("T")[0],
    };

    const updatedTransactions = [newTransaction, ...currentData.transactions];

    // Recalculate summary
    const totalIncome = updatedTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = updatedTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const profit = totalIncome - totalExpenses;

    // Recalculate chart data
    const expensesByCategory = {};
    updatedTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        expensesByCategory[t.category] =
          (expensesByCategory[t.category] || 0) + t.amount;
      });

    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
      "#4BC0C0",
      "#FF6384",
    ];

    const chartData = Object.entries(expensesByCategory)
      .map(([category, amount], index) => ({
        name: category,
        amount: amount,
        color: colors[index % colors.length],
        percentage: Math.round((amount / totalExpenses) * 100),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      transactions: updatedTransactions,
      chartData,
      summary: {
        totalIncome,
        totalExpenses,
        profit,
      },
    };
  },
};

// Supply Chain Service
export const SupplyChainService = {
  getShipments: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const mockShipments = [
      {
        id: "SHP001",
        title: "Wheat Export to Delhi",
        buyer: "Delhi Grain Traders",
        commodity: "Wheat",
        quantity: 500,
        unit: "quintals",
        weight: 50000,
        value: 1250000,
        status: "In Transit",
        from: "Punjab Farm",
        to: "Delhi Mandi",
        shipDate: "2025-09-18",
        estimatedDelivery: "2025-09-22",
      },
      {
        id: "SHP002",
        title: "Rice Supply to Mumbai",
        buyer: "Mumbai Food Corp",
        commodity: "Basmati Rice",
        quantity: 300,
        unit: "quintals",
        weight: 30000,
        value: 950000,
        status: "Delivered",
        from: "Punjab Farm",
        to: "Mumbai Warehouse",
        shipDate: "2025-09-15",
        estimatedDelivery: "2025-09-20",
      },
      {
        id: "SHP003",
        title: "Vegetable Supply",
        buyer: "Fresh Market Ltd",
        commodity: "Mixed Vegetables",
        quantity: 200,
        unit: "crates",
        weight: 8000,
        value: 450000,
        status: "Processing",
        from: "Punjab Farm",
        to: "Chandigarh Market",
        shipDate: "2025-09-20",
        estimatedDelivery: "2025-09-21",
      },
      {
        id: "SHP004",
        title: "Corn Export",
        buyer: "North India Mills",
        commodity: "Corn",
        quantity: 400,
        unit: "quintals",
        weight: 40000,
        value: 850000,
        status: "Delayed",
        from: "Punjab Farm",
        to: "Haryana Mills",
        shipDate: "2025-09-16",
        estimatedDelivery: "2025-09-19",
      },
      {
        id: "SHP005",
        title: "Organic Produce",
        buyer: "Organic Foods Chain",
        commodity: "Organic Vegetables",
        quantity: 150,
        unit: "crates",
        weight: 6000,
        value: 650000,
        status: "Pending",
        from: "Punjab Farm",
        to: "Various Stores",
        shipDate: "2025-09-22",
        estimatedDelivery: "2025-09-25",
      },
    ];

    return mockShipments;
  },

  getShipmentDetails: async (shipmentId) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock detailed shipment data
    const mockDetails = {
      SHP001: {
        id: "SHP001",
        title: "Wheat Export to Delhi",
        buyer: "Delhi Grain Traders",
        buyerContact: "+91-9876543210",
        transporter: "Punjab Transport Co.",
        transporterContact: "+91-9876543211",
        commodity: "Wheat",
        quantity: 500,
        unit: "quintals",
        weight: 50000,
        value: 1250000,
        status: "In Transit",
        from: "Punjab Farm",
        to: "Delhi Mandi",
        shipDate: "2025-09-18",
        estimatedDelivery: "2025-09-22",
        timeline: [
          {
            title: "Order Placed",
            date: "2025-09-16 10:00 AM",
            description: "Order confirmed by Delhi Grain Traders",
            completed: true,
          },
          {
            title: "Processing Started",
            date: "2025-09-17 08:00 AM",
            description: "Wheat quality checked and packed",
            completed: true,
          },
          {
            title: "Shipment Dispatched",
            date: "2025-09-18 06:00 AM",
            description: "Left Punjab Farm via truck PB-01-1234",
            completed: true,
          },
          {
            title: "In Transit",
            date: "2025-09-19 02:00 PM",
            description: "Crossed Panipat checkpoint",
            completed: true,
          },
          {
            title: "Out for Delivery",
            date: "2025-09-22 08:00 AM",
            description: "Reached Delhi distribution center",
            completed: false,
          },
          {
            title: "Delivered",
            date: "2025-09-22 06:00 PM",
            description: "Delivered to Delhi Mandi",
            completed: false,
          },
        ],
      },
      SHP002: {
        id: "SHP002",
        title: "Rice Supply to Mumbai",
        buyer: "Mumbai Food Corp",
        buyerContact: "+91-9876543220",
        transporter: "Express Logistics",
        transporterContact: "+91-9876543221",
        commodity: "Basmati Rice",
        quantity: 300,
        unit: "quintals",
        weight: 30000,
        value: 950000,
        status: "Delivered",
        from: "Punjab Farm",
        to: "Mumbai Warehouse",
        shipDate: "2025-09-15",
        estimatedDelivery: "2025-09-20",
        timeline: [
          {
            title: "Order Placed",
            date: "2025-09-13 11:00 AM",
            description: "Order confirmed by Mumbai Food Corp",
            completed: true,
          },
          {
            title: "Processing Started",
            date: "2025-09-14 07:00 AM",
            description: "Rice quality checked and bagged",
            completed: true,
          },
          {
            title: "Shipment Dispatched",
            date: "2025-09-15 05:00 AM",
            description: "Left Punjab Farm via truck MH-02-5678",
            completed: true,
          },
          {
            title: "In Transit",
            date: "2025-09-18 01:00 PM",
            description: "Reached Mumbai outskirts",
            completed: true,
          },
          {
            title: "Out for Delivery",
            date: "2025-09-20 09:00 AM",
            description: "Reached Mumbai warehouse",
            completed: true,
          },
          {
            title: "Delivered",
            date: "2025-09-20 04:00 PM",
            description: "Successfully delivered and verified",
            completed: true,
          },
        ],
      },
    };

    // Return mock details or generate generic one
    return (
      mockDetails[shipmentId] || {
        id: shipmentId,
        title: "Generic Shipment",
        buyer: "Buyer Name",
        buyerContact: "+91-9876543200",
        transporter: "Transport Company",
        transporterContact: "+91-9876543201",
        commodity: "Agricultural Product",
        quantity: 100,
        unit: "units",
        weight: 10000,
        value: 500000,
        status: "Processing",
        from: "Farm Location",
        to: "Delivery Location",
        shipDate: new Date().toISOString().split("T")[0],
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        timeline: [
          {
            title: "Order Placed",
            date: "Today 10:00 AM",
            description: "Order confirmed by buyer",
            completed: true,
          },
          {
            title: "Processing Started",
            date: "Today 02:00 PM",
            description: "Products being prepared for shipment",
            completed: false,
          },
        ],
      }
    );
  },
};
