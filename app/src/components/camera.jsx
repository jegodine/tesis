import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraPlugin() {
    const cameraRef = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState(null);

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
                quality: 0.7, // Optional: adjust image quality (0-1)
                base64: true,  // Optional: return image data as base64 string
            });
            setCapturedImage(data.uri); // Update state with captured image URI
        } catch (error) {
            console.error('Error taking picture:', error);
        }

    }

    function toggleCameraType() {
        console.log("change");
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer} onPress={() => { console.log("pressed viewed"); }}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType} >
                        <Text onPress={() => { console.log("flip pressed"); cameraFunctions("FLIP"); }} style={styles.text}>Cambiar camara</Text>
                        {console.log("text rendered")}
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
        height: '100%',
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
