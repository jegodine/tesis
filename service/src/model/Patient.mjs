import mongoose from "mongoose";
const { Schema } = mongoose;

const patientSchema = new Schema({
    name: String,
    age: Number,
    dpi: { type: Number, index: true },
    userId: { type: String, index: true },
    gender: { type: String, index: true },
    created: { type: Date, default: Date.now, index: true }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;