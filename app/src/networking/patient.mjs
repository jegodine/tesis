const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const PatientSave = (SERVICE_URI, payload) => {
    return fetch(SERVICE_URI + '/patient', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
};

export const ValidateUniquePatient = (SERVICE_URI, payload) => {
    const { userId, dpi } = payload
    return fetch(SERVICE_URI + `/patient/unique/${userId}/${dpi}`, {
        method: 'GET',
        headers: headers
    });
}

export const ListPatients = (SERVICE_URI, payload) => {
    const { userId, search } = payload
    const url = `/patient/list/${userId}` + ((search && search !== '') ? `/${search}` : '');
    return fetch(SERVICE_URI + url, {
        method: 'GET',
        headers: headers
    });

}

export const SendConsult = (SERVICE_URI, payload) => {
    return fetch(SERVICE_URI + '/patientHistory', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });
}

export const UpdateAcceptanceResponse = (SERVICE_URI, payload) => {
    const { id, accepted } = payload;
    return fetch(SERVICE_URI + `/patientHistory/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ accepted })
    });
}

export default PatientSave;