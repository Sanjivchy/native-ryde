import { Text, ScrollView, View, Image, Alert } from "react-native";
import { images, icons } from "@/constant";
import InputField from "@/components/InputField";
import { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/oAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    const completedSignUp = await signUp.attemptEmailAddressVerification({
      code: verification.code,
    });

    try {
      if (completedSignUp.status === "complete") {
        // TODO: Create a database user
        await setActive({
          session: completedSignUp.createdSessionId,
        });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed, please try again",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
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
          <OAuth />
          <Link
            href={"/sign-in"}
            className={"text-sm text-center text-general-200 mt-10"}
          >
            <Text>Already have an account?&nbsp;</Text>
            <Text className={"text-primary-500"}>Login in</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaBold py-2">Verification</Text>
            <Text>We have sent a verification code to {form.email}</Text>
            <InputField
              label={"Code"}
              placeholder={"Enter verification code"}
              icon={icons.lock}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
            />
            {verification.error && (
              <Text className="text-red-500">{verification.error}</Text>
            )}
            <CustomButton
              title={"Verify"}
              onPress={onVerifyPress}
              className={"mt-6"}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-6"
            />
            <Text className="font-JakartaBold text-3xl text-center">
              Verified
            </Text>
            <Text className="text-sm text-gray-400 py-2 text-center">
              Account created successfully!!
            </Text>
            <CustomButton
              title={"Continue"}
              onPress={() => {
                router.push("/(root)/(tabs)/home");
                setShowSuccessModal(false);
              }}
              className={"mt-6"}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
