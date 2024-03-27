import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { View } from "react-native";
import { Button, Text, Input } from '@rneui/themed';
import ErrorMessage from "./errorMessage";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = React.useState("");
  const [error, setError] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const [userValidate, setUserValidate] = React.useState(false);

  const validateEmail = (email) => {
    const result = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!result) {
      setError('Correo no valido');
      setShowError(true);
    }
    return result;
  };

  React.useEffect(() => {

  }, [userValidate]);

  return (
    <View>
      {userValidate ?
        <View>
          <Text style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
            textAlign: "center"
          }}>Bienvenido {userInfo}</Text>
          <Button
            title="Generar consulta del paciente"
            onPress={() => {
              navigation.navigate('Paciente', {
                userId: userInfo
              });
            }}
          />
        </View>
        :
        <View>
          <Text style={{
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
            textAlign: "center"
          }}>Ingrese su correo</Text>
          <Input
            value={userInfo}
            style={{
              height: 40,
              textAlign: "center"
            }}
            onChangeText={(text) => setUserInfo(text)}
            placeholder="correo@gmail.com"
          />
          <Button
            title="Ingresar"
            onPress={() => {
              setUserValidate(validateEmail(userInfo))
            }}
          />
          <ErrorMessage error={error} setShowError={setShowError} showError={showError} />
        </View>
      }
    </View>
  );
}