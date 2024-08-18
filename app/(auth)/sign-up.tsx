import { Text, ScrollView, View, Image } from "react-native";
import { images, icons } from "@/constant";
import InputField from "@/components/InputField";
import { useCallback, useState } from "react";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";
const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const onSignUpPress = async () => {
    console.log("onSignUpPress", form);
  };
  return (
    <ScrollView className="sign-up flex-1 bg-white">
      <View className="sign-up__form flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className={"z-0 w-full h-[250px]"}
          ></Image>
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Create your account
          </Text>
        </View>
        <View className={"p-5"}>
          <InputField
            label={"Name"}
            placeholder={"Enter your Name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label={"Email"}
            placeholder={"Enter your Email"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your Password"}
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title={"Sign up "}
            onPress={onSignUpPress}
            className={"mt-6"}
          />
          {/* TODO: oAuth   */}
          <Link
            href={"/sign-in"}
            className={"text-sm text-center text-general-200 mt-10"}
          >
            <Text>Already have an account?&nbsp;</Text>
            <Text className={"text-primary-500"}>Login in</Text>
          </Link>
        </View>
        {/*    verification modal*/}
      </View>
    </ScrollView>
  );
};

export default SignUp;
