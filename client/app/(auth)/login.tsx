import React, { useState } from "react";
import "../global.css";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { loginUser } from "@/redux/slice/authSlice";
import { loginData } from "@/types/authForms";

const Login = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const data: loginData = {
      institutionId: id,
      password: password,
    };
    const result = await dispatch(loginUser(data));
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View className="items-center mt-10 mb-10">
          <View className="p-1 rounded-full bg-primary/20">
            <Image
              source={require("../../assets/images/donald.png")}
              className="w-36 h-36 rounded-full border-4 border-primary"
              resizeMode="cover"
            />
          </View>

          <Text className="mt-4 text-xl font-bold text-foreground">
            Donald Trump
          </Text>
          <Text className="text-mutedForeground text-sm">Student Login</Text>
        </View>

        {/* Welcome Text */}
        <View className="mb-8">
          <Text className="text-3xl font-extrabold text-foreground">
            Welcome Back
          </Text>
          <Text className="text-mutedForeground mt-2 text-base">
            Log in to continue
          </Text>
        </View>

        {/* Email Input */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-4">
          <TextInput
            onChangeText={setId}
            placeholder="Enter your university roll/employee id"
            placeholderTextColor="#6b7280"
            className="text-foreground text-base"
          />
        </View>

        {/* Password Input */}
        <View className="bg-card border border-border rounded-2xl px-4 py-4 mb-4 flex-row items-center justify-between">
          <TextInput
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
            className="flex-1 text-foreground text-base"
          />
          <Text className="ml-2 text-mutedForeground">👁️</Text>
        </View>

        {/* Remember Me */}
        <View className="flex-row items-center mb-10">
          <View className="w-5 h-5 rounded-full bg-primary mr-3" />
          <Text className="text-mutedForeground">Remember me</Text>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.85}
          className="bg-primary py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-primaryForeground text-lg font-bold">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="items-center mt-8">
          <Text className="text-mutedForeground">
            Don’t have an account?{" "}
            <Text
              onPress={() => router.replace("/signUp")}
              className="text-primary font-semibold"
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
