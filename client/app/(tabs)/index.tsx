import React, { useEffect } from "react";
import "../global.css";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchClassrooms } from "@/redux/slice/classroomSlice";

const Index = () => {
  const currentUser = useAppSelector((state) => state.auth.authUser);
  const classCount = useAppSelector((state) => state.classroom.classCount);
  const dispatch = useAppDispatch();
  const handleClassFetch = async () => {
    await dispatch(fetchClassrooms());
  };

  useEffect(() => {
    handleClassFetch();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-3xl font-extrabold text-foreground">
              Hi, {currentUser?.name}👋
            </Text>
            <Text className="text-mutedForeground mt-1 text-base">
              {currentUser?.role === "STUDENT"
                ? `You are currently enrolled in ${classCount} classes`
                : `You are currently assigned to ${classCount} classes`}
            </Text>
          </View>

          <View className="bg-card p-3 rounded-full border border-border">
            <Text className="text-lg">🔔</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-8">
          {/* Attendance Rate */}
          <View className="w-[48%] bg-primary p-5 rounded-2xl shadow-md">
            <Text className="text-4xl font-extrabold text-primaryForeground">
              85%
            </Text>
            <Text className="text-primaryForeground/90 mt-1 text-sm">
              Attendance Rate
            </Text>
          </View>

          {/* Total Classes */}
          <View className="w-[48%] bg-card p-5 rounded-2xl border border-border shadow-sm">
            <Text className="text-4xl font-extrabold text-foreground">
              {classCount}
            </Text>
            <Text className="text-mutedForeground mt-1 text-sm">
              Total Classes
            </Text>
          </View>
        </View>

        {/* Up Next */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-foreground">Up Next</Text>
          <Text className="text-primary font-semibold">See All</Text>
        </View>

        <View className="bg-card p-6 rounded-2xl border border-border shadow-sm mb-8">
          <Text className="text-lg font-bold text-foreground">
            Digital Communication
          </Text>
          <Text className="text-mutedForeground mt-1">
            Prof. Moumita Sengupta
          </Text>

          <View className="flex-row justify-between mt-4">
            <Text className="text-foreground">⏰ 10:00 AM - 11:30 AM</Text>
            <Text className="text-foreground">👥 34 Students</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <Text className="text-xl font-bold text-foreground mb-3">
          Recent Activity
        </Text>

        <View className="bg-card p-5 rounded-2xl border border-border shadow-sm flex-row justify-between items-center">
          <View>
            <Text className="font-bold text-foreground">
              Analog Circuit Class
            </Text>
            <Text className="text-mutedForeground text-sm mt-1">
              Attendance marked successfully
            </Text>
          </View>

          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Text className="text-primary font-semibold">On Time</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
