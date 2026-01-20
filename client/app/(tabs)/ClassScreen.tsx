import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function classScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold">class</Text>
      <Pressable
        onPress={() => {
          router.push("/class-details/Announcements");
        }}
      >
        <Text>Inside Class</Text>
      </Pressable>
    </View>
  );
}
