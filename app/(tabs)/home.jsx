import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import banner from "../../assets/images/homeBanner.png";
import { db } from "../config/firebase.config";

export default function Home() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);

  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      activeOpacity={0.9}
      style={{
        shadowColor: "#f49b33",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
      className="bg-[#3d3d3d] w-72 rounded-2xl overflow-hidden mx-3"
    >
      <View className="relative">
        <Image
          resizeMode="cover"
          source={{ uri: item.image }}
          className="h-36 w-full"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          className="absolute bottom-0 left-0 right-0 h-20"
        />
        <View className="absolute bottom-2 left-3 flex-row items-center">
          <View className="bg-[#f49b33] px-2 py-1 rounded-lg flex-row items-center">
            <Ionicons name="star" size={12} color="#fff" />
            <Text className="text-white text-xs font-bold ml-1">4.5</Text>
          </View>
          <View className="bg-[#5f5f5f] px-2 py-1 rounded-lg ml-2 flex-row items-center">
            <Ionicons name="restaurant" size={12} color="#f49b33" />
            <Text className="text-white text-xs ml-1">Fine Dining</Text>
          </View>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-white text-lg font-bold" numberOfLines={1}>
          {item.name}
        </Text>
        <View className="flex-row items-center mt-2">
          <Ionicons name="location" size={14} color="#f49b33" />
          <Text className="text-gray-400 text-sm ml-1 flex-1" numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <View className="flex-row items-center mt-2 justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time" size={14} color="#f49b33" />
            <Text className="text-gray-400 text-sm ml-1">
              {item.opening} - {item.closing}
            </Text>
          </View>
          <View className="bg-green-900/50 px-2 py-1 rounded">
            <Text className="text-green-400 text-xs font-semibold">Open</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  };

  useEffect(() => {
    getRestaurants();
    temp();
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS == "android" && { paddingBottom: 55 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <View className="flex items-center">
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          className="bg-[#3d3d3d] w-11/12 rounded-2xl justify-between items-center flex flex-row p-3"
        >
          <View className="flex flex-row items-center">
            <Text className="text-base text-white mr-1">Welcome to</Text>
            <Image resizeMode="contain" className="w-24 h-10" source={logo} />
          </View>
          <TouchableOpacity className="bg-[#f49b33] p-2 rounded-full">
            <Ionicons name="search" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full bg-[#2b2b2b] h-56 items-center justify-center"
          source={banner}
        >
          <BlurView
            intensity={Platform.OS === "android" ? 100 : 30}
            tint="dark"
            className="w-full p-6 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white mb-2">
              Dine with your loved ones
            </Text>
            <Text className="text-center text-[#f49b33] text-base">
              Book the perfect table at top restaurants
            </Text>
          </BlurView>
        </ImageBackground>

        <View className="px-4 py-3 bg-[#2b2b2b] flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-[#f49b33] p-2 rounded-lg mr-3">
              <Ionicons name="pricetag" size={20} color="#fff" />
            </View>
            <Text className="text-2xl text-white font-bold">
              Special Offers
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-[#f49b33] text-sm">See all</Text>
          </TouchableOpacity>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <View className="h-48 justify-center items-center">
            <ActivityIndicator animating color={"#f49b33"} size="large" />
          </View>
        )}

        <View className="px-4 py-3 bg-[#2b2b2b] flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <View className="bg-[#f49b33] p-2 rounded-lg mr-3">
              <Ionicons name="restaurant" size={20} color="#fff" />
            </View>
            <Text className="text-2xl text-white font-bold">
              Our Restaurants
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-[#f49b33] text-sm">See all</Text>
          </TouchableOpacity>
        </View>

        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <View className="h-48 justify-center items-center">
            <ActivityIndicator animating color={"#f49b33"} size="large" />
          </View>
        )}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
