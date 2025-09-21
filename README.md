# 🌾 KrishiMitra AI - Smart Farming Companion

[![GitHub Repository](https://img.shields.io/badge/GitHub-KrishiMitraAiPT-blue.svg)](https://github.com/Monudhakad1/KrishiMitraAiPT)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-10.81.4-blue.svg)
![Expo](https://img.shields.io/badge/Expo%20SDK-54-000020.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A comprehensive agricultural technology platform that connects farmers, consumers, and dealers through AI-powered features, real-time market data, and blockchain-enabled traceability.

## 🌟 Overview

KrishiMitra AI is a React Native application built with Expo that revolutionizes agricultural supply chains by providing:

KrishiMitra AI is a comprehensive mobile application designed to revolutionize farming practices through artificial intelligence and smart technology. The app serves as a digital companion for farmers, dealers, and agricultural enthusiasts, providing AI-powered insights, disease detection, market intelligence, and sustainable farming solutions.

- **Smart Farming Solutions** for farmers with AI crop recommendations and weather analytics

## 📱 Features Overview- **Direct Farm-to-Consumer** marketplace with blockchain traceability

- **Agricultural Input Management** for dealers with inventory and order tracking

### 🌱 For Farmers- **Multilingual Support** (English/Hindi) for India's diverse agricultural community

- **AI-Powered Crop Recommendations** - Smart suggestions based on soil, climate, and market data

- **Disease Detection Scanner** - Camera-based plant disease identification with treatment recommendations## 🚀 Features

- **Weather Intelligence** - Real-time weather updates and farming advisories

- **Farm Analytics** - Comprehensive dashboard with yield predictions and farm performance metrics### Phase 4 Features ✅

- **Expense Tracking** - Financial management tools for farming operations

- **AI Assistant** - Voice and chat-based farming guidance#### Consumer Dashboard

### 🏪 For Dealers- **Product Search & Filtering**: Advanced search with price, location, and organic filters

- **Product Management** - Inventory management for agricultural products- **Blockchain Traceability**: Complete farm-to-table tracking with QR code scanning

- **Market Connect** - Connect with farmers and other stakeholders- **Farmer Communication**: Direct chat with farmers about products and practices

- **Sales Analytics** - Track sales performance and customer insights- **Order Management**: Real-time order tracking and delivery updates

- **Price Comparison**: Compare prices across different farmers and regions

### 💰 Financial Tools

- **Expense Tracker** - Monitor farming costs and revenue#### Dealer Dashboard

- **Budget Planning** - Financial planning tools for agricultural investments

- **Market Price Updates** - Real-time commodity pricing- **My Orders Section**: Expandable order management with farmer details

- **Product Management**: Swipe-to-edit/delete functionality for inventory

## 🛠️ Technology Stack- **CRUD Operations**: Complete Create, Read, Update, Delete forms for products

- **Inventory Alerts**: Low stock notifications and reorder suggestions

- **Framework:** React Native 0.81.4- **Farmer Network**: Direct orders from farmers with credit management

- **Navigation:** Expo Router 6.0.7

- **State Management:** React Hooks#### Consumer-Farmer Chat

- **UI Library:** React Native Paper 5.14.5

- **Icons:** MaterialIcons (@expo/vector-icons)- **Real-time Messaging**: Direct communication between consumers and farmers

- **Charts:** React Native Chart Kit 6.12.0- **Bilingual Support**: Automatic translation between English and Hindi

- **Gradients:** Expo Linear Gradient- **Product Inquiries**: Context-aware chat linked to specific products

- **Platform:** Expo SDK 54- **Quick Actions**: Predefined messages for common questions

- **Media Sharing**: Image sharing for product verification

## 📋 Prerequisites

### Phase 5 Features ✅

Before running this application, ensure you have the following installed:

#### Professional UI Enhancements

- **Node.js** (version 16 or higher)

- **npm** or **yarn**- **Gradient Design System**: Professional gradient backgrounds and cards

- **Expo CLI** (`npm install -g @expo/cli`)- **Weather Widget**: Expandable weather component with 5-day forecast (not button-based)

- **Expo Go app** (for mobile testing)- **AI Crop Recommendations**: Smart suggestions with suitability scoring

- **Android Studio** (for Android development)- **Translation System**: Dynamic language switching with translation button

- **Xcode** (for iOS development - Mac only)- **Comprehensive Dummy Data**: Complete dataset for all features

## 🚀 Installation & Setup#### Farmer Dashboard Professional UI

### 1. Clone the Repository

```bash
git clone https://github.com/Monudhakad1/KrishiMitraAiPT
cd KrishiMitraAI
```

- **Quick Actions Grid**: Color-coded action items with descriptions

### 2. Install Dependencies

````bash## 🛠 Technology Stack

npm install --legacy-peer-deps

```- **Frontend**: React Native with Expo SDK 54

*Note: Using `--legacy-peer-deps` to resolve React 19 compatibility issues*- **Navigation**: Expo Router (file-based routing)

- **UI Components**: React Native Paper (Material Design)

### 3. Start the Development Server- **Styling**: LinearGradient for professional gradients

```bash- **Icons**: MaterialIcons from @expo/vector-icons

npm start- **Charts**: React Native Chart Kit

# or- **Authentication**: Custom authentication with dummy data

npx expo start- **State Management**: React hooks and context

````

## 📱 App Structure

### 4. Run on Different Platforms

````

**Mobile (Recommended):**KrishiMitraAI/

- Install Expo Go app on your device├── app/                          # Main application screens

- Scan the QR code displayed in terminal│   ├── (auth)/                   # Authentication flow

- Or press `a` for Android emulator / `i` for iOS simulator│   │   ├── login.js              # Login screen with user type selection

│   │   └── signup.js             # Registration screen

**Web:**│   ├── chat/                     # Chat functionality

```bash│   │   └── farmer-chat.js        # Consumer-Farmer messaging

npm run web│   ├── dashboard/                # Main dashboard screens

# or press 'w' in the terminal│   │   ├── consumer.js           # Consumer dashboard with search & traceability

```│   │   ├── dealer.js             # Dealer dashboard with orders & inventory

│   │   └── farmer.js             # Farmer dashboard with weather & AI recommendations

**Android:**│   ├── dealer/                   # Dealer-specific screens

```bash│   │   └── product-management.js # CRUD operations for products

npm run android│   ├── _layout.js                # Root layout with navigation

```│   └── index.js                  # Landing/entry screen

├── components/                   # Reusable UI components

**iOS:**│   ├── WeatherWidget.js          # Weather forecast component

```bash│   └── (other components)

npm run ios├── data/                         # Data management

```│   └── dummyData.js              # Comprehensive dummy data for all features

├── utils/                        # Utility functions

## 📁 Project Structure│   └── auth.js                   # Authentication helpers

└── assets/                       # Images and static files

````

KrishiMitraAI/

├── app/ # Main application screens## 🔧 Installation & Setup

│ ├── onboarding/ # App introduction & setup

│ │ ├── splash.js # Welcome screen### Prerequisites

│ │ ├── language.js # Language selection

│ │ └── userType.js # User type selection- Node.js (version 16 or higher)

│ ├── dashboard/ # Main dashboards- Expo CLI

│ │ └── farmer.js # Farmer dashboard- Android Studio (for Android development) or Xcode (for iOS development)

│ ├── features/ # Core AI features- Expo Go app on your mobile device

│ │ ├── aiAssistant.js # AI chat assistant

### Step 1: Clone the Repository

```bash
git clone https://github.com/Monudhakad1/KrishiMitraAiPT
cd KrishiMitraAI
```

│ │ └── expenseTracker.js # Expense trackingcd KrishiMitraAI

│ ├── dealer/ # Dealer-specific features```

│ │ └── product-management.js # Product inventory

│ ├── \_layout.js # Root navigation layout### Step 2: Install Dependencies

│ └── index.js # App entry point

├── components/ # Reusable UI components```bash

│ └── WeatherWidget.js # Weather display componentnpm install

├── constants/ # App constants & themes# or

│ └── theme.js # Colors, fonts, spacingyarn install

├── data/ # Static data & mocks```

│ └── dummyData.js # Sample data for development

├── assets/ # Images, fonts, icons### Step 3: Start the Development Server

├── package.json # Dependencies & scripts

├── app.json # Expo configuration```bash

└── README.md # Project documentationnpx expo start

````



## 🔧 Configuration### Step 4: Run on Device/Emulator



### Environment Setup- **Mobile Device**: Scan the QR code with Expo Go app

The app uses Expo's default configuration. Key configurations in `app.json`:- **Android Emulator**: Press 'a' in the terminal

- **iOS Simulator**: Press 'i' in the terminal

```json- **Web Browser**: Press 'w' in the terminal

{

  "expo": {## 🔐 Authentication

    "name": "KrishiMitraAI",

    "slug": "krishimitraai",The app includes dummy users for testing all features:

    "version": "1.0.0",

    "orientation": "portrait",### Farmer Accounts

    "platforms": ["ios", "android", "web"],

    "newArchEnabled": true- **Username**: `farmer1` | **Password**: `password123`

  }

}  - Name: राज कुमार (Raj Kumar)

```  - Location: Punjab

  - Crops: Wheat, Rice, Sugarcane

### Theme Customization

Modify colors, fonts, and spacing in `constants/theme.js`:- **Username**: `farmer2` | **Password**: `password123`

  - Name: सुनीता देवी (Sunita Devi)

```javascript  - Location: Haryana

export const COLORS = {  - Crops: Cotton, Mustard

  primary: '#4CAF50',    // Agriculture green

  secondary: '#FF9800',  // Orange accent### Consumer Accounts

  background: '#FFFFFF', // White background

  // ... more colors- **Username**: `consumer1` | **Password**: `password123`

};

```  - Name: अमित शर्मा (Amit Sharma)

  - Location: Delhi

## 🌟 Key Features Implementation  - Preferences: Organic, Local



### 1. AI Disease Detection- **Username**: `consumer2` | **Password**: `password123`

- Camera integration using Expo Camera  - Name: प्रिया सिंह (Priya Singh)

- Image processing for plant disease identification  - Location: Mumbai

- Treatment recommendations based on detected conditions  - Preferences: Fresh, Seasonal



### 2. Smart Dashboard### Dealer Accounts

- Real-time weather updates

- Farm analytics with interactive charts- **Username**: `dealer1` | **Password**: `password123`

- Quick access to all major features

  - Name: गोपाल अग्रवाल (Gopal Agarwal)

### 3. Multi-language Support  - Location: Mandi, HP

- Hindi and English language options  - Specialization: Grains

- Localized content for better accessibility

- **Username**: `dealer2` | **Password**: `password123`

### 4. User Role Management  - Name: सुरेश गुप्ता (Suresh Gupta)

- Separate interfaces for farmers and dealers  - Location: Indore, MP

- Role-based feature access and permissions  - Specialization: Vegetables



## 🐛 Troubleshooting## 🌐 Key Features Demo



### Common Issues### 1. Farmer Dashboard



**1. Metro Bundle Error:**- **Weather Widget**: Tap to expand 5-day forecast with detailed metrics

```bash- **AI Crop Recommendations**: Scroll horizontally through recommended crops

npx expo start --clear- **Language Toggle**: Tap translate icon for Hindi/English switching

```- **Professional UI**: Gradient headers and elevated cards



**2. Dependency Conflicts:**### 2. Consumer Dashboard

```bash

npm install --legacy-peer-deps- **Product Search**: Use search bar with price and location filters

```- **Traceability**: Tap "Track Origin" to view blockchain supply chain

- **Chat with Farmers**: Direct messaging with automatic translation

**3. Port Already in Use:**- **Order Tracking**: Real-time status updates for purchases

The app will automatically suggest an alternative port (usually 8082)

### 3. Dealer Dashboard

**4. Android Emulator Issues:**

Ensure Android Studio and emulator are properly set up- **My Orders**: Expandable section with farmer contact details

- **Product Management**: Swipe left/right on products for edit/delete

### Dependencies Issues- **Inventory Management**: Low stock alerts and reorder suggestions

If you encounter package compatibility issues:- **CRUD Forms**: Complete forms for adding/editing products

- Use Node.js version 16-18 (recommended)

- Clear npm cache: `npm cache clean --force`### 4. Consumer-Farmer Chat

- Delete node_modules and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`

- **Real-time Messaging**: Instant communication between users

## 📱 Supported Platforms- **Translation Support**: Messages show in both English and Hindi

- **Product Context**: Chat linked to specific product inquiries

- ✅ **Android** (API 21+)- **Quick Actions**: Predefined messages for common questions

- ✅ **iOS** (iOS 11.0+)

- ✅ **Web** (Modern browsers)## 🎨 Design System



## 🤝 Contributing### Colors



1. Fork the repository- **Primary**: #4CAF50 (Green) - Agriculture theme

2. Create a feature branch (`git checkout -b feature/amazing-feature`)- **Secondary**: #FFC107 (Amber) - Warning/attention

3. Commit your changes (`git commit -m 'Add amazing feature'`)- **Accent**: #FF5722 (Deep Orange) - Call-to-action

4. Push to the branch (`git push origin feature/amazing-feature`)- **Background**: #F8F9FA (Light Gray) - Clean backdrop

5. Open a Pull Request- **Text**: #212121 (Dark Gray) - Optimal readability



## 📄 License### Typography & Layout



This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.- **Spacing**: 4, 8, 16, 24, 32px system for consistent spacing

- **Elevation**: Material Design elevation for cards and surfaces

## 📞 Support & Contact- **Gradients**: Professional linear gradients for headers and cards



For support, questions, or feedback:## 🌍 Localization

- **Email:** support@krishimitraai.com

- **Issues:** [GitHub Issues](https://github.com/Monudhakad1/KrishiMitraAiPT/issues)The app supports bilingual functionality:

- **Documentation:** [Wiki](link-to-wiki)

- **English**: Default language for urban users

## 🎯 Roadmap- **Hindi**: Localized content for rural farmers

- **Dynamic Switching**: Real-time language toggle

### Phase 1 (Current) ✅- **Translation Support**: Automatic message translation in chat

- [x] Basic UI/UX implementation

- [x] Navigation system## 🔄 Future Enhancements

- [x] Farmer dashboard

- [x] Disease detection UI### Technical Improvements

- [x] Weather integration

- **Real-time Weather API**: Integration with weather services

### Phase 2 (In Progress) 🔄- **Actual Blockchain**: Implement real blockchain for traceability

- [ ] AI model integration- **Push Notifications**: Real-time alerts for weather and prices

- [ ] Real-time disease detection- **Offline Support**: Cached data for rural connectivity

- [ ] Market price API integration

- [ ] User authentication### Feature Additions



### Phase 3 (Planned) 📋- **Video Calling**: Direct farmer consultation

- [ ] Offline functionality- **Community Forums**: Knowledge sharing platform

- [ ] Push notifications- **Government Integration**: Subsidy and scheme information

- [ ] Social features- **Financial Services**: Crop insurance and loans

- [ ] Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🏆 Acknowledgments

- Expo team for the excellent development platform
- React Native community for comprehensive documentation
- MaterialIcons for the beautiful icon set
- All contributors and testers



---## 📄 License



**Made with ❤️ for farmers and the agricultural community**This project is licensed under the MIT License - see the LICENSE file for details.



*"Empowering agriculture through artificial intelligence"*---

**Built with ❤️ for Indian Agriculture** 🌾🇮🇳
````
