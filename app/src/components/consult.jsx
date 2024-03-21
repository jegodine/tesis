import React, {useState} from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import CameraPlugin from './camera';

const Consult = () => {
    const [consulta,setConsulta] = useState();

    const onPressConsulta = (event) => {
        console.log("on pressed consult data", consulta);
        setConsulta(consulta + "final");
    };

    return (
        <View style={{ display: 'flex', flex: 1, justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center'}}>
            <Text>Favor de ingresar la historia del paciente</Text>
            <TextInput style={{
                flex: 1,
                height: '80%',
                width: '250px',
            }}
                placeholder="detalle de como se fracturo"
                multiline={true}
                numberOfLines={6}
                onChangeText={(event)=>{setConsulta(event)}}
            />
            <Button 
            title="Enviar consulta"
            onPress={onPressConsulta}
            accessibilityLabel="Envia la historia del paciente para ser procesada"
            />
            <Text>{consulta}</Text>
            <CameraPlugin />
            <Text>{consulta}</Text>
        </View>
    );
};



export default Consult;