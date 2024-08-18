import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constant";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className={"flex items-center h-full pb-3 justify-center"}>
      <TouchableOpacity
        className={"w-full flex justify-end items-end p-5"}
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className={"text-black text-md font-JakartaBold"}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"} />
        }
        activeDot={
          <View className={"w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full"} />
        }
        onIndexChanged={(index: number) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View className={"flex items-center justify-center"} key={index}>
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode={"contain"}
            />
            <View
              className={
                "flex flex-row items-center justify-center w-full mt-10"
              }
            >
              <Text
                className={"text-black text-3xl font-bold mx-10 text-center"}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className={
                "text-[#858585] text-lg font-JakartaSemiBold mx-10 mt-3 text-center "
              }
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? " Get started" : "Next"}
        className={"w-11/12 mt-10"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default Onboarding;
