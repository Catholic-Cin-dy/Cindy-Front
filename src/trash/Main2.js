import * as React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import KakaoLogins from "@react-native-seoul/kakao-login";
import { NavigationScreenProp, NavigationState } from "react-navigation";

if (!KakaoLogins) {
  console.error("KakaoLogins Module is Not Linked");
}

type // @ts-ignore
Navigation = NavigationScreenProp<NavigationState>;

interface Props {
  navigation: Navigation;
}
class SignInScreen extends React.Component<Props> {
  kakaoLogin = async () => {
    try {
      let result = await KakaoLogins.login();
      if (result) {
        await this.getProfile();
        await AsyncStorage.setItem("userToken", result.accessToken);
        this.props.navigation.navigate("App");
        console.log(`Login Finished:${JSON.stringify(result)}`);
      }
    } catch (err) {
      if (err.code === "E_CANCELLED_OPERATION") {
        console.log(`Login Cancelled:${err.message}`);
      } else {
        console.log(`Login Failed:${err.code} ${err.message}`);
      }
    }
  };

  getProfile = async () => {
    try {
      let result = await KakaoLogins.getProfile();
      await console.log(`Get Profile Finished:${JSON.stringify(result)}`);
    } catch (err) {
      console.log(`Get Profile Failed:${err.code} ${err.message}`);
    }
  };
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={this.kakaoLogin}>
          <Text>SignIn with Kakao</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SignInScreen;
