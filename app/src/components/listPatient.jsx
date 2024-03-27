import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItem, Avatar, Dialog, SearchBar, Text } from "@rneui/themed";
import { ListPatients } from "../networking/patient.mjs";
import ErrorMessage from "./errorMessage";

const PatientItem = ({ patient, index, navigation }) => {
    const { name, dpi, _id } = patient
    return (
        <ListItem key={index+1} onPress={() => navigation.navigate('Consulta', { patientId: _id, patientName: name })}>
            <Avatar rounded title={name?.charAt(0) || ''} containerStyle={{ backgroundColor: "blue" }} />
            <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Subtitle>{dpi}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}

const ListPatient = ({ navigation, route }) => {
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const [userId, setUserId] = useState(route?.params?.userId);
    const SERVICE_URI = "http://ec2-18-118-27-135.us-east-2.compute.amazonaws.com:8082";

    const list = async () => {
        try {
            const query = { userId: userId }
            if (search !== '') {
                query.search = search;
            }
            const response = await ListPatients(SERVICE_URI, query);
            const jsonData = await response.json();
            console.log(jsonData);
            setPatients(jsonData);
        } catch (error) {
            console.error(error);
            showError(true);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const updateSearch = (search) => {
        setSearch(search);
    };

    useEffect(() => {
        list();
    }, [search])
    
    return (
        <View>
            <SearchBar
                placeholder="Buscar por nombre/dpi"
                onChangeText={updateSearch}
                value={search}
            />
            {patients.map((item, index) => <PatientItem key={index} patient={item} index={index} navigation={navigation} />)}
            {patients.length === 0 ? <Text h3>No hay datos</Text> : null}
            <Dialog isVisible={loading}>
                <Dialog.Loading />
            </Dialog>
            <ErrorMessage error={error} setShowError={setShowError} showError={showError} />
        </View>
    );
};

export default ListPatient;