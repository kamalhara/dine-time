import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.push("/signin");
    } catch (error) {
      Alert.alert("Logout Error", "Error while logging out");
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-[#3d3d3d] p-4 rounded-xl mb-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="bg-[#f49b33]/20 p-3 rounded-xl">
        <Ionicons name={icon} size={22} color="#f49b33" />
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-white text-base font-semibold">{title}</Text>
        {subtitle && (
          <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text>
        )}
      </View>
      {showArrow && <Ionicons name="chevron-forward" size={20} color="#666" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b", flex: 1 },
        Platform.OS === "android" && { paddingBottom: 55 },
      ]}
    >
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <Text className="text-2xl text-white font-bold mt-4 mb-6">Profile</Text>

        {/* Avatar Section */}
        <View className="items-center mb-8">
          <LinearGradient
            colors={["#f49b33", "#d97706"]}
            className="w-28 h-28 rounded-full items-center justify-center"
            style={{
              shadowColor: "#f49b33",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View className="w-24 h-24 rounded-full bg-[#3d3d3d] items-center justify-center">
              {userEmail ? (
                <Text className="text-4xl text-[#f49b33] font-bold">
                  {userEmail.charAt(0).toUpperCase()}
                </Text>
              ) : (
                <Ionicons name="person" size={40} color="#f49b33" />
              )}
            </View>
          </LinearGradient>

          {userEmail ? (
            <View className="mt-4 items-center">
              <Text className="text-white text-lg font-semibold">
                Welcome Back!
              </Text>
              <Text className="text-gray-400 text-sm mt-1">{userEmail}</Text>
            </View>
          ) : (
            <View className="mt-4 items-center">
              <Text className="text-white text-lg font-semibold">
                Guest User
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Sign in to access all features
              </Text>
            </View>
          )}
        </View>

        {/* Menu Items */}
        {userEmail && (
          <>
            <Text className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">
              Account
            </Text>
            <MenuItem
              icon="person-circle"
              title="Edit Profile"
              subtitle="Update your information"
            />
            <MenuItem
              icon="notifications"
              title="Notifications"
              subtitle="Manage your alerts"
            />
            <MenuItem
              icon="card"
              title="Payment Methods"
              subtitle="Add or remove cards"
            />
          </>
        )}

        <Text className="text-gray-400 text-sm font-semibold mb-3 mt-4 uppercase tracking-wide">
          Preferences
        </Text>
        <MenuItem
          icon="moon"
          title="Dark Mode"
          subtitle="Currently enabled"
          showArrow={false}
        />
        <MenuItem icon="language" title="Language" subtitle="English" />

        <Text className="text-gray-400 text-sm font-semibold mb-3 mt-4 uppercase tracking-wide">
          Support
        </Text>
        <MenuItem
          icon="help-circle"
          title="Help Center"
          subtitle="Get help with your bookings"
        />
        <MenuItem
          icon="document-text"
          title="Terms & Privacy"
          subtitle="Read our policies"
        />
        <MenuItem
          icon="information-circle"
          title="About DineTime"
          subtitle="Version 1.0.0"
        />

        {/* Action Button */}
        <View className="mt-6 mb-10">
          {userEmail ? (
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.8}
              className="bg-red-500/20 p-4 rounded-xl flex-row items-center justify-center"
            >
              <Ionicons name="log-out" size={20} color="#ef4444" />
              <Text className="text-red-500 text-base font-semibold ml-2">
                Logout
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSignup}
              activeOpacity={0.8}
              style={{
                shadowColor: "#f49b33",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <LinearGradient
                colors={["#f49b33", "#d97706"]}
                className="p-4 rounded-xl flex-row items-center justify-center"
              >
                <Ionicons name="person-add" size={20} color="#fff" />
                <Text className="text-white text-base font-semibold ml-2">
                  Create Account
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
