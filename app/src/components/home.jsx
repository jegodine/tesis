import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './login'

export default function Home({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>Doctor IA Radiografia{route?.params?.name}</Text>
            <StatusBar style="auto" />
            <LoginScreen navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
