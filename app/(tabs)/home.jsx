import { BlurView } from "expo-blur";
import React from "react";
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
import homeBanner from "../../assets/images/homeBanner.png";
import { restaurants } from "../store/restaurant";

export default function home() {
  const renderItem = ({ item }) => (
    <TouchableOpacity className="bg-[#5f5f5f] max-h-64  max-w-xs flex justify-center  mx-4 p-4 rounded-lg shadow-md ">
      <Image
        className="self-center"
        resizeMode="cover"
        source={{ uri: item.image }}
        style={{
          height: 98,
          width: 180,
          marginTop: 8,
          marginBottom: 4,
          borderRadius: 8,
        }}
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base font-bold">
        Open:{item.opening} - Close{item.closing}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS === "android" && { paddingBottom: 50 },
        Platform.OS === "ios" && { paddingBottom: 20 },
      ]}
    >
      <View className="flex items-center ">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between py-2 px-4">
          <View className="flex flex-row ">
            <Text
              className={`h-10 text-white text-base pt-[${Platform.OS === "ios" ? 8 : 6}] align-middle `}
            >
              Welcome To
            </Text>
            <Image source={logo} className="w-20 h-12" resizeMode="content" />
          </View>
        </View>
      </View>

      <ScrollView>
        <ImageBackground
          resizeMode="content"
          className="my-4 w-full h-52 items-center justify-center"
          source={homeBanner}
        >
          <BlurView
            intensity={`${Platform.OS === "android" ? 100 : 25}`}
            tint="dark"
          >
            <Text className="text-white text-center text-3xl font-bold">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 bg-[#2b2b2b] flex-row item-center mb-2">
          <Text className="text-white text-3xl mr-2 font-semibold">
            Special discount %
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
        )}
        <View className="p-4 bg-[#2b2b2b] flex-row item-center mb-2 mt-5">
          <Text className="text-[#fb9b33] text-3xl mr-2 font-semibold">
            Our restaurants
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={"#fb9b33"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
