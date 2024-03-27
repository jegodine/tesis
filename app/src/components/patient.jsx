import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Input, Text, Dialog } from '@rneui/themed';
import RadioOptions from './radioOptions';
import PatientSave, { ValidateUniquePatient } from '../networking/patient.mjs';
import ErrorMessage from './errorMessage';

const SERVICE_URI = "http://ec2-18-118-27-135.us-east-2.compute.amazonaws.com:8082";

const Patient = ({ navigation, route }) => {
    const handleChange = (text, setText, number = true) => {
        const regex = /^\d+$/; // Matches only digits (0-9)
        if (number && regex.test(text)) {
            setText(text);
        } else if (number == false) {
            setText(text);
        }
    };

    const savePatient = () => {
        setSaving(true);
        ValidateUniquePatient(SERVICE_URI, { userId: userId, dpi: dpi === '' ? '0' : dpi })
            .then(res => res.json())
            .then(json => {
                if (json.length !== 0) return true;
                else return false;
            })
            .then(response => {
                if (!response) {
                    return PatientSave(SERVICE_URI, { name: name, gender: gender, dpi: dpi === '' ? '0' : dpi, age: age, userId: userId })
                        .then(res => res.json())
                        .then(json => {
                            console.log("response", json);
                            navigation.navigate('Consulta', { patientId: json._id, patientName: name });
                        }).catch(error => {
                            console.error("Error in saving", error);
                            setError(error.message);
                            setShowError(true);
                        })
                        .finally(() => setSaving(false));
                }
                else {
                    setError("El numero de dpi ya existe");
                    setShowError(true);
                }
            })
            .catch(error => {
                console.error("Error in saving", error);
                setError(error.message);
                setShowError(true);
            })
            .finally(() => setSaving(false));
        ;
    };

    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [dpi, setDpi] = useState('');
    const [gender, setGender] = useState('M');
    const [saving, setSaving] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(route?.params?.userId || "globalUser");
    return (
        <ScrollView>
            <View style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '10px'
            }}>
                <Text>Nombre del Paciente</Text>
                <Input
                    value={name}
                    style={{
                        height: 40
                    }}
                    onChangeText={(text) => handleChange(text, setName, false)}
                    placeholder="Juan Perez"
                />
                <Text>Edad</Text>
                <Input
                    value={age}
                    keyboardType="numeric"
                    style={{
                        height: 40
                    }}
                    onChangeText={(text) => handleChange(text, setAge)}
                    placeholder="21"
                />
                <Text>Sexo</Text>
                <RadioOptions values={[{ title: "Masculino", value: "M" }, { title: "Femenino", value: "F" }]} setValue={setGender} />
                <Text>DPI</Text>
                <Input
                    value={dpi}
                    keyboardType="numeric"
                    style={{
                        height: 40
                    }}
                    onChangeText={(text) => handleChange(text, setDpi)}
                    placeholder="21"
                />
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5
                }}>
                    <Button
                        title={"Guardar"}
                        buttonStyle={{
                            borderRadius: 3,
                        }}
                        onPress={savePatient}
                        disabled={saving}
                    />
                    <Button
                        title={"Buscar"}
                        buttonStyle={{
                            borderRadius: 3,
                            marginLeft: 10,
                        }}
                        onPress={() => navigation.navigate('Pacientes', { userId: userId })}
                        disabled={saving}
                    />

                </View>
                <ErrorMessage error={error} setShowError={setShowError} showError={showError} />
            </View>
        </ScrollView>
    );
};

export default Patient;