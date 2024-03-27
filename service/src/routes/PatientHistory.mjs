import express from "express";
import PatientHistory from "../model/PatientHistory.mjs";
import { CallGemini } from "../service/gemini.mjs";

const routerPatientHistory = express.Router();

routerPatientHistory.post('/patientHistory/', async (req, res) => {
    const { history, image, type, patientId } = req.body;
    let gemini;
    try {
        gemini = await CallGemini(history, image, type);
        console.log(gemini, "response of gemini");
        const patientHistory = new PatientHistory({ history, gemini, image, type, patientId });
        await patientHistory.save();
        res.send(patientHistory);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

routerPatientHistory.put('/patientHistory/:id', async (req, res) => {
    const { accepted } = req.body;
    const { id } = req.params;
    try {
        const patientHistory = await PatientHistory.findOneAndUpdate(
            { _id: id },
            { accepted: accepted },
            { new: true }
        );
        console.log(patientHistory);
        res.send(JSON.stringify({ "ok": "ok" }));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


routerPatientHistory.get('/patientHistory/:id', async (req, res) => {
    const { id } = req.params;
    const query = id ? { _id: id } : {};
    try {
        const patientHistory = await PatientHistory.find(query);
        res.send(patientHistory);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

routerPatientHistory.get('/patient/:id/history', async (req, res) => {
    const { id } = req.params;
    const query = id ? { patientId: id } : {};
    try {
        const patientHistory = await PatientHistory.find(query);
        res.send(patientHistory);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default routerPatientHistory;