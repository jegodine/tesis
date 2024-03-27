import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Input, Text, Dialog, Image } from '@rneui/themed';
import CameraPlugin from './camera';
import { SendConsult } from '../networking/patient.mjs';
import ErrorMessage from './errorMessage';
import RadioOptions from './radioOptions';
import { UpdateAcceptanceResponse } from '../networking/patient.mjs';

const Consult = ({ navigation, route }) => {
    const [consulta, setConsulta] = useState('');
    const [patientId, setPatientId] = useState(route?.params?.patientId || "66060007c2f9cc10b095b6ea");
    const [image64, setImage64] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [response, setResponse] = useState('');
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [accepted, setAccepted] = useState(null);
    const [historialId, setHistorialId] = useState(null);
    const [patientName, setPatientName] = useState(route?.params?.patientName || "Maria del Socorro");
    const SERVICE_URI = "http://ec2-18-118-27-135.us-east-2.compute.amazonaws.com:8082";

    const onPressConsulta = () => {
        const payload = {
            image: image64.base64,
            type: "jpeg",
            history: consulta,
            patientId: patientId
        };
        setLoading(true);
        SendConsult(SERVICE_URI, payload)
            .then(res => res.json())
            .then(json => {
                setHistorialId(json._id);
                setResponse(json.gemini)
            }).catch((error) => {
                console.error(error, "error");
                setError(error.message);
                setShowError(true);
            })
            .finally(() => setLoading(false));
    };


    useEffect(() => {
        if (accepted !== null) {
            UpdateAcceptanceResponse(SERVICE_URI, { id: historialId, accepted: accepted })
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    setConsulta('');
                    setImage64(null);
                    setResponse('');
                    setHistorialId(null);
                    setAccepted(null);
                })
                .catch((error) => console.error(error));
        }
    }, [image64, accepted, consulta])

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    marginBottom: 20
                }}>Favor de ingresar la historia del paciente {patientName}</Text>
                <Input style={{
                    flex: 1,
                    width: '250px',
                    textAlign: 'center',
                    borderWidth: 2
                }}
                    placeholder="detalle de la historia y preguntas"
                    value={consulta}
                    multiline={true}
                    rows={6}
                    onChangeText={(event) => { setConsulta(event) }}
                />
                <View style={{
                    display: 'flex',
                    marginBottom: 20,
                    flexDirection: 'row'
                }}>
                    <Button
                        title="Agregar Radriografia"
                        onPress={() => setShowCamera(true)}
                        accessibilityLabel="Usando tu camara toma la foto"
                    />
                    <Button
                        title="Enviar consulta"
                        style={{
                            marginLeft: 10
                        }}
                        disabled={image64 === null || consulta === ''}
                        onPress={onPressConsulta}
                        accessibilityLabel="Envia la historia del paciente para ser procesada"
                    />
                </View>
                <View style={{
                    flex: 3
                }}>
                    {image64 !== null ? <Image style={{ width: 100, height: 50, resizeMode: 'center', borderWidth: 1, borderColor: 'blue' }} source={{ uri: image64.uri }} /> : null}
                    {response !== '' ?
                        <View>
                            <Text style={{ fontSize: 20 }}>Respuesta</Text>
                            <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{response}</Text>
                            <Text style={{ fontSize: 20 }}>La respuesta es correcta o esperada?</Text>
                            <RadioOptions values={[{ title: "Si", value: "S" }, { title: "No", value: "N" }]} setValue={setAccepted} />
                        </View>
                        : null}
                </View>

                <Dialog
                    isVisible={showCamera}
                    onBackdropPress={() => setShowCamera(false)}
                    fullScreen={true}
                >
                    <Dialog.Title title="Camara" />
                    <CameraPlugin setImage={setImage64} showCamera={setShowCamera} />
                </Dialog>
                <Dialog isVisible={loading}>
                    <Dialog.Loading />
                </Dialog>
                <ErrorMessage error={error} setShowError={setShowError} showError={showError} />
            </View>
        </ScrollView>
    );
};



export default Consult