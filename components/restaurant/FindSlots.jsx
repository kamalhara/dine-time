import { db } from "@/app/config/firebase.config";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import validationSchema from "../../utils/guestFormSchema";

const FindSlots = ({
  date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
  restaurant,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");

    if (userEmail) {
      try {
        setIsBooking(true);
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          guests: selectedNumber,
          restaurant: restaurant,
        });
        setIsBooking(false);
        Alert.alert(
          "🎉 Booking Confirmed!",
          `Your table for ${selectedNumber} at ${restaurant} has been reserved for ${selectedSlot}.`,
          [{ text: "Great!", style: "default" }],
        );
        setSelectedSlot(null);
        setSlotsVisible(false);
      } catch (error) {
        setIsBooking(false);
        console.log(error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else if (guestStatus === "true") {
      setFormVisible(true);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSlotPress = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...values,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant: restaurant,
      });
      Alert.alert("🎉 Booking Confirmed!", "Your reservation is complete.");
      setModalVisible(false);
      setSelectedSlot(null);
      setSlotsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <View className="bg-[#f49b33]/20 p-2 rounded-lg mr-3">
          <Ionicons name="time" size={20} color="#f49b33" />
        </View>
        <Text className="text-xl text-white font-bold">
          Available Time Slots
        </Text>
      </View>

      {/* Find Slots Button */}
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`p-4 rounded-xl flex-row items-center justify-center ${
          slotsVisible ? "bg-[#4b5563]" : "bg-[#f49b33]"
        }`}
        style={{
          shadowColor: "#f49b33",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Ionicons
          name={slotsVisible ? "chevron-up" : "search"}
          size={20}
          color="#fff"
        />
        <Text className="text-white text-lg font-bold ml-2">
          {slotsVisible ? "Hide Slots" : "Find Available Slots"}
        </Text>
      </TouchableOpacity>

      {/* Slots Grid */}
      {slotsVisible && (
        <View
          className="mt-4 bg-[#3d3d3d] rounded-2xl p-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {slots && slots.length > 0 ? (
            <>
              <Text className="text-gray-400 text-sm mb-3">
                Tap to select a time slot
              </Text>
              <View className="flex-wrap flex-row">
                {slots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSlotPress(slot)}
                    activeOpacity={0.7}
                    className={`m-1 px-4 py-3 rounded-xl ${
                      selectedSlot === slot
                        ? "bg-[#f49b33]"
                        : selectedSlot && selectedSlot !== slot
                          ? "bg-[#4d4d4d]/50"
                          : "bg-[#4d4d4d]"
                    }`}
                    style={
                      selectedSlot === slot
                        ? {
                            shadowColor: "#f49b33",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.4,
                            shadowRadius: 8,
                            elevation: 6,
                          }
                        : {}
                    }
                  >
                    <View className="flex-row items-center">
                      {selectedSlot === slot && (
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color="#fff"
                          style={{ marginRight: 4 }}
                        />
                      )}
                      <Text
                        className={`font-bold ${
                          selectedSlot === slot ? "text-white" : "text-gray-300"
                        } ${
                          selectedSlot && selectedSlot !== slot && "opacity-50"
                        }`}
                      >
                        {slot}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <View className="items-center py-6">
              <Ionicons name="calendar-outline" size={40} color="#666" />
              <Text className="text-gray-400 mt-2">No slots available</Text>
            </View>
          )}
        </View>
      )}

      {/* Book Slot Button */}
      {selectedSlot && (
        <TouchableOpacity
          onPress={handleBooking}
          activeOpacity={0.8}
          disabled={isBooking}
          className="mt-4 bg-green-600 p-4 rounded-xl flex-row items-center justify-center"
          style={{
            shadowColor: "#22c55e",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Ionicons
            name={isBooking ? "hourglass" : "checkmark-circle"}
            size={22}
            color="#fff"
          />
          <Text className="text-white text-lg font-bold ml-2">
            {isBooking ? "Booking..." : `Book ${selectedSlot}`}
          </Text>
        </TouchableOpacity>
      )}

      {/* Guest Form Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View
            className="bg-[#2b2b2b] rounded-t-3xl p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            {formVisible && (
              <Formik
                initialValues={{ fullName: "", phoneNumber: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full">
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-6">
                      <View>
                        <Text className="text-white text-xl font-bold">
                          Guest Details
                        </Text>
                        <Text className="text-gray-400 text-sm mt-1">
                          Complete your booking
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={handleCloseModal}
                        className="bg-[#3d3d3d] p-2 rounded-full"
                      >
                        <Ionicons name="close" size={24} color="#f49b33" />
                      </TouchableOpacity>
                    </View>

                    {/* Name Input */}
                    <Text className="text-[#f49b33] text-sm font-semibold mb-2">
                      Full Name
                    </Text>
                    <View className="bg-[#3d3d3d] rounded-xl mb-1">
                      <TextInput
                        className="h-12 text-white px-4"
                        placeholder="Enter your name"
                        placeholderTextColor="#666"
                        onChangeText={handleChange("fullName")}
                        value={values.fullName}
                        onBlur={handleBlur("fullName")}
                      />
                    </View>
                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}

                    {/* Phone Input */}
                    <Text className="text-[#f49b33] text-sm font-semibold mb-2 mt-4">
                      Phone Number
                    </Text>
                    <View className="bg-[#3d3d3d] rounded-xl mb-1">
                      <TextInput
                        className="h-12 text-white px-4"
                        placeholder="Enter your phone number"
                        placeholderTextColor="#666"
                        keyboardType="phone-pad"
                        onChangeText={handleChange("phoneNumber")}
                        value={values.phoneNumber}
                        onBlur={handleBlur("phoneNumber")}
                      />
                    </View>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.phoneNumber}
                      </Text>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      activeOpacity={0.8}
                      className="mt-6 bg-[#f49b33] p-4 rounded-xl flex-row items-center justify-center"
                      style={{
                        shadowColor: "#f49b33",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 6,
                      }}
                    >
                      <Text className="text-white text-lg font-bold">
                        Confirm Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
