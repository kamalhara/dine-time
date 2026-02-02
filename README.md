# 🍽️ DineTime - Restaurant Reservation App

A modern, cross-platform mobile application for restaurant reservations and dining experiences. Built with React Native, Expo, and Firebase.

## 📸 Screenshots

| Home | Login | Restaurant | Booking|
|------|-----------|---------|---------|
| ![](assets/screenshots/welcome.png) | ![](assets/screenshots/login.png) |![](assets/screenshots/home.png) | ![](assets/screenshots/rest.png) | 

## 📱 Features

- **🔐 User Authentication**: Sign up, sign in, and guest access
- **🏪 Restaurant Discovery**: Browse and explore restaurants with detailed information
- **📅 Table Reservations**: Book tables with date and time selection
- **👥 Guest Management**: Specify party size for reservations
- **💳 Special Discounts**: Access exclusive restaurant offers
- **📍 Location Services**: Find restaurants in your area
- **🌙 Dark Theme**: Modern dark UI design
- **📱 Cross-Platform**: Works on iOS, Android, and Web

## 🛠️ Tech Stack

### Frontend

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and build tools
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing system

### Backend & Services

- **Firebase** - Authentication and Firestore database
- **AsyncStorage** - Local data persistence

### UI & UX

- **Tailwind CSS** - Utility-first styling
- **Expo Vector Icons** - Icon library
- **React Native Safe Area Context** - Safe area handling
- **Expo Blur** - Blur effects

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dine-time
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Update `app/config/firebase.config.js` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`
- **Expo Go**: Scan QR code from `npm start`

## 📁 Project Structure

```
dine-time/
├── app/                    # Main application code
│   ├── (auth)/            # Authentication screens
│   │   ├── signin.jsx
│   │   └── signup.jsx
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.jsx
│   │   ├── home.jsx
│   │   ├── history.jsx
│   │   ├── profile.jsx
│   │   └── restaurant/
│   │       └── [restaurant].jsx
│   ├── _layout.jsx        # Root layout
│   └── index.jsx          # Landing page
├── assets/                # Static assets
│   ├── images/           # Image files
│   └── fonts/            # Custom fonts
├── components/            # Reusable components
│   └── restaurant/       # Restaurant-specific components
├── config/               # Configuration files
├── utils/                # Utility functions and schemas
├── global.css           # Global styles
├── tailwind.config.js   # Tailwind CSS configuration
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler configuration
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication with Email/Password provider
3. Enable Firestore Database
4. Add your Firebase config to `app/config/firebase.config.js`

### NativeWind Setup

The app uses NativeWind for styling. Configuration is handled in:

- `tailwind.config.js` - Tailwind CSS configuration
- `babel.config.js` - Babel preset for NativeWind
- `metro.config.js` - Metro bundler configuration

## 📱 Screens & Features

### Authentication Flow

- **Landing Page** (`index.jsx`): Welcome screen with sign-in options
- **Sign Up** (`signup.jsx`): User registration
- **Sign In** (`signin.jsx`): User login

### Main App

- **Home** (`home.jsx`): Restaurant listings and featured content
- **Restaurant Details** (`[restaurant].jsx`): Individual restaurant view with booking
- **History** (`history.jsx`): Reservation history
- **Profile** (`profile.jsx`): User profile management

### Components

- **FindSlots**: Table availability checker
- **DatePickerComponent**: Date selection for reservations
- **GuestPickerComponent**: Party size selector

## 🎨 Styling

The app uses NativeWind (Tailwind CSS for React Native) with a dark theme:

- **Primary Colors**: Dark gray (`#2b2b2b`), Medium gray (`#5f5f5f`)
- **Accent Color**: Orange (`#fb9b33`)
- **Text Color**: White (`#ffffff`)

## 🧪 Testing

```bash
npm test
```

## 📋 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with your app details
2. **Build for platforms**:

   ```bash
   npx expo build:android
   npx expo build:ios
   ```

3. **Deploy to stores**:
   - Google Play Store for Android
   - Apple App Store for iOS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email [your-email@example.com] or join our Discord community.

## 📊 Roadmap

- [ ] Push notifications for reservations
- [ ] Restaurant reviews and ratings
- [ ] Payment integration
- [ ] Restaurant owner dashboard
- [ ] Advanced filtering and search
- [ ] Offline mode support

---

Made with ❤️ using React Native & Expo

# dine-time
