import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { View } from "react-native";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className={"flex items-center justify-center"}>
      <TouchableOpacity
        className={"w-full flex justify-end items-end p-5"}
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className={"text-black text-md font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className={""} />}
      ></Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;
