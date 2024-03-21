import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
    GOOGLE_WEB_CLIENT_ID,
    GOOGLE_ANDROID_CLIENT_ID,
    GOOGLE_IOS_CLIENT_ID,
} from '@env';
import { useState } from 'react';
import { View, Pressable } from "react-native";

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['profile', 'email']
});

const GoogleLogin = async () => {
    const result = await Expo.Google.logInAsync({
        
    });
    return userInfo;
};

export default function Login() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response = await GoogleLogin();
            const { idToken, user } = response;
            console.log(idToken, user, "token and user");
        } catch (error) {
            setError(
                error?.response?.data?.error?.message || 'Error en el acceso a google'
            );
            console.error(error, "error from google login");
        } finally {
            setLoading(false)
        }
    };
    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
        />
    );
};