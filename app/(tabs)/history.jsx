import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);

  const fetchBookings = async () => {
    if (userEmail) {
      try {
        setLoading(true);
        const bookingCollection = collection(db, "bookings");
        const bookingQuery = query(
          bookingCollection,
          where("email", "==", userEmail),
        );
        const bookingSnapshot = await getDocs(bookingQuery);

        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "Could not fetch bookings");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const BookingCard = ({ item }) => {
    const upcoming = isUpcoming(item.date);

    return (
      <View
        className="bg-[#3d3d3d] rounded-2xl mx-4 mb-4 overflow-hidden"
        style={{
          shadowColor: upcoming ? "#f49b33" : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        {/* Status Header */}
        <LinearGradient
          colors={upcoming ? ["#f49b33", "#d97706"] : ["#4b5563", "#374151"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="px-4 py-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <Ionicons
              name={upcoming ? "time" : "checkmark-circle"}
              size={18}
              color="#fff"
            />
            <Text className="text-white font-bold ml-2">
              {upcoming ? "Upcoming" : "Completed"}
            </Text>
          </View>
          <Text className="text-white/80 text-sm">{formatDate(item.date)}</Text>
        </LinearGradient>

        {/* Content */}
        <View className="p-4">
          {/* Restaurant Name */}
          <Text className="text-white text-xl font-bold mb-4">
            {item?.restaurant || "Restaurant"}
          </Text>

          {/* Details Grid */}
          <View className="flex-row flex-wrap">
            {/* Date */}
            <View className="w-1/2 flex-row items-center mb-3">
              <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                <Ionicons name="calendar" size={16} color="#f49b33" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-400 text-xs">Date</Text>
                <Text className="text-white text-sm font-medium">
                  {formatDate(item.date)}
                </Text>
              </View>
            </View>

            {/* Time Slot */}
            <View className="w-1/2 flex-row items-center mb-3">
              <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                <Ionicons name="time" size={16} color="#f49b33" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-400 text-xs">Time</Text>
                <Text className="text-white text-sm font-medium">
                  {item.slot}
                </Text>
              </View>
            </View>

            {/* Guests */}
            <View className="w-1/2 flex-row items-center">
              <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                <Ionicons name="people" size={16} color="#f49b33" />
              </View>
              <View className="ml-3">
                <Text className="text-gray-400 text-xs">Guests</Text>
                <Text className="text-white text-sm font-medium">
                  {item.guests} {item.guests === 1 ? "Person" : "People"}
                </Text>
              </View>
            </View>

            {/* Confirmation */}
            <View className="w-1/2 flex-row items-center">
              <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                <Ionicons name="mail" size={16} color="#f49b33" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gray-400 text-xs">Confirmation</Text>
                <Text
                  className="text-white text-sm font-medium"
                  numberOfLines={1}
                >
                  {item.email}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {upcoming && (
            <View className="flex-row mt-4 pt-4 border-t border-[#4d4d4d]">
              <TouchableOpacity
                className="flex-1 bg-[#f49b33]/20 p-3 rounded-xl flex-row items-center justify-center mr-2"
                activeOpacity={0.7}
              >
                <Ionicons name="create" size={16} color="#f49b33" />
                <Text className="text-[#f49b33] font-semibold ml-2">
                  Modify
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-500/20 p-3 rounded-xl flex-row items-center justify-center ml-2"
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={16} color="#ef4444" />
                <Text className="text-red-500 font-semibold ml-2">Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center px-8">
      <View className="bg-[#3d3d3d] p-8 rounded-full mb-6">
        <Ionicons name="calendar-outline" size={60} color="#f49b33" />
      </View>
      <Text className="text-white text-xl font-bold text-center mb-2">
        No Bookings Yet
      </Text>
      <Text className="text-gray-400 text-center mb-6">
        Your reservation history will appear here once you make a booking
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/home")}
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
          className="px-8 py-4 rounded-xl flex-row items-center"
        >
          <Ionicons name="restaurant" size={20} color="#fff" />
          <Text className="text-white font-bold ml-2">Browse Restaurants</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-[#2b2b2b]">
        <ActivityIndicator size="large" color="#f49b33" />
        <Text className="text-gray-400 mt-4">Loading your bookings...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b", flex: 1 },
        Platform.OS === "android" && { paddingBottom: 55 },
      ]}
    >
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center justify-between">
        <Text className="text-2xl text-white font-bold">My Bookings</Text>
        {bookings.length > 0 && (
          <View className="bg-[#f49b33] px-3 py-1 rounded-full">
            <Text className="text-white font-bold text-sm">
              {bookings.length}
            </Text>
          </View>
        )}
      </View>

      {userEmail ? (
        bookings.length > 0 ? (
          <FlatList
            data={bookings}
            onRefresh={fetchBookings}
            refreshing={loading}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookingCard item={item} />}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState />
        )
      ) : (
        <View className="flex-1 justify-center items-center px-8">
          <View className="bg-[#3d3d3d] p-8 rounded-full mb-6">
            <Ionicons name="lock-closed" size={60} color="#f49b33" />
          </View>
          <Text className="text-white text-xl font-bold text-center mb-2">
            Sign In Required
          </Text>
          <Text className="text-gray-400 text-center mb-6">
            Please sign in to view your booking history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/signin")}
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
              className="px-8 py-4 rounded-xl flex-row items-center"
            >
              <Ionicons name="log-in" size={20} color="#fff" />
              <Text className="text-white font-bold ml-2">Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default History;
