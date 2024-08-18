import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRef } from "react";

const SignIn = () => {
  const signInRef = useRef<HTMLInputElement>(null);
  return (
    <SafeAreaView>
      <Text>Sign in!</Text>
    </SafeAreaView>
  );
};

export default SignIn;
