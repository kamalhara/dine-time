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
import entryImg from "../assets/images/Frame.png";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle="light-content" backgroundColor={`bg-[#2b2b2b]`} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 300, height: 300 }} />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-2 m-2 bg-[#f49333] rounded-lg"
            >
              <Text className="text-lg  text-black  text-center font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="p-2 m-2 bg-[#2b2b2b] border border-[#f49333]   rounded-lg"
            >
              <Text className="text-lg text-[#f49333] text-center font-semibold">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-center text-base text-white font-semibold my-4">
              <View className="border-b-2 border-[#f49333] p-2 m-1 w-24" />
              or <View className="border-b-2 border-[#f49333] p-2 m-1 w-24" />
            </Text>
            <TouchableOpacity
              className="flex flex-row justify-center items-center"
              onPress={() => router.push("/login")}
            >
              <Text className="text-white text-center font-semibolds">
                Already a user ?{" "}
              </Text>
              <Text className=" underline  text-[#f49333] font-semibold">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full">
            <Image
              source={entryImg}
              className="w-full h-64"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
