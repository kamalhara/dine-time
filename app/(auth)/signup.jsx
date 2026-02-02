import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import validationSchema from "../../utils/authSchema";

const Signup = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });

      await AsyncStorage.setItem("userEmail", values.email);
      await AsyncStorage.setItem("isGuest", "false");
      setIsLoading(false);
      router.push("/home");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed",
          "This email address is already in use. Please use a different email.",
          [{ text: "OK" }],
        );
      } else {
        Alert.alert(
          "Signup Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }],
        );
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2b2b2b]">
      <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="items-center pt-8 pb-6">
            <Image
              source={logo}
              style={{ width: 180, height: 80 }}
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-bold mt-4">
              Create Account
            </Text>
            <Text className="text-gray-400 text-base mt-2">
              Join us for amazing dining experiences
            </Text>
          </View>

          {/* Form Section */}
          <View className="flex-1 px-6">
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
                  {/* Email Input */}
                  <View className="mb-4">
                    <Text className="text-[#f49b33] text-sm font-semibold mb-2">
                      Email Address
                    </Text>
                    <View
                      className={`flex-row items-center bg-[#3d3d3d] rounded-xl px-4 ${
                        touched.email && errors.email
                          ? "border border-red-500"
                          : ""
                      }`}
                    >
                      <Ionicons name="mail-outline" size={20} color="#f49b33" />
                      <TextInput
                        className="flex-1 h-14 text-white ml-3"
                        placeholder="Enter your email"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={handleChange("email")}
                        value={values.email}
                        onBlur={handleBlur("email")}
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <View className="mb-6">
                    <Text className="text-[#f49b33] text-sm font-semibold mb-2">
                      Password
                    </Text>
                    <View
                      className={`flex-row items-center bg-[#3d3d3d] rounded-xl px-4 ${
                        touched.password && errors.password
                          ? "border border-red-500"
                          : ""
                      }`}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#f49b33"
                      />
                      <TextInput
                        className="flex-1 h-14 text-white ml-3"
                        placeholder="Create a password"
                        placeholderTextColor="#666"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={22}
                          color="#666"
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text className="text-red-500 text-xs mt-1 ml-1">
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {/* Terms Notice */}
                  <Text className="text-gray-400 text-xs text-center mb-6">
                    By signing up, you agree to our{" "}
                    <Text className="text-[#f49b33]">Terms of Service</Text> and{" "}
                    <Text className="text-[#f49b33]">Privacy Policy</Text>
                  </Text>

                  {/* Sign Up Button */}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                    disabled={isLoading}
                    className="h-14 rounded-xl bg-[#f49b33] flex-row items-center justify-center"
                    style={{
                      shadowColor: "#f49b33",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                      elevation: 8,
                    }}
                  >
                    {isLoading ? (
                      <Text className="text-black text-lg font-bold">
                        Creating account...
                      </Text>
                    ) : (
                      <>
                        <Ionicons
                          name="person-add"
                          size={20}
                          color="#000"
                          style={{ marginRight: 8 }}
                        />
                        <Text className="text-black text-lg font-bold">
                          Create Account
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-[#4d4d4d]" />
              <Text className="text-gray-400 mx-4">or continue with</Text>
              <View className="flex-1 h-px bg-[#4d4d4d]" />
            </View>

            {/* Guest Button */}
            <TouchableOpacity
              onPress={handleGuest}
              activeOpacity={0.8}
              className="h-14 rounded-xl bg-[#3d3d3d] flex-row items-center justify-center border border-[#4d4d4d]"
            >
              <Ionicons name="person-outline" size={20} color="#f49b33" />
              <Text className="text-white text-base font-semibold ml-2">
                Continue as Guest
              </Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-8 mb-6">
              <Text className="text-gray-400 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/signin")}>
                <Text className="text-[#f49b33] text-base font-bold">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
