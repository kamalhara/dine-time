import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import entryImg from "../../assets/images/Frame.png";
import validationSchema from "../utils/signupSchema";

export default function Signup() {
  const router = useRouter();
  const handleSignup = () => {
    router.push("/home");
  };
  return (
    <SafeAreaView className={`bg-[#2b2b2b]`}>
      <StatusBar barStyle="light-content" backgroundColor={`bg-[#2b2b2b]`} />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 220, height: 100 }} />

          <Text className="text-white mb-10 text-center text-lg font-semibold">
            Let&apos;s get you started
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>

                  <TextInput
                    className="h-10 border border-white rounder px-2 text-white"
                    keyboardType="email-address"
                    onChange={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500">{errors.email}</Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">password</Text>

                  <TextInput
                    className="h-10 border border-white rounder px-2 text-white"
                    keyboardType="password-address"
                    onChange={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />

                  {touched.password && errors.password && (
                    <Text className="text-red-500">{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => handleSignup()}
                    className="p-2 m-2 bg-[#f49333] rounded-lg mt-10"
                  >
                    <Text className="text-lg  text-black  text-center font-semibold">
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
          <View>
            <TouchableOpacity
              className="flex flex-row justify-center items-center my-5 p-2"
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
