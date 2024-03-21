import {
  GOOGLE_ANDROID_CLIENT_ID
} from '@env';
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button, View, Text } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [googleAccessToken, setGoogleAccessToken] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_ANDROID_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  React.useEffect(() => {
    const fetchUserInfo = () => {
      if (googleAccessToken) {
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${googleAccessToken}` },
        })
          .then(response => response.json())
          .then(userInfoObj => {
            setUserInfo(userInfoObj);
            console.log(userInfoObj);
            navigation.navigate('Consulta')
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
    if (response?.type === "success") {
      const { authentication } = response;
      setGoogleAccessToken(authentication.accessToken);
      fetchUserInfo();
    }
  }, [response]);

  return (
    <View>
      {userInfo ?
        <View>
          <Text>Bienvenido {userInfo.name}</Text>
          <Button
            title="Generar consulta del paciente"
            onPress={() => {
              navigation.navigate('Consulta');
            }}
          />
        </View>
        :
        <View>
          <Button
            disabled={!request}
            title="Login con Google"
            onPress={() => {
              promptAsync();
            }}
          />
          <Button
            title="Generar consulta del paciente"
            onPress={() => {
              navigation.navigate('Consulta');
            }}
          />

        </View>
      }
    </View>
  );
}