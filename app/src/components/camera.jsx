import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { manipulateAsync } from 'expo-image-manipulator';

export default function CameraPlugin({ setImage, showCamera }) {
    const cameraRef = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Permisos para acceder a la Camara</Text>
                <Button onPress={requestPermission} title="Permisos para la camara" />
            </View>
        );
    }

    const cameraFunctions = (cameraFunction) => {
        switch (cameraFunction) {
            case 'FLIP':
                console.log("escogio cambiar de camara");
                toggleCameraType();
                break;
            case 'PIC':
                console.log("tomar foto");
                picCamera();
                break;
            default:
                console.log("no se ha seteado nada");
        }
    }

    const picCamera = async () => {
        try {
            const data = await cameraRef.current.takePictureAsync({
                quality: 0.2, // Optional: adjust image quality (0-1)
                base64: false,  // Optional: return image data as base64 string
            });
            let resizedPhoto = await manipulateAsync(
                data.uri,
                [{ resize: { width: 600, height: 600 } }],
                { compress: 1, format: "jpeg", base64: true }
            );
            setImage(resizedPhoto);
            showCamera(false);
        } catch (error) {
            console.error('Error taking picture:', error);
        }

    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef} ratio={'16:9'}>
                <View style={styles.buttonContainer} >
                    <TouchableOpacity style={styles.button} >
                        <Text onPress={() => { cameraFunctions("FLIP"); }} style={styles.text}>Cambiar camara</Text>
                        <Text onPress={() => { cameraFunctions("PIC"); }} style={styles.text}>Tomar foto</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '50%',
    },
    camera: {
        flex: 1,
        overflow: 'visible'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        margin: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'sans-serif-medium'
    },
});
