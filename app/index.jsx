import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
const entryImg = require("../assets/images/Frame.png");

export default function Index() {
  const router = useRouter();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="flex-1 items-center justify-center px-6 pt-8">
          {/* Logo */}
          <View
            style={{
              shadowColor: "#f49b33",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            <Image
              source={logo}
              style={{ width: 220, height: 100 }}
              resizeMode="contain"
            />
          </View>

          {/* Tagline */}
          <Text className="text-3xl text-white font-bold text-center mt-6">
            Reserve Your Table
          </Text>
          <Text className="text-gray-400 text-base text-center mt-3 px-4">
            Discover and book the best restaurants near you in just a few taps
          </Text>

          {/* Features */}
          <View className="flex-row justify-center mt-8 mb-6">
            <View className="items-center mx-4">
              <View className="bg-[#f49b33]/20 p-3 rounded-full">
                <Ionicons name="restaurant" size={24} color="#f49b33" />
              </View>
              <Text className="text-gray-400 text-xs mt-2">
                Top Restaurants
              </Text>
            </View>
            <View className="items-center mx-4">
              <View className="bg-[#f49b33]/20 p-3 rounded-full">
                <Ionicons name="time" size={24} color="#f49b33" />
              </View>
              <Text className="text-gray-400 text-xs mt-2">
                Instant Booking
              </Text>
            </View>
            <View className="items-center mx-4">
              <View className="bg-[#f49b33]/20 p-3 rounded-full">
                <Ionicons name="star" size={24} color="#f49b33" />
              </View>
              <Text className="text-gray-400 text-xs mt-2">Best Deals</Text>
            </View>
          </View>
        </View>

        {/* Image Section */}
        <View className="h-48 mx-6 mb-6">
          <Image
            source={entryImg}
            className="w-full h-full"
            resizeMode="contain"
          />
        </View>

        {/* Action Buttons */}
        <View className="px-6 pb-8">
          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            activeOpacity={0.8}
            className="h-14 rounded-xl bg-[#f49b33] flex-row items-center justify-center mb-3"
            style={{
              shadowColor: "#f49b33",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Ionicons name="person-add" size={20} color="#000" />
            <Text className="text-black text-lg font-bold ml-2">
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Guest Button */}
          <TouchableOpacity
            onPress={handleGuest}
            activeOpacity={0.8}
            className="h-14 rounded-xl bg-[#3d3d3d] flex-row items-center justify-center mb-4 border border-[#4d4d4d]"
          >
            <Ionicons name="eye-outline" size={20} color="#f49b33" />
            <Text className="text-white text-base font-semibold ml-2">
              Browse as Guest
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-[#4d4d4d]" />
            <Text className="text-gray-500 mx-4 text-sm">or</Text>
            <View className="flex-1 h-px bg-[#4d4d4d]" />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity
            onPress={() => router.push("/signin")}
            activeOpacity={0.7}
            className="flex-row justify-center items-center py-2"
          >
            <Text className="text-gray-400 text-base">
              Already have an account?{" "}
            </Text>
            <Text className="text-[#f49b33] text-base font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
