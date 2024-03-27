import express from "express";
import Patient from "../model/Patient.mjs";

const routerPatient = express.Router();

routerPatient.post('/patient', async (req, res) => {
    const { name, age, gender, dpi, userId } = req.body;
    try {
        const patient = new Patient({ name, age, gender, dpi, userId });
        console.log(patient);
        await patient.save();
        res.send(patient);
    } catch (error) {
        console.error("Error in save patient", error);
        res.status(500).send(error);
    }
});

routerPatient.put('/patient/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, gender, dpi } = req.body;
    try {
        const patient = await Patient.findByIdAndUpdate(id, { name, age, gender, dpi, userId }, { new: true });
        res.send(patient);
    } catch (error) {
        console.error("Error in update patient", error);
        res.status(500).send(error);
    }
});

routerPatient.get('/patient/:id', async (req, res) => {
    const { id } = req.params;
    const query = id ? { _id: id } : {}
    try {
        const patient = await Patient.find(query);
        res.send(patient);
    } catch (error) {
        console.error("Error in find patient", error);
        res.status(500).send(error);
    }
});

routerPatient.get('/patient/unique/:userId/:dpi', async (req, res) => {
    const { userId, dpi } = req.params;
    const query = { userId: userId, dpi: dpi }
    try {
        const patient = await Patient.find(query);
        res.send(patient);
    } catch (error) {
        console.error("Error in find unique patient", error);
        res.status(500).send(error);
    }
});


routerPatient.get('/patient', async (req, res) => {
    const query = {}
    try {
        const patient = await Patient.find(query).skip(0).limit(5).sort({ created: -1 });
        res.send(patient);
    } catch (error) {
        console.error("Error in find patient", error);
        res.status(500).send(error);
    }
});

routerPatient.get('/patient/list/:userId', async (req, res) => {
    const { userId } = req.params;
    const query = { userId: userId }
    try {
        const patient = await Patient.find(query).skip(0).limit(5).sort({ created: -1 });
        res.send(patient);
    } catch (error) {
        console.error("Error in find patient", error);
        res.status(500).send(error);
    }
});

routerPatient.get('/patient/list/:userId/:search', async (req, res) => {
    const { userId, search } = req.params;
    const query = { userId: userId }
    if (search) {

        if (Number(search)) {
            query.dpi = Number(search)
        } else {
            query.name = { $regex: '.*' + search + '.*' }
        }
    }
    try {
        const patient = await Patient.find(query).skip(0).limit(5).sort({ created: -1 });
        res.send(patient);
    } catch (error) {
        console.error("Error in find patient", error);
        res.status(500).send(error);
    }
});

export default routerPatient;