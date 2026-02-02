import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerComponent from "../../components/restaurant/DatePickerComponent";
import FindSlots from "../../components/restaurant/FindSlots";
import GuestPickerComponent from "../../components/restaurant/GuestPickerComponent";
import { db } from "../config/firebase.config";

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const router = useRouter();
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [slotsData, setSlotsData] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [date, setDate] = useState(new Date());

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }

    if (currentIndex == carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }

    if (currentIndex == 0) {
      const prevIndex = carouselLength - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const carouselItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth }} className="h-72 relative">
        {/* Navigation Buttons */}
        <TouchableOpacity
          onPress={handleNextImage}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            top: "45%",
            right: 16,
            zIndex: 10,
          }}
          className="bg-black/60 p-3 rounded-full"
        >
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePrevImage}
          activeOpacity={0.8}
          style={{
            position: "absolute",
            top: "45%",
            left: 16,
            zIndex: 10,
          }}
          className="bg-black/60 p-3 rounded-full"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Image Counter */}
        <View
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
          }}
          className="bg-black/60 px-3 py-1 rounded-full"
        >
          <Text className="text-white text-sm font-semibold">
            {currentIndex + 1} / {carouselData[0]?.images?.length || 0}
          </Text>
        </View>

        {/* Pagination Dots */}
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
          className="flex-row justify-center items-center"
        >
          {carouselData[0]?.images?.map((_, i) => (
            <View
              key={i}
              className={`mx-1 rounded-full ${
                i === currentIndex
                  ? "bg-[#f49b33] w-6 h-2"
                  : "bg-white/50 w-2 h-2"
              }`}
            />
          ))}
        </View>

        {/* Dark Overlay instead of gradient */}
        <View className="absolute bottom-0 left-0 right-0 h-32 bg-black/50 z-[5]" />

        <Image
          source={{ uri: item }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  const getRestaurantData = async () => {
    try {
      setLoading(true);
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant),
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        setLoading(false);
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carouselQuery = query(
          collection(db, "carouel"),
          where("res_id", "==", doc.ref),
        );
        const carouselSnapshot = await getDocs(carouselQuery);

        const carouselImages = [];
        if (!carouselSnapshot.empty) {
          carouselSnapshot.forEach((carouselDoc) => {
            carouselImages.push(carouselDoc.data());
          });
          setCarouselData(carouselImages);
        }

        const slotsQuery = query(
          collection(db, "slots"),
          where("ref_id", "==", doc.ref),
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];
        if (!slotsSnapshot.empty) {
          slotsSnapshot.forEach((slotDoc) => {
            slots.push(slotDoc.data());
          });
          setSlotsData(slots[0]?.slot);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setLoading(false);
    }
  };

  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/TtSmNr394bVp9J8n8";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#2b2b2b] justify-center items-center">
        <ActivityIndicator size="large" color="#f49b33" />
        <Text className="text-gray-400 mt-4">Loading restaurant...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b", flex: 1 },
        Platform.OS == "android" && { paddingBottom: 55 },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-[#3d3d3d] p-2 rounded-full mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#f49b33" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl text-white font-bold" numberOfLines={1}>
              {restaurant}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#f49b33" />
              <Text className="text-[#f49b33] ml-1 font-semibold">4.5</Text>
              <Text className="text-gray-400 ml-2">• Fine Dining</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-[#3d3d3d] p-2 rounded-full">
            <Ionicons name="heart-outline" size={24} color="#f49b33" />
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <View className="h-72">
          {carouselData[0]?.images ? (
            <FlatList
              ref={flatListRef}
              data={carouselData[0]?.images}
              renderItem={carouselItem}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 bg-[#3d3d3d] justify-center items-center">
              <Ionicons name="image-outline" size={60} color="#666" />
              <Text className="text-gray-500 mt-2">No images available</Text>
            </View>
          )}
        </View>

        {/* Info Cards */}
        <View className="px-4 py-4">
          {/* Location Card */}
          <TouchableOpacity
            onPress={handleLocation}
            activeOpacity={0.8}
            className="bg-[#3d3d3d] p-4 rounded-2xl mb-3 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="bg-[#f49b33]/20 p-3 rounded-xl">
              <Ionicons name="location" size={24} color="#f49b33" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-400 text-sm">Location</Text>
              <Text
                className="text-white text-base font-medium mt-1"
                numberOfLines={2}
              >
                {restaurantData?.address || "Address not available"}
              </Text>
            </View>
            <View className="bg-[#f49b33] px-3 py-2 rounded-lg">
              <Text className="text-white font-semibold text-sm">
                Directions
              </Text>
            </View>
          </TouchableOpacity>

          {/* Hours Card */}
          <View
            className="bg-[#3d3d3d] p-4 rounded-2xl mb-3 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="bg-[#f49b33]/20 p-3 rounded-xl">
              <Ionicons name="time" size={24} color="#f49b33" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-gray-400 text-sm">Operating Hours</Text>
              <Text className="text-white text-base font-medium mt-1">
                {restaurantData?.opening} - {restaurantData?.closing}
              </Text>
            </View>
            <View className="bg-green-900/50 px-3 py-2 rounded-lg">
              <Text className="text-green-400 font-semibold text-sm">
                Open Now
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Section */}
        <View className="px-4">
          <Text className="text-xl text-white font-bold mb-4">
            Make a Reservation
          </Text>

          <View
            className="bg-[#3d3d3d] rounded-2xl p-4"
            style={{
              shadowColor: "#f49b33",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            {/* Date Picker */}
            <View className="flex-row items-center justify-between py-3 border-b border-[#4d4d4d]">
              <View className="flex-row items-center flex-1">
                <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                  <Ionicons name="calendar" size={20} color="#f49b33" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-400 text-sm">Date</Text>
                  <Text className="text-white font-medium">Select date</Text>
                </View>
              </View>
              <DatePickerComponent date={date} setDate={setDate} />
            </View>

            {/* Guest Picker */}
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center flex-1">
                <View className="bg-[#f49b33]/20 p-2 rounded-lg">
                  <Ionicons name="people" size={20} color="#f49b33" />
                </View>
                <View className="ml-3">
                  <Text className="text-gray-400 text-sm">Guests</Text>
                  <Text className="text-white font-medium">
                    {selectedNumber}{" "}
                    {selectedNumber === 1 ? "Person" : "People"}
                  </Text>
                </View>
              </View>
              <GuestPickerComponent
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
              />
            </View>
          </View>
        </View>

        {/* Slots Section */}
        <View className="px-4 mt-4 pb-8">
          <FindSlots
            restaurant={restaurant}
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
