import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";

const rooms: string[] = ["Room 101", "Room 102", "Room 103", "Room 104"];

const Attendance: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [attendanceMarked, setAttendanceMarked] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        `${now.toLocaleTimeString()} | ${now.toDateString()}`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBiometric = async () => {
    if (!selectedRoom) return;

    const hasHardware =
      await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert("Biometric not supported on this device");
      return;
    }

    const isEnrolled =
      await LocalAuthentication.isEnrolledAsync();

    if (!isEnrolled) {
      Alert.alert("No fingerprint/Face ID found on device");
      return;
    }

    const result =
      await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to Mark Attendance",
        fallbackLabel: "Use Passcode",
      });

    if (result.success) {
      setAttendanceMarked(true);
    } else {
      Alert.alert("Authentication Failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EAF4EC]">
      <View className="flex-1 px-6 pt-6">

        <Text className="text-gray-700 text-lg mb-6">
          Attendance
        </Text>

        {/* Profile */}
        <View className="items-center mb-6">
          <View className="w-28 h-28 rounded-full border-4 border-green-600 justify-center items-center">
            <Text className="text-green-600 text-4xl">👤</Text>
          </View>

          <Text className="text-xl font-semibold mt-4">
            Aarshi Mitra
          </Text>

          <Text className="text-gray-500">
            Student Attendance
          </Text>
        </View>

        <Text className="text-3xl font-bold mb-2">
          Mark Attendance
        </Text>

        <Text className="text-gray-500 mb-6">
          Select your room to continue
        </Text>

        {/* Room Selector */}
        <TouchableOpacity
          onPress={() => setShowDropdown(!showDropdown)}
          className="border border-green-500 rounded-2xl p-5 bg-white mb-4"
        >
          <Text className="text-gray-600">
            {selectedRoom
              ? selectedRoom
              : "Select your Room Number"}
          </Text>
        </TouchableOpacity>

        {showDropdown &&
          rooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedRoom(room);
                setShowDropdown(false);
              }}
              className="bg-green-100 p-4 rounded-xl mb-2"
            >
              <Text className="text-green-700">
                {room}
              </Text>
            </TouchableOpacity>
          ))}

        {/* Time */}
        <Text className="text-center text-gray-700 mt-4">
          {currentTime}
        </Text>

        {/* Location */}
        {selectedRoom && (
          <View className="mt-4">
            <Text className="text-gray-500">
              Your current location:
            </Text>

            <Text className="text-green-700 font-semibold text-lg">
              {selectedRoom}
            </Text>
          </View>
        )}

        {/* Biometric Button */}
        <TouchableOpacity
          disabled={!selectedRoom}
          onPress={handleBiometric}
          className={`mt-8 p-5 rounded-2xl border ${
            selectedRoom
              ? "bg-green-700 border-green-700"
              : "bg-white border-gray-300"
          }`}
        >
          <Text
            className={`text-center font-semibold text-lg ${
              selectedRoom
                ? "text-white"
                : "text-gray-400"
            }`}
          >
            Use Biometric Scan
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal
          transparent
          visible={attendanceMarked}
          animationType="fade"
        >
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-white p-8 rounded-2xl w-80 items-center">
              <Text className="text-green-700 text-lg font-bold mb-3">
                Attendance Marked Successfully!
              </Text>

              <TouchableOpacity
                onPress={() => setAttendanceMarked(false)}
                className="bg-green-700 px-6 py-2 rounded-xl"
              >
                <Text className="text-white">
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default Attendance;