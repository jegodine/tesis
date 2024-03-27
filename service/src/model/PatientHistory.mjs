import mongoose from "mongoose";
const { Schema, ObjectId } = mongoose;

const patientHistorySchema = new Schema({
    history: String,
    gemini: String,
    image: String,
    type: String,
    patientId: { type: ObjectId, index: true },
    accepted: { type: String, index: true },
    created: { type: Date, default: Date.now, index: true }
});

const PatientHistory = mongoose.model('PatientHistory', patientHistorySchema);

export default PatientHistory;