import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { Text, StyleSheet } from 'react-native';


interface Props {
  disabled?: boolean;
  onSuccess?: (token: string) => void;
}

const KakaoLogin = ({ disabled, onSuccess }: Props) => {
  const loginWithKakao = async () => {
    // `KakaoOAuthWebToken` 타입은 web 환경(react-native-web)일 때만 나오는 것이므로 as로 타입 단언
    const token = (await login()) as KakaoOAuthToken;
    onSuccess?.(token.accessToken);
  };
